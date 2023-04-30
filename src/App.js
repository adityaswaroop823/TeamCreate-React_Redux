import React from "react";
import Appmain from "./Appmain";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <Appmain />
        </Provider>
    );
};

export default App;
