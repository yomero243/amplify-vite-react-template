import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure({
  Auth: {
    region: outputs.auth.region,
    userPoolId: outputs.auth.userPoolId,
    userPoolWebClientId: outputs.auth.userPoolWebClientId
  },
  API: {
    GraphQL: {
      endpoint: outputs.api.endpoint,
      region: outputs.api.region
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
