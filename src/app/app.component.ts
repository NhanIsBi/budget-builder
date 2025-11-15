import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BudgetBuilderComponent } from './components/budget-builder/budget-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BudgetBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'budget-builder';
}
