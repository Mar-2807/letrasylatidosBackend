import { createContext, useState, useContext, useEffect } from 'react';
import { 
    registerRequest, 
    loginRequest, 
    verifyTokenRequest,
    registerTeachersRequest,
    loginTeachersRequest,
    editUserRequest,
} from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            setIsTeacher(false);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const signupT = async (user) => {
        try {
            const res = await registerTeachersRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            setIsTeacher(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setIsAuthenticated(true);
            setIsTeacher(false);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const signinT = async (user) => {
        try {
            const res = await loginTeachersRequest(user);
            setIsAuthenticated(true);
            setIsTeacher(true);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setIsTeacher(false);
        setUser(null);
    }

    const editUser = async (user) => {
        try {
            const res = await editUserRequest(user);
            window.alert(res.data.message);
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setIsTeacher(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setIsTeacher(false);
                    setLoading(false);
                    return;
                }

                if(!res.data.grade){
                    setIsTeacher(true);
                } else {
                    setIsTeacher(false);
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setIsTeacher(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{
            signup,
            signupT,
            signin,
            signinT,
            logout,
            loading,
            setUser,
            user,
            isAuthenticated,
            isTeacher,
            editUser,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}