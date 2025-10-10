import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import "../styles/RegisterForm.css"


const validationSchema = Yup.object({
    email: Yup.string().email("Email invalido").required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})


export default function Login() {

    const navigate = useNavigate()

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: values.email, password: values.password })
                
            })
            console.log(JSON.stringify({ email: values.email, password: values.password }));

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem("token", data.access_token)
                toast.success("Login exitoso")
                resetForm()
                setTimeout(() => navigate('/'), 2000)
            } else {
                const errorData = await response.json()
                toast.error(errorData || "Hubo un error en el email o la contraseña")
            }
        } catch (error) {
            toast.error("hubo un error con el servidor", error)
        }
    }

    return (
        <div className='register-container'>
            <h2>Iniciar Sersion</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='register-form'>
                        <div className='form-field'>
                            <label>Email</label>
                            <Field as={InputText} id='email' name='email' />
                            <ErrorMessage name='email' component='small' className='error' />
                        </div>
                        <div className='form-field'>
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' type='password' />
                            <ErrorMessage name='password' component='small' className='error' />
                        </div>
                        <Button type='submit' label={isSubmitting ? "Ingresando..." : 'Inciar sesion'} />
                    </Form>
                )}
            </Formik>
        </div>
    )

}
