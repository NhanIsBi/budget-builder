import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { ParentCategory, Category } from '../../models/budget.model';

@Component({
  selector: 'app-budget-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budget-builder.component.html',
  styleUrl: './budget-builder.component.css'
})
export class BudgetBuilderComponent implements OnInit {
  // State
  contextMenuVisible = signal(false);
  contextMenuPosition = signal({ x: 0, y: 0 });
  contextMenuData = signal<{ groupType: 'income' | 'expense', groupId: string, categoryId: string, value: number } | null>(null);

  // Date range selections
  startMonth = 1;
  startYear = 2024;
  endMonth = 12;
  endYear = 2024;

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  years = Array.from({ length: 10 }, (_, i) => 2020 + i);

  // Expose service signals
  monthColumns = this.budgetService.monthColumns;
  budgetData = this.budgetService.budgetData;
  incomeTotals = this.budgetService.incomeTotals;
  expenseTotals = this.budgetService.expenseTotals;
  profitLoss = this.budgetService.profitLoss;
  balances = this.budgetService.balances;

  constructor(public budgetService: BudgetService) {
    // Close context menu on click outside
    if (typeof document !== 'undefined') {
      document.addEventListener('click', () => {
        this.contextMenuVisible.set(false);
      });
    }
  }

  ngOnInit(): void {
    // Focus first input after view init
    setTimeout(() => {
      const firstInput = document.querySelector('input[type="number"]') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }

  onDateRangeChange(): void {
    this.budgetService.updateDateRange({
      startMonth: this.startMonth,
      startYear: this.startYear,
      endMonth: this.endMonth,
      endYear: this.endYear
    });
  }

  onCellValueChange(groupType: 'income' | 'expense', groupId: string, categoryId: string, monthKey: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;
    this.budgetService.updateCategoryValue(groupType, groupId, categoryId, monthKey, value);
  }

  onCellKeyDown(event: KeyboardEvent, groupType: 'income' | 'expense', groupId: string, categoryId: string, monthKey: string): void {
    const input = event.target as HTMLInputElement;
    const currentCell = input.closest('td');

    if (!currentCell) return;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        // Add new category in the same group
        this.budgetService.addCategory(groupType, groupId);
        setTimeout(() => {
          // Focus the name input of the new category
          const newInputs = document.querySelectorAll('input.category-name');
          const lastInput = newInputs[newInputs.length - 1] as HTMLInputElement;
          if (lastInput) {
            lastInput.focus();
          }
        }, 50);
        break;

      case 'Tab':
        // Let default tab behavior work
        break;

      case 'ArrowRight':
        event.preventDefault();
        this.moveFocus(currentCell, 'right');
        break;

      case 'ArrowLeft':
        event.preventDefault();
        this.moveFocus(currentCell, 'left');
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(currentCell, 'down');
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(currentCell, 'up');
        break;
    }
  }

  private moveFocus(currentCell: Element, direction: 'up' | 'down' | 'left' | 'right'): void {
    const row = currentCell.closest('tr');
    if (!row) return;

    const cells = Array.from(row.querySelectorAll('td'));
    const currentIndex = cells.indexOf(currentCell as HTMLTableCellElement);

    let targetCell: Element | null = null;

    switch (direction) {
      case 'right':
        targetCell = cells[currentIndex + 1];
        break;
      case 'left':
        targetCell = cells[currentIndex - 1];
        break;
      case 'down':
        const nextRow = row.nextElementSibling;
        if (nextRow) {
          targetCell = nextRow.querySelectorAll('td')[currentIndex];
        }
        break;
      case 'up':
        const prevRow = row.previousElementSibling;
        if (prevRow) {
          targetCell = prevRow.querySelectorAll('td')[currentIndex];
        }
        break;
    }

    if (targetCell) {
      const input = targetCell.querySelector('input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    }
  }

  onCellRightClick(event: MouseEvent, groupType: 'income' | 'expense', groupId: string, categoryId: string, monthKey: string): void {
    event.preventDefault();
    event.stopPropagation();

    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;

    this.contextMenuData.set({ groupType, groupId, categoryId, value });
    this.contextMenuPosition.set({ x: event.clientX, y: event.clientY });
    this.contextMenuVisible.set(true);
  }

  applyToAllMonths(event: Event): void {
    event.stopPropagation();
    const data = this.contextMenuData();
    if (data) {
      this.budgetService.applyToAllMonths(data.groupType, data.groupId, data.categoryId, data.value);
    }
    this.contextMenuVisible.set(false);
  }

  addCategory(groupType: 'income' | 'expense', groupId: string): void {
    this.budgetService.addCategory(groupType, groupId);
  }

  startEditingCategory(groupType: 'income' | 'expense', groupId: string, categoryId: string): void {
    const data = this.budgetData();
    const groups = groupType === 'income' ? data.incomeGroups : data.expenseGroups;
    const group = groups.find(g => g.id === groupId);

    if (group) {
      const category = group.categories.find(c => c.id === categoryId);
      if (category) {
        category.isEditing = true;
      }
    }
  }

  onCategoryNameChange(groupType: 'income' | 'expense', groupId: string, categoryId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.budgetService.updateCategoryName(groupType, groupId, categoryId, input.value);
  }

  onCategoryNameKeyDown(event: KeyboardEvent, groupType: 'income' | 'expense', groupId: string, categoryId: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      this.budgetService.updateCategoryName(groupType, groupId, categoryId, input.value);

      // Focus first value input of this category
      setTimeout(() => {
        const row = input.closest('tr');
        if (row) {
          const firstValueInput = row.querySelector('input[type="number"]') as HTMLInputElement;
          if (firstValueInput) {
            firstValueInput.focus();
          }
        }
      }, 50);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      // Cancel editing - reset to original state
      const data = this.budgetData();
      const groups = groupType === 'income' ? data.incomeGroups : data.expenseGroups;
      const group = groups.find(g => g.id === groupId);
      if (group) {
        const category = group.categories.find(c => c.id === categoryId);
        if (category) {
          category.isEditing = false;
        }
      }
    }
  }

  deleteCategory(groupType: 'income' | 'expense', groupId: string, categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.budgetService.deleteCategory(groupType, groupId, categoryId);
    }
  }

  addParentCategory(type: 'income' | 'expense'): void {
    const name = prompt('Enter parent category name:');
    if (name) {
      this.budgetService.addParentCategory(type, name);
    }
  }

  startEditingParentCategoryName(type: 'income' | 'expense', groupId: string): void {
    this.budgetService.startEditingParentCategoryName(type, groupId);
  }

  onParentCategoryNameChange(type: 'income' | 'expense', groupId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.budgetService.updateParentCategoryName(type, groupId, input.value.trim());
    }
  }

  onParentCategoryNameKeyDown(event: KeyboardEvent, type: 'income' | 'expense', groupId: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      if (input.value.trim()) {
        this.budgetService.updateParentCategoryName(type, groupId, input.value.trim());
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      // Cancel editing - reset to original name
      const data = this.budgetData();
      const groups = type === 'income' ? data.incomeGroups : data.expenseGroups;
      const group = groups.find(g => g.id === groupId);
      if (group) {
        group.isEditingName = false;
      }
    }
  }

  deleteParentCategory(type: 'income' | 'expense', groupId: string): void {
    if (confirm('Are you sure you want to delete this parent category and all its sub-categories?')) {
      this.budgetService.deleteParentCategory(type, groupId);
    }
  }

  getSubTotal(group: ParentCategory, monthKey: string): number {
    return this.budgetService.getSubTotal(group, monthKey);
  }

  trackByGroupId(index: number, group: ParentCategory): string {
    return group.id;
  }

  trackByCategoryId(index: number, category: Category): string {
    return category.id;
  }

  trackByMonthKey(index: number, month: any): string {
    return month.key;
  }
}
