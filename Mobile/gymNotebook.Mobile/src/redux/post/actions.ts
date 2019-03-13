import { PostActionTypes, CreatePostModel, Post, Comment, CommentModel } from './types'
import { Dispatch } from 'redux';
import firebase, { RNFirebase } from 'react-native-firebase';
import { QuerySnapshot, DocumentSnapshot } from 'react-native-firebase/firestore';
import { mapSnapshotToProfile } from '../profile/actions';
import { Profile } from '../profile/types';

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

export function mapSnapshotToPost(document: DocumentSnapshot) {
  if(document) {
    return {
      id: document.id, 
      ...document.data()
    } as Post
  }
  return null
}

function mapSnapshotToComments(snapshot: QuerySnapshot) {
  let docs = snapshot.docs
  if(docs.length > 0) {
    let comments: Comment[] = []
    snapshot.docs.forEach(x => comments.push({
      id: x.id, 
      ...x.data()
    } as Comment))
    
    return comments
  }
  return null
}

export const fetchPosts = (profileId: string, quantity: number, cb?: (posts: Post[]) => void) => {
  return async(dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_POST_REQ })

    var posts = await firebase.firestore().collection('profiles').doc(profileId).collection('posts').limit(quantity).orderBy('createdAt', "DESC").get().then(response => {
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

export const fetchMyPosts = (profileId: string, quantity: number, cb?: (posts: Post[]) => void ) => {
  return async(dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_MY_POST_REQ })

    var posts = await firebase.firestore().collection('profiles').doc(profileId).collection('posts').limit(quantity).orderBy('createdAt', "DESC").get().then(response => {
      return mapSnapshotToPosts(response)
    })

    if(posts) {
      posts = posts.map((x: Post) => { return { ...x, profileId }})
      if(cb) {
        cb(posts)
      }
    }
    dispatch({ 
      type: PostActionTypes.FETCH_MY_POST_SUC,
      payload: posts
    })
  }
}

export const createComment = (myId: string, userId: string, postId: string, description: string) => {
  const postRef = firebase.firestore().collection('profiles').doc(userId).collection('posts').doc(postId)
  
  postRef.get().then(snapshot => {
    const post = mapSnapshotToPost(snapshot)
    if(post) {
      postRef.update({
        commentCount: post.commentCount + 1
      })
    }
  })
  return postRef.collection('comments').add({
    createdAt: new Date().getTime(),
    userId: myId,
    likesCount: 0,
    likes: [],
    description: description
  })
}


export const fetchCommentsWithProfilesPromise = (userId: string, postId: string) => {

  const profilesRef = firebase.firestore().collection('profiles')

  return profilesRef.doc(userId).collection('posts').doc(postId).collection('comments').orderBy('createdAt', 'ASC').get().then(snapshot => {
    let comments = mapSnapshotToComments(snapshot) as Comment[]

    if(comments) {
      const commentids = comments.map(x => x.userId)
      const uniqiestcommentsids = commentids.filter((v,i) => commentids.indexOf(v) === i)
      let promises: Promise<RNFirebase.firestore.DocumentSnapshot>[] = []
      uniqiestcommentsids.forEach(userId => promises.push(profilesRef.doc(userId).get()))
      let profiles: Profile[] = []

      return Promise.all(promises).then(documents => {
        documents.forEach(document => {
          profiles.push(mapSnapshotToProfile(document) as Profile)
        })

        const profilesComments: CommentModel[] = comments.map(comment => {
          let profile = profiles.find(x => x.id === comment.userId) as Profile
          const profileComment: CommentModel = {
            createdAt: comment.createdAt,
            description: comment.description,
            firstName: profile.firstName,
            lastName: profile.lastName,
            imageURL: profile.imageURL,
            likesCount: comment.likesCount,
            likes: comment.likes,
            id: comment.id,
            nickname: profile.nickname,
            userId: profile.id,
          }
          return profileComment
        })
        return profilesComments
      })
    }
    return []
  })
}

export const fetchComments = (userId: string, postId: string) => {
  return async (dispatch: Dispatch) => {

    dispatch({ type: PostActionTypes.FETCH_COMMENT_REQ })
    const comments = await firebase.firestore().collection('profiles').doc(userId).collection('posts').doc(postId).collection('comments').get().then(snapshot => {
      return mapSnapshotToComments(snapshot)
    })


    dispatch({ type: PostActionTypes.FETCH_COMMENT_SUC })
      
  }
}

export const likePost = (myId: string, profileId: string, postId: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: PostActionTypes.LIKE_REQ})
    const postRef = firebase.firestore().collection('profiles').doc(profileId).collection('posts').doc(postId)

    firebase.firestore().runTransaction(async transaction => {
      const post = await transaction.get(postRef)
      let postObject = post.data() as Post
      transaction.update(postRef, {
        likesCount: postObject.likes.length + 1,
        likes: [...postObject.likes, myId]
      })
    })
    .then(() => {
      dispatch({ type: PostActionTypes.LIKE_SUC })
    })
    .catch(() => {
      dispatch({ type: PostActionTypes.LIKE_ERR })
    })
  }
}

export const unlikePost = (myId: string, profileId: string, postId: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: PostActionTypes.UNLIKE_REQ})
    const postRef = firebase.firestore().collection('profiles').doc(profileId).collection('posts').doc(postId)

    firebase.firestore().runTransaction(async transaction => {
      const post = await transaction.get(postRef)
      let postObject = post.data() as Post
      transaction.update(postRef, {
        likesCount: postObject.likes.length - 1,
        likes: [...postObject.likes.filter(x => x !== myId), ]
      })
    })
    .then(() => {
      dispatch({ type: PostActionTypes.UNLIKE_SUC })
    })
    .catch(() => {
      dispatch({ type: PostActionTypes.UNLIKE_ERR })
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
