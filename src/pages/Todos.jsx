import { Input, Button, message } from "antd";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function Todos() {
  const [todoInput, setTodoInput] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [todoList, setTodoList] = useState([]);
  const [getData, setGetData] = useState(false);
  const [cookie, _] = useCookies(["access_token"]);

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
    }
  };

  return (
    <div>
      Todos
      <div>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <Button onClick={handleNewTodo}>Add</Button>
      </div>
      {todoList.map((todo) => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <p>{todo.isDone ? "Completed" : "Not Completed"}</p>
        </div>
      ))}
    </div>
  );
}

export default Todos;
