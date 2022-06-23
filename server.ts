import app from "./app";
import express from "express";
import path from "path";

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  //app.get("/*", (req, res) => res.send("404"));
  app.get("/*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "public", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
