import { Routes, Route } from "react-router-dom";
import { publicRouter, userRouter, adminRouter } from "./routers/routers";
import { DefaultLayout } from "./layout/default";
import { Fragment, useState } from "react";

import "./App.css";
import Loader from "./components/loader/Loader";
import { GlobalContext } from "./context";
import { Role } from "./constant";
import { Layout, message, notification } from "antd";
import RoleBaseAuthorize from "./secure/RoleBaseAuthorize";
function App() {
    let [loaderContent, setLoaderContent] = useState(false);
    let [darkMode, setDarkmode] = useState(false);
    const [notificationAPI, notificationContext] = notification.useNotification();
    const [messageAPI, messageContext] = message.useMessage();

    return (
        <Layout>
            {loaderContent ? <Loader /> : ""}
            <GlobalContext.Provider
                value={{
                    notification: notificationAPI,
                    message: messageAPI,
                    loader: setLoaderContent,
                    darkmode: {
                        set: setDarkmode,
                        value: darkMode,
                    },
                }}
            >
                <Routes>
                    {[...publicRouter.map((page, index) => {
                        let Layout =
                            (page.layout === undefined
                                ? DefaultLayout
                                : page.layout) || Fragment;
                        let Page = page.component;
                        return (
                            <Route
                                key={index}
                                path={page.path || "/"}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    }),
                    ...userRouter.map((page, index) => {
                        let Layout =
                            (page.layout === undefined
                                ? DefaultLayout
                                : page.layout) || Fragment;
                        let Page = page.component;
                        return (
                            <Route
                                key={index}
                                path={page.path || "/"}
                                element={
                                    <RoleBaseAuthorize role={["USER"]}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </RoleBaseAuthorize>
                                }
                            />
                        );
                    }),
                    ...adminRouter.map((page, index) => {
                        let Layout =
                            (page.layout === undefined
                                ? DefaultLayout
                                : page.layout) || Fragment;
                        let Page = page.component;
                        return (
                            <Route
                                key={index}
                                path={page.path || "/"}
                                element={
                                    <RoleBaseAuthorize path={page.path} role={["ADMIN"]}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </RoleBaseAuthorize>

                                }
                            />
                        );
                    })]}
                </Routes>
            </GlobalContext.Provider>
        </Layout>
    );
}

export default App;
