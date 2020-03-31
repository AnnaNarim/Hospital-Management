import React from "react";

const Todo = ({ todo }) => (
  <li className="todo-item" >
    <span>
      {todo.task}
    </span>
  </li>
);

export default Todo;
