import React from 'react'
import { IAuthProviderValue, IUserData } from '@typings/providers.d'
import { User as IFirebaseUser } from "firebase/auth"
import { auth } from "@configs/firebase.config"
import { appDispatch, persistor, selector } from '@rtk/store';
import { useNavigation, useRouter, useSegments } from 'expo-router';
import { landingAuthentication } from '@api/users.api';
import { initializeAxios } from '@api/index';
import { setCurrentUser } from '@rtk/slices/currentUser.slice';
import { selectCurrentRole, selectUserState } from '@rtk/selectors/currentUser.selector';
import { fetchStores } from '@rtk/slices/stores.slice';
import { selectCurrentStore } from '@rtk/selectors/stores.selector';

export const AuthContext = React.createContext<IAuthProviderValue>({ authUser: null, loading: true })

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const dispatch = appDispatch()

    const [loading, setLoading] = React.useState(true)
    const [authUser, setauthUser] = React.useState<IUserData | null>(null)

    const router = useRouter()
    const navigation = useNavigation()
    const { userData } = selector(selectUserState)
    const selectedStore = selector(selectCurrentStore)

    // This hook will protect the route access based on user authentication.
    function useProtectedRoute(user: IUserData | null) {
        const segments = useSegments();

        // can only be exe after user logged in
        const checkUserRegistered = async () => {

            await landingAuthentication()
                .then(dbUser => {
                    if (dbUser.message === "new-user" && !dbUser.currentUser) router.push("(authentication)/registration")
                    if (dbUser.currentUser) {
                        const currentRole = userData?.currentRole
                            ?? userData?.storeMember?.filter(sm => sm.storeId === selectedStore?.id)[0].roles![0]
                        router.replace("(authorized)/app/dashboard")
                        dispatch(setCurrentUser({ ...dbUser.currentUser, currentRole }))
                        dispatch(fetchStores())
                    }
                    setLoading(false)
                })
                .catch(e => console.log("check user", e.message))
        }

        const verifyUserAccess = async () => {
            const { } = await user!.getIdTokenResult(false)

        }

        React.useEffect(() => {
            const isAuthorized = segments[0] === "(authorized)"
            const inAuthGroup = segments[0] === "(authentication)";

            if (
                // If the user is not signed in and the initial segment is not anything in the auth group.
                !user &&
                !inAuthGroup
            ) {
                // Redirect to the sign-in page.
                router.replace("landing");
            } else if (user) {
                // Redirect away from the sign-in page.
                // router.replace("(authorized)/home");
                const currentRole = userData?.currentRole
                    ?? userData?.storeMember?.filter(sm => sm.storeId === selectedStore?.id)[0].roles![0]

                initializeAxios(user.accessToken!, currentRole?.id, selectedStore?.id)

                // if (isAuthorized) verifyUserAccess()

                if (!isAuthorized) checkUserRegistered()
            }

            // setLoading(false)
        }, [user, segments]);
    }

    const onAuthStateChanged = async (user: IFirebaseUser | null) => {

        try {
            if (user) {
                const accessToken = await user!.getIdToken(true)
                if (accessToken) setauthUser({ ...user!, accessToken })
            } else {
                setLoading(false)
                setauthUser(null)
            }
        } catch (e) {
            console.error("Unexpected error in fetching user's token", e)
        }
        // if (loading) setLoading(false)
    }

    React.useEffect(() => {
        const subscriber = auth.onAuthStateChanged((user) => onAuthStateChanged(user))

        return subscriber
    }, [])


    useProtectedRoute(authUser)

    const logout = async () => {
        await persistor.purge()
        await auth.signOut()
        router.replace("landing")
    }

    const authenticate = async (code: string) => {
        setLoading(true)
        const confirmationResult = window.confirmationResult
        await confirmationResult.confirm(code)
            .then(async creds => {
                if (creds instanceof Object) {
                    const accessToken = await creds.user.getIdToken(true)
                    if (accessToken) setauthUser({ ...creds.user, accessToken })
                }
            })
            .catch(error => console.error("Error while Verifying. Error: ", error))
    }

    return (
        <AuthContext.Provider value={{ authUser, logout, loading, authenticate }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)