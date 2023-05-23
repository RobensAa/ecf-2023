import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import {LayoutWeb} from "../layouts";
import {Home, Detail, SignUp, SignIn, Channel} from "@/views/pages";
import AuthContext, {AuthProvider} from "@/context/AuthContext";
import {useContext} from "react";

const AppRoutes = () => {

    return (
        <Router>
            <AuthProvider>
                <LayoutWeb>
                    <Routes>
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Home/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/edit"
                            element={
                                <ProtectedRoute>
                                    <Channel/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/watch/:id"
                            element={
                                <ProtectedRoute>
                                    <Detail/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/signup"
                            element={<SignUp/>}
                        />
                        <Route
                            path="/signin"
                            element={<SignIn/>}
                        />
                        <Route path="/404" element={<NoMatch />} />
                        <Route path="*" element={<Navigate to="/404" />} />
                    </Routes>
                </LayoutWeb>
            </AuthProvider>
        </Router>
    )
}


const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext)

    console.log('ProtectedRoute work!', token)

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

const NoMatch = ()  => {
    return (
        <div>
            <p>404 Page not found</p>
        </div>
    )
}

export default AppRoutes;