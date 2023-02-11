export {}

declare module 'solid-js' {
  namespace JSX {
    interface CustomEvents {
      keydown: KeyboardEvent
      click: MouseEvent
      pointerover: PointerEvent
      pointerout: PointerEvent
    }
  }
}
