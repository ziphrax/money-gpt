import React, { Component, PropsWithChildren } from "react";
import { AuthConsumer } from "./AuthProvider";

export class PrivateRoute extends Component<PropsWithChildren> {
    render() {
        return(
            <AuthConsumer>
                {({ isAuthenticated, signinRedirect }) => {
                    if (!!Component && isAuthenticated()) {
                        return this.props.children;
                    } else {
                        signinRedirect();
                        return <span>loading</span>;
                    }
                }}
            </AuthConsumer>
        );
    }
}
