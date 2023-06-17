import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { Div, ImageProps, Image as RNMImage, Skeleton } from 'react-native-magnus'

export const Image: React.FC<ImageProps> = ({ h, w, ...props }) => {
    const [loading, setloading] = React.useState(true)
    const fillProps = { position: "absolute" as "absolute", top: 0, bottom: 0, left: 0, right: 0 }
    return (
        <Div h={h} w={w}>
            <RNMImage onLoadEnd={() => setloading(false)} {...props} {...fillProps} />
            {/* {
                loading && <Skeleton h={h} {...fillProps} rounded="md" />
            } */}
            {
                loading &&
                <AnimatedLottieView style={[fillProps, { height: h }]} autoPlay source={require("@assets/icons/loading.json")} />
            }
        </Div>
    )
}
