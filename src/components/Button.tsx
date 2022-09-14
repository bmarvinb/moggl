import styled from 'styled-components'

export const Button = styled.button`
  font-weight: bold;
  font-size: var(--fontSizeSm);
  line-height: var(--lineHeightSm);
  background-color: var(--primary4);
  border-radius: var(--roundedLg);
  color: var(--neutral0);
  padding: 0.75rem 1.5rem;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: var(--primary5);
  }

  &:active {
    background-color: var(--primary6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
