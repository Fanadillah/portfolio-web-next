import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiFirebase, 
  SiNodedotjs, 
  SiLaravel, 
  SiPhp,
  SiMysql,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiTailwindcss 
} from "react-icons/si";

export const TECHNOLOGIES = [
  { 
    id: "nextjs", 
    label: "Next.js", 
    icon: SiNextdotjs, 
    description: "Framework React untuk aplikasi fullstack"
  },
  { 
    id: "react", 
    label: "React", 
    icon: SiReact, 
    description: "Library UI untuk membangun antarmuka"
  },
  { 
    id: "typescript", 
    label: "TypeScript", 
    icon: SiTypescript, 
    description: "Superset JavaScript dengan static typing"
  },
  { 
    id: "javascript", 
    label: "JavaScript", 
    icon: SiJavascript, 
    description: "Bahasa pemrograman untuk web development"
  },
  { 
    id: "firebase", 
    label: "Firebase", 
    icon: SiFirebase, 
    description: "Platform backend untuk autentikasi, database, dan hosting"
  },
  { 
    id: "nodejs", 
    label: "Node.js", 
    icon: SiNodedotjs, 
    description: "Runtime JavaScript untuk server-side"
  },
  { 
    id: "laravel", 
    label: "Laravel", 
    icon: SiLaravel, 
    description: "Framework PHP untuk backend development"
  },
  { 
    id: "tailwind", 
    label: "Tailwind CSS", 
    icon: SiTailwindcss, 
    description: "Utility-first CSS framework untuk styling"
  },
  {
    id: "PHP",
    label: "PHP",
    icon: SiPhp,
    description: "Bahasa pemrograman server-side untuk web development"
  },
  {
    id: "MySQL",
    label: "MySQL",
    icon: SiMysql,
    description: "Database management system untuk menyimpan data aplikasi"
  },
  {
    id: "Bootstrap",
    label: "Bootstrap",
    icon: SiBootstrap,
    description: "Framework CSS untuk membangun antarmuka responsif"
  },
  {
    id:"HTML5",
    label: "HTML5",
    icon: SiHtml5,
    description: "Bahasa markup untuk membuat struktur halaman web"
  },
  {
    id: "CSS3",
    label: "CSS3",
    icon: SiCss3,
    description: "Bahasa styling untuk mengatur tampilan halaman web"
  }
] as const;

export type TechnologyId = typeof TECHNOLOGIES[number]['id'];
