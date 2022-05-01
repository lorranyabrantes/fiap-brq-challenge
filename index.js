import express from "express";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ index: "index" });
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
