import { Button } from '@components/button'
import { Typography } from '@components/typography'
import useModal from '@hooks/useModal'
import React from 'react'
import { Div, Fab, Icon, Modal } from 'react-native-magnus'
import QrIcon from '@svgs/QrScan'

import { Linking } from "react-native"
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner'

interface IInventoryScannerProps {

}

export const InventoryScanner = (props: IInventoryScannerProps) => {
    const { isVisible, openModal, closeModal, toggleModal } = useModal()
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


    const onFabPress = async () => await Linking.openURL("app-settings") //toggleModal()

    const onBackdropPress = () => {
        setScanned(false)
        closeModal()
    }

    return (
        <>
            <Button
                onPress={onFabPress}
                bg='primary'
                rounded="circle"
                position="absolute" zIndex={99}
                bottom={50} right={25}>
                {/* <QrIcon /> */}
                <Icon fontFamily='MaterialIcons' name='add' fontSize={32} color="white" />
            </Button>
            <Modal rounded="2xl" h="65%" isVisible={isVisible} onBackdropPress={onBackdropPress}>
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
