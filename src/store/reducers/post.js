import {ADD_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED} from "../actionsTypes"
import {DB} from "../../db"
import * as FileSystem from 'expo-file-system'


const initialState = {
    allPosts: [],
    bookedPosts: [],
    loading: true
}

export const loadPosts = () => async dispatch => {
    const posts = await DB.getPosts()

    dispatch({
        type: LOAD_POSTS,
        payload: posts
    })
}
export const toggleBooked = post => async dispatch => {
    await DB.updatePost(post)

    dispatch({
        type: TOGGLE_BOOKED,
        payload: post.id
    })
}
export const removePost = id => async dispatch => {
    await DB.removePost(id)

    dispatch({
        type: REMOVE_POST,
        payload: id
    })
}
export const addPost = post => async dispatch => {
    const fileName = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img
        })
    } catch (e) {
        console.log('Error: ', e)
    }

    const newPost = {...post, img: newPath}
    newPost.id = await DB.createPost(newPost)

    dispatch({
        type: ADD_POST,
        payload: newPost
    })
}


export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post => post.booked),
                loading: false
            }
        }
        case TOGGLE_BOOKED: {
            const allPosts = state.allPosts.map(post => {
                if (post.id === action.payload) {
                    post.booked = !post.booked
                }
                return post
            })

            return {
                ...state,
                allPosts,
                bookedPosts: allPosts.filter(post => post.booked)
            }
        }
        case REMOVE_POST: {
            const allPosts = state.allPosts.filter(post => post.id !== action.payload)

            return {
                ...state,
                allPosts,
                bookedPosts: allPosts.filter(post => post.booked)
            }
        }
        case ADD_POST: {
            return {
                ...state,
                allPosts: [{...action.payload}, ...state.allPosts]
            }
        }
        default:
            return state
    }
}