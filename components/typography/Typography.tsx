import React from 'react'
import { Text } from "react-native-magnus"
import { ITypographyProps } from "./typography.d"

export const Typography: React.FC<React.PropsWithChildren<ITypographyProps>> = ({ variant, ...props }) => {
    let variantProps: ITypographyProps = {}
    switch (variant) {
        case "heading":
            variantProps = { fontSize: "6xl", fontFamily: "inter-bold", fontWeight: "bold" }
            break;
        case "subheading":
            variantProps = { fontSize: "4xl", fontFamily: "cabin-bold", fontWeight: "bold" }
            break;
        case "title":
            variantProps = { fontSize: 20, fontFamily: "cabin-semi" }
            break;
        case "subtitle":
            variantProps = { fontSize: 18, fontFamily: "cabin-semi" }
            break;
        case "body":
            variantProps = { fontSize: 16, fontFamily: "cabin" }
            break;
        case "small":
            variantProps = { fontSize: 14, fontFamily: "cabin" }
            break;

        default:
            variantProps = { fontSize: 16, fontFamily: "cabin" }
            break;
    }
    return <Text {...variantProps} {...props} />
}
