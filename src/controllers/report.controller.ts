import path from "path";
import fs from "fs";

import { generateCV, generatePdf } from "../services/pdf.service";
import { generateExcel } from "../services/excel.service";
import { sendEmail } from "../services/email.service";

export async function sendReport(
  req: any,
  res: any
) {
  try {
    const data = req.body;

    const timestamp = Date.now();

    const pdfPath = path.join(
      "temp",
      `${timestamp}.pdf`
    );

    const pdfCvPath = path.join(
      "temp",
      `${timestamp}_cv.pdf`
    );

    const excelPath = path.join(
      "temp",
      `${timestamp}.xlsx`
    );

    await generatePdf(pdfPath, data);

    await generateCV(pdfCvPath);

    await generateExcel(
      excelPath,
      data
    );

    await sendEmail(
      data.email,
      pdfPath,
      pdfCvPath,
      excelPath
    );

    fs.unlinkSync(pdfPath);
    fs.unlinkSync(pdfCvPath);
    fs.unlinkSync(excelPath);

    return res.status(200).json({
      message:
        "Report generated and sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed",
      error,
    });
  }
}