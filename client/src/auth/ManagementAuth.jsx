import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser, setRole } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";

const ManagementAuth = ({ children }) => {
  const NavigateTo = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async () => {
    try {
      const res = await axios.get("/management", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });

      if (!res.data.user || res.data.user.role !== "management") {
        return NavigateTo("/management/login");
      }

      dispatch(setUser({ user: res.data.user }));
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
      dispatch(setRole({ role: res.data.user.role }));
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 403 || err.response.status === 401)
      ) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }));
        dispatch(setUser({ user: {} }));
        return NavigateTo("/management/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  return <>{children}</>;
};

export default ManagementAuth;
