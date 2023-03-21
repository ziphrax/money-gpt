// REF: https://medium.com/@franciscopa91/how-to-implement-oidc-authentication-with-react-context-api-and-react-router-205e13f2d49

import { IDENTITY_CONFIG, METADATA_OIDC } from "./auth-constants";
import { SigninRequest, User, UserManager, WebStorageStateStore } from "oidc-client";

export default class AuthService {
    UserManager;

    constructor() {
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
            metadata: {
                ...METADATA_OIDC
            }
        });


        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });

        this.UserManager.events.addSilentRenewError((e) => {
            console.log("silent renew error", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });
    }

    signinRedirectCallback = async (): Promise<User> => {
        return this.UserManager.signinRedirectCallback();
    };


    getUser = async (): Promise<User> => {
        const user = await this.UserManager.getUser();

        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }

        return user;
    };

    parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");

        return JSON.parse(window.atob(base64));
    };


    signinRedirect = async (): Promise<void> => {
        localStorage.setItem("redirectUri", window.location.pathname);
        
        await this.UserManager.signinRedirect({});
    };


    navigateToScreen = () => {
        window.location.replace("/en/dashboard");
    };


    isAuthenticated = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL?? ''}:${process.env.REACT_APP_IDENTITY_CLIENT_ID??''}`)??'{}');

        return (!!oidcStorage && !!oidcStorage.access_token);
    };

    signinSilent = async (): Promise<void> => {
        await this.UserManager.signinSilent()
            .then((user) => {
                console.log("signed in", user);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    signinSilentCallback = async (): Promise<User | undefined> => {
        return this.UserManager.signinSilentCallback();
    };

    createSigninRequest = async (): Promise<SigninRequest> => {
        return this.UserManager.createSigninRequest();
    };

    logout = async(): Promise<void> => {
        await this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        await this.UserManager.clearStaleState();
    };

    signoutRedirectCallback = async (): Promise<void> => {
        await this.UserManager.signoutRedirectCallback();        
        localStorage.clear();
        window.location.replace(process.env.REACT_APP_PUBLIC_URL ?? 'not set');
        await this.UserManager.clearStaleState();
    };
}