import { CVData, Language, TemplateStyle } from '../types/cv';

interface CVPreviewSheetProps {
  data: CVData;
  lang: Language;
  template: TemplateStyle;
}

const LABELS = {
  id: {
    summary: 'Ringkasan Profesional',
    experience: 'Pengalaman Kerja',
    projects: 'Proyek Utama',
    education: 'Pendidikan',
    skills: 'Keahlian Teknis',
    certifications: 'Sertifikasi & Pelatihan',
    gpa: 'IPK',
    users: 'Pengguna',
    role: 'Peran',
    certType: 'Sertifikasi',
    trainingType: 'Pelatihan',
  },
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    projects: 'Key Projects',
    education: 'Education',
    skills: 'Technical Skills',
    certifications: 'Certifications & Training',
    gpa: 'GPA',
    users: 'Users',
    role: 'Role',
    certType: 'Certification',
    trainingType: 'Training',
  },
};

function cleanDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function CVPreviewSheet({ data, lang, template }: CVPreviewSheetProps) {
  const t = LABELS[lang];
  const isEditorial = template === 'editorial';

  const contactItems = [
    data.location,
    data.email,
    data.phone,
    data.linkedin ? cleanDisplayUrl(data.linkedin) : '',
    data.portfolioUrl ? cleanDisplayUrl(data.portfolioUrl) : '',
  ].filter(Boolean);

  if (isEditorial) {
    return (
      <article
        aria-label="Pratinjau CV Editorial"
        className="print-a4-sheet mx-auto w-full max-w-[794px] min-h-[1123px] bg-white text-[#14171A] border border-slate-200 shadow-sm px-10 py-11 sm:px-12 sm:py-12"
      >
        {/* Header */}
        <header className="border-b border-slate-900 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-[34px] font-semibold tracking-tight text-slate-950 leading-tight">
                {data.fullName || 'Nama Lengkap'}
              </h1>
              <p className="mt-1 text-sm font-medium text-blue-700">
                {data.headline[lang]}
              </p>
            </div>
            <div className="text-xs text-slate-600 sm:text-right leading-relaxed tabular-nums space-y-0.5">
              {data.location && <div>{data.location}</div>}
              {(data.email || data.phone) && (
                <div>
                  {[data.email, data.phone].filter(Boolean).join(' · ')}
                </div>
              )}
              {(data.linkedin || data.portfolioUrl) && (
                <div className="text-slate-500">
                  {[
                    data.linkedin ? cleanDisplayUrl(data.linkedin) : '',
                    data.portfolioUrl ? cleanDisplayUrl(data.portfolioUrl) : '',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </div>
              )}
            </div>
          </div>
          {data.summary[lang] && (
            <p className="mt-4 text-[13px] leading-relaxed text-slate-700 max-w-[68ch]">
              {data.summary[lang]}
            </p>
          )}
        </header>

        {/* Main 2-Column Body */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-8 items-start">
          {/* Primary Column */}
          <div className="space-y-7">
            {/* Work Experience */}
            {data.experiences.length > 0 && (
              <section>
                <h2 className="font-serif text-[15px] font-semibold text-slate-950 border-b border-slate-200 pb-1.5 mb-4">
                  {t.experience}
                </h2>
                <div className="space-y-5">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className="print-avoid-break">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[13.5px] font-semibold text-slate-900">
                          {exp.role[lang]}
                        </h3>
                        <span className="text-xs text-slate-500 tabular-nums whitespace-nowrap shrink-0">
                          {exp.period[lang]}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ''}
                      </div>
                      {exp.highlights[lang].length > 0 && (
                        <ul className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-slate-700 list-disc pl-4">
                          {exp.highlights[lang].map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Projects */}
            {data.projects.length > 0 && (
              <section>
                <h2 className="font-serif text-[15px] font-semibold text-slate-950 border-b border-slate-200 pb-1.5 mb-4">
                  {t.projects}
                </h2>
                <div className="space-y-4">
                  {data.projects.map((proj) => (
                    <div key={proj.id} className="print-avoid-break">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[13.5px] font-semibold text-slate-900">
                          {proj.name}
                          {proj.subtitle[lang] ? ` — ${proj.subtitle[lang]}` : ''}
                        </h3>
                        {proj.tech.length > 0 && (
                          <span className="text-[11.5px] font-mono text-slate-500 whitespace-nowrap shrink-0">
                            {proj.tech.join(' · ')}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-700">
                        {proj.solution[lang]}
                      </p>
                      <div className="mt-1 text-[11.5px] text-slate-500">
                        {t.users}: {proj.users[lang]} · {t.role}: {proj.role[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Secondary Column */}
          <aside className="space-y-7">
            {/* Technical Skills */}
            {data.skillGroups.length > 0 && (
              <section className="print-avoid-break">
                <h2 className="font-serif text-[15px] font-semibold text-slate-950 border-b border-slate-200 pb-1.5 mb-3.5">
                  {t.skills}
                </h2>
                <div className="space-y-3.5">
                  {data.skillGroups.map((group) => (
                    <div key={group.id}>
                      <h3 className="text-xs font-semibold text-slate-900">
                        {group.label[lang]}
                      </h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                        {group.items.join(' · ')}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section className="print-avoid-break">
                <h2 className="font-serif text-[15px] font-semibold text-slate-950 border-b border-slate-200 pb-1.5 mb-3.5">
                  {t.education}
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="text-xs font-semibold text-slate-900">
                        {edu.degree[lang]}
                      </div>
                      <div className="text-[12px] text-slate-700 mt-0.5">
                        {edu.institution}
                      </div>
                      <div className="text-[11.5px] text-slate-500 tabular-nums mt-0.5">
                        {edu.period[lang]}
                        {edu.gpa ? ` · ${t.gpa} ${edu.gpa}` : ''}
                      </div>
                      {edu.notes[lang] && (
                        <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-600">
                          {edu.notes[lang]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <section className="print-avoid-break">
                <h2 className="font-serif text-[15px] font-semibold text-slate-950 border-b border-slate-200 pb-1.5 mb-3.5">
                  {t.certifications}
                </h2>
                <div className="space-y-2.5">
                  {data.certifications.map((cert) => (
                    <div key={cert.id} className="text-[11.5px] leading-snug">
                      <div className="font-medium text-slate-900">
                        {cert.name[lang]}
                      </div>
                      <div className="text-slate-500 tabular-nums mt-0.5">
                        {cert.issuer} · {cert.year}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </article>
    );
  }

  // ATS Clean Single-Column Format
  return (
    <article
      aria-label="Pratinjau CV ATS"
      className="print-a4-sheet mx-auto w-full max-w-[794px] min-h-[1123px] bg-white text-[#14171A] border border-slate-200 shadow-sm px-10 py-10 sm:px-12 sm:py-11"
    >
      {/* Header */}
      <header className="border-b border-slate-300 pb-4">
        <h1 className="text-[26px] font-bold tracking-tight text-slate-950 leading-tight">
          {data.fullName || 'Nama Lengkap'}
        </h1>
        <p className="text-[14px] font-semibold text-slate-700 mt-0.5">
          {data.headline[lang]}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-slate-600 tabular-nums">
          {contactItems.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true" className="text-slate-300">/</span>}
              <span>{item}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="mt-5 space-y-5">
        {/* Professional Summary */}
        {data.summary[lang] && (
          <section className="print-avoid-break">
            <h2 className="text-[13px] font-bold tracking-wide text-slate-950 border-b border-slate-200 pb-1 mb-2">
              {t.summary}
            </h2>
            <p className="text-[12.5px] leading-relaxed text-slate-700">
              {data.summary[lang]}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {data.experiences.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold tracking-wide text-slate-950 border-b border-slate-200 pb-1 mb-3">
              {t.experience}
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="print-avoid-break">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[13px] font-semibold text-slate-900">
                      {exp.role[lang]}
                    </h3>
                    <span className="text-[12px] font-medium text-slate-600 tabular-nums whitespace-nowrap shrink-0">
                      {exp.period[lang]}
                    </span>
                  </div>
                  <div className="text-[12px] text-slate-600">
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ''}
                  </div>
                  {exp.highlights[lang].length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-[12.5px] leading-relaxed text-slate-700 list-disc pl-4">
                      {exp.highlights[lang].map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-[13px] font-bold tracking-wide text-slate-950 border-b border-slate-200 pb-1 mb-3">
              {t.projects}
            </h2>
            <div className="space-y-3.5">
              {data.projects.map((proj) => (
                <div key={proj.id} className="print-avoid-break">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[13px] font-semibold text-slate-900">
                      {proj.name}
                      {proj.subtitle[lang] ? ` — ${proj.subtitle[lang]}` : ''}
                    </h3>
                    {proj.tech.length > 0 && (
                      <span className="text-[11.5px] font-mono text-slate-600 whitespace-nowrap shrink-0">
                        {proj.tech.join(', ')}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-700">
                    {proj.solution[lang]}
                  </p>
                  {proj.features[lang].length > 0 && (
                    <p className="mt-1 text-[11.5px] text-slate-600">
                      {proj.features[lang].join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-[13px] font-bold tracking-wide text-slate-950 border-b border-slate-200 pb-1 mb-2.5">
              {t.education}
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[13px] font-semibold text-slate-900">
                      {edu.degree[lang]} — {edu.institution}
                    </h3>
                    <span className="text-[12px] text-slate-600 tabular-nums whitespace-nowrap shrink-0">
                      {edu.period[lang]}
                      {edu.gpa ? ` · ${t.gpa} ${edu.gpa}` : ''}
                    </span>
                  </div>
                  {edu.notes[lang] && (
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-700">
                      {edu.notes[lang]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills */}
        {data.skillGroups.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-[13px] font-bold tracking-wide text-slate-950 border-b border-slate-200 pb-1 mb-2.5">
              {t.skills}
            </h2>
            <div className="space-y-1.5">
              {data.skillGroups.map((group) => (
                <div key={group.id} className="text-[12.5px] text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">{group.label[lang]}: </span>
                  <span>{group.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Training */}
        {data.certifications.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-[13px] font-bold tracking-wide text-slate-950 border-b border-slate-200 pb-1 mb-2.5">
              {t.certifications}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="text-[12px] leading-snug text-slate-700 flex items-baseline justify-between gap-2">
                  <span className="truncate" title={cert.name[lang]}>
                    <span className="font-medium text-slate-900">{cert.name[lang]}</span>
                    {' · '}
                    <span className="text-slate-500">{cert.issuer}</span>
                  </span>
                  <span className="text-slate-500 tabular-nums shrink-0">{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
