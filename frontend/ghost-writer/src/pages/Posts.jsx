import { useEffect, useState } from "react"
import Post from "../pages/Post"
import { Context } from "../utils/Provider"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react"
import NotFound from "../components/NotFound";
import "../styles/Posts.css"

export default function Posts() {

    const { successMsg, setSuccessMsg, notifySuccess, fetchData, posts, increaseStars } = useContext(Context)

    useEffect(() => {
        if (successMsg !== '') {
            notifySuccess(successMsg);
            setSuccessMsg('')
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            <div className="posts-container">
                <div className="posts">
                    {
                        posts !== "" ?
                            (posts.map(post => {
                                return <Post post={post} key={post._id} increaseStars={increaseStars} />
                            })) : <NotFound />
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}