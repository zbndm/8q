import { ComponentProps, Component } from 'solid-js';

declare function attachDevtoolsOverlay(props: ComponentProps<typeof Overlay>): VoidFunction;
declare const Overlay: Component<{
    defaultOpen?: boolean;
    alwaysOpen?: boolean;
    noPadding?: boolean;
}>;

export { attachDevtoolsOverlay };
