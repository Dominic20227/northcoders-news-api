const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection");

beforeAll(() => {
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

describe("Task 7 - CORE: POST /api/articles/:article_id/comments", () => {
  it("201: posts new comment in comments table, returns the posted document", () => {
    const postData = { username: "icellusedkars", body: "test123" };
    return request(app)
      .post("/api/articles/2/comments")
      .send(postData)
      .expect(201)
      .then(({ body }) => {
        console.log(body);
        const { comments } = body;

        comments.forEach((comment) => {
          expect(comment).toEqual({
            comment_id: 19,
            body: "test123",
            article_id: 2,
            author: "icellusedkars",
            votes: 0,
            created_at: expect.any(String),
          });
        });
      });
  });

  it("400 responds with bad request when given invalid parametic endpoint", () => {
    const postData = { username: "icellusedkars", body: "test123" };

    return request(app)
      .post("/api/articles/99/comments")
      .send(postData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 bad request");
      });
  });

  it.only("400 responds with bad request when given invalid query", () => {
    const postData = { username: "JIM", body: "test123" };

    return request(app)
      .post("/api/articles/2/comments")
      .send(postData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 bad request");
      });
  });
});
