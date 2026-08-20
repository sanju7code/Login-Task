import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { store } from "./store";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    );
};

export default App;