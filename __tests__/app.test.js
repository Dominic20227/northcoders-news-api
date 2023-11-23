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

describe("Task 2: CORE: GET /api/topics", () => {
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

describe("Task 6: CORE: GET /api/articles/:article_id/comments", () => {
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
=======
describe("Task 5: CORE: GET /api/articles", () => {
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

        expect(articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("Task 4: CORE: GET /api/articles/:article_id", () => {
  it("sends array containing the object with specified article id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const article = body.article[0];

        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });

  it("return 404 not found when article_id is out of range", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "404 not found" });
      });
  });

  it("returns 400 bad request when passed an invalid datatype for article_id", () => {
    return request(app)
      .get("/api/articles/hello")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "400 bad request" });
      });
  });
});

describe("Task 3: CORE: GET /api", () => {
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


