import axios from "axios";

export async function getStreaks() {
  const token = localStorage.getItem("token");
  const data = axios
    .get("http://localhost:9000/api/getstreaks", {
      headers: {
        "x-auth-token": token,
      },
    })
    .catch(error => {
      throw error;
    });

  return data;
}
