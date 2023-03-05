import classNames from "classnames";
import { ChangeEvent, FC, FormEvent, useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import * as userActions from "../../store/user";
import { AuthOptions } from "../../types/AuthOptions";

type Props = {
  authOptions: AuthOptions;
};

export const ResetPasswordForm: FC<Props> = ({ authOptions }) => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const isThisResset = useMemo(() => authOptions === AuthOptions.ResetPassword , []);

  const isInputBad = isThisResset
    ? !userInput.match("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}")
    : userInput.length < 6;


  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setError("");
  }, []);

  const handleSubmite = async (e: FormEvent) => {
    e.preventDefault();

    if (isInputBad && !isThisResset) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (isInputBad && isThisResset) {
      setError("Please, enter valid email address");
      return;
    }

    if (isThisResset) {
      await dispatch(userActions.resetPassword(userInput));
    } else {
      dispatch(userActions.updateUserPassword(userInput));
    }

    setError("");
    setUserInput("");
  };

  const typeOfInput = isThisResset ? "email" : "password";

  return (
    <form onSubmit={handleSubmite}>
      <div className="field">
        <label className="control has-icons-left has-icons-right">
          <input
            className="input"
            type={typeOfInput}
            placeholder={typeOfInput}
            value={userInput}
            onChange={handleInput}
            autoComplete={typeOfInput}
            required
          />
          <span className="icon is-small is-left">
            <i
              className={classNames("fas", {
                "fa-envelope": isThisResset,
                "fa-lock": !isThisResset,
              })}
            />
          </span>

          {!isInputBad && (
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          )}
        </label>
      </div>

      <div className="field">
        {error && (
          <div className="message is-danger">
            <p className="message-body">{error}</p>
          </div>
        )}
      </div>

      <div className="field">
        <p className="control">
          <button className="button is-warning">{authOptions}</button>
        </p>
      </div>
    </form>
  );
};
