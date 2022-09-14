import styled from 'styled-components'

export const Button = styled.button`
  font-weight: bold;
  font-size: var(--fontSizeSm);
  line-height: var(--lineHeightSm);
  background-color: var(--blue4);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: var(--elevation0);
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: var(--blue6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
