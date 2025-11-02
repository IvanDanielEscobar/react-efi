import React, { children, createContext, useEffect, useState } from 'react';

import  jwtDecode  from 'jwt-decode'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext() 

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ token, setToken] = useState(null)
    const navigate = useNavigate();


    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken)

                if(decoded.expires_delta * 1000 > Date.now()) {
                    setUser(decoded)
                    setToken(decoded)
                }else{
                    localStorage.removeItem("token")
                }
                    
            } catch (error) {
                console.error("token invalido", error)
                localStorage.removeItem("token")
            }
        }
    }, [])


    const register = async (user, email, password) => {
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
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

    const login = async (email, password)  => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: values.email, password: values.password })
                
            })
            if(!response.ok) toast.error("Credenciales incorrectas")

                const data = await response.json()
                const jwtToken = data.token

                if(!jwtToken) return toast.error("no se encontro el token")
                
                localStorage.setItem('token', jwtToken)
                const decoded = jwtDecode(jwtToken)
                setUser(decoded)
                setToken(jwtToken)

                toast.success('inicio de sesion exitoso')
                setTimeout(() => navigate('/'), 2000)


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
        <AuthContext.Provider value={{ user, token, login}}>
            {children}
        </AuthContext.Provider>
    )
}