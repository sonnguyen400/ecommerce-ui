import { Routes ,Route} from 'react-router-dom';
import { publicRouter } from './routers/routers';
import { DefaultLayout } from './layout/default';
import { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Loader from './components/loader/Loader';
import { AppLoader } from './context/loader';

function App() {
    let [loaderContent,setLoaderContent]=useState("");
    return (
        <>
        
    <div className="App">
        {loaderContent!==""?<Loader render={loaderContent}/>:null}
        
        <AppLoader.Provider value={setLoaderContent}>
            <Routes>
                {publicRouter.map((page, index) => {
                    let Layout = (page.layout === undefined ? DefaultLayout : page.layout) || Fragment;
                    let Page = page.component;
                    return (
                        <Route
                            key={index}
                            path={page.path || '/'}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </AppLoader.Provider>
       
    </div>
    </>
  );
}

export default App;
