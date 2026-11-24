import {
  Activity,
  Cable,
  Cpu,
  Globe,
  HardDrive,
  Lock,
  MapPin,
  Monitor,
  Network,
  Radio,
  Router,
  Server,
  Shield,
  Terminal,
} from 'lucide-react';
import { ReactNode } from 'react';

interface SkillCardItem {
  name: string;
  color: string;
  bg: string;
  icon: ReactNode;
}

const SKILL_ITEMS: SkillCardItem[] = [
  {
    name: 'Mikrotik',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    icon: <Router className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'Router & Switch',
    color: '#0369A1',
    bg: '#F0F9FF',
    icon: <Network className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'Fortinet',
    color: '#DC2626',
    bg: '#FEF2F2',
    icon: <Shield className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'Huawei U2000',
    color: '#E11D48',
    bg: '#FFF1F2',
    icon: <Activity className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'BTS Nokia/ZTE',
    color: '#2563EB',
    bg: '#EFF6FF',
    icon: <Radio className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'Fiber Optik',
    color: '#0D9488',
    bg: '#F0FDFA',
    icon: <Cable className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'TCP/IP & VPN',
    color: '#4F46E5',
    bg: '#EEF2FF',
    icon: <Lock className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'DNS & DHCP',
    color: '#0284C7',
    bg: '#F0F9FF',
    icon: <Globe className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'Windows Server',
    color: '#2563EB',
    bg: '#EFF6FF',
    icon: <Server className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'Desktop & IT',
    color: '#334155',
    bg: '#F8FAFC',
    icon: <Monitor className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'PuTTY & Winbox',
    color: '#0F172A',
    bg: '#F1F5F9',
    icon: <Terminal className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'TEMS & Nemo',
    color: '#D97706',
    bg: '#FFFBEB',
    icon: <Cpu className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'QGIS & MapInfo',
    color: '#16A34A',
    bg: '#F0FDF4',
    icon: <MapPin className="w-8 h-8" strokeWidth={1.8} />,
  },
  {
    name: 'UPS & CCTV',
    color: '#7C3AED',
    bg: '#F5F3FF',
    icon: <HardDrive className="w-8 h-8" strokeWidth={1.8} />,
  },
];

export function SkillCardsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
      {SKILL_ITEMS.map((skill) => (
        <div
          key={skill.name}
          className="group bg-white border border-[#E2E8F0] rounded-2xl px-4 py-6 flex flex-col items-center justify-center gap-3 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(15,42,92,0.12)] hover:border-[#BFDBFE]"
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: skill.bg, color: skill.color }}
          >
            {skill.icon}
          </div>
          <span className="text-[13px] font-bold text-[#0F2A5C] leading-tight">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}
