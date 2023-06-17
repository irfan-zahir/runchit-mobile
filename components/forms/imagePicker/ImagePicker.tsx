import React from 'react'
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useCameraPermissions, launchImageLibraryAsync, launchCameraAsync, MediaTypeOptions, ImagePickerAsset } from "expo-image-picker"
import { Div, Icon, Modal } from 'react-native-magnus';
import { Pressable, ScrollView } from 'react-native';
import { Typography } from '@components/typography';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { deleteImageFirebase, uploadImageFirebase } from '@api/firebase-storage.api';
import LottieView from 'lottie-react-native';
import { useNavigation } from 'expo-router';
import { Image } from '@components/image';

interface IImagePickerProps {
  name?: string;
  defaultImages?: string[];
  allowsMultipleSelection?: boolean;
  imageDirectory: string;
  onUpload?: (isLoading: boolean) => void
}


export const ImagePicker: React.FC<IImagePickerProps> = ({
  allowsMultipleSelection,
  imageDirectory,
  defaultImages,
  name = "images",
  onUpload
}) => {

  const navigation = useNavigation()

  const { watch, control } = useFormContext()
  const { prepend, remove: removeFormImage } = useFieldArray({ control, name })
  const formImages: string[] | undefined = watch(name)

  const [snaps, setSnaps] = React.useState<string[] | undefined>(undefined)

  //manually update form field value && snaps at initial render
  React.useEffect(() => {
    if ((formImages?.length ?? 0) !== (defaultImages?.length ?? 0)) prepend(defaultImages ?? [])

    if ((snaps?.length ?? 0) !== (defaultImages?.length ?? 0)) setSnaps(defaultImages)

    return () => { }
  }, [defaultImages])

  React.useEffect(() => {
    onUpload && onUpload((snaps?.length ?? 0) !== (formImages?.length ?? 0) && (snaps?.length ?? 0) > (formImages?.length ?? 0))

    return () => { }
  }, [snaps, formImages])


  //TODO handle exit update when form changes
  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      // e.preventDefault()
      console.log("removing image picker")
    })

    return () => {

    }
  }, [navigation])


  const [cameraPermission] = useCameraPermissions()
  const { showActionSheetWithOptions } = useActionSheet();

  const updateSnaps = (assets: ImagePickerAsset[] | null) => {
    if (assets) {
      const uri = assets.map(a => a.uri)
      if (!snaps) return setSnaps(uri)
      return setSnaps([...uri, ...snaps])
    }
  }

  const cameraAction = async () => launchCameraAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsMultipleSelection,
    aspect: [4, 3],
    quality: 0.5,
  }).then(result => updateSnaps(result.assets))

  const browseImage = async () => launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    allowsMultipleSelection,
    aspect: [4, 3],
    quality: 0.5,
  }).then(result => updateSnaps(result.assets))

  const onPressAddImages = () => {
    const options = ["Take photo", "Upload photo", "Cancel"]
    const cameraButtonIndex = 0;
    const imagePickerIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, },
      async (selected?: number) => {
        switch (selected) {
          case cameraButtonIndex: cameraAction(); break;

          case imagePickerIndex: browseImage(); break;

          case cancelButtonIndex: break;
        }
      })
  }

  const [viewPhoto, setViewPhoto] = React.useState<string | null>(null)

  const deleteImage = async (imageIndex: number) => {
    // proceed delete if both local and storage are sync
    if ((snaps?.length ?? 0) === (formImages?.length ?? 0)) {
      let storageUri = decodeURIComponent(formImages![imageIndex]).split("?")[0].split("/")
      const indexO = storageUri.indexOf("o")
      const storagePath = storageUri.filter((_, i) => i > indexO).join("/")
      await deleteImageFirebase(storagePath).then(_ => {
        const newSnaps = snaps?.filter((_, i) => i !== imageIndex)
        setSnaps(newSnaps)
        removeFormImage(imageIndex)
      })
    }
  }

  const onPressImage = (imageIndex: number) => {
    const options = ["View Photo", "Remove photo", "Cancel"]
    const viewPhotoButton = 0;
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      async (selected?: number) => {
        switch (selected) {

          case viewPhotoButton: if (snaps) setViewPhoto(snaps[imageIndex]); break;

          case destructiveButtonIndex: deleteImage(imageIndex); break;

          case cancelButtonIndex: break;
        }
      })
  }

  return (
    <Div alignItems='center' justifyContent='center'>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ padding: 16, flexGrow: 0 }}>
        {
          snaps && snaps.map((uri, i) => {
            const newUploadedLength = (snaps.length ?? 0) - (defaultImages?.length ?? 0)
            const isNotUploaded = i < newUploadedLength && newUploadedLength !== 0

            return (

              <ImageCarouselCard
                key={i}
                uri={uri}
                isUploaded={!isNotUploaded}
                imageDirectory={imageDirectory}
                setFormValue={(uri) => prepend(uri)}
                onPressImage={() => onPressImage(i)} />
            )
          }
          )
        }
        <Pressable onPress={() => onPressAddImages()}>
          <Div p={24} mr={(snaps?.length ?? 0) > 0 ? 24 : 0} bg='#fff' shadow="sm" rounded="md" h={187.5} w={250} alignItems='center' justifyContent='center'>
            <Icon name='image-plus' mr={8} fontFamily='MaterialCommunityIcons' fontSize={50} color='indigo600' />
            <Typography fontFamily='fira_600' mt={8}>Add images</Typography>
          </Div>
        </Pressable>
      </ScrollView>
      <Modal bg='transparent' animationInTiming={1} animationOutTiming={1}
        swipeDirection="down" onSwipeComplete={() => setViewPhoto(null)} isVisible={!!viewPhoto}>
        <Pressable style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={() => setViewPhoto(null)}>
          <Image rounded="2xl" alignSelf='center' w="90%" h={300} source={{ uri: viewPhoto! }} />
        </Pressable>
      </Modal>
    </Div>
  )
}

interface IImageCarouselCardProps {
  onPressImage: () => void;
  uri: string;
  imageDirectory: string;
  setFormValue: (uri: string) => void;
  isUploaded?: boolean
}

const ImageCarouselCard: React.FC<IImageCarouselCardProps> = ({
  onPressImage,
  uri,
  imageDirectory,
  isUploaded,
  setFormValue
}) => {
  const [progress, setProgress] = React.useState(0)
  const [downloadUri, setdownloadUri] = React.useState<string | null>(null)

  const blurRadius = Math.fround(1 - (progress))
  // console.log({ blurRadius, progress })

  //upload to firebase and update progress
  React.useEffect(() => {
    (!downloadUri && !isUploaded) &&
      uploadImageFirebase({
        uri,
        imageDirectory,
        onProgress: (percent) => setProgress(percent),
        onComplete: (uri) => {
          setdownloadUri(uri)
          setFormValue(uri)
        }
      })

    return () => { }
  }, [])

  return (

    <Pressable onPress={onPressImage}>
      <Div mr={8} shadow="sm" rounded="md" bg='#fff'>
        <Image resizeMode='cover' rounded="md" h={187.5} w={250} blurRadius={2} source={{ uri }} />
        <Div position='absolute' w={50} h={50} right={0} bottom={0} alignItems='flex-end' justifyContent='flex-end'>
          {
            !isUploaded && progress !== 1 && (
              <LottieView autoPlay source={require("@assets/icons/upload-to-cloud.json")} />
            )
          }
          {
            !isUploaded && progress === 1 && (
              <LottieView autoPlay loop={false} source={require("@assets/icons/success-check.json")} />
            )
          }
        </Div>
      </Div>
    </Pressable>
  )
}