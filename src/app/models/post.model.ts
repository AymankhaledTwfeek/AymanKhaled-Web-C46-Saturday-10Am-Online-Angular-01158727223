export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  date: string;
  image: string;
  featured: boolean;
  author: Author;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  icon: string;
}
