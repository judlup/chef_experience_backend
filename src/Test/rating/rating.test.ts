import dotenv from "dotenv"
const { makeRequest, getToken } = require("./../utils/axios/axios.util")
dotenv.config()

let token: string
const userId: string = process.env.TEST_USER_ID || ""
const mealId: string = process.env.TEST_MEAL_ID || ""
const username: string = process.env.TEST_USERNAME || ""
const password: string = process.env.TEST_PASSWORD || ""

describe("Rating test", () => {
  beforeAll(async () => {
    token = await getToken(username, password)
    expect(typeof token).toBe("string")
  })

  test("Rating a meal | Post /ratings", async () => {
    const res = await makeRequest(
      "POST",
      `http://localhost:${process.env.SERVER_PORT}/ratings`,
      {
        userId: userId,
        mealId: mealId,
        rating: Math.floor(Math.random() * 5 + 1),
      },
      token
    )
    expect(res.message).toBe("Rating added successfully")
    expect(res.success).toBe(true)
  })
})
