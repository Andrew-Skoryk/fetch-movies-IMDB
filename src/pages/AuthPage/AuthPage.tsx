import classNames from "classnames";
import { FC, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../components/AuthForm/";
import { Loader } from "../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as userActions from "../../store/user";
import './AuthPage.scss';

type Props = {
  buttonText: string;
};

export const AuthPage: FC<Props> = ({ buttonText }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, notification, isError } = useAppSelector((state) => state.user);

useEffect(() => {
  return () => {
    dispatch(userActions.clearNotification());
  };
}, [buttonText]);

  const handleTryAgain = useCallback(() => {
    dispatch(userActions.clearNotification());
  }, []);

  const handleLogin = useCallback(() => {
    dispatch(userActions.clearNotification());
    navigate('/login');
  }, []);

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
              <button className="button is-warning" onClick={handleTryAgain}>
                Try again
              </button>
            ) : (
              <button className="button is-primary" onClick={handleLogin}>
                Login
              </button>
            )}
          </>
        ) : (
          <AuthForm buttonText={buttonText} />
        )}
      </div>
    </div>
  );
};
