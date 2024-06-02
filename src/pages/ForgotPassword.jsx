import React, { useState } from "react";
import { forgotPasswordApi } from "../api/Api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    let isValid = true;
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    forgotPasswordApi({ email })
    .then((res) => {
      toast.success("Reset link sent to your email.");
    })
    .catch((err) => {
      toast.error("Something went wrong");
    });

  };

 
  return (
    <div className="container mt-3">
      <h3>Forgot Password</h3>
      <form action="" className="w-25">
        <label htmlFor="">Enter your registered email.</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          placeholder="example@gmail.com"
        />
        {emailError && <p className="text-danger">{emailError}</p>}
        <button className="btn btn-primary w-100 mt-2" onClick={handleSubmit}>
          Send reset link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
