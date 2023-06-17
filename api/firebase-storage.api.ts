// import { storage } from "@configs/firebase.config";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable, } from "firebase/storage"

type IUploadImageFirebase = {
    uri: string;
    imageDirectory: string
    onStart?: () => void;
    onProgress?: (progress: number) => void;
    onComplete?: (downloadUrl: string) => void;
    onFail?: (error: unknown) => void;
}

export const uploadImageFirebase = async ({
    uri,
    imageDirectory,
    onStart,
    onProgress,
    onComplete,
    onFail
}: IUploadImageFirebase) => {
    const storage = getStorage()
    onStart && onStart()
    try {

        const blob: Blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const imgName = "img-" + new Date().getTime();
        const storageRef = ref(storage, `${imageDirectory}/${imgName}.jpg`)
        const uploadTask = uploadBytesResumable(storageRef, blob, { contentType: "image/jpeg" })
        uploadTask.on(
            "state_changed",
            (snapshot) => onProgress && onProgress(Math.fround((snapshot.bytesTransferred / snapshot.totalBytes))),
            (error) => onFail && onFail(error),
            () => getDownloadURL(uploadTask.snapshot.ref).then(url => onComplete && onComplete(url))
        )
    } catch (error) {
        console.log("unexpected error while uploading image to storage ", error)
    }
}

export const deleteImageFirebase = async (storagePath: string) => {
    const storage = getStorage()
    const storageRef = ref(storage, storagePath)
    await deleteObject(storageRef)
}