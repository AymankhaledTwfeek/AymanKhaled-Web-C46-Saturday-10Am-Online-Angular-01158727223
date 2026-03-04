import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post, Category } from '../../models/post.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <span class="hero-badge">
            <span class="badge-dots">
              <span class="dot"></span>
              <span class="dot"></span>
            </span>
            مرحباً بك في عدسة
          </span>
          <h1 class="hero-title">
            اكتشف <span class="gradient-text">فن</span>
            <br>
            التصوير الفوتوغرافي
          </h1>
          <p class="hero-desc">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>
          <div class="hero-actions">
            <a routerLink="/blog" class="btn btn-primary">
              استكشف المقالات
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </a>
            <a routerLink="/blog" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              اعرف المزيد
            </a>
          </div>
        </div>
        
        <div class="hero-stats">
          <div class="stat">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <span class="stat-number">+50</span>
            <span class="stat-label">مقالة</span>
          </div>
          <div class="stat">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <span class="stat-number">+10ألف</span>
            <span class="stat-label">قارئ</span>
          </div>
          <div class="stat">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span class="stat-number">{{ categories.length }}</span>
            <span class="stat-label">تصنيفات</span>
          </div>
          <div class="stat">
            <div class="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                <path d="M2 2l7.586 7.586"/>
                <circle cx="11" cy="11" r="2"/>
              </svg>
            </div>
            <span class="stat-number">6</span>
            <span class="stat-label">كاتب</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Posts -->
    <section class="section featured">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="badge badge-accent">مميز</span>
            <h2 class="section-title">مقالات مختارة</h2>
            <p class="section-subtitle">محتوى منتقى لبدء رحلة تعلمك</p>
          </div>
          <a routerLink="/blog" class="btn btn-secondary">عرض الكل</a>
        </div>
        
        <div class="featured-grid">
          @for (post of featuredPosts; track post.id; let i = $index) {
            <article class="featured-card" [class.large]="i === 0">
              <div class="card-image">
                <img [src]="post.image" [alt]="post.title" loading="lazy" />
                <div class="card-overlay"></div>
              </div>
              <div class="card-content">
                <div class="card-badges">
                  <span class="badge badge-accent">مميز</span>
                  <span class="badge badge-primary">{{ post.category }}</span>
                </div>
                <span class="read-time">{{ post.readTime }} دقائق للقراءة</span>
                <h3 class="card-title">{{ post.title }}</h3>
                <p class="card-excerpt">{{ post.excerpt }}</p>
                <div class="card-footer">
                  <div class="card-author">
                    <img [src]="post.author.avatar" [alt]="post.author.name" />
                    <div>
                      <span class="author-name">{{ post.author.name }}</span>
                      <span class="author-date">{{ formatDate(post.date) }}</span>
                    </div>
                  </div>
                  <a routerLink="/blog" class="read-more">اقرأ المقال</a>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section categories">
      <div class="container">
        <div class="section-header center">
          <span class="badge badge-primary">التصنيفات</span>
          <h2 class="section-title">استكشف حسب الموضوع</h2>
          <p class="section-subtitle">اعثر على محتوى مصمم حسب اهتماماتك</p>
        </div>
        
        <div class="categories-grid">
          @for (category of categories; track category.slug) {
            <a [routerLink]="['/blog']" [queryParams]="{category: category.name}" class="category-card">
              <span class="category-icon">{{ category.icon }}</span>
              <h3 class="category-name">{{ category.name }}</h3>
              <span class="category-count">{{ category.count }} مقالة</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Recent Posts -->
    <section class="section recent">
      <div class="container">
        <div class="section-header">
          <div>
            <span class="badge badge-primary">الأحدث</span>
            <h2 class="section-title">أحدث المقالات</h2>
            <p class="section-subtitle">محتوى جديد طازج من المطبعة</p>
          </div>
          <a routerLink="/blog" class="btn btn-secondary">عرض جميع المقالات</a>
        </div>
        
        <div class="recent-grid">
          @for (post of recentPosts; track post.id) {
            <article class="recent-card">
              <div class="card-image">
                <img [src]="post.image" [alt]="post.title" loading="lazy" />
              </div>
              <div class="card-content">
                <div class="card-meta">
                  <span class="badge badge-primary">{{ post.category }}</span>
                  <span class="read-time">{{ post.readTime }} دقائق للقراءة</span>
                  <span class="post-date">{{ formatDate(post.date) }}</span>
                </div>
                <h3 class="card-title">{{ post.title }}</h3>
                <p class="card-excerpt">{{ post.excerpt }}</p>
                <div class="card-author">
                  <img [src]="post.author.avatar" [alt]="post.author.name" />
                  <div>
                    <span class="author-name">{{ post.author.name }}</span>
                    <span class="author-role">{{ post.author.role }}</span>
                  </div>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="section newsletter">
      <div class="container">
        <div class="newsletter-box">
          <span class="badge badge-accent">النشرة الإخبارية</span>
          <h2>اشترك في <span class="gradient-text">نشرتنا الإخبارية</span></h2>
          <p>احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني</p>
          <div class="newsletter-form">
            <input type="email" placeholder="أدخل بريدك الإلكتروني" />
            <button class="btn btn-primary">اشترك الآن</button>
          </div>
          <span class="newsletter-note">انضم لـ +10,000 مصور • بدون إزعاج • إلغاء الاشتراك في أي وقت</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero Section */
    .hero {
      position: relative;
      padding: 5rem 0 3rem;
      overflow: hidden;
      min-height: 85vh;
      display: flex;
      align-items: center;
      background: var(--bg-primary);
    }
    
    .hero .container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .hero-content {
      text-align: center;
      max-width: 800px;
      margin-bottom: 3rem;
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
      margin-bottom: 2rem;
    }
    
    .badge-dots {
      display: flex;
      gap: 0.25rem;
      
      .dot {
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
      }
    }
    
    .hero-title {
      font-size: 4rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }
    
    .gradient-text {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-desc {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: 2.5rem;
      line-height: 1.8;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
    
    .hero-stats {
      display: flex;
      gap: 1rem;
      width: 100%;
      max-width: 900px;
    }
    
    .stat {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 1rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      transition: var(--transition);
      
      &:hover {
        border-color: var(--primary-color);
        
        .stat-icon {
          background: var(--primary-color);
          color: white;
        }
      }
      
      &-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(249, 115, 22, 0.1);
        border-radius: var(--radius-lg);
        color: var(--primary-color);
        margin-bottom: 0.75rem;
        transition: var(--transition);
      }
      
      &-number {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-primary);
      }
      
      &-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
    }
    
    /* Section Header */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 3rem;
      
      &.center {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .badge {
        margin-bottom: 0.5rem;
      }
    }
    
    /* Featured Posts */
    .featured-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(2, 1fr);
      gap: 1.5rem;
    }
    
    .featured-card {
      position: relative;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      transition: var(--transition);
      
      &.large {
        grid-row: span 2;
        
        .card-image {
          height: 100%;
        }
        
        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%);
        }
        
        .card-title {
          font-size: 1.5rem;
        }
      }
      
      &:hover {
        border-color: var(--primary-color);
        
        .card-image img {
          transform: scale(1.05);
        }
      }
    }
    
    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
    }
    
    .card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .card-badges {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .read-time {
      font-size: 0.8125rem;
      color: var(--text-light);
      display: block;
      margin-bottom: 0.5rem;
    }
    
    .card-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }
    
    .card-excerpt {
      color: var(--text-secondary);
      font-size: 0.9375rem;
      line-height: 1.7;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
    
    .card-author {
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
      
      .author-date, .author-role {
        font-size: 0.75rem;
        color: var(--text-light);
      }
    }
    
    .read-more {
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--primary-color);
      
      &:hover {
        color: var(--primary-light);
      }
    }
    
    /* Categories */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1.5rem;
    }
    
    .category-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1.5rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      transition: var(--transition);
      
      &:hover {
        border-color: var(--primary-color);
        transform: translateY(-5px);
        
        .category-icon {
          transform: scale(1.2);
        }
        
        .category-name {
          color: var(--primary-color);
        }
      }
    }
    
    .category-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      transition: transform 0.3s ease;
    }
    
    .category-name {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
      transition: var(--transition);
    }
    
    .category-count {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    
    /* Recent Posts */
    .recent-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    
    .recent-card {
      display: flex;
      gap: 1rem;
      background: var(--bg-card);
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      transition: var(--transition);
      
      &:hover {
        border-color: var(--primary-color);
        
        .card-title {
          color: var(--primary-color);
        }
      }
      
      .card-image {
        flex-shrink: 0;
        width: 100px;
        height: 100px;
        border-radius: var(--radius-lg);
      }
      
      .card-content {
        padding: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      
      .card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        align-items: center;
        
        .badge {
          font-size: 0.6875rem;
          padding: 0.125rem 0.5rem;
        }
        
        .read-time, .post-date {
          font-size: 0.75rem;
        }
      }
      
      .card-title {
        font-size: 0.9375rem;
        margin-bottom: 0.5rem;
        transition: var(--transition);
      }
      
      .card-excerpt {
        font-size: 0.8125rem;
        margin-bottom: 0.75rem;
        -webkit-line-clamp: 2;
      }
      
      .card-author {
        margin-top: auto;
        
        img {
          width: 32px;
          height: 32px;
        }
        
        .author-name {
          font-size: 0.8125rem;
        }
      }
    }
    
    /* Newsletter */
    .newsletter {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>');
        background-size: 100px;
      }
    }
    
    .newsletter-box {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      
      .badge {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        margin-bottom: 1rem;
      }
      
      h2 {
        font-size: 2rem;
        color: white;
        margin-bottom: 1rem;
        
        .gradient-text {
          background: linear-gradient(135deg, #fff, rgba(255,255,255,0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      
      p {
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 2rem;
      }
    }
    
    .newsletter-form {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      
      input {
        flex: 1;
        padding: 1rem 1.5rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: var(--radius-lg);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 1rem;
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        &:focus {
          border-color: white;
          background: rgba(255, 255, 255, 0.15);
        }
      }
      
      .btn {
        background: var(--bg-primary);
        color: var(--primary-color);
        
        &:hover {
          background: var(--bg-secondary);
        }
      }
    }
    
    .newsletter-note {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    /* Responsive */
    @media (max-width: 1200px) {
      .categories-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 992px) {
      .hero {
        padding: 4rem 0 2rem;
        min-height: auto;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-stats {
        flex-wrap: wrap;
        gap: 1rem;
        
        .stat {
          flex: 1 1 calc(50% - 0.5rem);
        }
      }
      
      .featured-grid {
        grid-template-columns: 1fr;
        
        .featured-card.large {
          grid-row: span 1;
        }
      }
      
      .recent-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: center;
        
        .btn {
          width: 100%;
          max-width: 280px;
          justify-content: center;
        }
      }
      
      .section-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
        
        &.center {
          align-items: center;
        }
      }
      
      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .recent-grid {
        grid-template-columns: 1fr;
      }
      
      .recent-card {
        flex-direction: column;
        
        .card-image {
          width: 100%;
          height: 150px;
        }
      }
      
      .newsletter-form {
        flex-direction: column;
      }
    }
    
    @media (max-width: 480px) {
      .hero-stats .stat {
        flex: 1 1 100%;
      }
    }
  `]
})
export class HomeComponent {
  private postsService = inject(PostsService);
  
  featuredPosts: Post[] = this.postsService.getFeaturedPosts();
  recentPosts: Post[] = this.postsService.getRecentPosts(3);
  categories: Category[] = this.postsService.getCategories();

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
