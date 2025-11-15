import { Timestamp } from "firebase/firestore";

export interface Portfolio {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
    github?: string;
    order: number;
    createdAt: Timestamp;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface Skill {
    name: string;
    category?: string;
}