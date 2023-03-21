// REF: https://medium.com/@franciscopa91/how-to-implement-oidc-authentication-with-react-context-api-and-react-router-205e13f2d49

import React from "react";
import { AuthConsumer } from "./AuthProvider";

export const Callback = () => (
    <AuthConsumer>
        {({ signinRedirectCallback }) => {
            signinRedirectCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>
);