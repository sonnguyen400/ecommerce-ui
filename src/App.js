import { Routes, Route } from "react-router-dom";
import { publicRouter } from "./routers/routers";
import { DefaultLayout } from "./layout/default";
import { Fragment, useState } from "react";

import "./App.css";
import Loader from "./components/loader/Loader";
import { GlobalContext } from "./context";
import { Role } from "./constant";
import { Layout, message, notification } from "antd";
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
                    message: message,
                    authentication: undefined,
                    authorization: Role.GUEST,
                    loader: setLoaderContent,
                    darkmode: {
                        set: setDarkmode,
                        value: darkMode,
                    },
                }}
            >
                <Routes>
                    {publicRouter.map((page, index) => {
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
                    })}
                </Routes>
            </GlobalContext.Provider>
        </Layout>
    );
}

export default App;
