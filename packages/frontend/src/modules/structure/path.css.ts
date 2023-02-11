import { style } from '@vanilla-extract/css'
import { createHighlightStyles } from '@/ui/mixins'
import {
  dark,
  centerChild,
  color,
  rounded,
  spacing,
  theme,
  media,
  insetX,
  padding,
  margin,
  remValue,
} from '@/ui/theme'
import vars from '@/ui/theme/vars.css'

const rowHeight = spacing[3]
const pathHeight = spacing[4.5]

export const MIN_PATH_HEIGHT_IN_REM = remValue(pathHeight)

export const path = style({
  flexShrink: 0,
  height: pathHeight,
  width: '100%',
  position: 'relative',
  display: 'flex',
})

export const expand = style({
  height: '100%',
  backgroundColor: color.gray[700],
})

export const content = style({
  position: 'absolute',
  zIndex: 1,
  bottom: 0,
  ...insetX(0),
  minHeight: pathHeight,
  height: pathHeight,
  overflow: 'hidden',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'flex-end',
  ...padding(0.25, 2, 0.25, 2),
  borderTop: vars.panel.border,
  backgroundColor: vars.panel.bg,
  ':hover': {
    height: 'auto',
    paddingTop: spacing[0.5],
  },
})

export const expendable = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  zIndex: 2,
  backgroundImage: `linear-gradient(to right, ${vars.panel.bg} ${spacing[8]}, transparent ${spacing[32]})`,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: spacing[3],
  selectors: {
    [`${content}:hover &`]: {
      opacity: 0,
    },
  },
})
export const expendableIcon = style({
  width: spacing[3],
  height: spacing[3],
  color: vars.disabled.color,
})

export const container = style({
  display: 'flex',
  flexWrap: 'wrap',
  fontSize: theme.fontSize.sm,
  lineHeight: rowHeight,
  fontFamily: theme.font.mono,
})

export const divider = style({
  width: rowHeight,
  height: spacing[4],
  marginRight: spacing[1],
  ...centerChild,
  selectors: {
    [`${container} &:first-child`]: {
      display: 'none',
    },
  },
})

export const carret = style({
  width: spacing[2],
  height: spacing[2],
  color: vars.disabled.color,
})

const highlights = createHighlightStyles()

export const item = style([
  highlights.container,
  {
    height: rowHeight,
    ...padding(0.25, 0),
    ...margin(0.25, 1, 0.25, 0),
    ':last-child': {
      marginRight: 0,
    },
    display: 'flex',
    alignItems: 'center',
    columnGap: spacing[1],
    cursor: 'pointer',
    vars: {
      [highlights.bgOpacityVar]: '0',
    },
    selectors: {
      '&[data-hovered="true"]': {
        vars: { [highlights.bgOpacityVar]: '0.3' },
      },
    },
  },
])

export const highlight = style([
  highlights.highlight,
  {
    border: `1px solid ${color.gray[400]}`,
    ...rounded('sm'),
  },
])

export const typeIcon = style({
  width: spacing[2.5],
  height: spacing[2.5],
  color: vars.disabled.color,
})

export const name = style({
  transform: 'translateY(0.2px)',
  color: color.gray[600],
  ...media({
    [dark]: {
      color: color.gray[200],
    },
  }),
})
