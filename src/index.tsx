import { createRoot } from "react-dom/client";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "bulma/css/bulma.css";
import { App } from "./App";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { MoviesListPage } from "./pages/MoviesListPage/MoviesListPage";
import { WatchedPage } from "./pages/WatchedPage/WatchedPage";
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="watchlist" element={<MoviesListPage />} />

          <Route path="watched" element={<WatchedPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);
