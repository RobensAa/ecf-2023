import {createContext, useState} from "react"
import {UserSignIn} from "../utils/packages/apis/auth.api";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "../hooks";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [storage , setStorage] = useLocalStorage("skyStream", null);
    const [token, setToken] = useState(storage != null ? storage.token : "")
    const [user, setUser] = useState(storage != null ?? {
        username: storage.username,
        email: storage.email
    })

    const auth = {
        user,
        token,
        signin: async (data: any) => {
            const signin = await UserSignIn(data)
            setUser({
                username: signin.username,
                email: signin.email
            })
            setToken(signin.token)
            setStorage(signin)
            navigate('/home');
        },
        signup: () => {

        },
        signout: () => {
            setToken(null)
            setUser(null)
            setStorage(null)
            localStorage.removeItem('skyStream')
            navigate("/dashboard");
        }
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext