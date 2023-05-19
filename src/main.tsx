import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import "./fonts/Syne-Bold.ttf";
import "./fonts/Syne-ExtraBold.ttf";
import "./fonts/Syne-Medium.ttf";
import "./fonts/Syne-Regular.ttf";
import "./fonts/Syne-SemiBold.ttf";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
