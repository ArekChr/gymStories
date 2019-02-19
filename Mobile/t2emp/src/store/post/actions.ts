import axios from 'axios';
import { PostActionTypes, Comment } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux';

const URL = `${API_URL}/Post`;

export const fetchPosts = (quantity: number, startDate?: string, cb?: CallableFunction) => {
  return (dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_POST_REQ })

    axios.get(URL, { params: { startDate: startDate, quantity: quantity }})
      .then(response => {
        dispatch({
          type: PostActionTypes.FETCH_POST_SUC,
          payload: response.data
        })
        if(cb instanceof Function){
          cb()
        }
      }
    )
  }
}

export const fetchComments = (postId: string) => {
  return (dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_COMMENT_REQ })

    axios.get(`${URL}/Comments`, { params: { postId: postId }})
      .then(response => {
        dispatch({
          type: PostActionTypes.FETCH_COMMENT_SUC,
          payload: response.data
        })
      })
  }
}

interface CreatePostComment {
  postId: string
  content: string
}

export const clearComments = () => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: PostActionTypes.CLEAR_COMMENTS
    })
  }
}

export const createComment = (postId: string, comment: Comment) => {
  return (dispatch: Dispatch) => {

    dispatch({
      type: PostActionTypes.CREATE_COMMENT_REQ,
      payload: comment
    })

    var data: CreatePostComment = {
      postId: postId,
      content: comment.content
    }

    axios.post(`${URL}/Comment`, {...data})
      .then((response) => { dispatch({ type: PostActionTypes.CREATE_COMMENT_SUC, payload: response.data })})
  }
}