const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection.js");

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

describe("CORE: GET /api", () => {
  it("responds with array of endpoints in the form of object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        body = Object.values(body);

        body.forEach((item) => {
          expect(item).toHaveProperty("description");
          expect(item).toHaveProperty("queries");
          expect(item).toHaveProperty("exampleResponse");
        });
      });
  });
});
