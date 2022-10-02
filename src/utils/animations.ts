import { keyframes } from 'theme/config'

export const fadeIn = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
})

export const fadeOut = keyframes({
  from: { opacity: '1' },
  to: { opacity: '0' },
})

export const slideIn = keyframes({
  from: { transform: '$$transformValue' },
  to: { transform: 'translate3d(0,0,0)' },
})

export const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: '$$transformValue' },
})
