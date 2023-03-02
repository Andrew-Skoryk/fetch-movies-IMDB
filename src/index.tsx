import { createRoot } from "react-dom/client";
import {
  HashRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PrivateRoutes } from "./Routes/PrivateRoutes";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <Router>
      <PrivateRoutes />
    </Router>
  </Provider>
);
