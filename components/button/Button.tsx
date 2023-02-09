import { Typography } from '@components/typography'
import React from 'react'
import { Button as RNMButton, ButtonProps as RNMButtonProps } from "react-native-magnus"
import { IButtonProps } from "./button.d"


export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
    children,
    variant = "solid",
    bg = "primary",
    ripple = false,
    color,
    ...props
}) => {

    let variantProps: RNMButtonProps = {
        ripple,
        fontFamily: "cabin-semi",
        color: color ?? variant === "solid" ? "white" : bg
    }

    switch (variant) {
        case "solid":
            variantProps = { ...variantProps, bg }
            break;

        case "ghost":
            variantProps = { ...variantProps, borderWidth: 1, borderColor: bg, bg: "transparent" }
            break;

        case "bare":
            variantProps = { ...variantProps, bg: "transparent" }
            break;

        default:
            break;
    }

    return (
        <RNMButton {...props} {...variantProps} >
            {children}
        </RNMButton>
    )
}
