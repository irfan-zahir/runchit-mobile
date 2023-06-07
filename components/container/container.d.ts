import { ScrollDivProps } from "react-native-magnus";

export interface IContainerProps extends ScrollDivProps {
    level?: 1 | 2 | 3 | 4;
    fullscreen?: boolean;
    centered?: boolean;
    flexGap?: number
    safeTop?: boolean;
    avoidTop?: boolean;
    safeBottom?: boolean;
    safeY?: boolean;
}