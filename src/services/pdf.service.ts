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

export async function generateCV(
  filePath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header with name and title
    doc.fontSize(24).font("Helvetica-Bold").text("TUNGGUL WIDO KUNCORO", { align: "center" });
    doc.fontSize(14).font("Helvetica").text("IT Officer", { align: "center" });
    doc.moveDown(0.5);

    // Contact Information
    doc.fontSize(10).font("Helvetica");
    doc.text("Malang, Jawa Timur | Phone: +62 87726605991 | Email: tunggulwidokuncoro3@gmail.com", { align: "center" });
    doc.moveDown(1.5);

    // About Me Section
    doc.fontSize(12).font("Helvetica-Bold").text("Tentang Saya");
    doc.moveDown(0.3);
    doc.fontSize(10).font("Helvetica");
    doc.text("IT Officer dengan latar belakang Informatics Engineering dan pengalaman hands-on di pengembangan web & sistem. Terbiasa menganalisis masalah teknis, menjelaskan solusi secara jelas ke user non-teknis, serta berkolaborasi dengan tim developer dan operasional. Memiliki kemampuan dokumentasi, komunikasi, dan problem solving yang kuat relevan untuk mendukung produk digital logistik seperti Shipper.", {
      align: "justify",
    });
    doc.moveDown(1);

    // Experience Section
    doc.fontSize(12).font("Helvetica-Bold").text("Pengalaman");
    doc.moveDown(0.3);

    // Experience entries
    const experiences = [
      {
        title: "FrontEnd Webdev",
        period: "Juni 2025 - Sekarang",
        description: "Membuat situs web menggunakan teknologi Next js, React Js, Tailwindcss, Gitlab",
      },
      {
        title: "Programmer",
        period: "Februari 2025 - Maret 2025",
        description: "Membuat situs web menggunakan teknologi Next js, React Js, Django, ejs, express js, Flutter, SQLite",
      },
      {
        title: "Mandor",
        period: "Oktober 2024 - Maret 2025",
        description: "Mendokumentasikan kemajuan harian dengan foto dan video, serta catat pengeluaran di Excel dan tampilkan dengan diagram lingkaran.",
      },
      {
        title: "Freelance",
        period: "Juni 2023 - Maret 2024",
        description: "Membuat kasir untuk UMKM menggunakan teknologi Next Js, Nest Js, dan Postgresql",
      },
    ];

    experiences.forEach((exp) => {
      doc.fontSize(10).font("Helvetica-Bold").text(`${exp.title}`, { continued: true });
      doc.fontSize(9).font("Helvetica").text(` - ${exp.period}`, { align: "right" });
      doc.fontSize(9).font("Helvetica").text(exp.description, { indent: 10 });
      doc.moveDown(0.5);
    });

    doc.moveDown(0.5);

    // Education Section
    doc.fontSize(12).font("Helvetica-Bold").text("Education");
    doc.moveDown(0.3);

    doc.fontSize(10).font("Helvetica-Bold").text("STATE UNIVERSITY OF MALANG -- Bachelor of Informatics Engineering");
    doc.fontSize(9).font("Helvetica").text("Learning period 2019 -- 2023");
    doc.fontSize(9).font("Helvetica").text("Mempelajari dasar-dasar ilmu informatika dan diakhiri dengan penulisan skripsi berupa Klasifikasi Kelompok Bidang Keahlian (KBK) berdasarkan Judul dan Abstrak Skripsi.", {
      indent: 10,
    });
    doc.moveDown(0.5);

    doc.fontSize(10).font("Helvetica-Bold").text("Orbit Ventura Academy -- Foundation of AI & Life Skill for Gen Z");
    doc.fontSize(9).font("Helvetica").text("Learning period 1 March -- 31 July 2022");
    doc.fontSize(9).font("Helvetica").text("Merdeka Belajar Kampus Merdeka Bootcamp, which teaches about the basics of AI and life skills, including working on project assignments on implementing AI in everyday life.", {
      indent: 10,
    });
    doc.moveDown(1);

    // Skills Section
    doc.fontSize(12).font("Helvetica-Bold").text("Skills");
    doc.moveDown(0.3);

    const skillsLeft = [
      "• Programming basics (Python and C++)",
      "• Web development (HTML, CSS, JavaScript, git, ReactJs, ExpressJs)",
      "• Database (MySQL, PostgreSQL, SQLite)",
      "• Mobile development (Flutter and Kotlin)",
    ];

    const skillsRight = [
      "• Analytical and problem solving",
      "• Communication skill",
      "• Time management and task management",
      "• Technical documentation",
    ];

    const startX = doc.x;
    const leftColumnX = startX;
    const rightColumnX = startX + 250;

    // Two-column layout for skills
    skillsLeft.forEach((skill, i) => {
      doc.fontSize(9).font("Helvetica").text(skill, leftColumnX, doc.y, { width: 220 });
      if (skillsRight[i]) {
        doc.text(skillsRight[i], rightColumnX, doc.y - (i === 0 ? 0 : 12), { width: 220 });
      }
    });

    doc.end();

    stream.on("finish", () => resolve());
    stream.on("error", reject);
  });
}