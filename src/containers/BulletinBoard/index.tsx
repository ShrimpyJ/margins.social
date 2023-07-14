import React, { useState } from 'react'
import { PostData } from '../../types'
import Post from '../../components/Post'

type BulletinBoardProps = {
    posts: PostData[]
    setPosts: React.Dispatch<React.SetStateAction<PostData[]>>
}

const BulletinBoard: React.FC<BulletinBoardProps> = ({ posts, setPosts }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newContent, setNewContent] = useState('')
    const [openPost, setOpenPost] = useState(false)

    const toggleOpenPost = (event: any) => {
        setOpenPost(!openPost)
    }

    const handleTitleChange = (event: any) => {
        setNewTitle(event.target.value)
    }

    const handleContentChange = (event: any) => {
        setNewContent(event.target.value)
    }

    const handlePostSubmit = (event: any) => {
        event.preventDefault()

        const newPostId = Math.random().toString(36).substr(2,9)

        setPosts((prevPosts: PostData[]) => [
            ...prevPosts,
            {
                id: newPostId,
                title: newTitle,
                content: newContent,
                comments: [],
            },
        ])

        setNewTitle('')
        setNewContent('')
    }

    return (
        <div className='bulletin-board'>
            <h1>margins.social</h1>
            <button onClick={toggleOpenPost}>{openPost ? 'Cancel post' : 'New post'}</button>
            { openPost && 
                <form onSubmit={handlePostSubmit}>
                    <input
                        value={newTitle}
                        onChange={handleTitleChange}
                        required
                        placeholder='Title'
                    />
                    <textarea
                        value={newContent}
                        onChange={handleContentChange}
                        required
                        placeholder='Content'
                    />
                    <button type='submit'>Post</button>
                </form>
            }

            {posts && posts.map(post => <Post key={post.id} post={post} />)}
        </div>
    )
}

export default BulletinBoard