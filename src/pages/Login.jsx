import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { loginApi } from "../api/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
export const Login = () => {
  //   return (
  //     <div>
  //         <h1>Login</h1>
  //     </div>
  //   )
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navgate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let isValid = true;
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    return isValid;
  };

  // for redux dispatch
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault(); //prevents reload
    if (!validate()) {
      return;
    }
    console.log(email, password);

    const data = {
      email: email,
      password: password,
    };

    loginApi(data)
      .then((res) => {
        console.log(res.data);

        //save token to local storage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        //for redux dispatch
        dispatch(addUser(res.data.user));

        toast.success(res.data.message);

        navgate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed!");
      });
  };
  return (
    <div className="container w-25 mt-4">
      <h3>Sign in to your account</h3>
      <form action="">
        <label htmlFor="email">Email address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="abc@gmail.com"
          className="form-control"
        />
        {emailError && <small className="text-danger">{emailError}</small>}
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          placeholder="**********"
          className="form-control"
        />
        {passwordError && (
          <small className="text-danger">{passwordError}</small>
        )}
        <button onClick={handleLogin} className="btn btn-primary w-100 mt-2">
          Login
        </button>
        <Link to={'/forgotpassword'}>
        <p>Forgot your password?</p>
        </Link>
      </form>
    </div>
  );
};
export default Login;
