import { Navigate, Route, Routes } from "react-router-dom";
import { App } from "../App";
import { NotFoundPage } from "../pages/NotFoundPage";
import { HomePage } from "../pages/HomePage";
import { MoviesListPage } from "../pages/MoviesListPage";
import { WatchedPage } from "../pages/WatchedPage";
import { AuthPage } from "../pages/AuthPage";
import { useAppSelector } from "../store/hooks";
import { AuthOptions } from "../types/AuthOptions";

export const PrivateRoutes = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="watchlist" element={<MoviesListPage />} />

        <Route path="watched" element={<WatchedPage />} />

        {user ? (
          <>
            <Route path="signup" element={<Navigate to="/" replace />} />

            <Route path="login" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route
              path="signup"
              element={<AuthPage authOptions={AuthOptions.CreateAccount} />}
            />

            <Route
              path="login"
              element={<AuthPage authOptions={AuthOptions.Login} />}
            />
          </>
        )}

        <Route
          path="resetpassword"
          element={<AuthPage authOptions={AuthOptions.ResetPassword} />}
        />

        <Route
          path="changepassword"
          element={<AuthPage authOptions={AuthOptions.ChangePassword} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
