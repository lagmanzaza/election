import { BACKEND_URL } from "../config";
export const listParty = async () => {
  const response = await fetch(`${BACKEND_URL}/parties`, {
    method: "GET",
    mode: "cors"
  });
  return response.json();
};
