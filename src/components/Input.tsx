import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  font-size: ${({ theme }) => theme.font.sm};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => `#fff`};
  border: 1px solid ${({ theme }) => theme.color.blueGrey3};
  box-shadow: 0px 2px 2px ${({ theme }) => theme.color.blueGrey0};

  &:hover {
    border-color: ${({ theme }) => theme.color.blue3};
  }

  &:focus {
    border-color: ${({ theme }) => theme.color.blue3};
    outline: 2px solid ${({ theme }) => theme.color.blue2};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.color.red4};
    outline: 2px solid ${({ theme }) => theme.color.red3};
  }
`
