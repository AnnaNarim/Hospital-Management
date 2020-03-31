import React from "react";
import { connect } from "react-redux";
import Item from "../TodoItem";

const TodoList = ({ todos, loading, error, res }) => {
  console.log(' ---> res ', res);

  if(error) return <span className='error'>{error}</span>

  // return loading ? <span>Loading ... </span> : (
  //   <ul className="todo-list">
  //     {todos && todos.length
  //       ? todos.map((todo, index) => {
  //           return <Item key={`todo-${todo.id}`} todo={todo} />;
  //         })
  //       : "No todos, yay!"}
  //   </ul>
  // );
return <span>{res}</span>
}

const mapStateToProps = state => ({
  loading: state.todo.loading,
  error: state.todo.error,
  todos: state.todo.todos,
  res: state.todo.res
});

export default connect(mapStateToProps, null)(TodoList);
