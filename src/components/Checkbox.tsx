import { FC, InputHTMLAttributes } from 'react'
import styled from 'styled-components'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>

const StyledCheckbox = styled.input``

export const Checkbox: FC<CheckboxProps> = props => (
  <StyledCheckbox {...props} type="checkbox" />
)
