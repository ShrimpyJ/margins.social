import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostData, CommentData } from '../../types'
import Thread from '../../components/Thread'

type PostPageProps = {
  posts: PostData[]
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>
}

type RouteParams = {
  postId: string
}

const PostPage: React.FC<PostPageProps> = ({ posts, setPosts }) => {
  const { postId } = useParams<RouteParams>()
  const post = posts.find(post => post.id === postId)

  const [newComment, setNewComment] = useState('')

  const handleCommentChange = (event: any) => {
    setNewComment(event.target.value)
  }

  const handleCommentSubmit = (event: any) => {
    event.preventDefault()

    if (!post) return

    const newCommentId = Math.random().toString(36).substr(2,9)

    const newPosts = posts.map(p => {
        if (p.id === post.id) {
            return {
                ...p,
                comments: [
                    ...p.comments,
                    {
                        id: newCommentId,
                        author: '',
                        content: newComment,
                        children: [],
                    }
                ]
            }
        } else {
            return p
        }
    })

    setPosts(newPosts)
    setNewComment('')
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className='post-page'>
        <h2 className='title'>{post.title}</h2>
        <p className='content'>{post.content}</p>
        <div className='add-comment'>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder='Add a new comment'
                />
                <button type='submit'>Submit comment</button>
            </form>
        </div>
      <Thread comments={post.comments} setPosts={setPosts} posts={posts} postId={post.id} />
    </div>
  )
}

export default PostPage