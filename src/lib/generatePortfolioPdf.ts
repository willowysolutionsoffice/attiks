import { jsPDF } from 'jspdf';
import { Project, projects as fallbackProjects } from '@/data/projects';

// Helper to convert an image URL to base64 for jsPDF
async function getBase64Image(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width || 800;
          canvas.height = img.naturalHeight || img.height || 600;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(null);
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataURL);
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      // 2.5s timeout safety
      setTimeout(() => resolve(null), 2500);
    } catch {
      resolve(null);
    }
  });
}

export async function generatePortfolioPdf({
  category,
  projects = [],
}: {
  category?: string;
  projects?: Project[];
}): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  const activeProjects = projects && projects.length > 0 ? projects : fallbackProjects;
  const filtered = category && category !== 'all'
    ? activeProjects.filter((p) => p.category === category)
    : activeProjects;

  const categoryName = category && category !== 'all'
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Complete Studio';

  const currentYear = new Date().getFullYear();

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  // Background Fill (Deep Minimalist Black/Dark Tone)
  doc.setFillColor(13, 13, 13);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative Accent Line
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.6);
  doc.line(margin, margin + 15, margin + 40, margin + 15);

  // Studio Header Logo Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('ATTIKS ARCHITECTURE', margin, margin + 30);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(180, 180, 180);
  doc.text('CONTEMPORARY PRACTICE • KERALA & INTERNATIONAL', margin, margin + 37);

  // Center Block: Portfolio Title
  const centerY = 135;
  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'bold');
  doc.setFontSize(32);
  doc.text(categoryName.toUpperCase(), margin, centerY);
  doc.setFontSize(26);
  doc.text('PORTFOLIO LOOKBOOK', margin, centerY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(200, 200, 200);
  doc.text(
    `A curated collection of ${filtered.length} architectural landmarks and spatial explorations.`,
    margin,
    centerY + 24
  );

  // Bottom Metadata
  doc.setDrawColor(60, 60, 60);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);

  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(`EDITION: ${currentYear} • PRIVATE & CONFIDENTIAL`, margin, pageHeight - 28);
  doc.text('WWW.ATTIKS.IN', pageWidth - margin, pageHeight - 28, { align: 'right' });

  // ==========================================
  // PAGE 2: STUDIO STATEMENT & PHILOSOPHY
  // ==========================================
  doc.addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Header
  doc.setTextColor(17, 17, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ATTIKS ARCHITECTURE', margin, 22);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('PRACTICE OVERVIEW', pageWidth - margin, 22, { align: 'right' });

  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(margin, 26, pageWidth - margin, 26);

  // Title
  doc.setTextColor(17, 17, 17);
  doc.setFont('times', 'normal');
  doc.setFontSize(26);
  doc.text('Crafting Architecture with Intent', margin, 46);

  // Body Paragraphs
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(60, 60, 60);

  const introText1 =
    'Attiks Architecture is a progressive architectural practice rooted in Kerala, operating across residential, commercial, institutional, and hospitality developments. Our work is defined by climate-responsive forms, material honesty, and the seamless dialogue between built volumes and their natural surroundings.';

  const splitIntro1 = doc.splitTextToSize(introText1, contentWidth);
  doc.text(splitIntro1, margin, 58);

  const introText2 =
    'With each commission, we pursue an architecture of permanence—spaces that age gracefully, breathe with the local monsoons and tropical sunlight, and celebrate tactile materials like exposed brick, cast concrete, local stone, and handcrafted timber.';

  const splitIntro2 = doc.splitTextToSize(introText2, contentWidth);
  doc.text(splitIntro2, margin, 78);

  // Core Pillars Box
  doc.setFillColor(248, 248, 248);
  doc.rect(margin, 105, contentWidth, 90, 'F');
  doc.setDrawColor(230, 230, 230);
  doc.rect(margin, 105, contentWidth, 90, 'S');

  doc.setTextColor(17, 17, 17);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('KEY DISCIPLINES & EXPERTISE', margin + 8, 118);

  const disciplines = [
    {
      title: 'Architectural Master Planning & Design',
      desc: 'Bespoke residential estates, commercial hubs, and educational sanctuaries.',
    },
    {
      title: 'Contextual Materiality & Craft',
      desc: 'Integrating local laterite, sustainable timber, and micro-climate ventilation.',
    },
    {
      title: 'Interior & Spatial Architecture',
      desc: 'Harmonious interior volumes, custom joinery, and artisanal lighting schemes.',
    },
    {
      title: 'Landscape & Ecological Integration',
      desc: 'Blurring the boundary between lush landscape gardens and living spaces.',
    },
  ];

  let pillarY = 130;
  disciplines.forEach((item, idx) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(`0${idx + 1}.  ${item.title}`, margin + 8, pillarY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    doc.text(item.desc, margin + 14, pillarY + 5);

    pillarY += 13;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text('PAGE 02', margin, pageHeight - 14);
  doc.text('ATTIKS ARCHITECTURE STUDIO', pageWidth - margin, pageHeight - 14, { align: 'right' });

  // ==========================================
  // PROJECT PAGES (One per project)
  // ==========================================
  let pageNumber = 3;
  for (const project of filtered) {
    doc.addPage();
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Top Header
    doc.setTextColor(17, 17, 17);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('ATTIKS ARCHITECTURE', margin, 20);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${project.category.toUpperCase()} • ${project.location.toUpperCase()}`,
      pageWidth - margin,
      20,
      { align: 'right' }
    );

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(margin, 24, pageWidth - margin, 24);

    // Project Hero Image
    let imageDrawn = false;
    if (project.image) {
      const base64 = await getBase64Image(project.image);
      if (base64) {
        try {
          doc.addImage(base64, 'JPEG', margin, 32, contentWidth, 100, undefined, 'FAST');
          imageDrawn = true;
        } catch {
          imageDrawn = false;
        }
      }
    }

    if (!imageDrawn) {
      // Clean Architectural Placeholder Box
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, 32, contentWidth, 100, 'F');
      doc.setTextColor(140, 140, 140);
      doc.setFontSize(10);
      doc.text('ARCHITECTURAL PLATE VISUALIZATION', pageWidth / 2, 82, { align: 'center' });
    }

    // Project Title
    const textStartY = 142;
    doc.setTextColor(17, 17, 17);
    doc.setFont('times', 'normal');
    doc.setFontSize(22);
    doc.text(project.title, margin, textStartY);

    // Project Meta Row
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(120, 120, 120);
    const metaParts = [
      `LOCATION: ${project.location}`,
      `YEAR: ${project.year || '2026'}`,
      `CATEGORY: ${project.category.toUpperCase()}`,
    ];
    if (project.area) metaParts.push(`BUILT AREA: ${project.area}`);
    doc.text(metaParts.join('   |   '), margin, textStartY + 7);

    // Separator line
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.line(margin, textStartY + 12, pageWidth - margin, textStartY + 12);

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(project.description || '', contentWidth);
    doc.text(descLines, margin, textStartY + 20);

    const descHeight = descLines.length * 4.5;
    let nextY = textStartY + 24 + descHeight;

    // Highlights / Key Features
    if (project.highlights && project.highlights.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(20, 20, 20);
      doc.text('ARCHITECTURAL HIGHLIGHTS & FEATURES:', margin, nextY);

      nextY += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 80);

      project.highlights.slice(0, 4).forEach((hl) => {
        doc.text(`•  ${hl}`, margin + 4, nextY);
        nextY += 5;
      });
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(160, 160, 160);
    doc.text(`PAGE ${pageNumber < 10 ? `0${pageNumber}` : pageNumber}`, margin, pageHeight - 14);
    doc.text('ATTIKS ARCHITECTURE PORTFOLIO', pageWidth - margin, pageHeight - 14, {
      align: 'right',
    });

    pageNumber++;
  }

  // ==========================================
  // FINAL PAGE: CONTACT & BACK COVER
  // ==========================================
  doc.addPage();
  doc.setFillColor(13, 13, 13);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Contact Box
  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'normal');
  doc.setFontSize(28);
  doc.text('Commence a Conversation', margin, 70);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(180, 180, 180);
  const contactText =
    'Whether you are commissioning a private residence, hospitality retreat, or landmark commercial destination, Attiks Architecture collaborates closely with discerning clients to craft spaces of quiet distinction.';
  doc.text(doc.splitTextToSize(contactText, contentWidth), margin, 84);

  // Office Details
  const officeY = 120;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('STUDIO LOCATIONS & CONTACT', margin, officeY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(190, 190, 190);

  doc.text('Kerala Studios: Calicut • Kochi • Malappuram', margin, officeY + 10);
  doc.text('Email: info@attiks.in | inquiry@attiks.in', margin, officeY + 18);
  doc.text('Phone / WhatsApp: +91 98956 59595 / +91 483 2738899', margin, officeY + 26);
  doc.text('Website: www.attiks.in', margin, officeY + 34);

  // Bottom Notice
  doc.setDrawColor(60, 60, 60);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 40, pageWidth - margin, pageHeight - 40);

  doc.setFontSize(8.5);
  doc.setTextColor(140, 140, 140);
  doc.text('© ATTIKS ARCHITECTURE. ALL RIGHTS RESERVED.', margin, pageHeight - 26);
  doc.text('CONFIDENTIAL LOOKBOOK', pageWidth - margin, pageHeight - 26, { align: 'right' });

  // Save the PDF file
  const fileName = `Attiks-${categoryName.replace(/\s+/g, '-')}-Architecture-Portfolio.pdf`;
  doc.save(fileName);
}
