import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/watchedList";
import "./Notification.scss";

type Props = {
  text: string;
};

export const Notification: FC<Props> = ({ text }) => {
  const dispatch = useDispatch();

  const handleCloseNotification = useCallback(() => {
      dispatch(actions.clearError());
  }, [dispatch]);

  return (
    <div className="popup-box">
      <div className="notification is-danger is-light">
        <button className="delete" onClick={handleCloseNotification}></button>

        {text}
      </div>
    </div>
  );
};
