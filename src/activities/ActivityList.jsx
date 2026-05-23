import { useState } from "react";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
// renders a list of activites
export default function ActivityList({ activities, syncActivities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        />
      ))}
    </ul>
  );
}
// renders single activity with a delete button
function ActivityListItem({ activity, syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      syncActivities();
    } catch (error) {
      setError(error.message);
    }
  };
  // the delete button only shows if the user is logged in
  // and the error error message only show is there is an error
  return (
    <li>
      <p>{activity.name}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert"> {error}</p>}
    </li>
  );
}
