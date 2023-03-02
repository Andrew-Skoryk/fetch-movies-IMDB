import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PageNavLink } from '../PageNavLink';
import * as userActions from "../../store/user";
import { useCallback } from 'react';

export const PageNavigation = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleSignOut = useCallback(() => {
    dispatch(userActions.signOut());
  }, []);

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-start">
          <PageNavLink to="/" text="Home" />
          <PageNavLink to="/watchlist" text="Watch List" />
          <PageNavLink to="/watched" text="Watched" />
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <>
                  <NavLink to={"/watchlist"} className={"button is-primary"}>
                    {<strong>{user.email}</strong>}
                  </NavLink>

                  <NavLink
                    to={"/"}
                    className={"button is-light"}
                    onClick={handleSignOut}
                  >
                    Log out
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to={"/signup"} className={"button is-primary"}>
                    {<strong>Sign up</strong>}
                  </NavLink>

                  <NavLink to={"/login"} className={"button is-light"}>
                    Log in
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
