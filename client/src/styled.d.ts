// styled.d.ts
import 'styled-components';
import '@xstyled/system';
import { WuiTheme } from '@welcome-ui/core';

interface AppTheme extends WuiTheme {
  // customize your theme
}

declare module '@xstyled/system' {
  export interface Theme extends AppTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
