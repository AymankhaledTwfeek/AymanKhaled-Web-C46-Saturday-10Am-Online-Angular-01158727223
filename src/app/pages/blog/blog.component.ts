import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post, Category } from '../../models/post.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="container">
        <span class="hero-badge">
          <span class="badge-icon">📝</span>
          مدونتنا
        </span>
        <h1 class="hero-title">
          استكشف <span class="gradient-text">مقالاتنا</span>
        </h1>
        <p class="hero-desc">اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث</p>
        
        <!-- Search Bar -->
        <div class="search-bar">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input 
            type="text" 
            placeholder="ابحث في المقالات..." 
            [value]="searchQuery()"
            (input)="onSearch($event)"
            (keyup.enter)="performSearch()"
          />
          @if (searchQuery()) {
            <button class="clear-search" (click)="clearSearch()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          }
        </div>
        
        <!-- Category Filters -->
        <div class="category-filters">
          <button 
            class="filter-btn" 
            [class.active]="activeCategory() === 'all'"
            (click)="filterByCategory('all')">
            جميع المقالات
          </button>
          @for (category of categories; track category.slug) {
            <button 
              class="filter-btn"
              [class.active]="activeCategory() === category.name"
              (click)="filterByCategory(category.name)">
              {{ category.name }}
            </button>
          }
        </div>
      </div>
    </section>

    <!-- Posts Content -->
    <section class="blog-content">
      <div class="container">
        <!-- Controls Bar -->
        <div class="controls-bar">
          <div class="view-toggle">
            <button 
              class="view-btn" 
              [class.active]="viewMode() === 'list'"
              (click)="setViewMode('list')"
              title="عرض قائمة">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <button 
              class="view-btn"
              [class.active]="viewMode() === 'grid'"
              (click)="setViewMode('grid')"
              title="عرض شبكي">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
            </button>
          </div>
          <span class="posts-count">
            عرض <strong>{{ paginatedData().totalPosts }}</strong> مقالات
            @if (searchQuery()) {
              <span class="search-term">للبحث عن "{{ searchQuery() }}"</span>
            }
          </span>
        </div>

        <!-- Posts Grid -->
        <div class="posts-container" [class.grid-view]="viewMode() === 'grid'" [class.list-view]="viewMode() === 'list'">
          @for (post of paginatedData().posts; track post.id) {
            <article class="post-card">
              <div class="post-image">
                <img [src]="post.image" [alt]="post.title" loading="lazy" />
                <span class="category-tag">{{ post.category }}</span>
                @if (post.featured) {
                  <span class="featured-tag">مميز</span>
                }
              </div>
              <div class="post-content">
                <div class="post-meta">
                  <span class="read-time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {{ post.readTime }} دقائق للقراءة
                  </span>
                  <span class="post-date">{{ formatDate(post.date) }}</span>
                </div>
                <h2 class="post-title" [innerHTML]="highlightSearch(post.title)"></h2>
                <p class="post-excerpt" [innerHTML]="highlightSearch(post.excerpt)"></p>
                <div class="post-footer">
                  <div class="post-author">
                    <img [src]="post.author.avatar" [alt]="post.author.name" />
                    <div>
                      <span class="author-name">{{ post.author.name }}</span>
                      <span class="author-role">{{ post.author.role }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>

        <!-- Empty State -->
        @if (paginatedData().posts.length === 0) {
          <div class="empty-state">
            <span class="empty-icon">🔍</span>
            <h3>لا توجد نتائج</h3>
            @if (searchQuery()) {
              <p>لم نجد مقالات تطابق "{{ searchQuery() }}". جرب كلمات مختلفة.</p>
            } @else {
              <p>لا توجد مقالات في هذا التصنيف حالياً.</p>
            }
            <button class="btn btn-primary" (click)="resetFilters()">عرض جميع المقالات</button>
          </div>
        }

        <!-- Pagination -->
        @if (paginatedData().totalPages > 1) {
          <div class="pagination">
            <button 
              class="page-btn nav-btn"
              [disabled]="currentPage() === 1"
              (click)="goToPage(currentPage() - 1)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            @for (page of getPageNumbers(); track page) {
              @if (page === '...') {
                <span class="page-dots">...</span>
              } @else {
                <button 
                  class="page-btn"
                  [class.active]="currentPage() === page"
                  (click)="goToPage(+page)">
                  {{ page }}
                </button>
              }
            }
            
            <button 
              class="page-btn nav-btn"
              [disabled]="currentPage() === paginatedData().totalPages"
              (click)="goToPage(currentPage() + 1)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
          </div>
          
          <p class="page-info">صفحة {{ currentPage() }} من {{ paginatedData().totalPages }}</p>
        }
      </div>
    </section>
  `,
  styles: [`
    /* Blog Hero */
    .blog-hero {
      padding: 4rem 0 3rem;
      text-align: center;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
    }
    
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 9999px;
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      
      .badge-icon {
        font-size: 1rem;
      }
    }
    
    .hero-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .gradient-text {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-desc {
      color: var(--text-secondary);
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
    
    /* Search Bar */
    .search-bar {
      max-width: 500px;
      margin: 0 auto 2rem;
      position: relative;
      
      .search-icon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-light);
      }
      
      input {
        width: 100%;
        padding: 1rem 3rem 1rem 3rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        color: var(--text-primary);
        font-size: 1rem;
        transition: var(--transition);
        
        &::placeholder {
          color: var(--text-light);
        }
        
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }
      }
      
      .clear-search {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-secondary);
        border-radius: 50%;
        color: var(--text-secondary);
        transition: var(--transition);
        
        &:hover {
          background: var(--primary-color);
          color: white;
        }
      }
    }
    
    /* Category Filters */
    .category-filters {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid var(--border-color);
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: var(--transition);
      
      &:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
      
      &.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
      }
    }
    
    /* Blog Content */
    .blog-content {
      padding: 2rem 0 4rem;
    }
    
    /* Controls Bar */
    .controls-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .view-toggle {
      display: flex;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 0.25rem;
    }
    
    .view-btn {
      padding: 0.5rem 0.75rem;
      background: transparent;
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        color: var(--primary-color);
      }
      
      &.active {
        background: var(--primary-color);
        color: white;
      }
    }
    
    .posts-count {
      font-size: 0.9375rem;
      color: var(--text-secondary);
      
      strong {
        color: var(--primary-color);
      }
      
      .search-term {
        color: var(--text-light);
        font-size: 0.875rem;
      }
    }
    
    /* Posts Container */
    .posts-container {
      &.grid-view {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
        
        .post-card {
          flex-direction: column;
          
          .post-image {
            height: 200px;
          }
        }
      }
      
      &.list-view {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        
        .post-card {
          flex-direction: row;
          
          .post-image {
            width: 280px;
            min-height: 200px;
            flex-shrink: 0;
          }
          
          .post-content {
            flex: 1;
          }
        }
      }
    }
    
    /* Post Card */
    .post-card {
      display: flex;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      overflow: hidden;
      transition: var(--transition);
      
      &:hover {
        border-color: var(--primary-color);
        transform: translateY(-2px);
        
        .post-title {
          color: var(--primary-color);
        }
        
        .post-image img {
          transform: scale(1.05);
        }
      }
    }
    
    .post-image {
      position: relative;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }
    
    .category-tag {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.25rem 0.75rem;
      background: rgba(249, 115, 22, 0.9);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
    }
    
    .featured-tag {
      position: absolute;
      top: 1rem;
      left: 1rem;
      padding: 0.25rem 0.75rem;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 9999px;
    }
    
    .post-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    
    .post-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }
    
    .read-time {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.8125rem;
      color: var(--text-light);
      
      svg {
        opacity: 0.7;
      }
    }
    
    .post-date {
      font-size: 0.8125rem;
      color: var(--text-light);
    }
    
    .post-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      line-height: 1.4;
      transition: var(--transition);
      
      :host ::ng-deep .highlight {
        background: rgba(249, 115, 22, 0.3);
        color: var(--primary-color);
        padding: 0 2px;
        border-radius: 2px;
      }
    }
    
    .post-excerpt {
      color: var(--text-secondary);
      font-size: 0.9375rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      
      :host ::ng-deep .highlight {
        background: rgba(249, 115, 22, 0.3);
        color: var(--primary-color);
        padding: 0 2px;
        border-radius: 2px;
      }
    }
    
    .post-footer {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
    
    .post-author {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .author-name {
        display: block;
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--text-primary);
      }
      
      .author-role {
        font-size: 0.75rem;
        color: var(--text-light);
      }
    }
    
    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      
      .empty-icon {
        font-size: 4rem;
        display: block;
        margin-bottom: 1rem;
      }
      
      h3 {
        font-size: 1.5rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }
      
      p {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
      }
    }
    
    /* Pagination */
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 3rem;
      flex-wrap: wrap;
    }
    
    .page-btn {
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      font-weight: 500;
      color: var(--text-secondary);
      transition: var(--transition);
      
      &:hover:not(:disabled) {
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
      
      &.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
      }
      
      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      
      &.nav-btn {
        background: var(--bg-secondary);
      }
    }
    
    .page-dots {
      padding: 0 0.5rem;
      color: var(--text-light);
    }
    
    .page-info {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    
    /* Responsive */
    @media (max-width: 992px) {
      .posts-container {
        &.grid-view {
          grid-template-columns: repeat(2, 1fr);
        }
        
        &.list-view {
          .post-card {
            flex-direction: column;
            
            .post-image {
              width: 100%;
              height: 200px;
            }
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 1.75rem;
      }
      
      .category-filters {
        overflow-x: auto;
        justify-content: flex-start;
        padding-bottom: 0.5rem;
        flex-wrap: nowrap;
        
        &::-webkit-scrollbar {
          height: 4px;
        }
        
        &::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }
      }
      
      .filter-btn {
        white-space: nowrap;
      }
      
      .controls-bar {
        flex-direction: column-reverse;
        gap: 1rem;
        align-items: stretch;
      }
      
      .view-toggle {
        justify-content: center;
      }
      
      .posts-count {
        text-align: center;
      }
      
      .posts-container.grid-view {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BlogComponent implements OnInit {
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  categories: Category[] = this.postsService.getCategories();
  
  currentPage = signal(1);
  activeCategory = signal('all');
  viewMode = signal<'grid' | 'list'>('grid');
  searchQuery = signal('');
  pageSize = 6;

  paginatedData = computed(() => {
    return this.postsService.getPaginatedPosts(
      this.currentPage(),
      this.pageSize,
      this.activeCategory(),
      this.searchQuery()
    );
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.activeCategory.set(params['category']);
      }
      if (params['page']) {
        this.currentPage.set(+params['page']);
      }
      if (params['search']) {
        this.searchQuery.set(params['search']);
      }
    });
  }

  filterByCategory(category: string): void {
    this.activeCategory.set(category);
    this.currentPage.set(1);
    this.updateUrl();
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  performSearch(): void {
    this.currentPage.set(1);
    this.updateUrl();
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.currentPage.set(1);
    this.updateUrl();
  }

  resetFilters(): void {
    this.activeCategory.set('all');
    this.searchQuery.set('');
    this.currentPage.set(1);
    this.updateUrl();
  }

  highlightSearch(text: string): string {
    const query = this.searchQuery();
    if (!query || query.trim() === '') {
      return text;
    }
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.paginatedData().totalPages) {
      this.currentPage.set(page);
      this.updateUrl();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): (number | string)[] {
    const total = this.paginatedData().totalPages;
    const current = this.currentPage();
    const pages: (number | string)[] = [];
    
    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        pages.push(1, 2, 3, 4, '...', total);
      } else if (current >= total - 2) {
        pages.push(1, '...', total - 3, total - 2, total - 1, total);
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total);
      }
    }
    
    return pages;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  private updateUrl(): void {
    const queryParams: Record<string, string | number | undefined> = {};
    
    if (this.activeCategory() !== 'all') {
      queryParams['category'] = this.activeCategory();
    }
    if (this.currentPage() > 1) {
      queryParams['page'] = this.currentPage();
    }
    if (this.searchQuery().trim() !== '') {
      queryParams['search'] = this.searchQuery();
    }
    
    this.router.navigate([], { 
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
