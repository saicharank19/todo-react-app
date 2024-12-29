import { Input, Button, message } from "antd";

import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function Todos() {
  const [todoInput, setTodoInput] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [todoList, setTodoList] = useState([]);
  const [getData, setGetData] = useState(false);
  const [cookie, _] = useCookies(["access_token"]);
  const inputRef = useRef(null);

  useEffect(() => {
    const getTodos = async () => {
      const response = await axios.get("http://localhost:3000/todo/all", {
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
      });
      console.log(response.data);
      setTodoList(response.data);
    };
    getTodos();
  }, [getData]);

  const handleNewTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/todo/create",
        {
          title: todoInput,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.access_token}`,
          },
        }
      );
      if (response.status === 201) {
        inputRef.current.value = "";
        setGetData(!getData);
        messageApi.open({
          type: "success",
          content: "Todo created successfully",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
      console.log(error);
    } finally {
      setTodoInput("");
    }
  };

  const handleStatus = async (todoId) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/todo/update",
        {
          todoId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setGetData(!getData);
        messageApi.open({
          type: "success",
          content: "Todo updated successfully",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
      console.log(error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const response = await axios.delete("http://localhost:3000/todo/delete", {
        data: {
          todoId,
        },
        headers: {
          Authorization: `Bearer ${cookie.access_token}`,
        },
      });
      if (response.status === 200) {
        setGetData(!getData);
        messageApi.open({
          type: "success",
          content: "Todo deleted successfully",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
      console.log(error);
    }
  };

  return (
    <div className="todo-container">
      {contextHolder}
      <div className="todo-input-container">
        <Input
          type="text"
          placeholder="Username"
          size="large"
          onChange={(e) => setTodoInput(e.target.value)}
          ref={inputRef}
        />
        <Button size="large" onClick={handleNewTodo}>
          Add
        </Button>
      </div>
      {todoList.map((todo, index) => (
        <div
          key={index}
          className={
            todo.status ? "todo-container-done" : "todo-container-undone"
          }
        >
          <p>{todo.title}</p>

          <div className="todo-buttons">
            <button onClick={() => handleStatus(todo.todoId)}>
              {!todo.status ? "Mark as done" : "Mark as undone"}
            </button>

            <button onClick={() => handleDelete(todo.todoId)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todos;
