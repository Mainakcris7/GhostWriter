import TextField from '@mui/material/TextField';
import Lottie from "lottie-react";
import LoadingButton from '@mui/lab/LoadingButton';
import PostAnimation from "../images/PostAnimation.json"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../utils/Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/CreatePost.css"
import { useState } from 'react';
import axios from "axios"

export default function CreatePost() {
    const [fields, setFields] = useState({
        'title': '',
        'content': '',
        'category': '',
        'identifier': '',
    })
    // To track errors of the fields
    const [fieldError, setFieldError] = useState({
        'title': false,
        'content': false,
        'category': false,
    })
    // Loading button or not
    const [loading, setLoading] = useState(false)

    const { setSuccessMsg, notifyError } = useContext(Context)

    const navigateTo = useNavigate()


    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        // To check if the required fields are having values
        if ((field === "title" || field === 'category' || field === 'content') && value.length === 0) {
            setFieldError((errors) => {
                return { ...errors, [field]: true }
            })
        } else {
            setFieldError((errors) => {
                return { ...errors, [field]: false }
            })
        }

        setFields({ ...fields, [field]: value })

    }
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Check errors
        let hasErrors = false;

        // Check errors during submission, useful when the user does not type anything and click on submit button directly
        if (fields.title.trim().length === 0) {
            hasErrors = true;
            setFieldError((errors) => {
                return { ...errors, title: true }
            })
        }
        if (fields.category.trim().length === 0) {
            hasErrors = true;
            setFieldError((errors) => {
                return { ...errors, category: true }
            })
        }
        if (fields.content.trim().length === 0) {
            hasErrors = true;
            setFieldError((errors) => {
                return { ...errors, content: true }
            })
        }

        // Post data to the server
        if (!hasErrors) {
            try {
                setLoading(true)
                const response = await axios.post("https://ghostwriter-backend.onrender.com/posts",
                    JSON.stringify(fields),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                // navigate to home page
                setSuccessMsg('Post created successfully!')
                navigateTo("/")
            } catch (err) {
                notifyError(err.response.data)
            } finally {
                setLoading(false)
            }
        }
    }
    return (
        <>
            <div className="form-container">
                <div className="img-container">
                    <Lottie animationData={PostAnimation} />
                </div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        name='title'
                        error={fieldError.title}
                        variant="outlined"
                        onChange={handleChange}
                        value={fields.title}
                        helperText={fieldError.title ? 'Title is required' : ''}
                    />
                    <TextField
                        label="Category"
                        name='category'
                        error={fieldError.category}
                        variant="outlined"
                        onChange={handleChange}
                        value={fields.category}
                        helperText={fieldError.category ? 'Category is required' : ''}
                    />
                    <TextField
                        label="Content"
                        name='content'
                        error={fieldError.content}
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={handleChange}
                        value={fields.content}
                        helperText={fieldError.content ? 'Content is required' : ''}
                    />
                    <TextField
                        label="Identifier"
                        name='identifier'
                        variant="outlined"
                        helperText="Optional, helps you to search your content."
                        onChange={handleChange}
                        value={fields.identifier}
                    />
                    <div className="btn-container">
                        <LoadingButton
                            variant="contained"
                            endIcon={<SendRoundedIcon />}
                            loading={loading}
                            type='submit'>
                            Submit
                        </LoadingButton>
                    </div>

                </form>
            </div>
            <ToastContainer />
        </>
    )
}