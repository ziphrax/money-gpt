import { Component } from "react";
import { PrivateRoute } from "../auth/PrivateRoute";

export class PrivatePage extends Component {
    render() {
        return (
            <PrivateRoute>
                <div>Private</div>
            </PrivateRoute>
        );
    }
}