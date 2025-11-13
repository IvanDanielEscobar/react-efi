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
                const now = Date.now() / 1000
                if (decoded.exp && decoded.exp < now ){
                    logout()
                } else {
                    const userData = decoded.user || decoded
                        setUser(userData)
                        setToken(storedToken)
                }
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
                    body: JSON.stringify({ name, email, password, role})
                })
                if (response.ok) {
                    toast.success("Usuario registrado con exito")
                    setTimeout(() => navigate('/loguearse'), 2000)
                } else {
                    toast.error("Hubo un erro al registrar el usuario", data.Error)
                }
            } catch (error) {
                toast.error("hubo un error con el servidor", data.Error)
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

    // cerrar sesion
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate('/loguearse');
        toast.info("Sesión cerrada");
    };

    // crear un post
    const createPost = async (token, postData) => {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el post");
      }

      return response.json();
    };

    
    return(
        <AuthContext.Provider 
            value={{ 
                user,
                token,
                login,
                register,
                logout,
                createPost
                }}
        >
            {children}
        </AuthContext.Provider>
    )
}