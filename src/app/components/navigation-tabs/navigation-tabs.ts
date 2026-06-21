import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-navigation-tabs',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation-tabs.html',
  styleUrl: './navigation-tabs.css',
})
export class NavigationTabsComponent {
  protected readonly items: NavigationItem[] = [
    { path: '/resumo', label: 'Resumo' },
    { path: '/criancas', label: 'Criancas' },
    { path: '/carteira', label: 'Carteira' },
    { path: '/campanhas', label: 'Campanhas' },
  ];
}
