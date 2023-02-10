
import { IBackgroundColors } from '@typings/theme.d'
import { ButtonProps as RNMButtonProps } from "react-native-magnus"

type IButtonVariant = "solid" | "bare" | "ghost"

export interface IButtonProps extends Omit<RNMButtonProps, "bg"> {
    variant?: IButtonVariant
    bg?: IBackgroundColors
}