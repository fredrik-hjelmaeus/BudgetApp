import request from "supertest";
import app from "../../app";
import path from "path";
jest.mock("../../utils/sendEmail");

// All below tests rely on testfiles stored in _data/csv_testfiles/ -folder

describe("csvtojson", () => {
  it("Successfull handelsbanken csv conversion on valid file", async () => {
    // prettier-ignore
    const response = await request(app)
    .post('/api/users')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "handelsbanken",
        path.resolve(__dirname, "../../_data/csv_testfiles/handelsbanken.csv")
      )
      .expect(200);
    // check that some data from the converted file exist
    expect(res.body[0].number).toEqual("-188752.33");
  });

  it("reports error on invalid handelsbanken csv fields", async () => {
    // prettier-ignore
    const response = await request(app)
    .post('/api/users')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "handelsbanken",
        path.resolve(__dirname, "../../_data/csv_testfiles/Handelsbanken_invalid_fields.csv")
      )
      .expect(400);
    expect(res.text).toEqual("File does not contain valid Handelsbanken-values!");
  });

  it("reports error on invalid rfc4180 csv ", async () => {
    // prettier-ignore
    const response = await request(app)
    .post('/api/users')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("RFC4180", path.resolve(__dirname, "../../_data/csv_testfiles/RFC4180_invalid.csv"))
      .expect(400);
    expect(res.text).toEqual("CSV does not contain valid RFC4180-values!");
    // TODO: make a error response using the middleware-err
  });

  it("Successfull on large valid rfc4180 csv ", async () => {
    // prettier-ignore
    const response = await request(app)
    .post('/api/users')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "RFC4180",
        path.resolve(__dirname, "../../_data/csv_testfiles/RFC4180_verylargefile.csv")
      )
      .expect(200);

    expect(res.body[0].row.order_line_id).toEqual("10763-1GUI85-1");
  });

  it("Fails on old Nordea valid format csv ", async () => {
    // prettier-ignore
    const response = await request(app)
    .post('/api/users')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("nordea", path.resolve(__dirname, "../../_data/csv_testfiles/Nordea_valid.csv"))
      .expect(400);
    // expect(res.body[0].number).toEqual("-276,40");
  });

  it("Succeeds on new Nordea valid format", async () => {
    const responses = await request(app)
      .post("/api/users")
      .send({ email: "nisse@manpower.se", name: "nisse", password: "Passw0rd!" });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", responses.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "nordea",
        path.resolve(__dirname, "../../_data/csv_testfiles/March 2022 new_nordea_format.csv")
      )
      .expect(200);
  });

  it("fail on invalid Nordea csv ", async () => {
    // prettier-ignore
    const response = await request(app)
    .post('/api/users')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("nordea", path.resolve(__dirname, "../../_data/csv_testfiles/Nordea_invalid.csv"))
      .expect(400);
    expect(res.text).toEqual("CSV does not contain valid Nordea-values!");
  });

  it("fail on valid nordea but wrong delimiter selected", async () => {
    // prettier-ignore
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("RFC4180", path.resolve(__dirname, "../../_data/csv_testfiles/Nordea_valid.csv"))
      .expect(400);
    expect(res.text).toEqual("CSV does not contain valid RFC4180-values!");
  });
  it("fail on valid rfc4180 but wrong delimiter (nordea) selected", async () => {
    // prettier-ignore
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "nordea",
        path.resolve(__dirname, "../../_data/csv_testfiles/RFC4180_verylargefile.csv")
      )
      .expect(400);

    expect(res.text).toEqual("CSV does not contain valid Nordea-values!");
  });

  it("fail on valid rfc4180 but wrong delimiter (swedbank) selected", async () => {
    // prettier-ignore
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "swedbank",
        path.resolve(__dirname, "../../_data/csv_testfiles/RFC4180_verylargefile.csv")
      )
      .expect(400);

    expect(res.text).toEqual("CSV does not contain valid Swedbank-values!");
  });

  it("fail on valid handelsbanken but wrong delimiter selected", async () => {
    // prettier-ignore
    const response = await request(app)
    .post('/api/users')
    .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("nordea", path.resolve(__dirname, "../../_data/csv_testfiles/handelsbanken.csv"))
      .expect(400);

    expect(res.text).toEqual("CSV does not contain valid Nordea-values!");
  });

  it("fail on valid swedbank but wrong delimiter selected", async () => {
    // prettier-ignore
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "nordea",
        path.resolve(
          __dirname,
          "../../_data/csv_testfiles/Swedbank_Transaktioner_2020-11-03_13-43-18.csv"
        )
      )
      .expect(400);

    expect(res.text).toEqual("CSV does not contain valid Nordea-values!");
  });

  it("Successfull Swedbank conversion", async () => {
    // prettier-ignore
    const response = await request(app)
        .post('/api/users')
        .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "swedbank",
        path.resolve(
          __dirname,
          "../../_data/csv_testfiles/Swedbank_Transaktioner_2020-11-03_13-43-18.csv"
        )
      )
      .expect(200);

    expect(res.body[0].number).toEqual(1);
  });
  it("fail on invalid file-extension", async () => {
    // prettier-ignore
    const response = await request(app)
        .post('/api/users')
        .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "swedbank",
        path.resolve(__dirname, "../../_data/csv_testfiles/Invalid_fileextension.xlsx")
      )
      .expect(400);

    expect(res.text).toEqual("Wrong filetype, only accepts csv!");
  });

  it("successfull valid ofx-conversion", async () => {
    // prettier-ignore
    const response = await request(app)
     .post('/api/users')
     .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("ofx", path.resolve(__dirname, "../../_data/csv_testfiles/OFX.ofx"))
      .expect(200);

    expect(res.body[0].number).toEqual("-200.00");
  });

  it("fail on invalid ofx", async () => {
    // prettier-ignore
    const response = await request(app)
     .post('/api/users')
     .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "ofx",
        path.resolve(__dirname, "../../_data/csv_testfiles/OFX_invalid_numberfield.ofx")
      )
      .expect(400);
    expect(res.text).toEqual("Invalid OFX file!");
  });

  it("fail on valid ofx but wrong delimiter provided", async () => {
    // prettier-ignore
    const response = await request(app)
        .post('/api/users')
        .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("swedbank", path.resolve(__dirname, "../../_data/csv_testfiles/OFX.ofx"))
      .expect(400);
    expect(res.text).toEqual("Wrong filetype, only accepts csv!");
  });

  it("fail on ofx provided as delimiter,but file is csv or other", async () => {
    // prettier-ignore
    const response = await request(app)
        .post('/api/users')
        .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .attach("ofx", path.resolve(__dirname, "../../_data/csv_testfiles/Nordea_valid.csv"))
      .expect(400);
    expect(res.text).toEqual("Wrong filetype, only accepts ofx!");
  });

  it("fail because no file was provided", async () => {
    // prettier-ignore
    const response = await request(app)
     .post('/api/users')
     .send({ email: 'nisse@manpower.se', name: 'nisse', password: 'Passw0rd!' });
    // send the formdata
    const res = await request(app)
      .post("/api/userpreset/upload")
      .set("x-auth-token", response.body.token)
      .set("Content-Type", "multipart/form-data")
      .send()
      .expect(400);

    expect(res.text).toEqual("No File Uploaded");
  });
});
