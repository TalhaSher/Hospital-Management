import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn, setUser, setRole } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

const Authenticator = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const NavigateTo = useNavigate();
  const dispatch = useDispatch();
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };

  const loginUser = async () => {
    try {
      const res = await axios.get("/", {}, { headers });
      if (res.data.user == null) return NavigateTo("/login");
      dispatch(setUser({ user: res.data.user }));
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      dispatch(setRole({ role: res.data.user.role }));
    } catch (err) {
      if (err.response.status === 403 || 401) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        dispatch(setUser({ user: {} }));
        NavigateTo("/login");
      }
    }
  };
  useEffect(() => {
    loginUser();
  }, []);
  return <>{children}</>;
};

export default Authenticator;
