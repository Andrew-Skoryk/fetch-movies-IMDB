import { PageNavLink } from '../PageNavLink';

export const PageNavigation = () => (
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
            <a className="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a className="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
