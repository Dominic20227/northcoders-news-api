const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("CORE: GET /api/topics", () => {
  it("responds with an array of topic objects - with properties slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(3);
        body.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("Task 9: CORE: DELETE /api/comments/:comment_id", () => {
  it("204: responds with 204 message when comment is deleted by providing valid id", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  it("404: responds with 404 message when invalid id provided", () => {
    return request(app)
      .delete("/api/comments/99")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("404 not found");
      });
  });
});
