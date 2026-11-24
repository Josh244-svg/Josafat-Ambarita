import { Check, Copy, Printer, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CVEditorPanel } from './components/CVEditorPanel';
import { CVPreviewSheet } from './components/CVPreviewSheet';
import { PortfolioJourneyView } from './components/PortfolioJourneyView';
import { formatCVAsPlainText, PORTFOLIO_CV_DATA } from './data/portfolioPreset';
import { CertificationItem, CVData, Language, TemplateStyle } from './types/cv';
import {
  clearAllCertFiles,
  deleteCertFile,
  getAllCertFiles,
  saveCertFile,
  StoredCertFile,
} from './utils/certStorage';

type AppView = 'journey' | 'studio';
type MobilePane = 'editor' | 'preview';

const STORAGE_KEY = 'josafat_cv_studio_v2';

function loadInitialCV(): CVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return PORTFOLIO_CV_DATA;
    const parsed = JSON.parse(raw) as CVData;
    if (!parsed || !parsed.fullName || !Array.isArray(parsed.experiences)) {
      return PORTFOLIO_CV_DATA;
    }
    return parsed;
  } catch {
    return PORTFOLIO_CV_DATA;
  }
}

export default function App() {
  const [cvData, setCvData] = useState<CVData>(loadInitialCV);
  const [certFiles, setCertFiles] = useState<Record<string, StoredCertFile>>({});
  const [lang, setLang] = useState<Language>('id');
  const [template, setTemplate] = useState<TemplateStyle>('ats');
  const [view, setView] = useState<AppView>('journey');
  const [mobilePane, setMobilePane] = useState<MobilePane>('preview');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch {
      // Ignore storage quota errors
    }
  }, [cvData]);

  useEffect(() => {
    getAllCertFiles()
      .then((files) => setCertFiles(files))
      .catch(() => {
        // Ignore IndexedDB unavailability
      });
  }, []);

  const handleUploadCertFile = async (certId: string, file: File) => {
    const saved = await saveCertFile(certId, file);
    setCertFiles((prev) => ({ ...prev, [certId]: saved }));
  };

  const handleDeleteCertFile = async (certId: string) => {
    await deleteCertFile(certId);
    setCertFiles((prev) => {
      const next = { ...prev };
      delete next[certId];
      return next;
    });
  };

  const handleAddCertification = async (
    cert: CertificationItem,
    file?: File | null
  ) => {
    setCvData((prev) => ({
      ...prev,
      certifications: [cert, ...prev.certifications],
    }));
    if (file) {
      await handleUploadCertFile(cert.id, file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlainText = async () => {
    const text = formatCVAsPlainText(cvData, lang);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setCvData(PORTFOLIO_CV_DATA);
    setCertFiles({});
    clearAllCertFiles().catch(() => {});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (view !== 'journey') {
      setView('journey');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1E293B]">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="no-print sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between gap-8">
          {/* Zone 1: Single-line brand mark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setView('journey');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-3 py-1 rounded-[10px] bg-[#2563EB] text-white font-extrabold text-base tracking-tight whitespace-nowrap shrink-0"
          >
            JA
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#334155]"
          >
            <button
              type="button"
              onClick={() => scrollToSection('journey')}
              className="hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Perjalanan' : 'Journey'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Proyek' : 'Projects'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('skills')}
              className="hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Keahlian' : 'Skills'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('certs')}
              className="hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'id' ? 'Sertifikasi' : 'Certifications'}
            </button>
            <button
              type="button"
              onClick={() => {
                setView(view === 'studio' ? 'journey' : 'studio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                view === 'studio'
                  ? 'text-[#2563EB] font-bold'
                  : 'hover:text-[#2563EB]'
              }`}
            >
              {lang === 'id' ? 'Editor CV' : 'CV Editor'}
            </button>
          </nav>

          {/* Zone 3: 1 primary CTA */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#0F2A5C] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              {lang === 'id' ? 'Unduh CV' : 'Download CV'}
            </button>
          </div>
        </div>
      </header>

      {/* Studio Sub-bar (shown in Editor & CV A4 mode) */}
      {view === 'studio' && (
        <div className="no-print border-b border-[#E2E8F0] bg-[#F4F7FC]">
          <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div
                role="group"
                aria-label={lang === 'id' ? 'Bahasa CV' : 'CV Language'}
                className="inline-flex items-center gap-1 p-1 bg-white border border-[#E2E8F0] rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setLang('id')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'id'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#64748B] hover:text-[#0F2A5C]'
                  }`}
                >
                  Indonesia
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#2563EB] text-white'
                      : 'text-[#64748B] hover:text-[#0F2A5C]'
                  }`}
                >
                  English
                </button>
              </div>

              <div
                role="group"
                aria-label={lang === 'id' ? 'Format CV' : 'CV Template'}
                className="inline-flex items-center gap-1 p-1 bg-white border border-[#E2E8F0] rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => {
                    setTemplate('ats');
                    setMobilePane('preview');
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    template === 'ats'
                      ? 'bg-[#0F2A5C] text-white'
                      : 'text-[#64748B] hover:text-[#0F2A5C]'
                  }`}
                >
                  ATS Clean
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTemplate('editorial');
                    setMobilePane('preview');
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    template === 'editorial'
                      ? 'bg-[#0F2A5C] text-white'
                      : 'text-[#64748B] hover:text-[#0F2A5C]'
                  }`}
                >
                  Editorial
                </button>
              </div>

              <div
                role="group"
                aria-label="Tampilan seluler"
                className="inline-flex xl:hidden items-center gap-1 p-1 bg-white border border-[#E2E8F0] rounded-lg"
              >
                <button
                  type="button"
                  onClick={() => setMobilePane('editor')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    mobilePane === 'editor'
                      ? 'bg-[#0F2A5C] text-white'
                      : 'text-[#64748B]'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setMobilePane('preview')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    mobilePane === 'preview'
                      ? 'bg-[#0F2A5C] text-white'
                      : 'text-[#64748B]'
                  }`}
                >
                  {lang === 'id' ? 'Pratinjau A4' : 'A4 Preview'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyPlainText}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0F2A5C] bg-white border border-[#CBD5E1] hover:border-[#2563EB] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {lang === 'id' ? 'Tersalin' : 'Copied'}
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    {lang === 'id' ? 'Salin Teks ATS' : 'Copy ATS Text'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0F2A5C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main id="top" className="flex-1">
        {view === 'journey' ? (
          <>
            <div className="no-print">
              <PortfolioJourneyView
                data={cvData}
                lang={lang}
                certFiles={certFiles}
                onChangeLang={setLang}
                onPrintCV={handlePrint}
                onOpenEditor={() => {
                  setView('studio');
                  setMobilePane('editor');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onUploadCertFile={handleUploadCertFile}
                onDeleteCertFile={handleDeleteCertFile}
                onAddCertification={handleAddCertification}
              />
            </div>
            <div className="hidden print:block print-sheet-wrapper">
              <CVPreviewSheet data={cvData} lang={lang} template={template} />
            </div>
          </>
        ) : (
          <div className="print-sheet-wrapper bg-[#F4F7FC] min-h-[calc(100vh-120px)]">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <div className="grid grid-cols-1 xl:grid-cols-[500px_1fr] gap-8 items-start">
                <div
                  className={`no-print ${
                    mobilePane === 'editor' ? 'block' : 'hidden xl:block'
                  }`}
                >
                  <CVEditorPanel
                    data={cvData}
                    lang={lang}
                    onChange={setCvData}
                  />
                </div>

                <div
                  className={`${
                    mobilePane === 'preview' ? 'block' : 'hidden xl:block'
                  }`}
                >
                  <CVPreviewSheet
                    data={cvData}
                    lang={lang}
                    template={template}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="no-print border-t border-[#E2E8F0] bg-white py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748B]">
          <span>
            © 2026 {cvData.fullName}. {cvData.location}.
          </span>
          <span>
            {lang === 'id'
              ? 'Klik Unduh CV untuk mencetak atau menyimpan CV format A4 (PDF).'
              : 'Click Download CV to print or save your A4 CV as PDF.'}
          </span>
        </div>
      </footer>
    </div>
  );
}
