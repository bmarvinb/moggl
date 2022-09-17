import styled from 'styled-components'

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: var(--fontSm);
  line-height: var(--lineHeightSm);
  border-radius: var(--roundedXl);
  background: var(--neutral0);
  border: 1px solid var(--neutral3);
  box-shadow: var(--shadowXs);

  &:hover {
    border-color: var(--primary3);
  }

  &:focus {
    border-color: var(--primary3);
    outline: 2px solid var(--primary2);
  }

  &[aria-invalid='true'] {
    border-color: var(--red4);
    outline: 2px solid var(--red3);
  }
`

export const InlineInput = styled.input`
  padding: 0.75rem;
  font-size: var(--fontSm);
  line-height: var(--lineHeightSm);
  background: transparent;
  border: 0;

  &:focus {
    outline: none;
  }
`
