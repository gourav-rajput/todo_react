import { ADD_NEW, TOGGLE_COMPLETE, DELETE_TODO } from "../actionTypes";

export const addNew = (listItem = {}) => dispatch => dispatch({ type: ADD_NEW, payload: { listItem } })
 
export const toggleComplete = id => dispatch => dispatch({ type: TOGGLE_COMPLETE, payload: { id } })

export const deleteTodo = id => dispatch => dispatch({ type: DELETE_TODO, payload: { id } })