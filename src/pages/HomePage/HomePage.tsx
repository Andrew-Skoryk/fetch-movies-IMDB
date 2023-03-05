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

      <p className="box has-text-justified">
        Welcome to the ultimate movie lover's destination! With online database,
        you can easily search for any movie by title and add it to your personal
        watchlist. Plus, once you've watched it, you can move it to your watched
        list and give it a rating. No more forgetting which movies you've seen or
        which ones you still need to watch. Simple and intuitive interface makes
        it easy to keep track of all your favorite flicks. So why not give us a
        try and start building your own personalized movie library today?
      </p>

      <div className="content">
        <h2 className="title is-3">
          Ready to start building your personalized movie library?
        </h2>

        <ul className="block">
          <li>
            Find your next favorite movie and keep track of what you've watched
          </li>

          <li>
            Add movies to your watchlist and move them to your watched list with
            ease
          </li>

          <li>
            Rate and review your favorite films to help others discover great
            movies
          </li>
        </ul>
      </div>

      <NavLink to={"/watchlist"} className={"home-page_button"}>
        <button className="button is-primary is-large is-rounded">
          Let&apos;s try!
        </button>
      </NavLink>
    </section>
  );
};
