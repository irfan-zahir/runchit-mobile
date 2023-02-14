import usePermissions from '@hooks/usePermissions'
import React from 'react'
import { Div } from 'react-native-magnus'
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner'
import { Button } from '@components/button'

interface ISkuScannerProps {
    onScanned: (scannedBarcode: string) => void
}

export const SkuScanner = ({ onScanned }: ISkuScannerProps) => {

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
        <Div h={55} w="100%" bg="primary" mt={24} mb={4}>
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
                <BarCodeScanner style={{ flex: 1 }} onBarCodeScanned={handleBarcodeScanned} />
            }
        </Div>
    )
}
