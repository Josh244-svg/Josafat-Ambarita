import {
  Activity,
  Check,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Plus,
  Radio,
  Server,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CertificationItem, CVData, Language, ProjectItem } from '../types/cv';
import { StoredCertFile } from '../utils/certStorage';
import { PdfCanvasViewer } from './PdfCanvasViewer';
import { SkillCardsGrid } from './SkillCardsGrid';

interface PortfolioJourneyViewProps {
  data: CVData;
  lang: Language;
  certFiles: Record<string, StoredCertFile>;
  onChangeLang: (lang: Language) => void;
  onPrintCV: () => void;
  onOpenEditor: () => void;
  onUploadCertFile: (certId: string, file: File) => Promise<void>;
  onDeleteCertFile: (certId: string) => Promise<void>;
  onAddCertification: (cert: CertificationItem, file?: File | null) => Promise<void>;
}

const COPY = {
  id: {
    hello: 'Halo, saya',
    heroCta1: 'Hubungi saya',
    heroCta2: 'Lihat proyek',
    journeyTitle: 'Perjalanan karir saya',
    journeySub:
      'Lebih dari 5 tahun menjaga keandalan jaringan telekomunikasi dan infrastruktur TI dari lapangan hingga sistem monitoring.',
    projectsTitle: 'Proyek & pencapaian utama',
    projectsSub:
      'Operasional jaringan on-site, otomasi SLA, dan integrasi telekomunikasi. Klik kartu untuk melihat detail.',
    skillsTitle: 'Keahlian teknis',
    skillsSub:
      'Perangkat jaringan, infrastruktur server, sistem monitoring, dan tools telekomunikasi yang digunakan sehari-hari.',
    certsTitle: 'Sertifikasi dan pelatihan',
    certsSub:
      'Upload file PDF atau gambar sertifikat pada setiap baris untuk melihat pratinjau dan mengunduhnya.',
    addCertBtn: 'Upload Sertifikat Baru',
    btnDownloadCV: 'Unduh CV (PDF)',
    btnEditCV: 'Edit CV',
    btnDetail: 'Lihat detail',
    lUsers: 'Pengguna',
    lRole: 'Peran',
    lSolution: 'Solusi & Hasil',
    lFeatures: 'Pencapaian utama',
    lTech: 'Teknologi & Perangkat',
    thName: 'Nama',
    thOrg: 'Penerbit',
    thType: 'Jenis',
    thYear: 'Tahun',
    thDoc: 'Dokumen',
    tCert: 'Sertifikasi',
    tTraining: 'Pelatihan',
    uploadDoc: 'Upload',
    replaceDoc: 'Ganti',
    viewDoc: 'Lihat',
    downloadDoc: 'Unduh',
    removeDoc: 'Hapus file',
    contactTitle: 'Mari diskusikan kebutuhan infrastruktur TI Anda',
    contactSub:
      'Terbuka untuk peluang IT Infrastructure Engineer, Network Engineer, maupun IT Support.',
    sendEmail: 'Kirim Email',
    chatWa: 'WhatsApp',
    openLinkedin: 'LinkedIn',
  },
  en: {
    hello: "Hi, I'm",
    heroCta1: 'Contact me',
    heroCta2: 'View projects',
    journeyTitle: 'My career journey',
    journeySub:
      'Over 5 years ensuring reliable telecommunications networks and enterprise IT infrastructure from field deployment to monitoring.',
    projectsTitle: 'Key projects & achievements',
    projectsSub:
      'On-site network operations, SLA automation, and telecom integration. Click a card for details.',
    skillsTitle: 'Technical skills',
    skillsSub:
      'Networking hardware, server infrastructure, monitoring platforms, and telecom engineering tools used daily.',
    certsTitle: 'Certifications and training',
    certsSub:
      'Upload a PDF or image file on any row to preview and download your certificate.',
    addCertBtn: 'Upload New Certificate',
    btnDownloadCV: 'Download CV (PDF)',
    btnEditCV: 'Edit CV',
    btnDetail: 'View details',
    lUsers: 'Users',
    lRole: 'Role',
    lSolution: 'Solution & Outcome',
    lFeatures: 'Key highlights',
    lTech: 'Tech & Equipment',
    thName: 'Name',
    thOrg: 'Issuer',
    thType: 'Type',
    thYear: 'Year',
    thDoc: 'Document',
    tCert: 'Certification',
    tTraining: 'Training',
    uploadDoc: 'Upload',
    replaceDoc: 'Replace',
    viewDoc: 'View',
    downloadDoc: 'Download',
    removeDoc: 'Remove file',
    contactTitle: "Let's talk about your IT infrastructure needs",
    contactSub:
      'Open to IT Infrastructure Engineer, Network Engineer, and IT Support roles.',
    sendEmail: 'Send Email',
    chatWa: 'WhatsApp',
    openLinkedin: 'LinkedIn',
  },
};

