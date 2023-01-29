import dotenv from "dotenv"
const { makeRequest, getToken } = require("./../utils/axios/axios.util")
dotenv.config()

let token: string
const username: string = process.env.TEST_USERNAME || ""
const password: string = process.env.TEST_PASSWORD || ""

describe("Meal test", () => {
  beforeAll(async () => {
    token = await getToken(username, password)
    expect(typeof token).toBe("string")
  })

  test("Meals | Get /meals/", async () => {
    const res = await makeRequest(
      "GET",
      `http://localhost:${process.env.SERVER_PORT}/meals`,
      {},
      token
    )
    expect(res.data.length).toBeGreaterThan(0)
    if (res.data.length > 0) {
      expect(res.data[0]).toHaveProperty("id")
      expect(res.data[0]).toHaveProperty("name")
      expect(res.data[0]).toHaveProperty("description")
      expect(res.data[0]).toHaveProperty("price")
      expect(res.data[0]).toHaveProperty("image")
      expect(res.data[0]).toHaveProperty("chef_id")
      expect(res.data[0]).toHaveProperty("status")
      expect(res.data[0]).toHaveProperty("createdAt")
      expect(res.data[0]).toHaveProperty("updatedAt")
      expect(res.data[0]).toHaveProperty("ratings")
    }
  })
})
