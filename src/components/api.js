const API = "https://nmo-production.up.railway.app/api";

export async function authenticateManagement(data) {

    const response = await fetch(
        `${API}/management/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return response.json();
}

export async function getStaff() {

    const token =
        localStorage.getItem(
            "managementToken"
        );

    const response = await fetch(
        "https://nmo-production.up.railway.app/api/management/staff",
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.json();
}

export async function getNotifications(token) {
  const response = await fetch(
    `${API}/notifications`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function markNotificationRead(
  id,
  token
) {
  return fetch(
    `${API}/notifications/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function deleteNotification(
  id,
  token
) {
  return fetch(
    `${API}/notifications/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export default API;