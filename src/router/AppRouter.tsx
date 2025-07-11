import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {  Suspense } from "react";
import Main from "@/layout/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { index: true, lazy: () => import("@/page/Home/Home").then((module) => ({ Component: module.default })), },
            { path: "contact", lazy: () => import("@/page/Contact/Contact").then((module) => ({ Component: module.default })), },
            // { path: "about", lazy: () => import("@/page/About/About").then((module) => ({ Component: module.default })), },
            { path: "products", lazy: () => import("@/page/Product/Product").then((module) => ({ Component: module.default })), },
            { path: "products/:id", lazy: () => import("@/page/Product/ProductDetail/ProductDetail").then((module) => ({ Component: module.default })), },
            { path: "category/:categoryName", lazy: () => import("@/page/Category/Category").then((module) => ({ Component: module.default })), },
            { path: "cart", lazy: () => import("@/page/Cart/Cart").then((module) => ({ Component: module.default })), },
            // { path: "checkout", lazy: () => import("@/page/Checkout/Checkout").then((module) => ({ Component: module.default })), },
            // { path: "login", lazy: () => import("@/page/Login/Login").then((module) => ({ Component: module.default })), },
            // { path: "register", lazy: () => import("@/page/Register/Register").then((module) => ({ Component: module.default })), },
            { path: "*", lazy: () => import("@/page/NotFound").then((module) => ({ Component: module.default })), },
        ],
    },
]);

const AppRouter = () => {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default AppRouter;