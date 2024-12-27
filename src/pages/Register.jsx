import { Input, Button, message } from "antd"; //npm install antd
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios"; //npm install axios
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState(""); //to store username
  const [email, setEmail] = useState(""); //to store email
  const [password, setPassword] = useState(""); //to store password
  const [messageApi, contextHolder] = message.useMessage(); //to show message
  const navigator = useNavigate(); //to redirect to login page

  const handleSubmit = async () => {
    //to handle submit
    if (!username || !email || !password) {
      ///if any field is empty then show message
      messageApi.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        //to send data to server
        email,
        username,
        password,
      });
      if (response.status === 201) {
        //if response is 201 then show message
        messageApi.open({
          type: "success",
          content: "This is a success message",
        });
        navigator("/login"); //to redirect to login page
      }
    } catch (error) {
      //if response is not 201 then show message
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      {contextHolder} {/* This renders the message API context */}
      <h1>Register</h1>
      <Input
        type="text"
        placeholder="Username"
        size="large"
        value={username}
        onChange={(e) => setUsername(e.target.value)} //to set username
      />
      <Input
        type="text"
        placeholder="Email"
        size="large"
        value={email}
        onChange={(e) => setEmail(e.target.value)} //to set email
      />
      <Input.Password
        size="large"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} //to set password
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <Button onClick={handleSubmit}>
        {/*to submit*/}
        Register
      </Button>
    </div>
  );
}

export default Register;
