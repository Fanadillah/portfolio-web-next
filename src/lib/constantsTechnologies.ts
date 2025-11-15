import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiFirebase, 
  SiNodedotjs, 
  SiLaravel, 
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
] as const;

export type TechnologyId = typeof TECHNOLOGIES[number]['id'];
