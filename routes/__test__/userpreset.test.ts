import request from "supertest";
import app from "../../app";
jest.mock("../../utils/sendEmail");

describe("Get logged in user all presets", () => {
  it("successfully gets only the users presets", async () => {
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    // get presets
    const res = await request(app)
      .get("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .expect(200);
    expect(res.body).toEqual([]);
  });
  it("fails if not logged in", async () => {
    // get presets
    const res = await request(app).get("/api/userpreset").expect(401);
    expect(res.body.errors[0].msg).toEqual("No token, authorization denied"); // <-- auth middleware
  });
});

describe("Add new preset", () => {
  const testpreset = {
    name: "test",
    number: 200,
    month: "january",
    category: "test",
    type: "test",
  };
  it("happy path ,added new preset", async () => {
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send(testpreset)
      .expect(200);
    expect(res.body.name).toEqual("test");
  });
  it("fails when not logged in", async () => {
    const res = await request(app).post("/api/userpreset").send(testpreset).expect(401);
    expect(res.body.errors[0].msg).toEqual("No token, authorization denied");
  });
  it("fails with empty body", async () => {
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send({})
      .expect(400);
    expect(res.body.errors.length).toBe(6);
  });
  it("fails without name", async () => {
    const testpreset2 = { number: 200, month: "january", category: "test", type: "test" };
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send(testpreset2)
      .expect(400);
    expect(res.body.errors[0].msg).toEqual("Name is required");
  });
  it("fails without number", async () => {
    const testpreset2 = { name: "what", month: "january", category: "test", type: "test" };
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send(testpreset2)
      .expect(400);
    expect(res.body.errors[0].msg).toEqual("Number is required");
  });
  it("fails without month", async () => {
    const testpreset2 = { name: "what", number: 200, category: "test", type: "test" };
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send(testpreset2)
      .expect(400);
    expect(res.body.errors[0].msg).toEqual("Month is required");
  });
  it("fails without category", async () => {
    const testpreset2 = { name: "what", number: 200, month: "test", type: "test" };
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send(testpreset2)
      .expect(400);
    expect(res.body.errors[0].msg).toEqual("Category is required");
  });
  it("fails without type", async () => {
    const testpreset2 = { name: "what", number: 200, category: "test", month: "test" };
    // Relies on Signup to get token
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" })
      .expect(201);

    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send(testpreset2)
      .expect(400);
    expect(res.body.errors[0].msg).toEqual("Type is required");
  });
});

const setup = async () => {
  const testpreset = {
    name: "test",
    number: 200,
    month: "january",
    category: "test",
    type: "test",
  };
  // Relies on Signup to get token, creates new user
  try {
    const response = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" });
    const res = await request(app)
      .post("/api/userpreset")
      .set("x-auth-token", response.body.token)
      .send(testpreset);
    const setupObj = { token: response.body.token, presetId: res.body._id };
    return setupObj;
  } catch (error) {
    if (error instanceof Error) return error.message;
  }
  // return setup;
};

describe("Update preset", () => {
  it("happy path, update all preset fields", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }
    const response = await request(app)
      .put(`/api/userpreset/${testSetupObjects.presetId}`)
      .set("x-auth-token", testSetupObjects.token)
      .send({
        name: "fett",
        number: 120,
        type: "flood",
        category: "none",
        piggybank: [{ month: "feb", year: "2000", savedAmount: 200 }],
      })
      .expect(200);

    expect(response.body.name).toEqual("fett");
    expect(response.body.number).toEqual(120);
    expect(response.body.type).toEqual("flood");
    expect(response.body.category).toEqual("none");
    expect(response.body.piggybank[0].year).toEqual(2000);
  });

  it("fails when not logged in", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }

    const response = await request(app)
      .put(`/api/userpreset/${testSetupObjects.presetId}`)
      .send({
        name: "fett",
        number: 120,
        type: "flood",
        category: "none",
        piggybank: [{ month: "feb", year: "2000", savedAmount: "200" }],
      })
      .expect(401);
    expect(response.body.errors[0].msg).toEqual("No token, authorization denied"); // <-- auth middleware
  });

  it("fails with no preset id in endpoint", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }
    const { token } = testSetupObjects;
    await request(app)
      .put(`/api/userpreset/`)
      .set("x-auth-token", token)
      .send({ name: "fett" })
      .expect(404);
  });

  it("fails with invalid preset id", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }
    const { token } = testSetupObjects;
    // not a valid mongoose hex id.
    const invalidMongoosePresetId = "61ed41d89e82db28547a6a033";
    const res = await request(app)
      .put(`/api/userpreset/${invalidMongoosePresetId}`)
      .set("x-auth-token", token)
      .send({ name: "fett" })
      .expect(400);
    expect(res.body.errors[0].msg).toEqual("Invalid preset id provided");
  });

  it("fails when trying to edit another users preset", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }

    // register a new user and recieve token
    const anotherUser = await request(app)
      .post("/api/users/")
      .set("my_user-agent", "react")
      .send({
        email: "gris@test.com",
        name: "fredags",
        password: "Passw0rd!",
      })
      .expect(201);

    const response = await request(app)
      .put(`/api/userpreset/${testSetupObjects.presetId}`)
      .set("x-auth-token", anotherUser.body.token)
      .send({
        name: "fett",
        number: 120,
        type: "flood",
        category: "none",
        piggybank: [{ month: "feb", year: "2000", savedAmount: "200" }],
      })
      .expect(401);
    expect(response.body.errors[0].msg).toEqual("Not authorized");
  });

  it("fails when sending empty obj", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }

    const response = await request(app)
      .put(`/api/userpreset/${testSetupObjects.presetId}`)
      .set("x-auth-token", testSetupObjects.token)
      .send({})
      .expect(400);
    expect(response.body.errors[0].msg).toEqual("Found no fields to update on preset");
  });

  it("update only a single field", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }

    const response = await request(app)
      .put(`/api/userpreset/${testSetupObjects.presetId}`)
      .set("x-auth-token", testSetupObjects.token)
      .send({ name: "fett" })
      .expect(200);

    expect(response.body.name).toEqual("fett");
  });

  it("fails on invalid number input", async () => {
    const testSetupObjects = await setup();
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }

    const response = await request(app)
      .put(`/api/userpreset/${testSetupObjects.presetId}`)
      .set("x-auth-token", testSetupObjects.token)
      .send({ number: "fett" })
      .expect(400);
    expect(response.body.errors[0].msg).toEqual(
      "Number must be of type number, provided was of type: string"
    );
  });
});

