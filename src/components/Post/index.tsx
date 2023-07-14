import React from 'react'
import { CommentData, PostData } from '../../types'
import { Link } from 'react-router-dom'
import Thread from '../Thread'

type PostProps = {
    post: PostData
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className='post'>
            <Link to={`/post/${post.id}`} className='title'>
                {post.title}
            </Link>
        </div>
    )
}

export default Post