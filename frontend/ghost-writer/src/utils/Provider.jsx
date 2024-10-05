import { useState, createContext } from "react";
import { toast, Bounce } from 'react-toastify';
import axios from "axios";

export const Context = createContext();

const notifyError = (errMessage) => {
    toast.error(errMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
}
const notifySuccess = (successMessage) => {
    toast.success(`${successMessage}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

export function Provider({ children }) {
    const [successMsg, setSuccessMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            let response = await axios.get("https://ghostwriter-backend.onrender.com/posts");
            let data = response.data;
            // Sort by date creation time
            data = data.sort((a, b) => (new Date(b.creationTime) - new Date(a.creationTime)))
            setPosts(data)
        } catch (err) {
            console.log(err)
        }
    }

    const increaseStars = (postId) => {
        return (async () => {
            try {
                console.log(postId)
                let response = await axios.put(`https://ghostwriter-backend.onrender.com/posts/like/${postId}`);
                const data = response.data
                const newPosts = posts.map(post => {
                    if (post._id == data._id)
                        return data
                    else
                        return post
                })
                setPosts(newPosts)
            } catch (err) {
                console.log(err)
            }
        })
    }

    // Search any posts by keyword
    const searchPosts = (keyword) => {
        return async () => {
            try {
                setLoading(true)
                if (keyword.trim().length === 0) {   // If nothing is typed, return all posts
                    fetchData()
                }
                let response = await axios.get(`https://ghostwriter-backend.onrender.com/posts/search/${keyword}`);
                console.log(response.data)
                const data = response.data
                setPosts(() => data)

            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
    }

    return (
        <>
            <Context.Provider value={{ notifyError, notifySuccess, successMsg, setSuccessMsg, fetchData, posts, increaseStars, searchPosts, loading }}>
                {children}
            </Context.Provider>
        </>

    )
}