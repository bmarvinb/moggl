import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.textSm.fontSize};
  line-height: ${props => props.theme.textSm.lineHeight};
  margin-bottom: 0.5rem;
  font-weight: 500;
`
