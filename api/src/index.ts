import express from "express";
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://redis:6379",
});

await redisClient.connect();

const app = express();
const port = 3000; // Linked to the port in the docker-compose file 🖇️

https: app.get("/", async (req, res) => {
  res.send("There are: " + (await redisClient.dbSize()) + " keys in the database");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
