import React from "react";
import { connect } from "react-redux";
import {
  addTodo,
  getTodos,
} from "../../actions/todo";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    this.props._addTodo(this.state.input);
    this.setState({ input: "" });
  };

  handleAddTodoGET = () => {
    this.props._getTodos();
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleAddTodoGET}>
          Add Todo
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _addTodo: (task) => dispatch(addTodo(task)),
    _getTodos: () => dispatch(getTodos()),
  };
}

export default connect(null, mapDispatchToProps)(AddTodo);
