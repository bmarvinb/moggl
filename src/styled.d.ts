import 'styled-components'
import {CSSProp} from 'styled-components'
import theme from 'theme'

type Theme = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp<Theme>
  }
}
