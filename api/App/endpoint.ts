/**
 * This module defines generic API calls that can be reused
 * across the entire application.
 *
 * Responsibilities:
 *  - Expose functions that wrap HTTP requests.
 *  - Keep implementation details (HTTP client, mock,
 *    headers, etc.) encapsulated inside the endpoint function.
 *  - Return a normalized object { data, headers } so the
 *    consuming code can rely on a consistent shape.
 *
 * Scope:
 *  - Only app-wide or shared endpoints should live here
 *    (e.g., authentication, "who am I", health checks).
 *  - Feature-specific endpoints should be placed in their
 *    dedicated modules.
 */
export const whoAmI = async () => {
  const response = {
    id: "ed6e724d-81e4-4cf3-9841-aa8be1601249",
    name: "Mario",
    surname: "Rossi",
    username: "46375648294",
    email: "mariorossi@email.com",
  };
  return { data: response, headers: {} };
};
