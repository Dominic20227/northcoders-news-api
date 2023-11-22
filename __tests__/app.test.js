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

describe("8 CORE: PATCH /api/articles/:article_id", () => {
  const patchData = { inc_votes: 1 };
  it("200: returns article with updated votes, when passed a valid number of an article in request body", () => {
    return request(app)
      .patch("/api/articles/7")
      .send(patchData)
      .expect(200)
      .then(({ body }) => {
        const { updatedArticle } = body;

        expect(updatedArticle).toEqual({
          article_id: 7,
          title: "Z",
          topic: "mitch",
          author: "icellusedkars",
          body: "I was hungry.",
          created_at: "2020-01-07T14:08:00.000Z",
          votes: 1,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  it("400: responds with bad request, when trying to insert a non numeric data type as a value", () => {
    const patchData = { inc_votes: "hello" };

    return request(app)
      .patch("/api/articles/7")
      .send(patchData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 bad request");
      });
  });

  it("404: responds with bad request, when trying to insert  numeric data type into out of range article_id", () => {
    const patchData = { inc_votes: 2 };

    return request(app)
      .patch("/api/articles/99")
      .send(patchData)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404 not found");
      });
  });

  it("400: responds with bad request, when trying to insert  numeric data type to invalid endpoint", () => {
    const patchData = { inc_votes: 2 };

    return request(app)
      .patch("/api/articles/banana")
      .send(patchData)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("400 bad request");
      });
  });
});
