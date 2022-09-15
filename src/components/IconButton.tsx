import styled from 'styled-components'

export const IconButton = styled.button`
  display: inline-flex;
  font-weight: bold;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 100%;
  padding: 0.25rem;

  &:hover {
    color: var(--primary5);
  }

  &:active {
    color: var(--primary6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
