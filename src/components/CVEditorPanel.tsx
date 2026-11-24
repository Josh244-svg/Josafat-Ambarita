import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  CertificationItem,
  CVData,
  EducationItem,
  ExperienceItem,
  Language,
  ProjectItem,
  SkillGroup,
} from '../types/cv';

export type EditorSection =
  | 'profile'
  | 'experience'
  | 'projects'
  | 'education'
  | 'skills'
  | 'certifications';

interface CVEditorPanelProps {
  data: CVData;
  lang: Language;
  onChange: (next: CVData) => void;
}

const SECTION_TABS: { id: EditorSection; label: { id: string; en: string } }[] = [
  { id: 'profile', label: { id: 'Profil', en: 'Profile' } },
  { id: 'experience', label: { id: 'Pengalaman', en: 'Experience' } },
  { id: 'projects', label: { id: 'Proyek', en: 'Projects' } },
  { id: 'education', label: { id: 'Pendidikan', en: 'Education' } },
  { id: 'skills', label: { id: 'Keahlian', en: 'Skills' } },
  { id: 'certifications', label: { id: 'Sertifikasi', en: 'Certifications' } },
];

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 transition-colors';

const labelClass = 'block text-xs font-medium text-slate-600 mb-1.5';

export function CVEditorPanel({ data, lang, onChange }: CVEditorPanelProps) {
  const [activeTab, setActiveTab] = useState<EditorSection>('profile');

  const updateExperience = (idx: number, patch: Partial<ExperienceItem>) => {
    const next = [...data.experiences];
    next[idx] = { ...next[idx], ...patch };
    onChange({ ...data, experiences: next });
  };

  const moveExperience = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= data.experiences.length) return;
    const next = [...data.experiences];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange({ ...data, experiences: next });
  };

  const addExperience = () => {
    const item: ExperienceItem = {
      id: `exp-${Date.now()}`,
      period: { id: '2025 – Sekarang', en: '2025 – Present' },
      role: { id: 'Posisi Baru', en: 'New Role' },
      company: 'Nama Perusahaan',
      location: 'Indonesia',
      highlights: {
        id: ['Tuliskan pencapaian atau tanggung jawab utama Anda.'],
        en: ['Describe your key achievement or responsibility.'],
      },
    };
    onChange({ ...data, experiences: [item, ...data.experiences] });
  };

  const removeExperience = (idx: number) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((_, i) => i !== idx),
    });
  };

  const updateProject = (idx: number, patch: Partial<ProjectItem>) => {
    const next = [...data.projects];
    next[idx] = { ...next[idx], ...patch };
    onChange({ ...data, projects: next });
  };

  const addProject = () => {
    const item: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: 'Proyek Baru',
      subtitle: { id: 'Ringkasan singkat proyek', en: 'Brief project subtitle' },
      status: { id: 'Selesai', en: 'Completed' },
      users: { id: 'Pengguna target', en: 'Target users' },
      role: { id: 'Fullstack Developer', en: 'Fullstack Developer' },
      solution: {
        id: 'Jelaskan masalah yang diselesaikan dan hasil sistem.',
        en: 'Explain the problem solved and system outcome.',
      },
      features: {
        id: ['Fitur utama 1', 'Fitur utama 2'],
        en: ['Key feature 1', 'Key feature 2'],
      },
      tech: ['Laravel', 'MySQL'],
    };
    onChange({ ...data, projects: [...data.projects, item] });
  };

  const removeProject = (idx: number) => {
    onChange({
      ...data,
      projects: data.projects.filter((_, i) => i !== idx),
    });
  };

  const updateEducation = (idx: number, patch: Partial<EducationItem>) => {
    const next = [...data.education];
    next[idx] = { ...next[idx], ...patch };
    onChange({ ...data, education: next });
  };

  const addEducation = () => {
    const item: EducationItem = {
      id: `edu-${Date.now()}`,
      period: { id: '2020 – 2024', en: '2020 – 2024' },
      degree: { id: 'Gelar & Jurusan', en: 'Degree & Major' },
      institution: 'Nama Universitas',
      gpa: '3.50 / 4.00',
      notes: { id: '', en: '' },
    };
    onChange({ ...data, education: [...data.education, item] });
  };

  const removeEducation = (idx: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== idx),
    });
  };

  const updateSkillGroup = (idx: number, patch: Partial<SkillGroup>) => {
    const next = [...data.skillGroups];
    next[idx] = { ...next[idx], ...patch };
    onChange({ ...data, skillGroups: next });
  };

  const addSkillGroup = () => {
    const item: SkillGroup = {
      id: `skill-${Date.now()}`,
      label: { id: 'Kategori Baru', en: 'New Category' },
      items: ['Skill 1', 'Skill 2'],
    };
    onChange({ ...data, skillGroups: [...data.skillGroups, item] });
  };

  const removeSkillGroup = (idx: number) => {
    onChange({
      ...data,
      skillGroups: data.skillGroups.filter((_, i) => i !== idx),
    });
  };

  const updateCertification = (idx: number, patch: Partial<CertificationItem>) => {
    const next = [...data.certifications];
    next[idx] = { ...next[idx], ...patch };
    onChange({ ...data, certifications: next });
  };

  const addCertification = () => {
    const item: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: { id: 'Nama Sertifikasi / Pelatihan', en: 'Certification / Training Name' },
      issuer: 'Lembaga Penerbit',
      year: '2026',
      type: 'cert',
    };
    onChange({ ...data, certifications: [item, ...data.certifications] });
  };

  const removeCertification = (idx: number) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
      {/* Section Tabs */}
      <div className="border-b border-slate-200 px-4 py-2.5 bg-slate-50/70 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {SECTION_TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-slate-950 border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {tab.label[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-5 sm:p-6 space-y-5">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  {lang === 'id' ? 'Nama Lengkap' : 'Full Name'}
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={data.fullName}
                  onChange={(e) => onChange({ ...data, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>
                  {lang === 'id' ? 'Peran / Jabatan' : 'Role / Headline'}
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={data.headline[lang]}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      headline: { ...data.headline, [lang]: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>
                  {lang === 'id' ? 'Domisili' : 'Location'}
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={data.location}
                  onChange={(e) => onChange({ ...data, location: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={data.email}
                  onChange={(e) => onChange({ ...data, email: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>
                  {lang === 'id' ? 'Telepon / WhatsApp' : 'Phone / WhatsApp'}
                </label>
                <input
                  type="text"
                  className={`${inputClass} tabular-nums`}
                  value={data.phone}
                  onChange={(e) => onChange({ ...data, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>LinkedIn URL</label>
                <input
                  type="url"
                  className={inputClass}
                  value={data.linkedin}
                  onChange={(e) => onChange({ ...data, linkedin: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>
                  {lang === 'id' ? 'Link Portofolio' : 'Portfolio URL'}
                </label>
                <input
                  type="url"
                  className={inputClass}
                  value={data.portfolioUrl}
                  onChange={(e) => onChange({ ...data, portfolioUrl: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                {lang === 'id'
                  ? 'Ringkasan Profesional (Bahasa aktif)'
                  : 'Professional Summary (Active language)'}
              </label>
              <textarea
                rows={4}
                className={inputClass}
                value={data.summary[lang]}
                onChange={(e) =>
                  onChange({
                    ...data,
                    summary: { ...data.summary, [lang]: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                {lang === 'id'
                  ? 'Urutkan dari pengalaman terbaru di atas.'
                  : 'Order from most recent experience at the top.'}
              </p>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {lang === 'id' ? 'Tambah Pengalaman' : 'Add Experience'}
              </button>
            </div>

            {data.experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="pt-4 border-t border-slate-200 first:border-t-0 first:pt-0 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    {idx + 1}. {exp.company || (lang === 'id' ? 'Perusahaan' : 'Company')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveExperience(idx, -1)}
                      disabled={idx === 0}
                      title={lang === 'id' ? 'Geser naik' : 'Move up'}
                      className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveExperience(idx, 1)}
                      disabled={idx === data.experiences.length - 1}
                      title={lang === 'id' ? 'Geser turun' : 'Move down'}
                      className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExperience(idx)}
                      title={lang === 'id' ? 'Hapus' : 'Delete'}
                      className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Jabatan / Peran' : 'Role'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={exp.role[lang]}
                      onChange={(e) =>
                        updateExperience(idx, {
                          role: { ...exp.role, [lang]: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Periode' : 'Period'}
                    </label>
                    <input
                      type="text"
                      className={`${inputClass} tabular-nums`}
                      value={exp.period[lang]}
                      onChange={(e) =>
                        updateExperience(idx, {
                          period: { ...exp.period, [lang]: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Perusahaan' : 'Company'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(idx, { company: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Lokasi' : 'Location'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(idx, { location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    {lang === 'id'
                      ? 'Poin Pencapaian & Tanggung Jawab (1 baris = 1 poin)'
                      : 'Achievements & Responsibilities (1 line = 1 bullet)'}
                  </label>
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={exp.highlights[lang].join('\n')}
                    onChange={(e) =>
                      updateExperience(idx, {
                        highlights: {
                          ...exp.highlights,
                          [lang]: e.target.value.split('\n').filter((line) => line.trim() !== ''),
                        },
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                {lang === 'id'
                  ? 'Proyek utama dari portofolio yang memperkuat CV.'
                  : 'Key portfolio projects highlighted on your CV.'}
              </p>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {lang === 'id' ? 'Tambah Proyek' : 'Add Project'}
              </button>
            </div>

            {data.projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="pt-4 border-t border-slate-200 first:border-t-0 first:pt-0 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    {idx + 1}. {proj.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    title={lang === 'id' ? 'Hapus' : 'Delete'}
                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Nama Sistem / Proyek' : 'Project Name'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={proj.name}
                      onChange={(e) =>
                        updateProject(idx, { name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Subjudul' : 'Subtitle'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={proj.subtitle[lang]}
                      onChange={(e) =>
                        updateProject(idx, {
                          subtitle: { ...proj.subtitle, [lang]: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    {lang === 'id' ? 'Deskripsi Solusi' : 'Solution Description'}
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={proj.solution[lang]}
                    onChange={(e) =>
                      updateProject(idx, {
                        solution: { ...proj.solution, [lang]: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Pengguna' : 'Users'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={proj.users[lang]}
                      onChange={(e) =>
                        updateProject(idx, {
                          users: { ...proj.users, [lang]: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Teknologi (pisahkan koma)' : 'Tech Stack (comma-separated)'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={proj.tech.join(', ')}
                      onChange={(e) =>
                        updateProject(idx, {
                          tech: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                {lang === 'id' ? 'Riwayat pendidikan formal.' : 'Formal education history.'}
              </p>
              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {lang === 'id' ? 'Tambah Pendidikan' : 'Add Education'}
              </button>
            </div>

            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="pt-4 border-t border-slate-200 first:border-t-0 first:pt-0 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    {idx + 1}. {edu.institution}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEducation(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Gelar & Jurusan' : 'Degree & Major'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={edu.degree[lang]}
                      onChange={(e) =>
                        updateEducation(idx, {
                          degree: { ...edu.degree, [lang]: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Institusi' : 'Institution'}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(idx, { institution: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>
                      {lang === 'id' ? 'Periode / Keterangan' : 'Period / Label'}
                    </label>
                    <input
                      type="text"
                      className={`${inputClass} tabular-nums`}
                      value={edu.period[lang]}
                      onChange={(e) =>
                        updateEducation(idx, {
                          period: { ...edu.period, [lang]: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>IPK / GPA</label>
                    <input
                      type="text"
                      className={`${inputClass} tabular-nums`}
                      value={edu.gpa}
                      onChange={(e) => updateEducation(idx, { gpa: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    {lang === 'id' ? 'Aktivitas / Catatan' : 'Activities / Notes'}
                  </label>
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={edu.notes[lang]}
                    onChange={(e) =>
                      updateEducation(idx, {
                        notes: { ...edu.notes, [lang]: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                {lang === 'id'
                  ? 'Kelompokkan keahlian agar mudah dipindai rekruter & ATS.'
                  : 'Group skills cleanly for recruiters and ATS parsing.'}
              </p>
              <button
                type="button"
                onClick={addSkillGroup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {lang === 'id' ? 'Tambah Kelompok' : 'Add Group'}
              </button>
            </div>

            {data.skillGroups.map((group, idx) => (
              <div
                key={group.id}
                className="pt-4 border-t border-slate-200 first:border-t-0 first:pt-0 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    {group.label[lang]}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSkillGroup(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className={labelClass}>
                    {lang === 'id' ? 'Nama Kategori' : 'Category Name'}
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={group.label[lang]}
                    onChange={(e) =>
                      updateSkillGroup(idx, {
                        label: { ...group.label, [lang]: e.target.value },
                      })
                    }
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    {lang === 'id'
                      ? 'Daftar Keahlian (pisahkan koma)'
                      : 'Skills (comma-separated)'}
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={group.items.join(', ')}
                    onChange={(e) =>
                      updateSkillGroup(idx, {
                        items: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                {lang === 'id'
                  ? 'Sertifikasi resmi dan pelatihan relevan.'
                  : 'Relevant certifications and training courses.'}
              </p>
              <button
                type="button"
                onClick={addCertification}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                {lang === 'id' ? 'Tambah Sertifikasi' : 'Add Certification'}
              </button>
            </div>

            {data.certifications.map((cert, idx) => (
              <div
                key={cert.id}
                className="pt-3.5 border-t border-slate-200 first:border-t-0 first:pt-0 grid grid-cols-1 sm:grid-cols-[1fr_140px_84px_32px] gap-2.5 items-end"
              >
                <div>
                  <label className={labelClass}>
                    {lang === 'id' ? 'Nama Sertifikasi / Pelatihan' : 'Certification Name'}
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={cert.name[lang]}
                    onChange={(e) =>
                      updateCertification(idx, {
                        name: { ...cert.name, [lang]: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    {lang === 'id' ? 'Penerbit' : 'Issuer'}
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCertification(idx, { issuer: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    {lang === 'id' ? 'Tahun' : 'Year'}
                  </label>
                  <input
                    type="text"
                    className={`${inputClass} tabular-nums`}
                    value={cert.year}
                    onChange={(e) =>
                      updateCertification(idx, { year: e.target.value })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeCertification(idx)}
                  title={lang === 'id' ? 'Hapus' : 'Delete'}
                  className="p-2 text-slate-400 hover:text-red-600 cursor-pointer mb-0.5"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
