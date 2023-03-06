import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PageNavLink } from '../PageNavLink';
import * as userActions from "../../store/user";
import { useCallback, useEffect } from 'react';

export const PageNavigation = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    // Add click event to the navbar-burger button to toggle the visibility of the navbar-menu
    $(".navbar-burger").click(function () {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });
  }, []);

  const handleSignOut = useCallback(() => {
    dispatch(userActions.signOut());
  }, []);

  const handleReuse = useCallback(() => {
    dispatch(userActions.clearNotification());
  }, []);

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="./">
            <img
              src={
                process.env.REACT_APP_SUPABASE_URL +
                "/storage/v1/object/public/images/icons-movie-projector.png?t=2023-03-05T22%3A27%3A19.679Z"
              }
              width="32"
            />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navMenu" className="navbar-menu">
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
                    <NavLink
                      to={"/signup"}
                      className={"button is-primary"}
                      onClick={handleReuse}
                    >
                      {<strong>Sign up</strong>}
                    </NavLink>

                    <NavLink
                      to={"/login"}
                      className={"button is-info"}
                      onClick={handleReuse}
                    >
                      Log in
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
