import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import useCookie from "./hooks/useCookie";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";

function App() {
  const { getCookie } = useCookie();
  const cookie = getCookie();

  return (
    <>
      <Router>
        {cookie && <Navbar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todos" element={<Todos />} />
          <Route
            path="/"
            element={<Navigate to={cookie ? "/todos" : "/login"} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
