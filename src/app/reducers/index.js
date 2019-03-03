import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import { ADD_NEW, TOGGLE_COMPLETE, DELETE_TODO } from "../actionTypes";

const INITIAL_STATE = {
  list: [
    {
      id: "fc3647",
      content : "This is some default item",
      completed: false
    },
    {
      id: "fc3747",
      content : "This is some other default item",
      completed: false
    },
    {
      id: "fc9647",
      content : "This is some default item",
      completed: true
    }
  ]
}

const ToDoReducer = ( state = INITIAL_STATE, action ) => {
  switch(action.type) {
    case ADD_NEW :
      state.list.push(action.payload.listItem);
      return { list: [ ...state.list ] }
    case TOGGLE_COMPLETE :
      for(let temp of state.list){
        if (temp.id === action.payload.id) {
          temp.completed = !(temp.completed);
        }
      }
      return { list: [ ...state.list ] }
    case DELETE_TODO :
      let newList = state.list.filter(item => item.id !== action.payload.id);  
      return { list: [ ...newList ] }
    default :
      return { ...INITIAL_STATE }  
  }
}


export default createStore(
  combineReducers({
    todos: ToDoReducer
  }), {}, applyMiddleware(ReduxThunk)
);

