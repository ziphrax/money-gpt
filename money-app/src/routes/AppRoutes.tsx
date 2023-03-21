
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Callback } from "../auth/Callback";
import { Logout } from "../auth/Logout";
import { LogoutCallback } from "../auth/LogoutCallback";
import { SilentRenew } from "../auth/SilentRenew";
import { PrivatePage } from "../Pages/PrivatePage";
import { PublicPage } from "../Pages/PublicPage";
import { RegisterPage } from "../Pages/RegisterPage";



export const AppRoutes = (
    <Routes>
        <Route path="/signin-oidc" element={<Callback />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/logout/callback" element={<LogoutCallback />} />
        <Route path="/silentrenew" element={<SilentRenew />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/private" element={<PrivatePage />} />
        <Route path="/" element={<PublicPage />} />
    </Routes>
);