import p from 'path'
import { PluginObj, template } from '@babel/core'
import * as t from '@babel/types'
import {
  LocationAttr,
  LOCATION_ATTRIBUTE_NAME,
  MARK_COMPONENT_FN_NAME,
  WINDOW_PROJECTPATH_PROPERTY,
} from './types'

const cwd = process.cwd()

const projectPathAst = template(`globalThis.${WINDOW_PROJECTPATH_PROPERTY} = %%loc%%;`)({
  loc: t.stringLiteral(cwd),
}) as t.Statement

const buildMarkComponent = template(`globalThis.${MARK_COMPONENT_FN_NAME}(%%loc%%);`) as (
  ...args: Parameters<ReturnType<typeof template>>
) => t.Statement

const isUpperCase = (s: string) => /^[A-Z]/.test(s)

const getLocationAttribute = (filePath: string, line: number, column: number): LocationAttr =>
  `${filePath}:${line}:${column}`

function getNodeLocationAttribute(
  node: t.Node,
  state: { filename?: unknown },
  isJSX = false,
): string | undefined {
  if (!node.loc || typeof state.filename !== 'string') return
  return getLocationAttribute(
    p.relative(cwd, state.filename),
    node.loc.start.line,
    // 2 is added to place the caret after the "<" character
    node.loc.start.column + (isJSX ? 2 : 0),
  )
}

let transformCurrentFile = false

const jsxLocationPlugin: (config: {
  jsx: boolean
  components: boolean
}) => PluginObj<any> = config => ({
  name: '@solid-devtools/location',
  visitor: {
    Program(path, state) {
      transformCurrentFile = false
      // target only project files
      if (typeof state.filename !== 'string' || !state.filename.includes(cwd)) return
      transformCurrentFile = true

      // inject projectPath variable
      path.node.body.push(projectPathAst)
    },
    ...(config.jsx && {
      JSXOpeningElement(path, state) {
        const { openingElement } = path.container as t.JSXElement
        if (!transformCurrentFile || openingElement.name.type !== 'JSXIdentifier') return

        // Filter native elements
        if (isUpperCase(openingElement.name.name)) return

        const location = getNodeLocationAttribute(openingElement, state, true)
        if (!location) return

        openingElement.attributes.push(
          t.jsxAttribute(t.jsxIdentifier(LOCATION_ATTRIBUTE_NAME), t.stringLiteral(location)),
        )
      },
    }),
    ...(config.components && {
      FunctionDeclaration(path, state) {
        if (!transformCurrentFile || !path.node.id || !isUpperCase(path.node.id.name)) return

        const location = getNodeLocationAttribute(path.node, state)
        if (!location) return

        path.node.body.body.unshift(buildMarkComponent({ loc: t.stringLiteral(location) }))
      },
      VariableDeclarator(path, state) {
        const { init, id } = path.node
        if (
          !transformCurrentFile ||
          !id ||
          !('name' in id) ||
          !isUpperCase(id.name) ||
          !init ||
          (init.type !== 'FunctionExpression' && init.type !== 'ArrowFunctionExpression') ||
          init.body.type !== 'BlockStatement'
        )
          return

        const location = getNodeLocationAttribute(path.node, state)
        if (!location) return

        init.body.body.unshift(buildMarkComponent({ loc: t.stringLiteral(location) }))
      },
    }),
  },
})

export default jsxLocationPlugin
