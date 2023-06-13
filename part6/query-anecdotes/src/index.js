import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import { NotificationsContextProvider } from "./NotificationsContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationsContextProvider>
      <App />
    </NotificationsContextProvider>
  </QueryClientProvider>
);
