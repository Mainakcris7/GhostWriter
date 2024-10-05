import Lottie from "lottie-react";
import NotFoundImage from "../images/NotFoundImage.json"
import "../styles/NotFound.css"

export default function NotFound() {
    return (
        <>
            <div className="not-found">
                <Lottie animationData={NotFoundImage} />
                <h2>Woops, No posts found!</h2>
            </div>
        </>
    )
}