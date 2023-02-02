import ReactDOM from "react-dom";
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

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="watchlist">
          <Route index element={<MoviesListPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById("root")
);
