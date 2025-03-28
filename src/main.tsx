import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: outputs.auth.userPoolId,
      userPoolClientId: outputs.auth.userPoolWebClientId,
      loginWith: {
        email: true
      }
    }
  },
  API: {
    GraphQL: {
      endpoint: outputs.api.endpoint,
      region: outputs.api.region,
      defaultAuthMode: 'apiKey'
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
