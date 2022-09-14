import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.font.sm};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  margin-bottom: 0.5rem;
  font-weight: 500;
`
