import { CVData, Language } from '../types/cv';

export const PORTFOLIO_CV_DATA: CVData = {
  sourceUrl: 'https://profile-six-topaz.vercel.app/#journey',
  fullName: 'Josafat Ambarita',
  headline: {
    id: 'IT Infrastructure Engineer · Network Engineer · IT Support',
    en: 'IT Infrastructure Engineer · Network Engineer · IT Support',
  },
  location: 'Balikpapan, Kalimantan Timur',
  email: 'josafatambarita425@gmail.com',
  phone: '+62 858-1315-2547',
  linkedin: 'https://www.linkedin.com/in/josafat-ambarita',
  portfolioUrl: '',
  summary: {
    id: 'Lulusan Teknik Informatika dengan pengalaman lebih dari 5 tahun di bidang Infrastruktur TI, Network Support, dan Jaringan Telekomunikasi. Berpengalaman dalam melakukan monitoring jaringan, troubleshooting hardware dan software, pemeliharaan perangkat jaringan, serta memberikan dukungan teknis kepada tim ICT dan pengguna. Berhasil menjaga ketersediaan jaringan hingga 99,8% dan menyelesaikan 95% tiket sesuai SLA. Memiliki kemampuan analitis yang baik, cepat beradaptasi, serta siap mengembangkan karier di bidang IT Infrastructure, Network Engineer, maupun IT Support.',
    en: 'Informatics Engineering graduate with over 5 years of experience in IT Infrastructure, Network Support, and Telecommunications Networks. Experienced in network monitoring, hardware and software troubleshooting, network equipment maintenance, and providing technical support to ICT teams and end users. Proven track record maintaining network availability up to 99.8% and resolving 95% of tickets within SLA. Possesses strong analytical skills, adapts quickly, and is ready to grow a career in IT Infrastructure, Network Engineering, and IT Support.',
  },
  experiences: [
    {
      id: 'exp-mtm',
      period: {
        id: 'Des 2024 – Mar 2026',
        en: 'Dec 2024 – Mar 2026',
      },
      role: {
        id: 'Engineer On Site — Project MSCO IOH (PT Petrosea, Tbk)',
        en: 'Engineer On Site — MSCO IOH Project (PT Petrosea, Tbk)',
      },
      company: 'PT Media Telekomunikasi Mandiri',
      location: 'Kutai Barat, Kalimantan Timur',
      highlights: {
        id: [
          'Melakukan monitoring dan pemeliharaan infrastruktur jaringan perusahaan (Router, Switch, Microwave, Wireless Access Point, Radio Komunikasi) guna menjaga uptime jaringan mencapai 99,8%.',
          'Mengelola sistem monitoring jaringan untuk konfigurasi perangkat dan deteksi dini insiden, memangkas waktu respons gangguan sebesar 30%.',
          'Melaksanakan pemeliharaan preventif dan korektif perangkat keras maupun lunak, termasuk pembaruan firmware dan patch keamanan infrastruktur TI.',
          'Memberikan dukungan teknis langsung kepada Tim ICT dan menyelesaikan tiket troubleshooting hardware maupun software.',
          'Menyusun laporan performa jaringan mingguan dan bulanan serta analisis insiden sebagai dasar perbaikan berkelanjutan.',
        ],
        en: [
          'Monitored and maintained enterprise network infrastructure (Routers, Switches, Microwave, Wireless Access Points, Radio Communications), sustaining 99.8% network uptime.',
          'Administered network monitoring systems for device configuration and incident identification, cutting incident response time by 30%.',
          'Executed preventive and corrective maintenance across hardware and software assets, including firmware upgrades and security patching.',
          'Provided on-site technical support to the ICT Team, resolving hardware and software troubleshooting tickets.',
          'Compiled weekly and monthly network performance reports with incident analysis and continuous improvement recommendations.',
        ],
      },
    },
    {
      id: 'exp-mku',
      period: {
        id: 'Jan 2024 – Des 2024',
        en: 'Jan 2024 – Dec 2024',
      },
      role: {
        id: 'TOC Core Engineer — PT Huawei Tech Investment',
        en: 'TOC Core Engineer — PT Huawei Tech Investment',
      },
      company: 'PT Mitra Karsa Utama',
      location: 'Solo, Jawa Tengah',
      highlights: {
        id: [
          'Mengimplementasikan sistem monitoring dan peringatan dini untuk mendeteksi anomali jaringan sebelum berdampak pada pemadaman layanan.',
          'Mengembangkan skrip otomasi guna mempercepat proses pemeliharaan sistem dan efisiensi troubleshooting.',
          'Mengelola serta menyelesaikan Trouble Ticket sesuai Service Level Agreement (SLA) dengan tingkat penyelesaian 95% tepat waktu.',
          'Menyusun laporan Root Cause Analysis (RCA) harian dan mingguan terkait status site serta level bahan bakar untuk manajemen Huawei.',
        ],
        en: [
          'Implemented proactive monitoring and early-warning workflows to detect network anomalies before service outages occurred.',
          'Developed automation scripts to streamline routine system maintenance and accelerate troubleshooting.',
          'Managed and resolved Trouble Tickets within Service Level Agreements (SLA), achieving a 95% on-time resolution rate.',
          'Prepared daily and weekly Root Cause Analysis (RCA) reports covering site status and fuel levels for Huawei management.',
        ],
      },
    },
    {
      id: 'exp-citius',
      period: {
        id: 'Jun 2023 – Des 2023',
        en: 'Jun 2023 – Dec 2023',
      },
      role: {
        id: 'BTS Engineer / Team Leader',
        en: 'BTS Engineer / Team Leader',
      },
      company: 'PT Citius Solusi Indonesia',
      location: 'Banjarmasin, Kalimantan Selatan',
      highlights: {
        id: [
          'Melaksanakan instalasi, konfigurasi, commissioning, dan integrasi perangkat jaringan BTS agar layanan beroperasi optimal.',
          'Melakukan upgrade software pada unit BBU dan RRU untuk meningkatkan kapabilitas serta keamanan jaringan.',
          'Mendiagnosis dan menyelesaikan gangguan teknis kompleks termasuk VSWR, RTWP High, dan alarm rectifier.',
          'Menyusun dan menyerahkan dokumen Acceptance Test Procedure (ATP) dengan tingkat akurasi 99,80% untuk mempercepat serah terima proyek klien.',
        ],
        en: [
          'Executed installation, configuration, commissioning, and integration of BTS network equipment for optimal service readiness.',
          'Performed software upgrades on BBU and RRU units to enhance network capability and security.',
          'Diagnosed and resolved complex field issues including VSWR, High RTWP, and rectifier alarms.',
          'Delivered Acceptance Test Procedure (ATP) documentation with 99.80% accuracy to accelerate client project handover.',
        ],
      },
    },
    {
      id: 'exp-zmg',
      period: {
        id: 'Mei 2022 – Apr 2023',
        en: 'May 2022 – Apr 2023',
      },
      role: {
        id: 'BTS Engineer & SSV Reporting',
        en: 'BTS Engineer & SSV Reporting',
      },
      company: 'PT ZMG Telekomunikasi Service Indonesia',
      location: 'Papua',
      highlights: {
        id: [
          'Melaksanakan instalasi, commissioning (XML), dan integrasi Newsite BTS ZTE di wilayah terpencil Papua pada proyek USO Bakti Kominfo – Telkomsel.',
          'Memvalidasi kualitas jaringan pasca-instalasi melalui pengujian Voice & Video Test sesuai standar KPI.',
          'Menyusun laporan Site Survey Validation (SSV) dan melakukan review bersama Bakti Kominfo setelah target KPI Availability terpenuhi.',
        ],
        en: [
          'Executed installation, XML commissioning, and integration of ZTE Newsite BTS across remote Papua sites for the USO Bakti Kominfo – Telkomsel project.',
          'Validated post-installation network quality through Voice & Video Testing against KPI benchmarks.',
          'Prepared Site Survey Validation (SSV) reports and conducted review sessions with Bakti Kominfo upon meeting KPI Availability.',
        ],
      },
    },
    {
      id: 'exp-tsp',
      period: {
        id: 'Sep 2021 – Apr 2022',
        en: 'Sep 2021 – Apr 2022',
      },
      role: {
        id: 'RF Engineer & Field Supervisor',
        en: 'RF Engineer & Field Supervisor',
      },
      company: 'PT Tri Sukha Pratama',
      location: 'Remote (DKI Jakarta)',
      highlights: {
        id: [
          'RF Engineer (Proyek USO Bakti ZTE – Telkomsel Papua): Memonitor progres, mengelola logfile Drive Test, dan menyusun laporan SSV untuk peninjauan Bakti Kominfo.',
          'Field Supervisor (Proyek FTTH – Biznet Home): Mengawasi pekerjaan sipil, mengelola perizinan kerja, mengevaluasi progres tim, serta membuat gambar rencana rute desain FTTH.',
        ],
        en: [
          'RF Engineer (USO Bakti ZTE – Telkomsel Papua): Monitored progress, managed Drive Test logfiles, and compiled SSV reports for Bakti Kominfo review.',
          'Field Supervisor (FTTH – Biznet Home): Supervised civil works, managed work permits, evaluated team progress, and drafted FTTH route design maps.',
        ],
      },
    },
    {
      id: 'exp-mgs',
      period: {
        id: 'Des 2020 – Agu 2021',
        en: 'Dec 2020 – Aug 2021',
      },
      role: {
        id: 'Project Coordinator — Swap Nokia to ZTE Telkomsel',
        en: 'Project Coordinator — Swap Nokia to ZTE Telkomsel',
      },
      company: 'PT Metro Global Services',
      location: 'Pontianak, Kalimantan Barat',
      highlights: {
        id: [
          'Mengkoordinasikan tim RF, Drive Test Engineer, dan Rigger untuk kelancaran proyek swap perangkat Area Kalimantan Barat.',
          'Mengelola alur kerja serta prioritas jadwal proyek hingga berhasil menyelesaikan 98% target site tepat waktu.',
          'Memonitor analisis logfile Drive Test, laporan SSV & IBC, serta memimpin review kualitas jaringan bersama pelanggan.',
        ],
        en: [
          'Coordinated RF, Drive Test Engineer, and Rigger teams across the West Kalimantan equipment swap project.',
          'Managed project workflows and scheduling priorities, delivering 98% of target sites on schedule.',
          'Reviewed Drive Test logfiles, SSV & IBC reports, and led network quality review sessions with clients.',
        ],
      },
    },
    {
      id: 'exp-tmr',
      period: {
        id: 'Agu 2019 – Jul 2020',
        en: 'Aug 2019 – Jul 2020',
      },
      role: {
        id: 'Rigger & Drive Test Engineer (Local Optimization)',
        en: 'Rigger & Drive Test Engineer (Local Optimization)',
      },
      company: 'PT Tri Mitra Resources',
      location: 'Medan, Sumatera Utara',
      highlights: {
        id: [
          'Menjalankan peran Rigger, Drive Test Engineer, dan Drive Test Analyst pada proyek Local Optimization Swap Nokia to ZTE Smartfren Sumbagut.',
        ],
        en: [
          'Served as Rigger, Drive Test Engineer, and Drive Test Analyst for the Smartfren Sumbagut Nokia-to-ZTE Local Optimization Swap project.',
        ],
      },
    },
    {
      id: 'exp-nexwave',
      period: {
        id: 'Feb 2016 – Jun 2019',
        en: 'Feb 2016 – Jun 2019',
      },
      role: {
        id: 'Rigger & Drive Test Engineer (DT Engineer)',
        en: 'Rigger & Drive Test Engineer (DT Engineer)',
      },
      company: 'PT Nexwave Indonesia',
      location: 'Bali-Nusra & Kalimantan',
      highlights: {
        id: [
          'Rigger Optimization — Audit Antena Physical Tuning (Telkomsel Balinusra).',
          'Drive Test Engineer — Project RNP NSN ISAT Zebra Kalimantan & Nokia Telkomsel Balinusra.',
        ],
        en: [
          'Rigger Optimization — Physical Antenna Tuning Audit (Telkomsel Balinusra).',
          'Drive Test Engineer — RNP NSN ISAT Zebra Kalimantan & Nokia Telkomsel Balinusra projects.',
        ],
      },
    },
  ],
  projects: [
    {
      id: 'proj-msco-infra',
      name: 'Infrastruktur Jaringan On-Site (MSCO - IOH)',
      subtitle: {
        id: 'Operasional & Monitoring Jaringan Site PT Petrosea Tbk',
        en: 'On-Site Network Operations & Monitoring (PT Petrosea Tbk)',
      },
      status: {
        id: 'Selesai (Kontrak)',
        en: 'Completed (Contract)',
      },
      users: {
        id: 'Tim ICT & seluruh operasional site Kutai Barat',
        en: 'ICT Team & site operations in West Kutai',
      },
      role: {
        id: 'Engineer On Site (Monitoring, Maintenance & Support)',
        en: 'Engineer On Site (Monitoring, Maintenance & Support)',
      },
      solution: {
        id: 'Pemeliharaan menyeluruh Router, Switch, Microwave, WAP, dan Radio Komunikasi disertai sistem peringatan insiden yang menjaga uptime 99,8% dan memangkas waktu respons gangguan 30%.',
        en: 'End-to-end maintenance of Routers, Switches, Microwave, WAPs, and Radio Communications with proactive incident alerting, sustaining 99.8% uptime and cutting response time by 30%.',
      },
      features: {
        id: [
          'Uptime jaringan 99,8%',
          'Pengurangan waktu respons 30%',
          'Preventive & corrective maintenance',
          'Patch keamanan & update firmware',
        ],
        en: [
          '99.8% network uptime',
          '30% faster incident response',
          'Preventive & corrective maintenance',
          'Security patching & firmware updates',
        ],
      },
      tech: ['Mikrotik', 'Router & Switch', 'Microwave', 'Network Monitoring', 'VPN'],
    },
    {
      id: 'proj-toc-sla',
      name: 'TOC Early Warning & SLA Automation',
      subtitle: {
        id: 'Monitoring Anomali & Pelaporan RCA Huawei',
        en: 'Anomaly Monitoring & Huawei RCA Reporting',
      },
      status: {
        id: 'Selesai',
        en: 'Completed',
      },
      users: {
        id: 'Tim TOC & Manajemen PT Huawei Tech Investment',
        en: 'TOC Team & PT Huawei Tech Investment Management',
      },
      role: {
        id: 'TOC Core Engineer',
        en: 'TOC Core Engineer',
      },
      solution: {
        id: 'Sistem monitoring peringatan dini dan skrip otomasi troubleshooting yang mendorong penyelesaian Trouble Ticket 95% tepat waktu sesuai SLA serta pelaporan RCA terstruktur.',
        en: 'Early-warning monitoring and troubleshooting automation scripts that achieved 95% SLA-compliant Trouble Ticket resolution alongside structured daily/weekly RCA reporting.',
      },
      features: {
        id: [
          'Deteksi anomali sebelum pemadaman',
          'Skrip otomasi troubleshooting',
          '95% tiket selesai sesuai SLA',
          'Laporan RCA harian & mingguan',
        ],
        en: [
          'Pre-outage anomaly detection',
          'Troubleshooting automation scripts',
          '95% SLA ticket compliance',
          'Daily & weekly RCA reporting',
        ],
      },
      tech: ['Huawei U2000', 'Automation Scripting', 'RCA', 'SLA Tracking'],
    },
    {
      id: 'proj-uso-swap',
      name: 'Newsite BTS ZTE & Swap Nokia–ZTE',
      subtitle: {
        id: 'Integrasi Jaringan Terpencil Papua & Kalimantan',
        en: 'Remote Network Integration in Papua & Kalimantan',
      },
      status: {
        id: 'Selesai',
        en: 'Completed',
      },
      users: {
        id: 'Telkomsel, Bakti Kominfo, & Indosat',
        en: 'Telkomsel, Bakti Kominfo, & Indosat',
      },
      role: {
        id: 'Project Coordinator & BTS/RF Engineer',
        en: 'Project Coordinator & BTS/RF Engineer',
      },
      solution: {
        id: 'Komisioning XML, upgrade BBU/RRU, penyelesaian gangguan VSWR/RTWP High, serta koordinasi tim lapangan dengan akurasi dokumen ATP 99,80% dan penyelesaian 98% target site tepat waktu.',
        en: 'XML commissioning, BBU/RRU software upgrades, VSWR/RTWP High resolution, and field coordination achieving 99.80% ATP accuracy and 98% on-time site delivery.',
      },
      features: {
        id: [
          'Akurasi dokumen ATP 99,80%',
          '98% target site selesai tepat waktu',
          'Validasi SSV & IBC',
          'Desain rute FTTH',
        ],
        en: [
          '99.80% ATP document accuracy',
          '98% on-time site completion',
          'SSV & IBC validation',
          'FTTH route design',
        ],
      },
      tech: ['BTS ZTE/Huawei/Nokia', 'TEMS Investigation', 'Nemo', 'Actix', 'QGIS'],
    },
  ],
  education: [
    {
      id: 'edu-itbi',
      period: {
        id: '2015 – 2019 (Lulus Sep 2019)',
        en: '2015 – 2019 (Graduated Sep 2019)',
      },
      degree: {
        id: 'Sarjana Komputer (S.Kom) — Teknik Informatika',
        en: 'Bachelor of Computer Science (S.Kom) — Informatics Engineering',
      },
      institution: 'Institut Teknologi dan Bisnis Indonesia',
      gpa: '',
      notes: {
        id: 'Program Studi Teknik Informatika (Terakreditasi BAN-PT). Fokus pada infrastruktur TI, jaringan komputer, dan sistem telekomunikasi.',
        en: 'Informatics Engineering Program (BAN-PT Accredited). Focused on IT infrastructure, computer networking, and telecommunications systems.',
      },
    },
  ],
  skillGroups: [
    {
      id: 'skill-infra',
      label: {
        id: 'Infrastruktur TI & Support',
        en: 'IT Infrastructure & Support',
      },
      items: [
        'Microsoft Windows',
        'Instalasi Server & Workstation',
        'Hardware & Software Troubleshooting',
        'Remote Desktop & AnyDesk',
        'UPS & CCTV',
        'Microsoft Office & Teams',
      ],
    },
    {
      id: 'skill-network',
      label: {
        id: 'Jaringan & Keamanan',
        en: 'Networking & Security',
      },
      items: [
        'TCP/IP',
        'LAN / WAN',
        'Router & Switch',
        'Wireless Access Point',
        'Mikrotik (Winbox)',
        'DHCP & DNS',
        'VPN',
        'Fortinet Fundamentals',
        'Network Monitoring',
      ],
    },
    {
      id: 'skill-telco',
      label: {
        id: 'Telekomunikasi & Tools',
        en: 'Telecommunications & Tools',
      },
      items: [
        'BTS Nokia / Huawei / ZTE',
        'Huawei U2000',
        'Fiber Optik & FTTH',
        'Microwave & Radio Komunikasi',
        'TEMS Investigation',
        'Nemo & Actix',
        'MapInfo, QGIS & Google Earth',
        'PuTTY & AutoCAD',
      ],
    },
    {
      id: 'skill-soft',
      label: {
        id: 'Kompetensi Inti & Bahasa',
        en: 'Core Competencies & Languages',
      },
      items: [
        'Problem Solving',
        'Analytical Thinking',
        'SLA & Incident Management',
        'Team Coordination',
        'Bahasa Indonesia (Native)',
        'English (Fluent)',
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-fortinet-2026',
      name: {
        id: 'The Bootcamp Fortinet Fundamental',
        en: 'The Bootcamp Fortinet Fundamental',
      },
      issuer: 'PT Graha Karya Informasi',
      year: '2026',
      type: 'training',
      staticFileUrl: '/assets/aistudio/Fortinet_9c2576ce.pdf',
    },
    {
      id: 'cert-network-2026',
      name: {
        id: 'Bootcamp IT Network',
        en: 'Bootcamp IT Network',
      },
      issuer: 'PT Graha Karya Informasi',
      year: '2026',
      type: 'training',
      staticFileUrl: '/assets/aistudio/IT_Network_e7289722.pdf',
    },
    {
      id: 'cert-support-2026',
      name: {
        id: 'Bootcamp IT Support',
        en: 'Bootcamp IT Support',
      },
      issuer: 'PT Graha Karya Informasi',
      year: '2026',
      type: 'training',
      staticFileUrl: '/assets/aistudio/IT_Support_77408062.pdf',
    },
    {
      id: 'cert-p3k-2024',
      name: {
        id: 'Pertolongan Pertama Pada Kecelakaan (P3K) — Penyelamatan Ketinggian',
        en: 'First Aid (P3K) — Work at Height Rescue Training',
      },
      issuer: 'PT Evantama Network System',
      year: '2024',
      type: 'training',
      staticFileUrl: '/assets/aistudio/First_Aid_eb816e77.pdf',
    },
    {
      id: 'cert-wah-2023',
      name: {
        id: 'Lisensi K3 Tenaga Kerja Pada Ketinggian Tingkat 1 (Berlaku s.d. Okt 2028)',
        en: 'Work at Height (WAH) Level 1 License (Valid until Oct 2028)',
      },
      issuer: 'Kementerian Ketenagakerjaan RI',
      year: '2023',
      type: 'cert',
      staticFileUrl: '/assets/aistudio/License_K3_f97d308e.pdf',
    },
    {
      id: 'cert-wah-2018',
      name: {
        id: 'Sertifikat Pembinaan K3 Bekerja Pada Ketinggian Tingkat 1 (Work at Height)',
        en: 'OSH Work at Height Level 1 Technical Training Certificate',
      },
      issuer: 'Kementerian Ketenagakerjaan RI',
      year: '2018',
      type: 'cert',
      staticFileUrl: '/assets/aistudio/Work_At_Heigh_40387d12.pdf',
    },
  ],
};

export function formatCVAsPlainText(data: CVData, lang: Language): string {
  const lines: string[] = [];
  const headings =
    lang === 'id'
      ? {
          summary: 'TENTANG SAYA',
          experience: 'PENGALAMAN KERJA',
          projects: 'PROYEK & PENCAPAIAN UTAMA',
          education: 'PENDIDIKAN',
          skills: 'KEAHLIAN TEKNIS',
          certs: 'SERTIFIKASI & PELATIHAN',
        }
      : {
          summary: 'PROFESSIONAL SUMMARY',
          experience: 'WORK EXPERIENCE',
          projects: 'KEY PROJECTS & ACHIEVEMENTS',
          education: 'EDUCATION',
          skills: 'TECHNICAL SKILLS',
          certs: 'CERTIFICATIONS & TRAINING',
        };

  lines.push(data.fullName.toUpperCase());
  lines.push(data.headline[lang]);
  lines.push(
    [data.location, data.email, data.phone, data.linkedin, data.portfolioUrl]
      .filter(Boolean)
      .join(' | ')
  );
  lines.push('');

  lines.push(headings.summary);
  lines.push(data.summary[lang]);
  lines.push('');

  lines.push(headings.experience);
  for (const exp of data.experiences) {
    lines.push(`${exp.role[lang]} — ${exp.company} (${exp.location}) | ${exp.period[lang]}`);
    for (const h of exp.highlights[lang]) {
      lines.push(`- ${h}`);
    }
    lines.push('');
  }

  lines.push(headings.projects);
  for (const proj of data.projects) {
    lines.push(`${proj.name} — ${proj.subtitle[lang]} [${proj.tech.join(', ')}]`);
    lines.push(proj.solution[lang]);
    lines.push('');
  }

  lines.push(headings.education);
  for (const edu of data.education) {
    lines.push(
      `${edu.degree[lang]} — ${edu.institution} (${edu.period[lang]})${
        edu.gpa ? ` | GPA: ${edu.gpa}` : ''
      }`
    );
    if (edu.notes[lang]) lines.push(edu.notes[lang]);
    lines.push('');
  }

  lines.push(headings.skills);
  for (const grp of data.skillGroups) {
    lines.push(`${grp.label[lang]}: ${grp.items.join(', ')}`);
  }
  lines.push('');

  lines.push(headings.certs);
  for (const cert of data.certifications) {
    lines.push(`- ${cert.name[lang]} — ${cert.issuer} (${cert.year})`);
  }

  return lines.join('\n');
}
