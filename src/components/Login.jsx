import { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { AuthContext } from '../context/AuthContext'
import "../styles/RegisterForm.css"


const validationSchema = Yup.object({
    email: Yup.string().email("Email invalido").required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})


export default function Login() {
    const { login } = useContext(AuthContext)
    
    const handleSubmit = async (values, { setSubmitting }) => {
        const success = await login(values.email, values.password);
        setSubmitting(false);
        if (success) {
          navigate('/');
        }
  };
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
