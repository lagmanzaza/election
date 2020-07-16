import { BACKEND_URL } from "../config";
export default async (username: string, password: string) => {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });
  return response.json();
};
