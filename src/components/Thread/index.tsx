import React, { useState} from 'react'
import Comment from '../Comment'
import { CommentData, PostData } from '../../types'

type ThreadData = {
    id: string
    author: string
    content: string
    children: Comment[]
}

type ThreadProps = {
    comments: CommentData[]
    setPosts: React.Dispatch<React.SetStateAction<PostData[]>>
    posts: PostData[]
    postId: string
}

const Thread: React.FC<ThreadProps> = ({ comments, setPosts, posts, postId }) => {
    return (
        <div className='thread'>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} setPosts={setPosts} posts={posts} postId={postId} depth={0} />
            ))}
        </div>
    )
}

export default Thread