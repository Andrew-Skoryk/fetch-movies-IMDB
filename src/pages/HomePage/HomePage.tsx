import { FC, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../api/superbaseClient";
import './HomePage.scss';

export const HomePage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/changepassword");
      }
    });
  }, []);

  return (
    <section className="section section-main">
      <h1 className="title is-2 has-text-centered">
        Welcome to the React fetch-imdb-movie Project!
      </h1>

      <div className="box has-text-justified">
        <p className="content">
          Welcome to the ultimate movie lover's destination! With online
          database, you can easily search for any movie by title and add it to
          your personal watchlist. Plus, once you've watched it, you can move it
          to your watched list and give it a rating. No more forgetting which
          movies you've seen or which ones you still need to watch. Simple and
          intuitive interface makes it easy to keep track of all your favorite
          flicks, and with personalized user accounts, you can create and manage
          your own movie lists.
        </p>

        <p>
          So why not give us a try and start building your own personalized
          movie library today?
        </p>
      </div>

      <div className="content">
        <h2 className="title is-3">
          Ready to start building your personalized movie library?
        </h2>

        <ul className="block">
          <li>
            <strong>Create an account:</strong> Start by creating your own
            account on website. Simply click on the "Sign up" button on the top
            right corner of the page and fill out the registration form with
            your email address, and a strong password.
          </li>

          <li>
            <strong>Search for movies:</strong> Once you've created your account
            and logged in, you can start searching for movies that you want to
            watch. You can search for movies by title.
          </li>

          <li>
            <strong>Add movies to your watchlist:</strong> When you find a movie
            that you're interested in, simply click on the "Add to Watchlist"
            button to add it to your personal watchlist. You can add as many
            movies as you like to your watchlist.
          </li>
          <li>
            <strong>Watch and rate movies:</strong> When you watch a movie from
            your watchlist, simply move it to your "Watched" list and give it a
            rating. This will help you keep track of which movies you've watched
            and what you thought of them.
          </li>
          <li>
            <strong>Add movies to your watchlist:</strong> When you find a movie
            that you're interested in, simply click on the "Add to Watchlist"
            button to add it to your personal watchlist. You can add as many
            movies as you like to your watchlist.
          </li>
        </ul>

        <p className="content">
          I hope you enjoy using this website and building your own personalized
          movie library!
        </p>
      </div>

      <NavLink to={"/watchlist"} className={"home-page_button"}>
        <button className="button is-primary is-large is-rounded">
          Let&apos;s try!
        </button>
      </NavLink>
    </section>
  );
};
