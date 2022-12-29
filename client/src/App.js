import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("auth/user");
      console.log(data);
      setUser(data);
    };
    getUser();
  }, []);
  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
