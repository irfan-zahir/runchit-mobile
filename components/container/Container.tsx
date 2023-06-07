import React from 'react'
import { ScrollDivProps, ScrollDiv, Div } from 'react-native-magnus'
import { IContainerProps } from './container.d'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Container: React.FC<React.PropsWithChildren<IContainerProps>> = ({
    children,
    level,
    fullscreen,
    centered,
    safeTop,
    flexGap,
    safeY,
    safeBottom,
    avoidTop,
    scrollEnabled = false,
    ...containerProps
}) => {

    let containerVariants: ScrollDivProps = { px: 16, py: 8, scrollEnabled }
    const { top: topInset, bottom: bottomInset } = useSafeAreaInsets()

    switch (level) {
        case 1: containerVariants = { ...containerVariants, bg: "#fff" }; break;
        case 2: containerVariants = { ...containerVariants, bg: "#f7f9fc" }; break;
        case 3: containerVariants = { ...containerVariants, bg: "#edf1f7" }; break;
        case 4: containerVariants = { ...containerVariants, bg: "#e4e9f2" }; break;
        default: containerVariants = { ...containerVariants, bg: "#fff" }; break;
    }

    if (fullscreen) containerVariants = { ...containerVariants, w: "100%", flex: 1 }
    if (centered) containerVariants = { ...containerVariants, alignItems: "center", justifyContent: "center" }
    if (safeTop) containerVariants = { ...containerVariants, pt: topInset }
    if (avoidTop) containerVariants = { ...containerVariants, mt: topInset }
    if (safeBottom) containerVariants = { ...containerVariants, pb: bottomInset }
    if (safeY) containerVariants = { ...containerVariants, pt: topInset, pb: bottomInset }
    if (flexGap) containerVariants = { ...containerVariants, style: { gap: flexGap } }

    if (scrollEnabled) return (
        <ScrollDiv {...containerVariants} {...containerProps}>
            {children}
        </ScrollDiv>
    )

    return (
        <Div {...containerVariants} {...containerProps}>
            {children}
        </Div>
    )
}
