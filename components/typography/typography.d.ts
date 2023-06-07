
import { TextProps } from "react-native-magnus"

type ITextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "s1" | "s2" | "c1" | "c2" | "p1" | "p2" | "label"

export interface ITypographyProps extends TextProps {
    variant?: ITextVariant
}