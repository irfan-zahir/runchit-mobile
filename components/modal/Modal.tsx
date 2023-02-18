import React from 'react'
import { Modal as RNMModal, ModalProps as RNMModalProps } from "react-native-magnus"
import { OnSwipeCompleteParams } from 'react-native-modal';

type IModalRef = {
    isVisible: boolean,
    set: (visible: boolean) => void
}

interface IModalProps extends Omit<RNMModalProps, "ref"> {
    modalRef?: IModalRef;
    onOpen?: () => void;
    onClose?: () => void;
    maxHeight?: string | number;
    swipeDownToClose?: boolean;
    closeOnPressBackdrop?: boolean;
}

export const Modal: React.FC<React.PropsWithChildren<IModalProps>> = ({
    children,
    onOpen,
    onClose,
    modalRef,
    h: height,
    maxHeight,
    swipeDownToClose = false,
    onBackdropPress,
    onDismiss,
    closeOnPressBackdrop,
    ...props
}) => {

    const close = () => modalRef && modalRef.set(false)
    const [modalHeight, setModalHeight] = React.useState(height)

    const backdropPress = () => {
        onBackdropPress && onBackdropPress()
        if (closeOnPressBackdrop) {
            onClose && onClose()
            close()
        }
    }

    const onSwipeComplete = ({ swipingDirection }: OnSwipeCompleteParams) => {
        if (swipingDirection === "down" && swipeDownToClose) return close()
    }

    const dismissing = () => {
        if (maxHeight && modalHeight === maxHeight) setModalHeight(height)
        onDismiss && onDismiss()
    }

    return (
        <RNMModal
            h={modalHeight}
            isVisible={modalRef?.isVisible}
            swipeDirection={swipeDownToClose ? "down" : undefined}
            onBackdropPress={backdropPress}
            onSwipeComplete={onSwipeComplete}
            onDismiss={dismissing}
            {...props}>
            {children}
        </RNMModal>
    )
}
