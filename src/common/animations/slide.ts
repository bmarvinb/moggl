import { keyframes } from 'core/theme/config'

export const slideIn = keyframes({
  from: { transform: '$$transformValue' },
  to: { transform: 'translate3d(0,0,0)' },
})

export const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: '$$transformValue' },
})
