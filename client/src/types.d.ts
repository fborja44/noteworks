import "@emotion/react";
import { AppTheme } from "./common/theme";

declare module "@emotion/react" {
  export interface Theme extends AppTheme {}
}
