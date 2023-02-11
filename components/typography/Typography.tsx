import React from 'react'
import { Text } from "react-native-magnus"
import { ITypographyProps } from "./typography.d"

export const Typography: React.FC<React.PropsWithChildren<ITypographyProps>> = ({ variant, ...props }) => {
    let variantProps: ITypographyProps = {}
    switch (variant) {
        case "heading":
            variantProps = { fontSize: "4xl", fontFamily: "inter-bold", fontWeight: "bold" }
            break;
        case "subheading":
            variantProps = { fontSize: "2xl", fontFamily: "cabin-bold", fontWeight: "bold" }
            break;
        case "title":
            variantProps = { fontSize: 18, fontFamily: "cabin-semi" }
            break;
        case "subtitle":
            variantProps = { fontSize: 16, fontFamily: "cabin-semi" }
            break;
        case "body":
            variantProps = { fontSize: 14, fontFamily: "cabin" }
            break;
        case "small":
            variantProps = { fontSize: 12, fontFamily: "cabin" }
            break;

        default:
            variantProps = { fontSize: 14, fontFamily: "cabin" }
            break;
    }
    return <Text {...variantProps} {...props} />
}
