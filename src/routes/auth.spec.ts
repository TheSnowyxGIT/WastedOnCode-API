import mongoose from "mongoose";
import connect from "../db/connect";
import request from "supertest"
import app from "../app";

beforeAll(done => {
    if (process.env.NODE_ENV !== "test"){
        return done(new Error("NODE_ENV is not 'test'"))
    }
    connect().then(() => done()).catch(err => done(err))
})

afterEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        await collection.drop();
    }
})

afterAll(async () => {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        await collection.drop();
    }
    await mongoose.disconnect()
})

describe("Auth route", () => {

    it("POST /register --> created user", () => {
        return request(app)
            .post("/auth/users")
            .send({
                email: "my.mail@domain.com",
                password: "myPassword"
            }).expect("Content-Type", /json/).expect(201)
            .then(response => {
                expect(response.body).toEqual(expect.objectContaining({
                    email: "my.mail@domain.com",
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    _id: expect.any(String),
                    __v: expect.any(Number)
                }))
                expect(new Date(response.body.createdAt).getTime()).not.toBeNaN();
                expect(new Date(response.body.updatedAt).getTime()).not.toBeNaN(); 
            })
    })

    it("POST /register --> invalid email", () => {
        return request(app)
            .post("/auth/users")
            .send({
                email: "my.maildomain.com",
                password: "myPassword"
            }).expect("Content-Type", /json/).expect(400)
    })

    it("POST /register --> too short password", () => {
        return request(app)
            .post("/auth/users")
            .send({
                email: "my.mail@domain.com",
                password: "my"
            }).expect("Content-Type", /json/).expect(400)
    })

    it("POST /register --> invalid chars password", () => {
        return request(app)
            .post("/auth/users")
            .send({
                email: "my.mail@domain.com",
                password: "{ù=||æ║"
            }).expect("Content-Type", /json/).expect(400)
    })

    it("POST /register --> missing password", () => {
        return request(app)
            .post("/auth/users")
            .send({
                email: "my.mail@domain.com",
            }).expect("Content-Type", /json/).expect(400)
    })

    it("POST /register --> missing email", () => {
        return request(app)
            .post("/auth/users")
            .send({
                password: "myPassword"
            }).expect("Content-Type", /json/).expect(400)
    })


    /* Sessions */

    it("POST /sessions --> created session", () => {
        // create user
        return request(app).post("/auth/users").send({
            email: "my.mail@domain.com",
            password: "myPassword"
        }).then(() => {
            return request(app)
                .post("/auth/sessions")
                .send({
                    email: "my.mail@domain.com",
                    password: "myPassword"
                }).expect("Content-Type", /json/).expect(200)
                .then(response => {
                    expect(response.body).toEqual(expect.objectContaining({
                        accessToken: expect.any(String),
                        refreshToken: expect.any(String)
                    }))
                })
        })
    })

    it("POST /sessions --> unknown user", () => {
        // create user
        return request(app)
            .post("/auth/sessions")
            .send({
                email: "my.mail@domain.com",
                password: "myPassword"
            }).expect("Content-Type", /json/).expect(401)
    })

    it("POST /sessions --> invalid password", () => {
        // create user
        return request(app).post("/auth/users").send({
            email: "my.mail@domain.com",
            password: "myPassword"
        }).then(() => {
            return request(app)
                .post("/auth/sessions")
                .send({
                    email: "my.mail@domain.com",
                    password: "myPasswordFAKE"
                }).expect("Content-Type", /json/).expect(401)
        })
    })

    it("POST /sessions --> missing email", () => {
        return request(app)
            .post("/auth/sessions")
            .send({
                password: "myPassword"
            }).expect("Content-Type", /json/).expect(400)
    })

    it("POST /sessions --> missing password", () => {
        return request(app)
            .post("/auth/sessions")
            .send({
                email: "my.mail@domain.com",
            }).expect("Content-Type", /json/).expect(400)
    })

    it("POST /sessions --> invalid email", () => {
        return request(app)
            .post("/auth/sessions")
            .send({
                email: "my.maildomain.com",
                password: "myPassword"
            }).expect("Content-Type", /json/).expect(400)
    })
})



