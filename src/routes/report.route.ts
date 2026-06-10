import { Router } from "express";
import { sendReport } from "../controllers/report.controller";

const router = Router();

router.post(
  "/report/send",
  sendReport
);

export default router;