import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useState,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as userActions from "../../store/user";
import { useNavigate } from "react-router-dom";

type Props = {
  buttonText: string;
};

export const AuthForm: FC<Props> = ({ buttonText }) => {
  const { user } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  }, []);

  const isPassBad = password.length < 6;
  const isEmail = useMemo(
    () => email.match("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"),
    [email]
  );

  const handleSubmite = async (e: FormEvent) => {
    e.preventDefault();

    if (isPassBad) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (buttonText === "Login") {
      await dispatch(userActions.login({ email, password }));
      if (user) {
        navigate('/');
      }
    } else {
      dispatch(userActions.create({ email, password }));
    }

    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmite}>
      <div className="field">
        <label className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            autoComplete={"email"}
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {isEmail && (
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          )}
        </label>
      </div>

      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            autoComplete={"current-password"}
            required
          />

          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>

          {!isPassBad && (
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          )}
        </p>

        {error && (
          <div className="message is-danger">
            <p className="message-body">{error}</p>
          </div>
        )}
      </div>

      <div className="field">
        <p className="control">
          <button className="button is-primary">{buttonText}</button>
        </p>
      </div>
    </form>
  );
};
