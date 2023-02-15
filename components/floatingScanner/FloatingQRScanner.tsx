import { Button } from '@components/button'
import { Typography } from '@components/typography'
import useModal from '@hooks/useModal'
import React from 'react'
import { Div, Fab, Icon, Modal } from 'react-native-magnus'
import QrIcon from '@svgs/QrScan'

import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner'

interface IFloatingScannerProps {

}

export const FloatingQRScanner = (props: IFloatingScannerProps) => {
    const { isVisible, openModal, closeModal } = useModal()
    const [isLoading, setLoading] = React.useState(true)
    const [hasPermission, setHasPermission] = React.useState<boolean | null>(null)
    const [scanned, setScanned] = React.useState<string | false>(false)

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


    const handleBarcodeScanned: BarCodeScannedCallback = ({ type, data }) => {
        setScanned(data)
    }


    const onFabPress = () => openModal()

    return (
        <>
            <Button
                onPress={onFabPress}
                bg='primary'
                rounded="circle"
                position="absolute" zIndex={99}
                bottom={50} right={25}>
                <QrIcon />
            </Button>
            <Modal rounded="2xl" h="65%" isVisible={isVisible} onBackdropPress={() => closeModal()} onDismiss={() => {
                setScanned(false)
                console.log("clear")
            }}>
                <Div flex={1}>
                    {
                        hasPermission === false &&
                        <Div flex={1} alignItems="center" justifyContent='center'>
                            <Typography>No access to camera</Typography>
                            <Button onPress={() => askCameraPermission()}>Allow camera access</Button>
                        </Div>
                    }
                    {
                        hasPermission &&
                        <>
                            <Div flex={1} py={16}>
                                <BarCodeScanner style={{ flex: 1 }} onBarCodeScanned={scanned ? undefined : handleBarcodeScanned} />
                            </Div>
                            <Div flex={1} px={16}>
                                <Typography>{scanned && scanned}</Typography>
                                {scanned && <Button onPress={() => setScanned(false)}>Scan again</Button>}
                            </Div>
                        </>
                    }
                </Div>
            </Modal>
        </>
    )
}