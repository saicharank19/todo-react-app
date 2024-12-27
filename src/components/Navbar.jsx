import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function Navbar() {
  const [cookie, _, removeCookie] = useCookies(["access_token"]);
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
        removeCookie("access_token");
        navigate("/login");
      }}
    >
      Log out
    </Button>
  );
}

export default Navbar;
