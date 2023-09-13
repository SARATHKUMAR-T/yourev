import axios from "axios";

export async function getStreaks() {
  const token = localStorage.getItem("token");
  const data = axios
    .get("https://zemo-backend.vercel.app/api/getstreaks", {
      headers: {
        "x-auth-token": token,
      },
    })
    .catch(error => {
      throw error;
    });

  return data;
}
