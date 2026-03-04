import { Injectable } from '@angular/core';
import { Post, Category } from '../models/post.model';
import postsData from '../../../public/data/posts.json';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = postsData.posts as Post[];
  private categories: Category[] = postsData.categories as Category[];

  getPosts(): Post[] {
    return this.posts;
  }

  getFeaturedPosts(): Post[] {
    return this.posts.filter(post => post.featured);
  }

  getRecentPosts(count: number = 3): Post[] {
    return [...this.posts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
  }

  getPostsByCategory(category: string): Post[] {
    if (!category || category === 'all') {
      return this.posts;
    }
    return this.posts.filter(post => post.category === category);
  }

  getPostBySlug(slug: string): Post | undefined {
    return this.posts.find(post => post.slug === slug);
  }

  getCategories(): Category[] {
    return this.categories;
  }

  searchPosts(query: string): Post[] {
    if (!query || query.trim() === '') {
      return this.posts;
    }
    
    const searchTerm = query.trim().toLowerCase();
    
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm) ||
      post.author.name.toLowerCase().includes(searchTerm)
    );
  }

  getPaginatedPosts(
    page: number, 
    pageSize: number, 
    category?: string,
    searchQuery?: string
  ): {
    posts: Post[];
    totalPages: number;
    totalPosts: number;
  } {
    let filteredPosts = this.posts;
    
    // Filter by category
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    // Filter by search query
    if (searchQuery && searchQuery.trim() !== '') {
      const searchTerm = searchQuery.trim().toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm) ||
        post.author.name.toLowerCase().includes(searchTerm)
      );
    }
    
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / pageSize);
    const startIndex = (page - 1) * pageSize;
    const posts = filteredPosts.slice(startIndex, startIndex + pageSize);

    return { posts, totalPages, totalPosts };
  }
}
