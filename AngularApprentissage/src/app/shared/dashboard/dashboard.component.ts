import { Component } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(public appState: AppStateService) {}

  totalCheckedProducts(): number {
    return this.appState.productsState.products.filter((p: any) => p.checked).length;
  }
}
