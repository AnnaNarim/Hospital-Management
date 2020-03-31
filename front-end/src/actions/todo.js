import {
  ADD_TODO,
  GET_TODO, GET_TODO_SUCCESS, GET_TODO_ERROR
} from '../events';

export const addTodo = task => {
	return {
	  type: ADD_TODO,
	  payload: {
	    task
  	}
	};
}

export const getTodos = () => (
  (dispatch) => {
    dispatch({ type: GET_TODO });
    console.log(' ekav')
    return fetch(`http://localhost:3100/cars`, {
    	method: 'GET',
      cache: 'no-cache'
    })
      .then(response => response.json())
      .then(response => dispatch({
        type: GET_TODO_SUCCESS,
        result: response
      }))
      .catch((error) => {
        dispatch({
          type: GET_TODO_ERROR,
          error: error.message
        });
      });
  });
