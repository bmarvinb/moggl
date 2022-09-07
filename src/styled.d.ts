import 'styled-components'
import { CSSProp } from 'styled-components'
import { lightTheme } from 'theme'

type Theme = typeof lightTheme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>
  }
}
