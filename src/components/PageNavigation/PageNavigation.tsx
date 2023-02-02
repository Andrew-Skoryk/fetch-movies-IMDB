import { PageNavLink } from '../PageNavLink';

export const PageNavigation = () => (
  <nav
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" text="Home" />
        <PageNavLink to="/watchlist" text="Watch List" />
        <PageNavLink to="watched" text="Watched" />
      </div>
    </div>
  </nav>
);
