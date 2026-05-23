const API = import.meta.env.VITE_API;

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
//this sends a request ot the API to delete the actvity with the givem login ID.
// the correct token is requied and will throw an error message if the user is not signed in.
export async function deleteActivity(token, id) {
  if (!token) {
    throw Error(" You must be signed in to delete an activity");
  }
  const response = await fetch(API + "/activites/" + id, {
    method: "DELETE",
    heder: { Authorizatio: "Bearer" + token },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.meesage);
  }
}
