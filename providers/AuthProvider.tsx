import React from 'react'
import { IAuthProviderValue, IUserData } from '@typings/providers.d'
import firebaseAuth, { User as IFirebaseUser } from "firebase/auth"
import { auth } from "@configs/firebase.config"
import { ActivityIndicator } from 'react-native';
import { appDispatch } from '@rtk/store';
import { setCurrentUser } from '@rtk/slices/currentUser.slice';

export const AuthContext = React.createContext<IAuthProviderValue>({ userData: null, loading: true })
export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [loading, setLoading] = React.useState(true)
    const [userData, setuserData] = React.useState<IUserData | null>(null)

    const dispatch = appDispatch()

    const onAuthStateChanged = async (user: IFirebaseUser | null) => {
        try {
            if (user) {
                const accessToken = await user!.getIdToken(true)
                if (accessToken) setuserData({ ...user!, accessToken })
            } else {
                setuserData(null)
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
        dispatch(setCurrentUser(null))
        await firebaseAuth.signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ userData, logout, loading }}>
            {!loading ? children : <ActivityIndicator animating={true} size="large" />}
        </AuthContext.Provider>
    )
}
