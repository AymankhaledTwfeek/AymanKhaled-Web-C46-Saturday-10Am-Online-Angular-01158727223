import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <div class="container">
        <div class="content">
          <div class="error-code">404</div>
          <div class="camera-icon">📷</div>
          <h1>الصفحة غير موجودة</h1>
          <p>
            عذراً، يبدو أن العدسة لم تستطع التقاط هذه الصفحة!
            <br>
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <div class="actions">
            <a routerLink="/" class="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              العودة للرئيسية
            </a>
            <a routerLink="/blog" class="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              تصفح المقالات
            </a>
          </div>
        </div>
        
        <div class="suggestions">
          <h3>ربما تبحث عن:</h3>
          <ul>
            <li>
              <a routerLink="/">
                <span class="icon">🏠</span>
                <span>الصفحة الرئيسية</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </a>
            </li>
            <li>
              <a routerLink="/blog">
                <span class="icon">📚</span>
                <span>جميع المقالات</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </a>
            </li>
            <li>
              <a routerLink="/blog" [queryParams]="{category: 'إضاءة'}">
                <span class="icon">💡</span>
                <span>مقالات الإضاءة</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </a>
            </li>
            <li>
              <a routerLink="/blog" [queryParams]="{category: 'تقنيات'}">
                <span class="icon">⚙️</span>
                <span>مقالات التقنيات</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .not-found {
      min-height: calc(100vh - 160px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
      background: var(--bg-primary);
    }
    
    .container {
      text-align: center;
    }
    
    .content {
      margin-bottom: 3rem;
    }
    
    .error-code {
      font-size: 8rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 1rem;
    }
    
    .camera-icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      animation: bounce 2s ease-in-out infinite;
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 2rem;
    }
    
    .actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
      
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
    
    .suggestions {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      
      h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
      }
      
      ul {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      a {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        color: var(--text-secondary);
        font-weight: 500;
        transition: var(--transition);
        
        .icon {
          font-size: 1.25rem;
        }
        
        span:not(.icon) {
          flex: 1;
          text-align: right;
        }
        
        svg {
          opacity: 0;
          transition: var(--transition);
        }
        
        &:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
          
          svg {
            opacity: 1;
            transform: translateX(-5px);
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .error-code {
        font-size: 5rem;
      }
      
      .camera-icon {
        font-size: 3rem;
      }
      
      h1 {
        font-size: 1.5rem;
      }
      
      p {
        font-size: 1rem;
      }
      
      .actions {
        flex-direction: column;
        align-items: center;
        
        .btn {
          width: 100%;
          max-width: 250px;
          justify-content: center;
        }
      }
    }
  `]
})
export class NotFoundComponent {}
