import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../services/app-state.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  actions = [
    { title: 'Home',        route: '/home',        icon: 'house' },
    { title: 'Products',    route: '/products',    icon: 'box-seam' },
    { title: 'New Product', route: '/newproducts', icon: 'plus-circle' }
  ];

  isLoading = false;
  private loadingSub!: Subscription;

  constructor(
    public appState: AppStateService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingSub = this.loadingService.isLoading$.subscribe(v => (this.isLoading = v));
  }

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
