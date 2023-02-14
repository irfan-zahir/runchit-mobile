import React from "react";
import { BarCodeScanner } from "expo-barcode-scanner"

enum ISystemAccess {
    camera = "camera"
}

type IPermissionHookState = Record<ISystemAccess, boolean | null>

export default function () {

    const [isLoading, setIsLoading] = React.useState(true)

    const [permissions, setPermissions] = React.useState<IPermissionHookState>({
        camera: null
    })

    const getSystemPermissions = async () => {
        const camera = await BarCodeScanner.getPermissionsAsync()
        // to add more system permissions

        setPermissions({ camera: camera.granted })
        setIsLoading(false)
    }

    const askCameraPermission = () => {
        (async () => {
            const { granted: cameraGranted } = await BarCodeScanner.requestPermissionsAsync()
            setPermissions({ camera: cameraGranted })
        })()
    }

    const askSystemPermissions = () => {
        if (!permissions.camera) askCameraPermission()
    }

    React.useEffect(() => {
        if (isLoading) getSystemPermissions()
        if (!isLoading) askSystemPermissions()

        return () => { }
    }, [isLoading])

    return { permissions, askCameraPermission }
}