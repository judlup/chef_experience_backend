import StatusCode from "status-code-enum"
import request from "supertest"
import app from "../app"

describe("GET /", () => {
  it("should return 200 OK", () => {
    return request(app).get("/").expect(StatusCode.SuccessOK)
  })

  it("should return a message", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.body.message).toBe("It's working!")
      })
  })

  describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/")
      expect(response.statusCode).toBe(StatusCode.SuccessOK)
      expect(response.body.message).toBe("It's working!")
    })
  })
})
