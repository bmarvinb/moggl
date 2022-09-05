import ButtonUnstyled, {buttonUnstyledClasses} from '@mui/base/ButtonUnstyled'
import styled from 'styled-components'
import theme from 'theme'

export const Button = styled(ButtonUnstyled)`
  font-weight: bold;
  font-size: ${theme.textSm.fontSize};
  line-height: ${theme.textSm.lineHeight};
  background-color: ${theme.pallete.blue4};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: ${theme.pallete.white};
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${theme.pallete.blue6};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
