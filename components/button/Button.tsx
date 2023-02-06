import { Typography } from '@components/typography'
import React from 'react'
import { Button as RNMButton, ButtonProps as RNMButtonProps } from "react-native-magnus"
import { IButtonProps } from "./button.d"


export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
    children,
    variant = "solid",
    bg = "primary",
    ripple = false,
    ...props
}) => {

    let variantProps: RNMButtonProps = { block: true, ripple }

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
            <Typography fontFamily='cabin-semi' color={variant === "solid" ? "white" : bg} >{children}</Typography>
        </RNMButton>
    )
}
