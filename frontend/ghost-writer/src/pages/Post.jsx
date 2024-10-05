import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import "../styles/Post.css"
import { useState } from 'react';

export default function Post({ post, increaseStars }) {
    const [expand, setExpand] = useState(true);
    const expandPost = () => {
        setExpand(!expand)
    }
    return (
        <>
            <div className="post" id={post._id}>
                <div className="post-creation-time-container">
                    <div className="date-container">
                        <p className='post-creation-time'>{new Date(post.creationTime).toLocaleString('en-IN')}</p>
                    </div>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <span className="category">{post.category}</span>
                <p className='post-content' style={{ textAlign: (post.content.length > 80 ? 'justify' : 'center') }}>
                    {expand ?   // If the post needs to expanded?
                        post.content.substr(0, 250) : post.content}

                    {post.content.length > 250  // If the post length exceeds 250, then only we require the show/hide button
                        ? (<a className='expand-post' onClick={expandPost}>{expand ? "...more" : "...less"}</a>)
                        : null
                    }

                </p>
                <Button variant="outlined" endIcon={<StarIcon style={{ color: '#f7e702' }} />} onClick={increaseStars(post._id)} className='post-increase-star'>{post.stars}</Button>
            </div >
        </>
    )
}