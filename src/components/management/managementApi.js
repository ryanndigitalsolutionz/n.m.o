const MANAGEMENT_API = "https://nmo-production.up.railway.app/api";

function authHeader() {
    return {
        Authorization: `Bearer ${localStorage.getItem("managementToken")}`,
    };
}

export async function getStaff() {
    const response = await fetch(
        `${MANAGEMENT_API}/management/staff`,
        {
            headers: authHeader(),
        }
    );

    if (response.status === 401) {
        localStorage.removeItem("managementToken");
        window.location.href = "/login";
        return;
    }

    return response.json();
}

export async function getManagementNotifications() {
    const response = await fetch(
        `${MANAGEMENT_API}/notifications`,
        {
            headers: authHeader(),
        }
    );

    return response.json();
}

export async function markManagementNotificationRead(id) {
    return fetch(
        `${MANAGEMENT_API}/notifications/${id}`,
        {
            method: "PATCH",
            headers: authHeader(),
        }
    );
}

export async function deleteManagementNotification(id) {
    return fetch(
        `${MANAGEMENT_API}/notifications/${id}`,
        {
            method: "DELETE",
            headers: authHeader(),
        }
    );
}

export async function getAccessRequests() {
    const response = await fetch(
        `${MANAGEMENT_API}/access-requests`,
        {
            headers: authHeader(),
        }
    );

    if (response.status === 401) {
        localStorage.removeItem("managementToken");
        window.location.href = "/login";
        return;
    }

    return response.json();
}

export async function approveAccessRequest(
  requestId,
  role
) {
  const response = await fetch(
    `${MANAGEMENT_API}/access-requests/${requestId}/approve`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        role,
      }),
    }
  );

  return response.json();
}

export async function rejectAccessRequest(
  requestId
) {
  const response = await fetch(
    `${MANAGEMENT_API}/access-requests/${requestId}/reject`,
    {
      method: "DELETE",
      headers: authHeader(),
    }
  );

  return response.json();
}

export async function logoutManagement() {

    const response = await fetch(
        `${MANAGEMENT_API}/management/logout`,
        {
            method: "POST",
            headers: authHeader(),
        }
    );

    localStorage.removeItem("managementToken");

    return response.json();
}