describe("Delete preset", () => {
  it("successfully deletes preset", async () => {
    const testSetupObjects = await setup(); // create new user token and a new presetId
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }
    const { token, presetId } = testSetupObjects;
    const res = await request(app)
      .delete(`/api/userpreset/${presetId}`)
      .set("x-auth-token", token)
      .expect(200);
    expect(res.body.msg).toEqual("Preset removed");
  });
  it("fails when not logged in", async () => {
    const testSetupObjects = await setup(); // create new user token and a new presetId
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }
    const res = await request(app)
      .delete(`/api/userpreset/${testSetupObjects.presetId}`)
      .expect(401);

    expect(res.body.errors[0].msg).toEqual("No token, authorization denied");
  });
  it("fails with invalid preset id ", async () => {
    const testSetupObjects = await setup(); // create new user token and a new presetFields
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }
    const { token } = testSetupObjects;
    const invalidPresetId = "61ed434ee9ae521d2cbfc80e";
    const res = await request(app)
      .delete(`/api/userpreset/${invalidPresetId}`)
      .set("x-auth-token", token)
      .expect(404);
    expect(res.body.errors[0].msg).toEqual("Preset not found");

    // not a valid mongoose hex id.
    const invalidMongoosePresetId = "61ed41d89e82db28547a6a033";
    const res2 = await request(app)
      .delete(`/api/userpreset/${invalidMongoosePresetId}`)
      .set("x-auth-token", token)
      .expect(400);
    expect(res2.body.errors[0].msg).toEqual("Invalid preset id provided");
  });
  it("fails when trying to delete another users preset", async () => {
    const testSetupObjects = await setup(); // create new user token and a new presetId
    if (typeof testSetupObjects === "string" || testSetupObjects === undefined) {
      throw new Error("setup failed");
    }
    const { presetId } = testSetupObjects;
    // register new user and get logged in
    const response = await request(app)
      .post("/api/users/")
      .set("my_user-agent", "react")
      .send({
        email: "gris@test.com",
        name: "fredags",
        password: "Passw0rd!",
      })
      .expect(201);

    const res = await request(app)
      .delete(`/api/userpreset/${presetId}`)
      .set("x-auth-token", response.body.token)
      .expect(401);

    expect(res.body.errors[0].msg).toEqual("Not authorized");
  });
});
