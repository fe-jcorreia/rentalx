import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World" });
});

app.post("/courses", (request, response) => {
  const { name } = request.body;
  return response.status(201).json({ name });
});

app.listen(3333, () => console.log("Server is Running!"));
