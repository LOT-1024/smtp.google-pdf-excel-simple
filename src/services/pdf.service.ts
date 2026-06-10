import PDFDocument from "pdfkit";
import fs from "fs";

export async function generatePdf(
  filePath: string,
  reportData: any
): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    // Logo
    doc.image("src/assets/logo.png", 50, 30, {
      width: 100,
    });

    doc.moveDown(4);

    doc.fontSize(20).text("Employee Report");

    doc.moveDown();

    doc.text(`Name: ${reportData.name}`);
    doc.text(`Department: ${reportData.department}`);
    doc.text(`Date: ${reportData.date}`);

    doc.moveDown();

    reportData.activities.forEach((activity: any) => {
      doc.text(
        `${activity.task} - ${activity.hours} hours`
      );
    });

    // Signature
    doc.image(
      "src/assets/signature.png",
      350,
      600,
      {
        width: 120,
      }
    );

    // Stamp
    doc.image(
      "src/assets/stamp.png",
      300,
      550,
      {
        width: 100,
      }
    );

    doc.end();

    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });
}