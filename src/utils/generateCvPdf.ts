import { jsPDF } from 'jspdf';
import { CVData, Language, TemplateStyle } from '../types/cv';

const SECTION_LABELS = {
  id: {
    summary: 'Ringkasan Profesional',
    experience: 'Pengalaman Kerja',
    projects: 'Proyek & Pencapaian Utama',
    education: 'Pendidikan',
    skills: 'Keahlian Teknis',
    certifications: 'Sertifikasi & Pelatihan',
    gpa: 'IPK',
  },
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    projects: 'Key Projects & Achievements',
    education: 'Education',
    skills: 'Technical Skills',
    certifications: 'Certifications & Training',
    gpa: 'GPA',
  },
};

function cleanDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function downloadCVPdf(
  data: CVData,
  lang: Language,
  template: TemplateStyle = 'ats'
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const t = SECTION_LABELS[lang];
  const isEditorial = template === 'editorial';
  const fontBody = isEditorial ? 'times' : 'helvetica';
  const fontHeading = isEditorial ? 'times' : 'helvetica';

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 16;
  const marginTop = 16;
  const maxContentY = pageHeight - 22;
  const contentWidth = pageWidth - marginX * 2;

  let y = marginTop;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > maxContentY) {
      doc.addPage();
      y = marginTop;
    }
  };

  const drawSectionTitle = (title: string) => {
    ensureSpace(12);
    y += 3;
    doc.setFont(fontHeading, 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 42, 92);
    doc.text(title.toUpperCase(), marginX, y);
    y += 1.8;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 4.5;
  };

  const drawWrappedText = (
    text: string,
    x: number,
    width: number,
    fontSize: number,
    lineHeightMm: number,
    color: [number, number, number] = [51, 65, 85],
    fontStyle: 'normal' | 'bold' = 'normal'
  ) => {
    doc.setFont(fontBody, fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, width) as string[];
    for (const line of lines) {
      ensureSpace(lineHeightMm + 1);
      doc.text(line, x, y);
      y += lineHeightMm;
    }
  };

  // Header
  doc.setFont(fontHeading, 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 42, 92);
  doc.text(data.fullName || 'Curriculum Vitae', marginX, y);
  y += 6;

  if (data.headline[lang]) {
    doc.setFont(fontBody, 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(37, 99, 235);
    doc.text(data.headline[lang], marginX, y);
    y += 5;
  }

  const contacts = [
    data.location,
    data.email,
    data.phone,
    data.linkedin ? cleanDisplayUrl(data.linkedin) : '',
    data.portfolioUrl ? cleanDisplayUrl(data.portfolioUrl) : '',
  ]
    .filter(Boolean)
    .join('  ·  ');

  if (contacts) {
    drawWrappedText(contacts, marginX, contentWidth, 8.8, 4.2, [71, 85, 105]);
  }

  y += 1.5;
  doc.setDrawColor(15, 42, 92);
  doc.setLineWidth(0.6);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 4.5;

  // Summary
  if (data.summary[lang]) {
    drawSectionTitle(t.summary);
    drawWrappedText(
      data.summary[lang],
      marginX,
      contentWidth,
      9.5,
      4.5,
      [51, 65, 85]
    );
    y += 1.5;
  }

  // Work Experience
  if (data.experiences.length > 0) {
    drawSectionTitle(t.experience);
    for (const exp of data.experiences) {
      ensureSpace(16);

      doc.setFont(fontBody, 'bold');
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);

      const periodText = exp.period[lang] || '';
      const periodWidth = doc.getTextWidth(periodText);
      const roleMaxWidth = contentWidth - periodWidth - 6;
      const roleLines = doc.splitTextToSize(
        exp.role[lang],
        roleMaxWidth
      ) as string[];

      doc.text(roleLines[0] || '', marginX, y);
      if (periodText) {
        doc.setFont(fontBody, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(periodText, pageWidth - marginX, y, { align: 'right' });
      }
      y += 4.4;

      for (let i = 1; i < roleLines.length; i++) {
        ensureSpace(4.5);
        doc.setFont(fontBody, 'bold');
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(roleLines[i], marginX, y);
        y += 4.4;
      }

      const orgLine = [exp.company, exp.location].filter(Boolean).join(' · ');
      if (orgLine) {
        doc.setFont(fontBody, 'bold');
        doc.setFontSize(9);
        doc.setTextColor(37, 99, 235);
        doc.text(orgLine, marginX, y);
        y += 4.4;
      }

      for (const bullet of exp.highlights[lang]) {
        ensureSpace(5);
        doc.setFont(fontBody, 'normal');
        doc.setFontSize(9.2);
        doc.setTextColor(51, 65, 85);
        doc.text('•', marginX + 1.5, y);
        const bulletLines = doc.splitTextToSize(
          bullet,
          contentWidth - 6
        ) as string[];
        for (let i = 0; i < bulletLines.length; i++) {
          if (i > 0) ensureSpace(4.4);
          doc.text(bulletLines[i], marginX + 5.5, y);
          y += 4.3;
        }
      }

      y += 2.2;
    }
  }

  // Education
  if (data.education.length > 0) {
    drawSectionTitle(t.education);
    for (const edu of data.education) {
      ensureSpace(12);
      const rightLabel = [
        edu.period[lang],
        edu.gpa ? `${t.gpa} ${edu.gpa}` : '',
      ]
        .filter(Boolean)
        .join(' · ');

      doc.setFont(fontBody, 'bold');
      doc.setFontSize(9.8);
      doc.setTextColor(15, 23, 42);
      const degText = edu.degree[lang];
      const rightW = rightLabel ? doc.getTextWidth(rightLabel) + 6 : 0;
      const degLines = doc.splitTextToSize(
        degText,
        contentWidth - rightW
      ) as string[];

      doc.text(degLines[0] || '', marginX, y);
      if (rightLabel) {
        doc.setFont(fontBody, 'normal');
        doc.setFontSize(8.8);
        doc.setTextColor(100, 116, 139);
        doc.text(rightLabel, pageWidth - marginX, y, { align: 'right' });
      }
      y += 4.4;

      for (let i = 1; i < degLines.length; i++) {
        ensureSpace(4.4);
        doc.setFont(fontBody, 'bold');
        doc.setFontSize(9.8);
        doc.setTextColor(15, 23, 42);
        doc.text(degLines[i], marginX, y);
        y += 4.4;
      }

      if (edu.institution) {
        doc.setFont(fontBody, 'bold');
        doc.setFontSize(9);
        doc.setTextColor(37, 99, 235);
        doc.text(edu.institution, marginX, y);
        y += 4.3;
      }

      if (edu.notes[lang]) {
        drawWrappedText(
          edu.notes[lang],
          marginX,
          contentWidth,
          9,
          4.2,
          [71, 85, 105]
        );
      }
      y += 1.5;
    }
  }

  // Skills
  if (data.skillGroups.length > 0) {
    drawSectionTitle(t.skills);
    for (const group of data.skillGroups) {
      ensureSpace(8);
      const labelPrefix = `${group.label[lang]}: `;
      const fullLine = `${labelPrefix}${group.items.join(', ')}`;
      drawWrappedText(fullLine, marginX, contentWidth, 9.2, 4.3, [51, 65, 85]);
    }
    y += 1.5;
  }

  // Certifications
  if (data.certifications.length > 0) {
    drawSectionTitle(t.certifications);
    for (const cert of data.certifications) {
      ensureSpace(6);
      const line = `• ${cert.name[lang]} — ${cert.issuer} (${cert.year})`;
      drawWrappedText(line, marginX, contentWidth, 9, 4.2, [51, 65, 85]);
    }
  }

  // Centered bottom footer on every page (no top timestamp header!)
  const totalPages = doc.getNumberOfPages();
  const footerText = `CV — ${data.fullName || 'Curriculum Vitae'}`;
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont(fontBody, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  const safeFileName = (data.fullName || 'CV')
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  doc.save(`CV_${safeFileName}_${lang.toUpperCase()}.pdf`);
}