function ProjectVisualHeader({ index }: { index: number }) {
  const icons = [
    <Server key="s" className="w-6 h-6 text-[#2563EB]" />,
    <Activity key="a" className="w-6 h-6 text-[#2563EB]" />,
    <Radio key="r" className="w-6 h-6 text-[#2563EB]" />,
  ];
  const barSets = [
    [55, 78, 65, 92, 85, 98],
    [48, 70, 82, 88, 95, 95],
    [60, 74, 86, 90, 96, 99],
  ];
  const bars = barSets[index % barSets.length];

  return (
    <div className="relative h-40 bg-gradient-to-br from-[#EEF4FF] via-[#F7FAFF] to-[#E2ECFF] border-b border-[#E2E8F0] p-5 flex items-end justify-between overflow-hidden">
      <div className="w-11 h-11 rounded-xl bg-white border border-[#DBEAFE] flex items-center justify-center shadow-xs">
        {icons[index % icons.length]}
      </div>
      <div className="flex items-end gap-2 h-24">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-3.5 rounded-t-md bg-gradient-to-t from-[#2563EB] to-[#60A5FA]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function PortfolioJourneyView({
  data,
  lang,
  certFiles,
  onChangeLang,
  onPrintCV,
  onOpenEditor,
  onUploadCertFile,
  onDeleteCertFile,
  onAddCertification,
}: PortfolioJourneyViewProps) {
  const t = COPY[lang];
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const rowFileInputRef = useRef<HTMLInputElement | null>(null);

  const [previewDoc, setPreviewDoc] = useState<{
    cert: CertificationItem;
    url: string;
    fileName: string;
    mimeType: string;
    isObjectUrl: boolean;
  } | null>(null);

  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertYear, setNewCertYear] = useState('2026');
  const [newCertType, setNewCertType] = useState<'cert' | 'training'>('cert');
  const [newCertFile, setNewCertFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (previewDoc?.isObjectUrl) {
        URL.revokeObjectURL(previewDoc.url);
      }
    };
  }, [previewDoc]);

  const handleTriggerRowUpload = (certId: string) => {
    setUploadTargetId(certId);
    if (rowFileInputRef.current) {
      rowFileInputRef.current.value = '';
      rowFileInputRef.current.click();
    }
  };

  const handleRowFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetId) return;
    await onUploadCertFile(uploadTargetId, file);
    setUploadTargetId(null);
  };

  const handleOpenPreview = (cert: CertificationItem) => {
    const stored = certFiles[cert.id];
    if (stored) {
      const url = URL.createObjectURL(stored.blob);
      setPreviewDoc({
        cert,
        url,
        fileName: stored.fileName,
        mimeType: stored.mimeType,
        isObjectUrl: true,
      });
      return;
    }
    if (cert.staticFileUrl) {
      const lower = cert.staticFileUrl.toLowerCase();
      setPreviewDoc({
        cert,
        url: cert.staticFileUrl,
        fileName: cert.staticFileUrl.split('/').pop() || 'certificate.pdf',
        mimeType: lower.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
        isObjectUrl: false,
      });
    }
  };

  const handleDownloadCert = (cert: CertificationItem) => {
    const stored = certFiles[cert.id];
    if (stored) {
      const url = URL.createObjectURL(stored.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = stored.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }
    if (cert.staticFileUrl) {
      const a = document.createElement('a');
      a.href = cert.staticFileUrl;
      a.download = cert.staticFileUrl.split('/').pop() || 'certificate.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const handleCreateCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertIssuer.trim()) return;
    const item: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: {
        id: newCertName.trim(),
        en: newCertName.trim(),
      },
      issuer: newCertIssuer.trim(),
      year: newCertYear.trim() || '2026',
      type: newCertType,
    };
    await onAddCertification(item, newCertFile);
    setNewCertName('');
    setNewCertIssuer('');
    setNewCertYear('2026');
    setNewCertType('cert');
    setNewCertFile(null);
    setShowAddCertModal(false);
  };

  const digitsOnlyPhone = data.phone.replace(/\D/g, '');
  const waHref = `https://wa.me/${digitsOnlyPhone}`;

  const journeyEntries = [
    ...data.experiences.map((exp) => ({
      id: exp.id,
      period: exp.period[lang],
      title: exp.role[lang],
      place: `${exp.company} · ${exp.location}`,
      summary: exp.highlights[lang][0] ?? '',
      bullets: exp.highlights[lang].slice(1),
    })),
    ...data.education.map((edu) => ({
      id: edu.id,
      period: edu.period[lang],
      title: edu.degree[lang],
      place: edu.institution,
      summary: edu.notes[lang],
      bullets: [] as string[],
    })),
  ];

  const handleStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 10, ry: x * 12 });
  };

  return (
    <div className="bg-white text-[#1E293B]">
      {/* Hero Section */}
      <section className="relative bg-[radial-gradient(circle_at_82%_26%,#E8F0FE_0%,#FFFFFF_55%)]">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-20">
          {/* Sub-bar for Language & Quick CV Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10">
            <div className="text-xs font-medium text-[#64748B]">
              {data.location}
            </div>
            <div className="flex items-center gap-3">
              <div
                role="group"
                aria-label="Bahasa"
                className="inline-flex items-center border border-[#CBD5E1] rounded-full p-0.5 bg-white"
              >
                <button
                  type="button"
                  onClick={() => onChangeLang('id')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    lang === 'id'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#64748B] hover:text-[#0F2A5C]'
                  }`}
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLang('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#64748B] hover:text-[#0F2A5C]'
                  }`}
                >
                  EN
                </button>
              </div>
              <button
                type="button"
                onClick={onOpenEditor}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#0F2A5C] bg-white border border-[#CBD5E1] hover:border-[#2563EB] rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {t.btnEditCV}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
            {/* Left Copy */}
            <div>
              <p className="text-sm font-bold text-[#2563EB]">{t.hello}</p>
              <h1 className="mt-2 text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#0F2A5C] leading-[1.06] text-balance">
                {data.fullName}
              </h1>
              <h2 className="mt-3 text-lg sm:text-xl font-bold text-[#2563EB]">
                {data.headline[lang]}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#475569] max-w-[540px]">
                {data.summary[lang]}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#contact"
                  className="px-6 py-3 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-full shadow-[0_10px_24px_rgba(37,99,235,0.28)] transition-all whitespace-nowrap shrink-0"
                >
                  {t.heroCta1}
                </a>
                <a
                  href="#projects"
                  className="px-6 py-3 text-sm font-bold text-[#2563EB] bg-white border-2 border-[#2563EB] hover:bg-[#EFF6FF] rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  {t.heroCta2}
                </a>
              </div>
            </div>

            {/* Right Interactive 3D Card Stage */}
            <div
              onMouseMove={handleStageMove}
              onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
              className="flex items-center justify-center py-4 [perspective:1100px]"
            >
              <div
                className="relative w-[300px] sm:w-[330px] h-[360px] transition-transform duration-150 ease-out [transform-style:preserve-3d]"
                style={{
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                }}
              >
                {/* Base Navy/Blue Card */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#0F2A5C] shadow-[0_32px_56px_rgba(15,42,92,0.25)]" />

                {/* Middle White Telemetry Bar Card */}
                <div className="absolute inset-x-7 top-10 bottom-24 rounded-2xl bg-white p-5 shadow-lg flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0F2A5C]">
                    <span>Network Availability</span>
                    <span className="font-mono text-[#2563EB] tabular-nums">
                      99.8%
                    </span>
                  </div>
                  <div className="flex items-end gap-2.5 h-28 pt-3">
                    {[48, 72, 60, 88, 76, 98].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-gradient-to-b from-[#2563EB] to-[#DBEAFE]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Top Floating Checklist Card */}
                <div className="absolute -left-4 right-8 bottom-6 rounded-2xl bg-white border border-[#E2E8F0] p-4 shadow-[0_20px_40px_rgba(15,42,92,0.22)] space-y-2">
                  {[
                    lang === 'id'
                      ? 'Uptime Jaringan 99,8%'
                      : '99.8% Network Uptime',
                    lang === 'id'
                      ? 'SLA Trouble Ticket 95%'
                      : '95% SLA Ticket Compliance',
                    lang === 'id'
                      ? 'Respons Gangguan -30%'
                      : '-30% Incident Response Time',
                  ].map((label) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-xs font-bold text-[#0F2A5C]"
                    >
                      <Check className="w-4 h-4 text-[#2563EB] shrink-0" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Floating Tech Chips */}
                <div className="hidden sm:block absolute -top-4 left-4 px-3.5 py-1.5 rounded-full bg-white text-[#0F2A5C] text-xs font-bold shadow-[0_10px_24px_rgba(15,42,92,0.16)] border border-[#E2E8F0]">
                  Huawei U2000
                </div>
                <div className="hidden sm:block absolute -top-4 right-4 px-3.5 py-1.5 rounded-full bg-white text-[#0F2A5C] text-xs font-bold shadow-[0_10px_24px_rgba(15,42,92,0.16)] border border-[#E2E8F0]">
                  Mikrotik
                </div>
                <div className="hidden sm:block absolute bottom-24 -right-6 px-3.5 py-1.5 rounded-full bg-white text-[#0F2A5C] text-xs font-bold shadow-[0_10px_24px_rgba(15,42,92,0.16)] border border-[#E2E8F0]">
                  Fortinet
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="bg-[#F4F7FC] py-20 border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F2A5C]">
              {t.journeyTitle}
            </h2>
            <button
              type="button"
              onClick={onPrintCV}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.28)] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4" />
              {t.btnDownloadCV}
            </button>
          </div>
          <p className="mt-2.5 text-[15px] text-[#475569] max-w-[640px]">
            {t.journeySub}
          </p>

          <ol className="relative mt-10 max-w-4xl space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-[3px] before:bg-gradient-to-b before:from-[#2563EB] before:to-[#BFDBFE]">
            {journeyEntries.map((item, idx) => (
              <li key={item.id} className="relative pl-12">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-6 w-6 h-6 rounded-full bg-white border-[5px] ${
                    idx === 0 ? 'border-[#2563EB]' : 'border-[#60A5FA]'
                  }`}
                />
                <div
                  className={`bg-white rounded-2xl p-6 border transition-all ${
                    idx === 0
                      ? 'border-[#2563EB] shadow-[0_14px_30px_rgba(37,99,235,0.12)]'
                      : 'border-[#E2E8F0]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#2563EB] tabular-nums">
                    {item.period}
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-[#0F2A5C]">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#64748B] mt-0.5">
                    {item.place}
                  </div>
                  {item.summary && (
                    <p className="mt-3 text-sm leading-relaxed text-[#334155]">
                      {item.summary}
                    </p>
                  )}
                  {item.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm leading-relaxed text-[#475569] list-disc pl-4">
                      {item.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-white py-20 border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F2A5C]">
            {t.projectsTitle}
          </h2>
          <p className="mt-2.5 text-[15px] text-[#475569] max-w-[640px]">
            {t.projectsSub}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.projects.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => setSelectedProject(proj)}
                className="text-left bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_rgba(15,42,92,0.12)] flex flex-col cursor-pointer"
              >
                <ProjectVisualHeader index={idx} />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-semibold text-[#0A7A45]">
                    {proj.status[lang]}
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-[#0F2A5C]">
                    {proj.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#2563EB] mt-0.5">
                    {proj.subtitle[lang]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569] line-clamp-3">
                    {proj.solution[lang]}
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[#64748B] truncate">
                      {proj.tech.slice(0, 2).join(' · ')}
                    </span>
                    <span className="font-bold text-[#2563EB] whitespace-nowrap shrink-0">
                      {t.btnDetail} →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Icon Cards Section (matching reference screenshot!) */}
      <section id="skills" className="bg-[#F4F7FC] py-20 border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F2A5C]">
            {t.skillsTitle}
          </h2>
          <p className="mt-2.5 text-[15px] text-[#475569] max-w-[640px] mb-10">
            {t.skillsSub}
          </p>
          <SkillCardsGrid />
        </div>
      </section>

      {/* Certifications Table */}
      <section id="certs" className="bg-white py-20 border-t border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F2A5C]">
                {t.certsTitle}
              </h2>
              <p className="mt-2.5 text-[15px] text-[#475569] max-w-[640px]">
                {t.certsSub}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddCertModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              {t.addCertBtn}
            </button>
          </div>

          <input
            ref={rowFileInputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/webp"
            onChange={handleRowFileSelected}
            className="hidden"
          />

          <div className="mt-8 bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-xs font-bold text-[#475569]">
                    <th className="py-3.5 px-5">{t.thName}</th>
                    <th className="py-3.5 px-5">{t.thOrg}</th>
                    <th className="py-3.5 px-5">{t.thType}</th>
                    <th className="py-3.5 px-5">{t.thYear}</th>
                    <th className="py-3.5 px-5 text-right">{t.thDoc}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-sm">
                  {data.certifications.map((cert) => {
                    const stored = certFiles[cert.id];
                    const hasDoc = Boolean(stored || cert.staticFileUrl);
                    return (
                      <tr
                        key={cert.id}
                        className="hover:bg-[#F8FAFC] transition-colors"
                      >
                        <td className="py-3.5 px-5 font-semibold text-[#0F2A5C]">
                          <div>{cert.name[lang]}</div>
                          {(stored || cert.staticFileUrl) && (
                            <div className="text-xs font-normal text-[#64748B] mt-0.5 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                              <span className="truncate max-w-[260px]">
                                {stored
                                  ? stored.fileName
                                  : cert.staticFileUrl?.split('/').pop()}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-5 text-[#475569]">
                          {cert.issuer}
                        </td>
                        <td className="py-3.5 px-5 text-[#2563EB] font-medium whitespace-nowrap">
                          {cert.type === 'cert' ? t.tCert : t.tTraining}
                        </td>
                        <td className="py-3.5 px-5 font-mono text-[#475569] tabular-nums whitespace-nowrap">
                          {cert.year}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="inline-flex items-center justify-end gap-1.5">
                            {hasDoc ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleOpenPreview(cert)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  {t.viewDoc}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDownloadCert(cert)}
                                  title={t.downloadDoc}
                                  className="p-1.5 text-[#475569] hover:text-[#2563EB] border border-[#E2E8F0] rounded-lg bg-white transition-colors cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleTriggerRowUpload(cert.id)}
                                  title={t.replaceDoc}
                                  className="p-1.5 text-[#475569] hover:text-[#2563EB] border border-[#E2E8F0] rounded-lg bg-white transition-colors cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                </button>
                                {stored && (
                                  <button
                                    type="button"
                                    onClick={() => onDeleteCertFile(cert.id)}
                                    title={t.removeDoc}
                                    className="p-1.5 text-[#94A3B8] hover:text-red-600 border border-[#E2E8F0] rounded-lg bg-white transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleTriggerRowUpload(cert.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#2563EB] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                {t.uploadDoc}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section
        id="contact"
        className="bg-[#F4F7FC] py-20 border-t border-[#E2E8F0] text-center"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F2A5C]">
            {t.contactTitle}
          </h2>
          <p className="mt-3 text-[15px] text-[#475569]">{t.contactSub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-full shadow-[0_10px_24px_rgba(37,99,235,0.28)] transition-all whitespace-nowrap shrink-0"
            >
              <Mail className="w-4 h-4" />
              {t.sendEmail}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#2563EB] bg-white border-2 border-[#2563EB] hover:bg-[#EFF6FF] rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              {t.chatWa}
            </a>
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#0F2A5C] bg-white border border-[#CBD5E1] hover:border-[#2563EB] rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                {t.openLinkedin}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0F2A5C]/45 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white border border-[#E2E8F0] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-[#0A7A45]">
                  {selectedProject.status[lang]}
                </div>
                <h3 className="mt-1 text-xl font-bold text-[#0F2A5C]">
                  {selectedProject.name}
                </h3>
                <p className="text-sm text-[#2563EB] font-semibold">
                  {selectedProject.subtitle[lang]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup"
                className="p-1.5 text-[#64748B] hover:text-[#0F2A5C] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-sm border-t border-[#E2E8F0] pt-4">
              <div>
                <div className="text-xs font-bold text-[#64748B]">
                  {t.lSolution}
                </div>
                <p className="mt-1 text-[#334155] leading-relaxed">
                  {selectedProject.solution[lang]}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-bold text-[#64748B]">
                    {t.lUsers}
                  </div>
                  <p className="mt-0.5 text-[#0F2A5C]">
                    {selectedProject.users[lang]}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#64748B]">
                    {t.lRole}
                  </div>
                  <p className="mt-0.5 text-[#0F2A5C]">
                    {selectedProject.role[lang]}
                  </p>
                </div>
              </div>
              {selectedProject.features[lang].length > 0 && (
                <div>
                  <div className="text-xs font-bold text-[#64748B]">
                    {t.lFeatures}
                  </div>
                  <ul className="mt-1 list-disc pl-4 space-y-1 text-[#334155]">
                    {selectedProject.features[lang].map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <div className="text-xs font-bold text-[#64748B]">
                  {t.lTech}
                </div>
                <p className="mt-0.5 font-mono text-xs text-[#0F2A5C]">
                  {selectedProject.tech.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Certificate Document Preview Modal */}
      {previewDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0F2A5C]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white border border-[#E2E8F0] rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-[#0F2A5C] truncate">
                  {previewDoc.cert.name[lang]}
                </h3>
                <p className="text-xs text-[#64748B] truncate">
                  {previewDoc.cert.issuer} · {previewDoc.cert.year} · {previewDoc.fileName}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDownloadCert(previewDoc.cert)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t.downloadDoc}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  aria-label="Tutup"
                  className="p-1.5 text-[#64748B] hover:text-[#0F2A5C] rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#F4F7FC] p-4 overflow-auto flex justify-center">
              {previewDoc.mimeType.includes('pdf') ? (
                <PdfCanvasViewer url={previewDoc.url} />
              ) : (
                <img
                  src={previewDoc.url}
                  alt={previewDoc.cert.name[lang]}
                  className="max-w-full max-h-full object-contain rounded-xl border border-[#E2E8F0] bg-white self-center"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add & Upload New Certificate Modal */}
      {showAddCertModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0F2A5C]/45 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowAddCertModal(false)}
        >
          <form
            onSubmit={handleCreateCertSubmit}
            className="bg-white border border-[#E2E8F0] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-[#0F2A5C]">
                {t.addCertBtn}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCertModal(false)}
                aria-label="Tutup"
                className="p-1.5 text-[#64748B] hover:text-[#0F2A5C] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 border-t border-[#E2E8F0] pt-4">
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  {t.thName}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Mikrotik MTCNA"
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2 text-sm text-[#0F2A5C] focus:border-[#2563EB] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  {t.thOrg}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: MikroTik / Kemenaker RI"
                  value={newCertIssuer}
                  onChange={(e) => setNewCertIssuer(e.target.value)}
                  className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2 text-sm text-[#0F2A5C] focus:border-[#2563EB] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    {t.thType}
                  </label>
                  <select
                    value={newCertType}
                    onChange={(e) =>
                      setNewCertType(e.target.value as 'cert' | 'training')
                    }
                    className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2 text-sm text-[#0F2A5C] bg-white focus:border-[#2563EB] focus:outline-none"
                  >
                    <option value="cert">{t.tCert}</option>
                    <option value="training">{t.tTraining}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#475569] mb-1">
                    {t.thYear}
                  </label>
                  <input
                    type="text"
                    value={newCertYear}
                    onChange={(e) => setNewCertYear(e.target.value)}
                    className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2 text-sm text-[#0F2A5C] font-mono tabular-nums focus:border-[#2563EB] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">
                  {lang === 'id'
                    ? 'File Sertifikat (PDF / JPG / PNG)'
                    : 'Certificate File (PDF / JPG / PNG)'}
                </label>
                <input
                  type="file"
                  accept=".pdf,image/png,image/jpeg,image/webp"
                  onChange={(e) => setNewCertFile(e.target.files?.[0] ?? null)}
                  className="w-full text-xs text-[#475569] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#EFF6FF] file:text-[#2563EB] hover:file:bg-[#DBEAFE] cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowAddCertModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#475569] hover:text-[#0F2A5C] rounded-lg cursor-pointer"
              >
                {lang === 'id' ? 'Batal' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-full transition-colors cursor-pointer"
              >
                {lang === 'id' ? 'Simpan Sertifikat' : 'Save Certificate'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
