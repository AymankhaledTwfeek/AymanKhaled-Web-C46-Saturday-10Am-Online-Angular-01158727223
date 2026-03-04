import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-top">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <a routerLink="/" class="logo">
                <div class="logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
                    <path d="M7 6V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V6" stroke="currentColor" stroke-width="2"/>
                    <circle cx="17" cy="10" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <span class="logo-text">عدسة</span>
              </a>
              <p class="footer-desc">
                مدونة متخصصة في فن التصوير الفوتوغرافي، نقدم لك أسرار المحترفين ونصائح عملية لتطوير مهاراتك أكثر.
              </p>
              <div class="social-links">
                <a href="#" class="social-link" title="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" class="social-link" title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" class="social-link" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" class="social-link" title="X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="footer-links">
              <h4>استكشف</h4>
              <ul>
                <li><a routerLink="/">الرئيسية</a></li>
                <li><a routerLink="/blog">المدونة</a></li>
              </ul>
            </div>
            
            <div class="footer-links">
              <h4>التصنيفات</h4>
              <ul>
                <li><a routerLink="/blog" [queryParams]="{category: 'إضاءة'}">إضاءة</a></li>
                <li><a routerLink="/blog" [queryParams]="{category: 'بورتريه'}">بورتريه</a></li>
                <li><a routerLink="/blog" [queryParams]="{category: 'مناظر طبيعية'}">مناظر طبيعية</a></li>
                <li><a routerLink="/blog" [queryParams]="{category: 'تقنيات'}">تقنيات</a></li>
                <li><a routerLink="/blog" [queryParams]="{category: 'معدات'}">معدات</a></li>
              </ul>
            </div>
            
            <div class="footer-newsletter">
              <h4>ابقَ على اطلاع</h4>
              <p>اشترك للحصول على أحدث المقالات والتحديثات</p>
              <div class="newsletter-form">
                <input type="email" placeholder="أدخل بريدك الإلكتروني" />
                <button class="btn btn-primary">اشترك</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-content">
            <p>© {{ currentYear }} عدسة. صنع بـ ❤️ للتصوير الفوتوغرافي</p>
            <div class="footer-bottom-links">
              <a href="#">سياسة الخصوصية</a>
              <a href="#">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-secondary);
      margin-top: auto;
    }
    
    .footer-top {
      padding: 4rem 0 3rem;
      border-bottom: 1px solid var(--border-color);
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 2fr;
      gap: 3rem;
    }
    
    .footer-brand {
      .logo {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
        
        &-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-color);
          border-radius: var(--radius-lg);
          color: white;
        }
        
        &-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }
      }
    }
    
    .footer-desc {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 1.5rem;
      font-size: 0.9375rem;
    }
    
    .social-links {
      display: flex;
      gap: 0.75rem;
    }
    
    .social-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      color: var(--text-secondary);
      transition: var(--transition);
      
      &:hover {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
      }
    }
    
    .footer-links {
      h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
      }
      
      ul {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      a {
        color: var(--text-secondary);
        font-size: 0.9375rem;
        
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    
    .footer-newsletter {
      h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }
      
      p {
        color: var(--text-secondary);
        margin-bottom: 1rem;
        font-size: 0.9375rem;
      }
    }
    
    .newsletter-form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      
      input {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        background: var(--bg-card);
        color: var(--text-primary);
        font-size: 0.9375rem;
        
        &::placeholder {
          color: var(--text-light);
        }
        
        &:focus {
          border-color: var(--primary-color);
        }
      }
      
      .btn {
        width: 100%;
      }
    }
    
    .footer-bottom {
      padding: 1.5rem 0;
    }
    
    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      p {
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
    }
    
    .footer-bottom-links {
      display: flex;
      gap: 2rem;
      
      a {
        color: var(--text-secondary);
        font-size: 0.875rem;
        
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    
    @media (max-width: 992px) {
      .footer-content {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    @media (max-width: 576px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .footer-bottom-content {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .footer-bottom-links {
        gap: 1rem;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
