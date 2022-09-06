import * as React from 'react'
import InputUnstyled, {InputUnstyledProps} from '@mui/base/InputUnstyled'
import styled from 'styled-components'

const StyledInputElement = styled('input')`
  width: 100%;
  font-size: ${({theme}) => theme.typography.textSm.fontSize};
  line-height: ${({theme}) => theme.typography.textSm.lineHeight};
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: ${({theme}) => theme.pallete.white};
  border: 1px solid ${({theme}) => theme.pallete.blueGrey3};
  box-shadow: 0px 2px 2px ${({theme}) => theme.pallete.blueGrey0};

  &:hover {
    border-color: ${({theme}) => theme.pallete.blue3};
  }

  &:focus {
    border-color: ${({theme}) => theme.pallete.blue3};
    outline: 2px solid ${({theme}) => theme.pallete.blue2};
  }

  &[aria-invalid='true'] {
    border-color: ${({theme}) => theme.pallete.red4};
    outline: 2px solid ${({theme}) => theme.pallete.red3};
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
