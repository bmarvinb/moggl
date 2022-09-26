import styled from 'styled-components'

export const IconButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  padding: 0.25rem;
  color: ${props => (props.$active ? 'var(--primary4)' : 'var(--neutral8)')};

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
