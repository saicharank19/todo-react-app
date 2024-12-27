import { useState } from "react";

function useCookie() {
  const [cookie, setCookie] = useState("");

  function insertCookie(key, value) {
    setCookie(value);
    localStorage.setItem(key, value);
  }

  function getCookie() {
    return cookie;
  }

  function deleteCookie(key) {
    localStorage.removeItem(key);
    setCookie(null);
  }

  return {
    insertCookie,
    getCookie,
    deleteCookie,
  };
}

export default useCookie;
