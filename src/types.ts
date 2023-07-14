export type CommentData = {
    id: string
    author: string
    content: string
    children: CommentData[]
}

export type PostData = {
    id: string
    title: string
    content: string
    comments: CommentData[]
}