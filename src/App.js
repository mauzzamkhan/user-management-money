import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import UserList from "./pages/UserList/Index";
import AddUser from "./pages/AddUser/Index";
import { useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Box } from "@mui/material";


function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const nodeRef = useRef(null);
  const location = useLocation();

  const addUser = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
    };
    setUsers(prev => [...prev, newUser]);
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>

      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <div ref={nodeRef}>
            <Routes location={location}>
              <Route index element={<UserList users={users} loading={loading} />} />
              <Route path="add-user" element={<AddUser addUser={addUser} users={users} />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Box>
  );
}

export default App;
