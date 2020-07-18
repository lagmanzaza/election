import { BACKEND_URL } from "../config";
export const listParty = async () => {
  const response = await fetch(`${BACKEND_URL}/parties`, {
    method: "GET",
    mode: "cors"
  });
  return response.json();
};

export const vote = async (data: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}/votes`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return response.json();
};
