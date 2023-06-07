import React from 'react'


interface ITabBarControlValues {
    hide?: () => void,
    show?: () => void,
    tabBarVisible: boolean
}

const TabBarContext = React.createContext<ITabBarControlValues>({ tabBarVisible: true })

export const useTabBarControl = () => React.useContext(TabBarContext)

export const TabBarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [isVisible, setVisible] = React.useState(true)

    return (
        <TabBarContext.Provider value={{
            tabBarVisible: isVisible,
            show() {
                setVisible(true)
            },
            hide() {
                setVisible(false)
            },
        }}>
            {children}
        </TabBarContext.Provider>
    )
}
