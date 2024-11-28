import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/userContext";
import { VscLoading } from "react-icons/vsc";

ReactDOM.createRoot(document.getElementById("root")).render(

    <UserProvider>
        <Suspense fallback={<VscLoading />}>
                <RouterProvider router={router} />
        </Suspense>
    </UserProvider>
);
