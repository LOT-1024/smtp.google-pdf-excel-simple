import ExcelJS from "exceljs";

export async function generateExcel(filePath: string, reportData: any) {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Report");

  sheet.columns = [
    {
      header: "Task",
      key: "task",
      width: 30,
    },
    {
      header: "Hours",
      key: "hours",
      width: 15,
    },
  ];

  reportData.activities.forEach((activity: any) => {
    sheet.addRow(activity);
  });

  await workbook.xlsx.writeFile(filePath);
}
