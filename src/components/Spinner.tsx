import { BiLoaderAlt } from 'react-icons/bi'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  from {transform: rotate(0deg)};
  to {transform: rotate(360deg)};
`

export const Spinner = styled(BiLoaderAlt)`
  animation: ${spin} 1s linear infinite;
  color: var(--neutral4);
`
Spinner.defaultProps = {
  'aria-label': 'loading',
}
