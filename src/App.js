import React, { Component } from "react";
import "./App.css";
import ToDo from "./ToDo";
import PropTypes from "prop-types";

const ToDoCount = ({ number }) => (
  <p>
    {number} {number <= 1 ? "Todo" : "Todos"}
  </p>
);
const ClearButton = ({ removeCompleted }) => (
  <button onClick={() => removeCompleted()}>Clear Completed</button>
);

class App extends Component {
  constructor(props) {
    super(props); // oop - bringing all the props from react component
    this.state = {
      name: "Bobby Bob",
      todos: [],
      lastId: 0,
      toggleCompleteButton: false
    };
    this.toDoInput = React.createRef();
  }

  toggleComplete = item => {
    const newTodos = this.state.todos.map(todo => {
      if (item.id === todo.id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setState({ todos: newTodos });
    this.hasCompleted();
  };
  removeTodo = item => {
    const newTodos = this.state.todos.filter(todo => item.id !== todo.id);
    this.setState({ todos: newTodos });
  };
  addToDo = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;
    if (toDoInput.value) {
      const id = this.state.lastId + 1; // update id

      const newTodos = [
        ...this.state.todos,
        { id, title: toDoInput.value, complete: false }
      ];
      this.setState({
        todos: newTodos,
        lastId: id
      });
      toDoInput.value = "";
    }
  };

  hasCompleted = () => {
    const completedTodo = this.state.todos.filter(item => {
      return item.completed;
    });
    if (completedTodo.length) {
      this.setState({ toggleCompleteButton: true });
    } else {
      this.setState({ toggleCompleteButton: false });
    }
  };

  removeCompleted = () => {
    const newTodos = this.state.todos.filter(todo => {
      if (!todo.completed) {
        return todo;
      }
    });

    this.setState({ todos: newTodos });
  };
  render() {
    return (
      <div className="todo-list">
        {/* {showHeader ? <h1>So Much TODO</h1> : <h1>Untitled Project</h1>}
        <h1>List of TODOS:</h1>
        <div className="todo-list">
          <ul>
            {todos.map((item, key) => (
              <li key={key}>{item}</li>
            ))}
          </ul>
        </div> */}
        <h1 onClick={this.toggleComplete}>List of TODOS:</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input autoFocus type="text" ref={this.toDoInput} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul>
          {this.state.todos.map(item => (
            <ToDo
              onDelete={this.removeTodo}
              onClick={this.toggleComplete}
              key={item.id}
              item={item}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          {this.state.toggleCompleteButton && (
            <ClearButton removeCompleted={this.removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}

ToDoCount.propTypes = {
  number: PropTypes.number
};

ToDoCount.defaultProps = {
  number: 0
};

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

ClearButton.defaultProps = {
  removeCompleted: () => {}
};

export default App;

// addToDo = event => {
//   event.preventDefault();
//   let toDoInput = this.toDoInput.current;
//   if (toDoInput.value) {
//     const id = this.state.lastId + 1; // update id
//     const newTodos = [
//       ...this.state.todos,
//       { id, title: toDoInput.value, complete: false }
//     ];
//     this.setState({
//       todos: newTodos,
//       lastId: id
//     });
//     toDoInput.value = "";
//   }
// };
