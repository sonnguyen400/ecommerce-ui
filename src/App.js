import { Routes, Route } from "react-router-dom";
import { publicRouter } from "./routers/routers";
import { DefaultLayout } from "./layout/default";
import { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Loader from "./components/loader/Loader";
import { GlobalContext } from "./context";
import { Role } from "./constant";

function App() {
    let [loaderContent, setLoaderContent] = useState(false);
    let [darkMode, setDarkmode] = useState(false);
    return (
        <div className="App">
            {loaderContent === false ? null : <Loader render={loaderContent} />}
            <GlobalContext.Provider
                value={{
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
        </div>
    );
}

export default App;
