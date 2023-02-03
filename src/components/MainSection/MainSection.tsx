import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Notification } from '../Notification';

export const MainSection = () => {
  const { error } = useAppSelector((state) => state.watchedList);

  return (
    <main className="section">
      <Outlet />
      {error && (
        <Notification text={error} />
      )}
    </main>
  );
};
