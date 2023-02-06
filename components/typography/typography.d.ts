
import { TextProps } from "react-native-magnus"

type ITextVariant = "heading" | "subheading" | "title" | "subtitle" | "body" | "small"

export interface ITypographyProps extends TextProps {
    variant?: ITextVariant
}