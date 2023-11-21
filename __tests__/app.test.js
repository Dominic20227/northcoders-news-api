const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeAll(() => {
  return seed(testData);
});

afterAll(() => db.end());

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

describe("CORE: GET /api/articles/:article_id/comments", () => {
  it("200:  responds with array of all comment objects with specified id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        console.log("comments-------->", comments);

        comments.forEach((comment) => {
          expect(comment.article_id).toBe(1);
        });
      });
  });

  it("404: responds with object containing message 404 when article id is out of range", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404 not found");
      });
  });

  it("400: responds with object containing message 400 when passed invalid article id ", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 bad request");
      });
  });
});
