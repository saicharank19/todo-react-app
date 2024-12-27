import { Input, Button, message } from "antd"; //pnpm install antd --save
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"; //pnpm install @ant-design/icons
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login() {
  const [username, setUsername] = useState(""); //to store username
  const [password, setPassword] = useState(""); //to store password
  const [_, setCookie] = useCookies(["access_token"]);
  const [messageApi, contextHolder] = message.useMessage(); //to show message
  // const [_, setCookies] = useCookies(["access_token"]); //to store cookies in browser
  const navigator = useNavigate(); //to redirect to todos page

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        username,
        password,
      });
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "This is a success message",
        });
        setCookie("access_token", response.data.token);
        navigator("/todos");
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
    <div className="form-container">
      {contextHolder}
      <h1>Login</h1>
      <Input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        value={username}
      />

      <Input.Password
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        Render={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
}

export default Login;
