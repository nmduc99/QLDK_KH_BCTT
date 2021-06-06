import React, { useState } from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import NormalLoginForm from './views/Authentication/NormalLoginForm'
import { message } from 'antd';

import AdminLayout from "layouts/Admin.js";
function LogInTo() {

    const [authen, setAuthen] = useState(sessionStorage.getItem("authen") === "true");
    const logInMes = () => {
        message.success('Login successfully ');
    };

        const logInErro = () => {
        message.error(' Username or password is incorrect ');
    };


    function Login(username, password) {
        if (username === 'admin' && password === '123') {
            setAuthen(true)
            sessionStorage.setItem("authen", true)
            logInMes();
        } else {
            logInErro();
        }

    }

       const renderComponent = (authen) => {
        if (authen) {
            return (
                <Switch>
                    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                    <Redirect from="/" to="/admin/student" />
                </Switch>
            )
        } else {
            return (
                <Switch>
                    <Route path="/login" exact render={() => {
                        return !authen && <NormalLoginForm login={Login} />
                    }}
                    />
                    <Redirect to="/login" exact />
                </Switch>

            );
        }
    }


    return (
        <> <div>
            {renderComponent(authen)}
        </div>
        </>

    )

}
export default LogInTo;