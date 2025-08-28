import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./redux/store.js";
import { Provider } from 'react-redux';
import "./utils/axiosInstance.js"
import { Toaster } from "sonner";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <App />
    </Provider>
    <ToastContainer position="top-center" autoClose={2000} />
    <Toaster position="bottom-right" richColors />
  </QueryClientProvider>
);
