import React from 'react'
import { Text } from "react-native-magnus"
import { ITypographyProps } from "./typography.d"

export const Typography: React.FC<React.PropsWithChildren<ITypographyProps>> = ({ variant, ...props }) => {
    let variantProps: ITypographyProps = {}
    switch (variant) {
        case "h1": variantProps = { fontSize: 36, fontFamily: "fira_800" }; break;
        case "h2": variantProps = { fontSize: 32, fontFamily: "fira_800" }; break;
        case "h3": variantProps = { fontSize: 30, fontFamily: "fira_800" }; break;
        case "h4": variantProps = { fontSize: 26, fontFamily: "fira_800" }; break;
        case "h5": variantProps = { fontSize: 22, fontFamily: "fira_800" }; break;
        case "h6": variantProps = { fontSize: 18, fontFamily: "fira_800" }; break;
        case "s1": variantProps = { fontSize: 16, fontFamily: "fira_600" }; break;
        case "s2": variantProps = { fontSize: 13, fontFamily: "fira_600" }; break;
        case "p1": variantProps = { fontSize: 15, fontFamily: "fira_400" }; break;
        case "p2": variantProps = { fontSize: 13, fontFamily: "fira_400" }; break;
        case "c1": variantProps = { fontSize: 12, fontFamily: "fira_400" }; break;
        case "c2": variantProps = { fontSize: 12, fontFamily: "fira_600" }; break;
        case "label": variantProps = { fontSize: 15, fontFamily: "fira_400" }; break;
        default: variantProps = { fontSize: 15, fontFamily: "fira_400" }; break;
    }

    return <Text {...variantProps} {...props} />
}
