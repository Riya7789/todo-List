import { useState } from "react";
import './App.css';
import Dates from "./Date";

export default function Todo() {
  const [todos, setTodos] = useState([
    { id: "1", title: "First Todo", status: "completed" },
    { id: "2", title: "Second Todo", status: "completed" }
  ]);
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleOnChange = (e) => {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === e.target.id) {
        return { ...todo, status: e.target.checked ? "completed" : "pending" };
      }
      return todo;
    });

    setTodos(updatedTodo);
  };

  const handleTextOnChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleAddClick=() => {
    setShowForm(true);
  }

  const handleOnClick = () => {
    if (input.trim() === "") {
      return; 
    }

    const newTodo = {
      id: String(Date.now()),
      title: input,
      status: "pending"
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };
  
  return (
    <div className='container'>
       <Dates/>
      {todos.map((todo) => (
        <>      
          <div key={todo.id} className="text-wrapper">
          <h1
            style={{
              marginRight: 10,
              color: todo.status === "completed" ? "gray" : "green"
            }}
          >
            {todo.title}
          </h1>
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.status === "completed"}
            onChange={handleOnChange}
          />
        </div>
        </>
      ))}
      <div className="add-todo">
        {showForm ? (
          <div>
            <input
        type="text"
        value={input}
        id="input"
        placeholder='Enter your todo'
        onChange={handleTextOnChange}
        />

      <button className="btn" onClick={handleOnClick}>+</button>
          </div>
        ):(
          <button className="btn" onClick={handleAddClick}>+</button> 
        )}
        </div>
    </div>
  );
}