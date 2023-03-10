import dotenv from "dotenv"
const { makeRequest, getToken } = require("./../utils/axios/axios.util")
dotenv.config()

let token: string
const userId: string = process.env.TEST_USER_ID || ""
const username: string = process.env.TEST_USERNAME || ""
const password: string = process.env.TEST_PASSWORD || ""

describe("User test", () => {
  beforeAll(async () => {
    token = await getToken(username, password)
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
