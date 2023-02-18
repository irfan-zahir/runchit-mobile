import usePermissions from '@hooks/usePermissions'
import React from 'react'
import { Div } from 'react-native-magnus'
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner'
import { Button } from '@components/button'
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated'

interface ISkuScannerProps {
    onScanned: (scannedBarcode: string) => void;
    onCancelScan: () => void
}

export const SkuScanner = ({ onScanned, onCancelScan }: ISkuScannerProps) => {

    const [isLoading, setLoading] = React.useState(true)
    const { permissions: { camera } } = usePermissions()
    const [hasPermission, setHasPermission] = React.useState(camera)

    const askCameraPermission = () => {
        (async () => {
            const { granted } = await BarCodeScanner.requestPermissionsAsync()
            setHasPermission(granted)
        })()
    }

    const getCameraPermissions = async () => {
        const cameraPermission = await BarCodeScanner.getPermissionsAsync()
        setHasPermission(cameraPermission.granted)
        setLoading(false)
    }


    React.useEffect(() => {
        getCameraPermissions()
        if (!isLoading && hasPermission === false) askCameraPermission()

        return () => { }
    }, [])

    const handleBarcodeScanned: BarCodeScannedCallback = ({ data }) => onScanned(data)

    return (
        <Div h={45} w="100%">
            {
                !isLoading && !hasPermission &&
                <Div flex={1} justifyContent="center">
                    <Button block onPress={() => askCameraPermission()}>
                        Allow camera access
                    </Button>
                </Div>
            }
            {
                hasPermission &&
                <Div flexDir='row' flex={1}>
                    <BarCodeScanner style={{ flex: 1, marginEnd: 8 }} onBarCodeScanned={handleBarcodeScanned} />

                    <Animated.View entering={SlideInRight}>
                        <Button h="100%" ml={4} onPress={() => onCancelScan()}>Cancel</Button>
                    </Animated.View>
                </Div>
            }
        </Div>
    )
}
