import { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import "../styles/RegisterForm.css"
import { AuthContext } from '../context/AuthContext'

const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email("Email invalido").required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})


export default function RegisterForm() {

    
    const { registerUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (values, { setSubmitting }) => {
        await register(values.name, values.email, values.password, 'usuario');
        setSubmitting(false);
    };


    return (
        <div className='register-container'>
            <h2>Crear cuenta</h2>
            <Formik
                initialValues={{ name: '', email: '', password: '', role: 'usuario' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='register-form'>
                        <div className='form-field'>
                            <label>Nombre</label>
                            <Field as={InputText} id='name' name='name' />
                            <ErrorMessage name='name' component='small' className='error' />
                        </div>
                        <div className='form-field'>
                            <label>Email</label>
                            <Field as={InputText} id='email' name='email' />
                            <ErrorMessage name='email' component='small' className='error' />
                        </div>
                        <div className='form-field'>
                            <label>Contraseña</label>
                            <Field as={InputText} id='password' name='password' />
                            <ErrorMessage name='password' component='small' className='error' />
                        </div>
                        <Button type='submit' label={isSubmitting ? "Registrando..." : 'Registrarse'} />
                    </Form>
                )}
            </Formik>
        </div>
    )

}