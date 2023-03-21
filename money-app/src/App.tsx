import React, {Component} from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { AppRoutes } from "./routes/AppRoutes";


export class App extends Component {
  render() {
      return (
          <AuthProvider>
                  <BrowserRouter children={AppRoutes} basename={"/"} />
          </AuthProvider>
      );
  }
}

export default App;
