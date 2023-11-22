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

describe("CORE: GET /api/articles", () => {
  it("retrieves array of articles in decending order by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;

        expect(articles).toHaveLength(13);

        articles.forEach((article, i) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });

        for (let i = 0; i < articles.length - 1; i++) {
          if (
            Date.parse(articles[i].created_at) <
            Date.parse(articles[i + 1].created_at)
          ) {
            expect(false).toBe(true);
          }
        }
      });
  });
});
