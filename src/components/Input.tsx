import * as React from 'react'
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled'
import styled from 'styled-components'

const StyledInputElement = styled('input')`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.sm.fontSize};
  line-height: ${({ theme }) => theme.fonts.sm.lineHeight};
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => `#fff`};
  border: 1px solid ${({ theme }) => theme.colors.blueGrey3};
  box-shadow: 0px 2px 2px ${({ theme }) => theme.colors.blueGrey0};

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue3};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.blue3};
    outline: 2px solid ${({ theme }) => theme.colors.blue2};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.red4};
    outline: 2px solid ${({ theme }) => theme.colors.red3};
  }
`

export const Input = React.forwardRef(function CustomInput(
  props: InputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <>
      <InputUnstyled
        components={{ Input: StyledInputElement }}
        {...props}
        ref={ref}
      />
    </>
  )
})
