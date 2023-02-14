import React from "react";

export default function () {
    const [isVisible, setIsVisible] = React.useState(false)

    const openModal = () => setIsVisible(true)
    const closeModal = () => setIsVisible(false)
    const toggleModal = () => setIsVisible(!isVisible)

    let modalRef = {
        isVisible,
        set: (visible: boolean) => setIsVisible(visible)
    }

    React.useEffect(() => {
        modalRef.isVisible = isVisible

        return () => { }
    }, [isVisible])


    return { isVisible, openModal, closeModal, toggleModal, modalRef }
}