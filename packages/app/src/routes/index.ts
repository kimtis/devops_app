import express from "express";
const router = express.Router();

router.get("/-/healthy", (req, res, next) => {
  res.send("Healthy");
});

export default router;
