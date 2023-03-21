// REF: https://medium.com/@franciscopa91/how-to-implement-oidc-authentication-with-react-context-api-and-react-router-205e13f2d49

import React, { Component, ReactNode } from "react";
import AuthService from "./auth-service";

type AuthContextType = {
    signinRedirectCallback: () => {};
    logout: () => {};
    signoutRedirectCallback: () => {};
    isAuthenticated: () => {};
    signinRedirect: () => {};
    signinSilentCallback: () => {};
    createSigninRequest: () => {};
};

const AuthContext = React.createContext<AuthContextType>({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({}),
});

export const AuthConsumer = AuthContext.Consumer;

type AuthProviderProps = {
    children: ReactNode;
};

export class AuthProvider extends Component<AuthProviderProps> {
    authService: AuthService;

    constructor(props: AuthProviderProps) {
        super(props);
        this.authService = new AuthService();
    }

    render() {
        return (
            <AuthContext.Provider value={this.authService}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
