export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  author: string;
  body: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  year: string;
  budget: string;
  image: string;
  tags: string[];
  body: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  role: string;
  date: string;
  location: string;
  highlights: string[];
  body: string;
}

export interface Methodology {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  icon: string;
  body: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}