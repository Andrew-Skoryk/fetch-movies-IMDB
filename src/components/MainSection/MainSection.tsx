import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Notification } from '../Notification';

export const MainSection = () => {
  const { error: watchedListError } = useAppSelector((state) => state.watchedList);
  const { error: moviesListError } = useAppSelector((state) => state.moviesList);

  const error = watchedListError || moviesListError;

  return (
    <main className="section">
      <Outlet />
      {error && (
        <Notification text={error} />
      )}
    </main>
  );
};
