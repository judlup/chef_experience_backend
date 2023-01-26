import dotenv from "dotenv"
const { makeRequest, getToken } = require("./../utils/axios/axios.util")
dotenv.config()

let token: string
let userId: string = "a352ad5c-2b66-4e28-b8b1-266594ab5751"

describe("User Login test", () => {
  beforeAll(async () => {
    token = await getToken("judlup@gmail.com", "Julian123")
    expect(typeof token).toBe("string")
  })

  test("User info | Get /users/:id", async () => {
    const res = await makeRequest(
      "GET",
      `http://localhost:${process.env.SERVER_PORT}/users/${userId}`,
      {},
      token
    )
    expect(res.data).toHaveProperty("id")
    expect(res.data).toHaveProperty("username")
    expect(res.data).toHaveProperty("role")
    expect(res.data).not.toHaveProperty("password")
  })
})
