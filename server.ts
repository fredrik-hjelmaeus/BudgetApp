import app from "./app";
import express from "express";
import path from "path";

// Serve static assets in production
/* if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    console.log("detecting request in server.ts");
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
