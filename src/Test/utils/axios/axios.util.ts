import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
export const getToken = async (username: string, password: string) => {
  const res = await makeRequest(
    "POST",
    `http://localhost:${process.env.SERVER_PORT}/users/login`,
    {
      username: username,
      password: password,
    }
  )
  return res.data.token
}

export const makeRequest = async (
  method: string,
  url: string,
  data?: any,
  token?: string
) => {
  const options = {
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  }
  const res = await axios.request(options)
  return res.data
}
