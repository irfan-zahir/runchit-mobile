import React from 'react'
import { IAuthProviderValue, IUserData } from '@typings/providers.d'
import firebaseAuth, { User as IFirebaseUser } from "firebase/auth"
import { auth } from "@configs/firebase.config"
import { ActivityIndicator } from 'react-native';
import { persistor } from '@rtk/store';

export const AuthContext = React.createContext<IAuthProviderValue>({ authUser: null, loading: true })
export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [loading, setLoading] = React.useState(true)
    const [authUser, setauthUser] = React.useState<IUserData | null>(null)

    const onAuthStateChanged = async (user: IFirebaseUser | null) => {
        try {
            if (user) {
                const accessToken = await user!.getIdToken(true)
                if (accessToken) setauthUser({ ...user!, accessToken })
            } else {
                setauthUser(null)
            }
        } catch (e) {
            console.error("Unexpected error in fetching user's token", e)
        }
        if (loading) setLoading(false)
    }

    React.useEffect(() => {
        const subscriber = auth.onAuthStateChanged((user) => onAuthStateChanged(user))

        return subscriber
    }, [])

    const logout = async () => {
        await persistor.purge()
        await firebaseAuth.signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ authUser, logout, loading }}>
            {!loading ? children : <ActivityIndicator animating={true} size="large" />}
        </AuthContext.Provider>
    )
}
