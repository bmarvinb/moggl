import { BiLoaderAlt } from 'react-icons/bi'
import { styled } from 'theme/config'

export const Spinner = styled(BiLoaderAlt, {
  color: '$neutral4',
})

Spinner.defaultProps = {
  'aria-label': 'loading',
}
