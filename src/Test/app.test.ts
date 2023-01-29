const { makeRequest } = require("./utils/axios/axios.util")

describe("GET /", () => {
  it("should return the message It's working!", async () => {
    const res = await makeRequest(
      "GET",
      `http://localhost:${process.env.SERVER_PORT}/`,
      {}
    )
    expect(res.message).toBe("It's working!")
  })
})
