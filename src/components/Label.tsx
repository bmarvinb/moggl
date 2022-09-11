import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fonts.sm.fontSize};
  line-height: ${({ theme }) => theme.fonts.sm.lineHeight};
  margin-bottom: 0.5rem;
  font-weight: 500;
`
