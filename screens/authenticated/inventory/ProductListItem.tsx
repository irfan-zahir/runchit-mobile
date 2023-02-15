import { Typography } from '@components/typography'
import BoxIcon from '@svgs/BoxIcon'
import { IModelProduct } from '@typings/models'
import React from 'react'
import { Div } from 'react-native-magnus'

interface IProductListItemProps {
    product: IModelProduct
}

export const ProductListItem: React.FC<IProductListItemProps> = ({ product }) => {
    return (
        <Div flexDir='row'>
            <BoxIcon />
            <Typography>
                {product.name}
            </Typography>
        </Div>
    )
}
