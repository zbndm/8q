<a href="https://github.com/thetarnav/solid-devtools/tree/main/packages/debugger#readme" target="_blank">
  <p>
    <img width="100%" src="https://assets.solidjs.com/banner?type=Devtools&background=tiles&project=Debugger" alt="Solid Devtools Debugger">
  </p>
</a>

# @solid-devtools/debugger

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![version](https://img.shields.io/npm/v/@solid-devtools/debugger?style=for-the-badge)](https://www.npmjs.com/package/@solid-devtools/debugger)
[![npm](https://img.shields.io/npm/dw/@solid-devtools/debugger?style=for-the-badge)](https://www.npmjs.com/package/@solid-devtools/debugger)

A runtime package, used to get information and track changes of the Solid's reactivity graph. It's a cornerstone of the rest of the packages.

## Usage Guide

### Installation

```bash
npm i @solid-devtools/debugger
# or
yarn add @solid-devtools/debugger
# or
pnpm add @solid-devtools/debugger
```

### Automatically Attaching Debugger

You can use the debugger in your Solid apps without having to manually attach it to every root or the reactive graph in your application. To enable automatic attaching, you need to add the following code to the entry point of your app:

[**If you use `solid-devtools` package, this is already handled for you!**](https://github.com/thetarnav/solid-devtools/tree/main/packages/main)

```ts
import { enableRootsAutoattach } from '@solid-devtools/debugger'

enableRootsAutoattach()
```

### Manually Attaching Debugger

If you don't want to automatically attach debugger, it can be done manually. It will give you the freedom to attach debugger to any root you choose.

To do so you need to import the debugger package and use one of the two primitives:

#### `attachDebugger`

This is a hook that will attach the debugger to the reactive owner of the scope it was used under. For example you might want to use it in you `<App>` component, or directly in the `render` function. It can be used in many places at once without any issues.

```tsx
import { render } from 'solid-js/web'
import { attachDebugger } from '@solid-devtools/debugger'

render(() => {
  attachDebugger()
  return <App />
}, document.getElementById('root'))

// or inside the App component:
function App() {
  attachDebugger()
  return <>...</>
}
```

#### `Debugger`

The debugger component works exactly like [`attachDebugger`](#attachDebugger), but it may be more convenient to use at times.

```tsx
import { render } from 'solid-js/web'
import { Debugger } from '@solid-devtools/debugger'

render(
  () => (
    <Debugger>
      <App />
    </Debugger>
  ),
  document.getElementById('root'),
)
```

#### Reattaching sub roots back to the tree

If you choose to attach debugger manually, you have to do that with every sub root, even if it is theoretically a part of existing and attached tree. This is because Solid doesn't attach roots created with `createRoot` to it's detached parent, so the debugger has no way of reaching it. To reattach this root back to the tree tracked by the debugger — simply put another `attachDebugger` call inside it.

[More in this issue](https://github.com/thetarnav/solid-devtools/issues/15)

This also will be necessary when using components that use `createRoot` internally, like `<For>`, `<Index>` or `<Suspense>`.

> **Note**
> This applies only when you are attaching roots manually.
> For automatic attaching, this is already handled.

```tsx
<For each={list()}>
	{item => (
		<Debugger>
			<ItemComponent title={item} />
		</Debugger>
	)}
<For>

// or call attachDebugger inside ItemComponent
function ItemComponent(props){
	attachDebugger()
	return <li>props.title</li>
}
```

### Using component locator

_Debugger feature inspired by [LocatorJS](https://www.locatorjs.com)_

Locator let's you locate components on the page, and go to their source code in your IDE. All you need to do is configure it by calling `useLocator` with some options.

```ts
import { useLocator } from 'solid-devtools'

useLocator()
```

It will not allow you to highlight hovered components on the page and reveal them in the IDE or the Chrome Extension. _(depending of if the extension panel is open or not)_

#### Locator Options

Not passing any options will enable the locator with <kbd>Alt</kbd> as the trigger key and no `targetIDE` selected.

Currently Locator allows for specifying these props:

##### `targetIDE`

Choose in which IDE the component source code should be revealed.

Out-of-the-box options: `vscode`, `atom`, `webstorm` and `vscode-insiders`

```ts
useLocator({
  targetIDE: 'vscode',
})
```

To be able to go the source code, the code location needs to be inlined during build. This is done by the `@solid-devtools/transform` package. [See how to set it up here.](../transform#getting-started)

**Target URL Function:**

To target custom URLs (e.g. Github files) the `targetIDE` option accepts an function returning a `string` or `false`.

```ts
useLocator({
  targetIDE: ({ filePath, line }) =>
    // will navigate to this link when clicking
    `https://github.com/thetarnav/solid-devtools/blob/main/playgrounds/sandbox/${filePath}#L${line}`,
})
```

Returning `false` will prevent calling `window.open` to navigate to URL, and let you handle the click yourself.

```ts
useLocator({
  targetIDE({ projectPath, filePath, line, column, element }) {
    console.log({ projectPath, filePath, line, column, element })
    return false
  },
})
```

##### `key`

Holding which key should enable the locator overlay? It's `"Alt"` by default — <kbd>Alt</kbd> on Windows, and <kbd>Option</kbd> or <kbd>⌥</kbd> on macOS.

Key options: `"Alt"`, `"Control"`, `"Mete"`, `"Shift"` or `string` to be compared with `e.key` property.

```tsx
useLocator({
  key: 'Control',
})
```

#### Using the Locator on the page

To activate the Locator module — you have to hold down the <kbd>Alt</kbd>/<kbd>Option</kbd> key and move your mouse around the page to highlight components and their different HTML Elements.

Clicking the component should take you to the component source code, given that you specified the [`targetIDE`](#targetIDE) option.

https://user-images.githubusercontent.com/24491503/174093606-a0d80331-021f-4d43-b0bb-e9a4041e1a26.mp4

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
