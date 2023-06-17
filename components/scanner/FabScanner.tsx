import { Link } from 'expo-router'
import React from 'react'
import { Button, Div, Icon } from 'react-native-magnus'
import { SkuScanner } from './SkuScanner'

export function FabScanner() {
    const onScanned = (value: string) => {

    }

    return (
        <Div shadow="md"
            zIndex={2}
            position='absolute'
            bottom={25}
            right={25}>
            <Link asChild href="/runchit/modal/fab_scanner">
                <Button
                    rounded="circle"
                    w={60}
                    h={60}
                    bg='indigo600'
                >
                    <Icon fontSize={30} color='#fff' name='barcode-scan' fontFamily='MaterialCommunityIcons' />
                </Button>
            </Link>
        </Div>
    )
}