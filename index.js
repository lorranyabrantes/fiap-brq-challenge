import express from "express";
import { GetCandidate } from "./src/Get/Candidate";
import { GetCertificate } from "./src/Get/Certificate";
import { GetSkill } from "./src/Get/Skill";
import { PostCandidate } from "./src/Post/Candidate";
import { PostCertificate } from "./src/Post/Certificate";
import { PostSkill } from "./src/Post/Skill";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ index: "index" });
});

app.get("/candidate", async (req, res) => {
  GetCandidate(req.query, (response) => {
    const data = response;
    res.json({ data });
  });
});

app.post("/candidate", function (req, res) {
  PostCandidate(req.body, (data) => {
    res.json(data);
  });
});

app.get("/certificate", async (req, res) => {
  GetCertificate((data) => {
    res.json({ data });
  });
});

app.post("/certificate", function (req, res) {
  PostCertificate(req.body, (data) => {
    res.json(data);
  });
});

app.get("/skill", async (req, res) => {
  GetSkill((data) => {
    res.json({ data });
  });
});

app.post("/skill", function (req, res) {
  PostSkill(req.body, (data) => {
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
