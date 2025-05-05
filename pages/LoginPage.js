import React from "react";
import LoginForm from "../components/LoginForm";
import { ReactComponent as VodafoneLogo } from "../vodafone.svg";
import "../App.css";

function LoginPage() {
  return (
    <div className="container">
      <VodafoneLogo className="logo" />
      <h1>Physical Asset Verification</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
