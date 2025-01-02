import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";

function App() {
  const [cookie] = useCookies(["access_token"]);

  return (
    <>
      <Router>
        {cookie.access_token && <Navbar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={cookie.access_token ? <Todos /> : <Login />}
          />
          <Route
            path="/todos"
            element={cookie.access_token ? <Todos /> : <Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
