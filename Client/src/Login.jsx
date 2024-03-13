import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import Ologin from "./ologin";
import LoginForm from "./memberlogin";

const Login = () => {
    return (
        <div className="max-w-md mx-auto">
        <ToggleSwitch
            component1={<Ologin />}
            component2={<LoginForm />}
        />
        </div>
    );
    };

export default Login;