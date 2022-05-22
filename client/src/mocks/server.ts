import { setupServer } from "msw/node";
import { handlers } from "./handlers";

//console.log("server.ts runs setupServer with handlers");
localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZDcyZDE2Zjg5NWIxMTAwZGJhYjY2In0sImlhdCI6MTY0MzgxMDg2OX0.QvfZLV0HBznOEIMFOMAQNIsEpWjmEKtz6EqUNh9D--s"
);
// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
