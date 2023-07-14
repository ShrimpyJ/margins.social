import React, { useState } from 'react'
import { CommentData, PostData } from '../../types'

type CommentProps = {
    comment: CommentData,
    setPosts: React.Dispatch<React.SetStateAction<PostData[]>>,
    posts: PostData[],
    postId: string,
    depth: number,
}

const Comment: React.FC<CommentProps> = ({ comment, setPosts, posts, postId, depth }) => {
    const maxDepth = 5

    const [isOpen, setIsOpen] = useState(true)
    const [isReplyOpen, setIsReplyOpen] = useState(false)
    const [newReply, setNewReply] = useState('')
    const [modalComment, setModalComment] = useState<null | CommentData>(null)

    const openModal = (comment: CommentData) => {
        document.body.style.overflow = 'hidden'
        setModalComment(comment)
    }

    const closeModal = () => {
        document.body.style.overflow = 'auto'
        setModalComment(null)
    }

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const toggleReplyOpen = () => {
        setIsReplyOpen(!isReplyOpen)
    }

    const handleReplyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewReply(event.target.value)
    }

    const handleReplySubmit = () => {
        const newReplyId = Math.random().toString(36).substr(2, 9);

        const newPosts = posts.map(p => {
            if (p.id === postId) {
                const newComments = [...p.comments];
                const addReply = (comments: CommentData[]): CommentData[] => {
                    return comments.map(c => {
                        if (c.id === comment.id) {
                            return {
                                ...c,
                                children: [
                                    ...c.children,
                                    {
                                        id: newReplyId,
                                        author: '',
                                        content: newReply,
                                        children: []
                                    }
                                ]
                            }
                        }
                        return {
                            ...c,
                            children: addReply(c.children)
                        }
                    })
                }
                return {
                    ...p,
                    comments: addReply(newComments)
                };
            }
            return p;
        });

        setPosts(newPosts)
        setNewReply('')
        setIsReplyOpen(false)
    }

    return (
        <div className='comment'>
            <div className="comment-content">
                <button onClick={toggleOpen}>{isOpen ? '-' : '+'}</button>
                {isOpen && 
                    <p>
                        <span className='author'>{comment.author}</span> says: <br></br>{comment.content}
                    </p>
                }

                <button onClick={toggleReplyOpen}>{isReplyOpen ? 'Cancel reply' : 'Reply'}</button>
                {isReplyOpen && (
                    <div className='comment-reply'>
                        <textarea value={newReply} onChange={handleReplyChange} />
                        <button onClick={handleReplySubmit}>Submit Reply</button>
                    </div>
                )}
            </div>

            {isOpen && comment.children.map(child => (
                depth + 1 < maxDepth ?
                <div className='child-comment' key={child.id}>
                    <Comment comment={child} setPosts={setPosts} posts={posts} postId={postId} depth={depth + 1} />
                </div>
                : depth + 1 === maxDepth && <button onClick={() => openModal(child)}>Expand thread</button>
            ))}

            {modalComment && (
                <div className='modal'>
                    <div className='modal-content'>
                        <button onClick={closeModal}>Close</button>
                        <div className="scrollable-content">
                            <Comment comment={modalComment} setPosts={setPosts} posts={posts} postId={postId} depth={0} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Comment