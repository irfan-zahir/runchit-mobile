import { Button } from '@components/button'
import { Typography } from '@components/typography'
import React from 'react'
import { Modal } from 'react-native-magnus'


interface ISwitchRoleModalProps {
    isVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const SwitchRoleModal = ({ isVisible, closeModal }: ISwitchRoleModalProps) => {
    return (

        <Modal isVisible={isVisible} h="45%" rounded="2xl" p="lg" onBackdropPress={() => closeModal()}>
            <Button block mb="md">
                <Typography>switch role</Typography>
            </Button>
            <Button block variant='ghost' mb="md">
                <Typography>switch role</Typography>
            </Button>
            <Button block variant='ghost' mb="md">
                <Typography>switch role</Typography>
            </Button>
        </Modal>
    )
}
