import { Typography } from '@components/typography'
import BoxIcon from '@svgs/BoxIcon'
import { IModelProduct } from '@typings/models'
import React from 'react'
import { Div } from 'react-native-magnus'
import { useAssets } from "expo-asset"
import { Image, ImageSourcePropType } from 'react-native'

interface IProductListItemProps {
    product: IModelProduct
}

export const ProductListItem: React.FC<IProductListItemProps> = ({ product }) => {
    const placeholderImage = require("../../../assets/images/logo.png")

    console.log({ product })
    return (
        <Div flexDir='row' borderBottomWidth={1} borderColor="#e2e8f0" mt={16} pb={8} alignItems="center">
            <Image style={{ width: 65, height: 65 }} resizeMode="contain" source={placeholderImage} />
            <Div ms={16} h="100%" flex={1}>
                <Typography variant='title' color='primary'>
                    {product.name}
                </Typography>
                <Div flexDir='row' flex={1} justifyContent='space-between'>
                    <Typography>
                        Shelf: {product.shelfQuantity} {product.quantityUnit}
                    </Typography>
                    <Typography>
                        Storage: {product.storageQuantity}  {product.quantityUnit}
                    </Typography>
                </Div>
            </Div>
        </Div>
    )
}
