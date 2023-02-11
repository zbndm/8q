import { createVar, style, StyleRule, styleVariants } from '@vanilla-extract/css'
import { dark, color, spacing, theme, media, centerChild, transition } from '@/ui/theme'
import { createHighlightStyles } from '@/ui/mixins'
import vars from '@/ui/theme/vars.css'

const RowHeight = spacing[4.5]
const RowGap = spacing[0.5]

export const row = (() => {
  const valueRowHighlight = createHighlightStyles()

  const container = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingLeft: '2ch',
    fontFamily: theme.font.mono,
    color: color.gray[800],
    lineHeight: RowHeight,
  })

  const collapseOpacity = createVar()

  return {
    collapseOpacity,
    container: styleVariants({
      base: [container],
      collapsable: [
        container,
        valueRowHighlight.container,
        {
          cursor: 'pointer',
          vars: {
            [valueRowHighlight.bgOpacityVar]: '0',
          },
          selectors: {
            [`&[data-hovered=true]`]: {
              vars: { [valueRowHighlight.bgOpacityVar]: '0.3' },
            },
          },
        },
      ],
    }),
    highlight: style([valueRowHighlight.highlight, { border: vars.grayHighlight.border }]),
    toggle: {
      container: style({
        position: 'absolute',
        left: `-${spacing[1]}`,
        width: RowHeight,
        height: RowHeight,
        ...centerChild,
      }),
      button: style({
        opacity: collapseOpacity,
        ...transition('opacity'),
      }),
    },
  }
})()

export const name = {
  container: style({
    display: 'flex',
    alignItems: 'center',
    height: RowHeight,
  }),
  icon: style({
    height: spacing[3],
    width: spacing[3],
    color: color.gray[600],
    marginRight: spacing[1],
    ...media({
      [dark]: {
        color: color.gray[400],
      },
    }),
  }),
  name: style({
    height: RowHeight,
    minWidth: '5ch',
    marginRight: '2ch',
    userSelect: 'none',
    ':after': {
      content: ':',
      color: vars.disabled.color,
    },
    fontFamily: theme.font.mono,
    color: color.gray[800],
    ...media({
      [dark]: {
        color: color.gray[200],
      },
    }),
    selectors: {
      '&[data-signal=true]': {
        color: color.amber[600],
        ...media({
          [dark]: {
            color: color.amber[500],
          },
        }),
      },
    },
  }),
  highlight: style({
    display: 'inline-block',
  }),
}

export const baseValue = style({
  fontWeight: 500,
  height: RowHeight,
  color: color.gray[800],
  ...media({
    [dark]: {
      color: color.gray[200],
    },
  }),
})

const bracketsStyles: StyleRule = {
  fontWeight: 800,
  color: color.gray[800],
}
export const ValueObject = style({
  color: vars.disabled.color,
  ':before': {
    ...bracketsStyles,
    content: '{',
  },
  ':after': {
    ...bracketsStyles,
    content: '}',
  },
})

export const collapsable = {
  list: style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: RowGap,
  }),
}

export const ValueString = style([
  baseValue,
  {
    minHeight: RowHeight,
    height: 'fit-content',
    maxWidth: 'fit-content',
    color: color.green,
    ...media({
      [dark]: {
        color: color.green,
      },
    }),
  },
])
export const ValueNumber = style([
  baseValue,
  {
    minHeight: RowHeight,
    color: color.cyan[600],
    ...media({
      [dark]: {
        color: color.green,
      },
    }),
  },
])
export const ValueBoolean = style([
  baseValue,
  {
    // the checkbox is not clickable now
    // TODO: is it's not clickable—it shouldn't be able to be focused
    pointerEvents: 'none',
  },
])
export const ValueFunction = style([
  baseValue,
  {
    fontStyle: 'italic',
  },
])
export const Nullable = style([
  baseValue,
  {
    color: vars.disabled.color,
  },
])

const elHighlight = createHighlightStyles()

export const ValueElement = {
  container: style([
    baseValue,
    elHighlight.container,
    {
      color: color.amber[600],
      textTransform: 'lowercase',
      vars: {
        [elHighlight.bgOpacityVar]: '0',
      },
      ':hover': {
        vars: {
          [elHighlight.bgOpacityVar]: '0.6',
        },
      },
      ':before': {
        color: vars.disabled.color,
        content: `<`,
      },
      ':after': {
        color: vars.disabled.color,
        content: '/>',
      },
      ...media({
        [dark]: {
          color: color.amber[500],
        },
      }),
    },
  ]),
  highlight: elHighlight.highlight,
}
