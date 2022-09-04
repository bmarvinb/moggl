import * as React from 'react'
import InputUnstyled, {InputUnstyledProps} from '@mui/base/InputUnstyled'
import styled from '@emotion/styled'
import theme from 'theme/index'

const StyledInputElement = styled('input')`
  width: 100%;
  font-size: ${theme.textSm.fontSize};
  line-height: ${theme.textSm.lineHeight};
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: ${theme.pallete.white};
  border: 1px solid ${theme.pallete.blueGrey3};
  box-shadow: 0px 2px 2px ${theme.pallete.blueGrey0};

  &:hover {
    border-color: ${theme.pallete.blue3};
  }

  &:focus {
    border-color: ${theme.pallete.blue3};
    outline: 2px solid ${theme.pallete.blue2};
  }

  &[aria-invalid='true'] {
    border-color: ${theme.pallete.red4};
    outline: 2px solid ${theme.pallete.red3};
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
