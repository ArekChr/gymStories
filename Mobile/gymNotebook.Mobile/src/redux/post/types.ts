export enum PostActionTypes {
  FETCH_POST_REQ = '@post/FETCH_POST_REQ',
  FETCH_POST_SUC = '@post/FETCH_POST_SUC',
  UPDATE_POST_REQ = '@post/UPDATE_REQ',
  UPDATE_POST_SUC = '@post/UPDATE_SUC',
  CREATE_POST_REQ = '@post/CREATE_REQ',
  CREATE_POST_SUC = '@post/CREATE_SUC',
  DELETE_POST_REQ = '@post/DELETE_REQ',
  DELETE_POST_SUC = '@post/DELETE_SUC',
  FETCH_COMMENT_REQ = '@post/FETCH_COMMENT_REQ',
  FETCH_COMMENT_SUC = '@post/FETCH_COMMENT_SUC',
  CREATE_COMMENT_REQ = '@post/CREATE_COMMENT_REQ',
  CREATE_COMMENT_SUC = '@post/CREATE_COMMENT_SUC',
  CLEAR_COMMENTS = '@post/CLEAR_COMMENTS',
  FETCH_MY_POST_REQ = '@post/FETCH_MY_POST_REQ',
  FETCH_MY_POST_SUC = '@post/FETCH_MY_POST_SUC',
  LIKE_REQ = "@post/LIKE_REQ",
  LIKE_SUC = "@post/LIKE_SUC",
  LIKE_ERR = "@post/LIKE_ERR",
  UNLIKE_REQ = "@post/UNLIKE_REQ",
  UNLIKE_SUC = "@post/UNLIKE_SUC",
  UNLIKE_ERR = "@post/UNLIKE_ERR"
}

export interface PostsState {
  loading: boolean
  loadingComments: boolean
  posts: Post[]
  myPosts: MyPost[]
  comments?: Comment[]
}

export interface CreatePostModel {
  description: string
  filePath: string
  profileId: string
  timeStamp: number
  likesCount: number
  likes: string[]
}

export interface CommentModel extends Comment {
  imageURL: string
  firstName: string
  lastName: string
  nickname: string | null
}

export interface Comment {
  id: string
  createdAt: number
  userId: string
  likesCount: number
  likes: string[]
  description: string
}

export interface MyPost {
  id: string
  description: string
  likesCount: number
  createdAt: number
  imageURL: string
  commentCount: number
  comments: Comment[]
  likes: string[]
}

export interface Post {
  id: string
  description: string
  likesCount: number
  createdAt: number
  imageURL: string
  commentCount: number
  likes: string[]
  profileId?: string
}