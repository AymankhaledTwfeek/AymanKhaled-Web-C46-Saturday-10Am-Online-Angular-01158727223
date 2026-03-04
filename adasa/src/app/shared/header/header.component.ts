import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <nav class="nav">
          <a routerLink="/" class="logo">
            <div class="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="13" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M7 6V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V6" stroke="currentColor" stroke-width="2"/>
                <circle cx="17" cy="10" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div class="logo-text">
              <span class="logo-name">عدسة</span>
              <span class="logo-subtitle">عالم التصوير الفوتوغرافي</span>
            </div>
          </a>
          
          <button class="mobile-toggle" (click)="toggleMenu()" [class.active]="isMenuOpen">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <ul class="nav-links" [class.active]="isMenuOpen">
            <li>
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                الرئيسية
              </a>
            </li>
            <li>
              <a routerLink="/blog" routerLinkActive="active">
                المدونة
              </a>
            </li>
          </ul>
          
          <div class="nav-actions">
            <button class="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <a routerLink="/blog" class="btn btn-primary header-btn">ابدأ القراءة</a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border-color);
    }
    
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      gap: 2rem;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      &-icon {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--primary-color);
        border-radius: var(--radius-lg);
        color: white;
      }
      
      &-text {
        display: flex;
        flex-direction: column;
      }
      
      &-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1.2;
      }
      
      &-subtitle {
        font-size: 0.75rem;
        color: var(--text-secondary);
        display: none;
      }
      
      &:hover .logo-name {
        color: var(--primary-color);
      }
    }
    
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex: 1;
      justify-content: center;
      
      a {
        font-weight: 500;
        color: var(--text-secondary);
        padding: 0.5rem 0;
        position: relative;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        &:hover, &.active {
          color: var(--text-primary);
          
          &::after {
            width: 100%;
          }
        }
      }
    }
    
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .search-btn {
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
        border-color: var(--primary-color);
        color: var(--primary-color);
      }
    }
    
    .header-btn {
      padding: 0.5rem 1.25rem;
      font-size: 0.875rem;
    }
    
    .mobile-toggle {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 30px;
      height: 30px;
      background: none;
      
      span {
        display: block;
        width: 100%;
        height: 2px;
        background: var(--text-primary);
        transition: all 0.3s ease;
      }
      
      &.active {
        span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        span:nth-child(2) {
          opacity: 0;
        }
        span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }
      }
    }
    
    @media (min-width: 992px) {
      .logo-subtitle {
        display: block;
      }
    }
    
    @media (max-width: 768px) {
      .mobile-toggle {
        display: flex;
      }
      
      .nav-actions {
        display: none;
      }
      
      .nav-links {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: var(--bg-primary);
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 2rem;
        gap: 0;
        transition: right 0.3s ease;
        
        &.active {
          right: 0;
        }
        
        li {
          width: 100%;
          text-align: center;
          
          a {
            display: block;
            padding: 1rem;
            font-size: 1.125rem;
          }
        }
      }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
