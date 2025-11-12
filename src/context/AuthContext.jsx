import React, { children, createContext, useEffect, useState, useContext } from 'react';

import  { jwtDecode }  from 'jwt-decode'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export const AuthContext = createContext() 

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ token, setToken] = useState(null)
    const navigate = useNavigate();

    // token en localstorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken)
                const userData = decoded.user || decoded
                    setUser(userData)
                    setToken(storedToken)

            } catch (error) {
                console.error("token invalido", error)
                localStorage.removeItem("token")
            }
        }
    }, [])

    // registrar un usuario
    const register = async (name, email, password, role = "user") => {
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, role })
                })

                if (response.ok) {
                    toast.success("Usuario registrado con exito")
                    resetForm()
                    setTimeout(() => navigate('/loguearse'), 2000)
                } else {
                    toast.error("Hubo un erro al registrar el usuario")
                }
            } catch (error) {
                toast.error("hubo un error con el servidor", error)
            }
        }

    // iniciar sesion
    const login = async (email, password)  => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password })
                
            })
            const data = await response.json()
            if(!response.ok || !data.access_token) {
                toast.error("Credenciales incorrectas")
                return false
            }
            
            const jwtToken = data.access_token
            localStorage.setItem("token", jwtToken)

            const decoded = jwtDecode(jwtToken)
            const userData = decoded.user || decoded
            setUser(userData)
            setToken(jwtToken)

            toast.success('inicio de sesion exitoso')
            setTimeout(() => navigate('/posts'), 1000)
            return true

            } catch (error) {
            toast.error("hubo un error al iniciar sesion ", error)
            return false
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate('/loguearse');
        toast.info("Sesión cerrada");
    };

    
    return(
        <AuthContext.Provider value={{ user, token, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}