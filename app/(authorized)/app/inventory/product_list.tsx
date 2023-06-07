import { Container } from '@components/container'
import { Typography } from '@components/typography'
import { useTabBarControl } from '@providers/TabBarProvider'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Button, Div, Fab, Icon, ScrollDiv } from 'react-native-magnus'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'

function ProductList() {
    const router = useRouter()
    const tabbar = useTabBarControl()
    const [scrollPos, setScrollPos] = React.useState(0)
    const [direction, setDirection] = React.useState<"up" | "down" | null>(null)

    const onScrollContent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentOffset = e.nativeEvent.contentOffset.y;
        const dir = currentOffset > scrollPos ? 'down' : 'up';
        setScrollPos(currentOffset)

        if (direction === "down") setTimeout(() => {
            (tabbar.tabBarVisible && tabbar.hide) && tabbar.hide()
            setDirection(dir)
        }, 200);
        if (direction === "up") {
            (!tabbar.tabBarVisible && tabbar.show) && tabbar.show()
            setDirection(dir)
        }
    }

    return (
        <Container level={2} px={0} py={0} safeBottom={direction === "down"}>
            <Div shadow="md"
                zIndex={2}
                position='absolute'
                bottom={25}
                right={25}>
                <Link asChild href="/modal/create_product">

                    <Button
                        rounded="circle"
                        w={60}
                        h={60}
                        bg='indigo600'
                    >
                        <Icon fontSize={24} color='#fff' name='plus' />
                    </Button>
                </Link>
            </Div>
            <ScrollDiv px={8} bg='level2' bounces={false} scrollEventThrottle={10} onScroll={onScrollContent} scrollEnabled>
                {
                    Array(100).fill(0).map((_, i) => (
                        <Typography key={i}>Products</Typography>
                    ))
                }
            </ScrollDiv>
        </Container>
    )
}

export default ProductList