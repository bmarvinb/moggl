import styled from 'styled-components'

export const Button = styled.button`
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.sm};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  background-color: ${({ theme }) => theme.color.blue4};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  color: ${({ theme }) => `#fff`};
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.blue6};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
