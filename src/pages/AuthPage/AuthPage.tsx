import classNames from "classnames";
import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/AuthForm/";
import { Loader } from "../../components/Loader";
import { ResetPasswordForm } from "../../components/ResetPasswordForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as userActions from "../../store/user";
import { AuthOptions } from "../../types/AuthOptions";
import "./AuthPage.scss";

type Props = {
  authOptions: AuthOptions;
};

export const AuthPage: FC<Props> = ({ authOptions }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, notification, isError } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    return () => {
      dispatch(userActions.clearNotification());
    };
  }, [authOptions]);

  const handleTryAgain = useCallback(() => {
    dispatch(userActions.clearNotification());
  }, []);

  const handleLogin = useCallback(() => {
    dispatch(userActions.clearNotification());
    navigate("/login");
  }, []);

  const handleResetPassword = useCallback(() => {
    dispatch(userActions.clearNotification());
    navigate("/resetpassword");
  }, []);

  const isResetPassword = authOptions === AuthOptions.ResetPassword || authOptions === AuthOptions.ChangePassword;

  return (
    <div className="section auth_container">
      <div className="box auth_content">
        {loading ? (
          <Loader />
        ) : notification ? (
          <>
            <article
              className={classNames("message", {
                "is-success": !isError,
                "is-danger": isError,
              })}
            >
              <div className="message-body">{notification}</div>
            </article>

            {isError ? (
              <div className="buttons">
                <button className="button is-warning" onClick={handleTryAgain}>
                  Try again
                </button>

                <button
                  className="button is-info"
                  onClick={handleResetPassword}
                >
                  Reset password
                </button>
              </div>
            ) : (
              <button className="button is-primary" onClick={handleLogin}>
                Login
              </button>
            )}
          </>
        ) : isResetPassword ? (
          <ResetPasswordForm authOptions={authOptions} />
        ) : (
          <AuthForm authOptions={authOptions} />
        )}
      </div>
    </div>
  );
};
