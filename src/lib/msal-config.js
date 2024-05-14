import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";

const msalConfig = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
        authority: process.env.NEXT_PUBLIC_AZURE_AUTHORITY,
        redirectUri: process.env.NEXT_PUBLIC_AZURE_REDIRECT_URI,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

const loginRequest = {
    scopes: ["User.Read"],
};

const pca = new PublicClientApplication(msalConfig);
const AuthProvider = ({ children }) => {
    return <MsalProvider instance={pca}>{children}</MsalProvider>;
};

export { AuthProvider, loginRequest };
