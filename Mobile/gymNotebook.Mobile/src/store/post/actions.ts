import axios from 'axios';
import { PostActionTypes, Comment, CreatePostComment, CreatePostModel, Post, MyPost } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux';
import firebase from 'react-native-firebase';

const URL = `${API_URL}/Post`;

export const fetchPosts = (profileId: string, quantity: number, cb?: CallableFunction) => {
  return (dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_POST_REQ })
    console.log('profileid ' + profileId)
    firebase.database().ref(`posts/${profileId}`).limitToLast(quantity).once('value').then((snapshot) => {
      let snapshotVal = snapshot.val()
      console.log(snapshotVal)
      if(snapshotVal == null){
        dispatch({ 
          type: PostActionTypes.FETCH_POST_SUC,
          paylod: []
        })
      } else {
        let posts = Object.keys(snapshotVal).map((x) => Object.assign(snapshotVal[x], {id: x, profileId: profileId}))
        console.log(posts)
        dispatch({ 
          type: PostActionTypes.FETCH_POST_SUC,
          payload: posts
        })
      }
    })
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

export const createPost = (post: CreatePostModel, cb?: () => void) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: PostActionTypes.CREATE_POST_REQ
    })
    firebase.database().ref(`posts/${post.profilePath}`).push({
      description: post.description,
      createdAt: post.timeStamp,
      likesCount: post.likesCount,
      likes: post.likes,
      commentCount: 0
    }).then(postResponse => {
      let path = postResponse.path as string
      path = path.substring(path.indexOf('/') + 1)
      const postId = path.substring(path.lastIndexOf('/') + 1)
      firebase.storage().ref(`images/posts/${path}`).putFile(post.filePath).then(fireResponse => {
        firebase.database().ref(`posts/${path}/`).update({
          imageURL: fireResponse.downloadURL
        }).then(() => {
          let postPayload: Post = {
            imageURL: fireResponse.downloadURL ? fireResponse.downloadURL : '',
            description: post.description,
            likesCount: 0,
            commentCount: 0,
            id: postId,
            createdAt: post.timeStamp,
            likes: []
          }
          dispatch({
            type: PostActionTypes.CREATE_POST_SUC,
            payload: postPayload
          })
          if(cb){
            cb()
          }
        })
      })
    })
  }
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