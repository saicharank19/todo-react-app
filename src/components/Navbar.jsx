import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import useCookie from "../hooks/useCookie";

function Navbar() {
  const { deleteCookie } = useCookie();
  const navigate = useNavigate();

  return (
    <Button
      style={{
        color: "red",
        position: "absolute",
        right: "100px",
        top: "10px",
      }}
      onClick={() => {
        deleteCookie("access_token");
        navigate("/login");
      }}
    >
      Log out
    </Button>
  );
}

export default Navbar;
