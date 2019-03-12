import axios from 'axios';
import { PostActionTypes, Comment, CreatePostComment, CreatePostModel, Post, MyPost } from './types'
import { API_URL } from '../../utils/misc'
import { Dispatch } from 'redux';
import firebase from 'react-native-firebase';
import { QuerySnapshot } from 'react-native-firebase/firestore';

const URL = `${API_URL}/Post`;

function mapSnapshotToPosts(snapshot: QuerySnapshot) {
  let docs = snapshot.docs
  if(docs.length > 0) {
    let posts: Post[] = []
    snapshot.docs.forEach(x => posts.push({
      id: x.id, 
      ...x.data()
    } as Post))
    
    return posts
  }
  return null
}

export const fetchPosts = (profileId: string, quantity: number, cb?: (posts: Post[]) => void) => {
  return async(dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_POST_REQ })

    var posts = await firebase.firestore().collection('profiles').doc(profileId).collection('posts').limit(quantity).get().then(response => {
      return mapSnapshotToPosts(response)
    })
    if(posts) {
      posts = posts.map((x: Post) => { return { ...x, profileId }})
      if(cb) {
        cb(posts)
      }
    }

    dispatch({ 
      type: PostActionTypes.FETCH_POST_SUC,
      payload: posts
    })
  }
}

export const fetchMyPosts = (profileId: string, quantity: number, cb?: CallableFunction) => {
  return async(dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_MY_POST_REQ })

    var posts = await firebase.firestore().collection('profiles').doc(profileId).collection('posts').limit(quantity).get().then(response => {
      if(cb) {
        cb()
      }
      return mapSnapshotToPosts(response)
    })

    firebase.firestore.FieldValue.arrayUnion
    if(posts) {
      posts = posts.map((x: Post) => { return { ...x, profileId }})
    }

    dispatch({ 
      type: PostActionTypes.FETCH_MY_POST_SUC,
      payload: posts
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
    firebase.firestore().collection('profiles').doc(post.profileId).collection('posts').add({
      description: post.description,
      createdAt: post.timeStamp,
      likesCount: post.likesCount,
      likes: post.likes,
      commentCount: 0
    }).then(response => {
      const postId = response.id!

      firebase.storage().ref(`images/posts/${post.profileId}/${postId}`).putFile(post.filePath).then(fireResponse => {
        firebase.firestore().collection('profiles').doc(post.profileId).collection('posts').doc(postId).update({
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