import {
  ADD_TODO,
  GET_TODO, GET_TODO_SUCCESS, GET_TODO_ERROR
} from '../events';

const initState = {
  loading: false,
  res: '',
  todos: [{ id: 0, task: 'Wash hands' }, { id: 1, task: 'Stay home' }],
  error: ''
};

const todo = (state = initState, action) => {
  switch (action.type) {

    case ADD_TODO:
      const { task } = action.payload;
      const id = state.todos.length;

      return {
        ...state,
        todos: [...state.todos, { id, task }],
      };

    case GET_TODO:
      return {
        ...state,
        loading: true,
      };

    case GET_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        res: action.result,
      };

    case GET_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default: return Object.assign({}, state);
  }
};

export default todo;
