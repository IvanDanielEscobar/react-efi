import React from "react";
import { useAuth } from "../context/AuthContext";
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { toast } from "react-toastify"
import "../styles/CreatePost.css"


export default function CreatePost({ onPostCreated }) {
    const { user, token, createPost } = useAuth()
   
    const initialValues = {
        title: "",
        content: "",
    }

    const validationSchema = Yup.object({
        title: Yup.string().min(3, "El titulo debe tener al menos 3 caracteres").required("El titulo es obligatorio"),
        content: Yup.string().min(10, "el contenido debe tener al menos 10 caracteres").required('el contenido es obligatorio'),
    })

    const handleSubmit = async (values, { resetForm }) => {
    try {
        const postData = {
          title: values.title,
          content: values.content,
          author_id: user.id, 
        };
        
        const newPost = await createPost(token, postData);
        toast.success("Post creado con éxito");
        resetForm();
        if (onPostCreated) onPostCreated(newPost);
        } catch (error) {
          toast.error(error.message);
        }
    };
  return (
    <div className="create-post-container">
      <h2>Crear nuevo post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="create-post-form">
          <div>
            <Field
              name="title"
              type="text"
              placeholder="Título del post"
              className="input-field"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="error-message"
            />
          </div>

          <div>
            <Field
              as="textarea"
              name="content"
              placeholder="Contenido del post"
              rows="5"
              className="textarea-field"
            />
            <ErrorMessage
              name="content"
              component="div"
              className="error-message"
            />
          </div>

          <button type="submit" className="submit-btn">
            Publicar
          </button>
        </Form>
      </Formik>
    </div>
  )
}
