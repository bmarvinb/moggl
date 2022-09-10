import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.typography.textSm.fontSize};
  line-height: ${({ theme }) => theme.typography.textSm.lineHeight};
  margin-bottom: 0.5rem;
  font-weight: 500;
`
