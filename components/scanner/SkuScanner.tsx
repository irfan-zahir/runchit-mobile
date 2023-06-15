import React from 'react'
import usePermission from '@hooks/usePermission'
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner'
import { Div, DivProps } from 'react-native-magnus';

interface ISkuScannerProps extends DivProps {
    onScanned: (scannedBarcode: string) => void;
    onCancelScan?: () => void
}

export const SkuScanner: React.FC<React.PropsWithChildren<ISkuScannerProps>> = ({
    onScanned,
    onCancelScan,
    ...containerProps
}) => {
    const [isLoading, setLoading] = React.useState(true)
    const { permissions: { camera } } = usePermission()
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
        <Div {...containerProps}>
            <BarCodeScanner style={{ flex: 1 }} onBarCodeScanned={handleBarcodeScanned} />
        </Div>
    )
}
