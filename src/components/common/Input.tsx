import * as React from 'react'
import InputUnstyled, {InputUnstyledProps} from '@mui/base/InputUnstyled'
import styled from 'styled-components'

const StyledInputElement = styled('input')`
  width: 100%;
  font-size: ${props => props.theme.textSm.fontSize};
  line-height: ${props => props.theme.textSm.lineHeight};
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: ${props => props.theme.pallete.white};
  border: 1px solid ${props => props.theme.pallete.blueGrey3};
  box-shadow: 0px 2px 2px ${props => props.theme.pallete.blueGrey0};

  &:hover {
    border-color: ${props => props.theme.pallete.blue3};
  }

  &:focus {
    border-color: ${props => props.theme.pallete.blue3};
    outline: 2px solid ${props => props.theme.pallete.blue2};
  }

  &[aria-invalid='true'] {
    border-color: ${props => props.theme.pallete.red4};
    outline: 2px solid ${props => props.theme.pallete.red3};
  }
`

export const Input = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <>
      <InputUnstyled
        components={{Input: StyledInputElement}}
        {...props}
        ref={ref}
      />
    </>
  )
})
