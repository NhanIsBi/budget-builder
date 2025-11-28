import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { ParentCategory, MonthColumn } from '../../models/budget.model';
import { CategoryGroupComponent } from '../category-group/category-group.component';

@Component({
  selector: 'app-budget-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryGroupComponent],
  templateUrl: './budget-builder.component.html',
  styleUrl: './budget-builder.component.css'
})
export class BudgetBuilderComponent implements OnInit, OnDestroy {
  @ViewChild('budgetTable') budgetTable!: ElementRef<HTMLTableElement>;

  // Context menu state using signals
  contextMenuVisible = signal(false);
  contextMenuPosition = signal({ x: 0, y: 0 });
  contextMenuData = signal<{ groupType: 'income' | 'expense'; groupId: string; categoryId: string; monthKey: string; value: number } | null>(null);

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

  constructor(public budgetService: BudgetService) {}

  ngOnInit(): void {
    // Initial focus handled through template autofocus
  }

  ngOnDestroy(): void {
    // Cleanup is handled by Angular for HostListener
  }

  // Use HostListener for proper cleanup
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Only close if click is outside context menu
    if (!target.closest('.context-menu')) {
      this.contextMenuVisible.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.contextMenuVisible.set(false);
  }

  onDateRangeChange(): void {
    this.budgetService.updateDateRange({
      startMonth: this.startMonth,
      startYear: this.startYear,
      endMonth: this.endMonth,
      endYear: this.endYear
    });
  }

  // Handle category value changes from subcomponent
  onCategoryValueChange(groupType: 'income' | 'expense', groupId: string, data: { categoryId: string; monthKey: string; value: number }): void {
    this.budgetService.updateCategoryValue(groupType, groupId, data.categoryId, data.monthKey, data.value);
  }

  // Handle category name changes from subcomponent
  onCategoryNameChange(groupType: 'income' | 'expense', groupId: string, data: { categoryId: string; name: string }): void {
    this.budgetService.updateCategoryName(groupType, groupId, data.categoryId, data.name);
  }

  // Handle add category from subcomponent
  onCategoryAdd(groupType: 'income' | 'expense', groupId: string): void {
    this.budgetService.addCategory(groupType, groupId);
  }

  // Handle delete category from subcomponent
  onCategoryDelete(groupType: 'income' | 'expense', groupId: string, data: { categoryId: string }): void {
    this.budgetService.deleteCategory(groupType, groupId, data.categoryId);
  }

  // Handle start editing category from subcomponent
  onCategoryStartEdit(groupType: 'income' | 'expense', groupId: string, data: { categoryId: string }): void {
    this.budgetService.startEditingCategory(groupType, groupId, data.categoryId);
  }

  // Handle cancel editing category from subcomponent
  onCategoryCancelEdit(groupType: 'income' | 'expense', groupId: string, data: { categoryId: string }): void {
    this.budgetService.cancelEditingCategory(groupType, groupId, data.categoryId);
  }

  // Handle set category pending delete from subcomponent
  onCategorySetPendingDelete(groupType: 'income' | 'expense', groupId: string, data: { categoryId: string; pending: boolean }): void {
    this.budgetService.setCategoryPendingDelete(groupType, groupId, data.categoryId, data.pending);
  }

  // Handle parent name change from subcomponent
  onParentNameChange(groupType: 'income' | 'expense', groupId: string, data: { name: string }): void {
    this.budgetService.updateParentCategoryName(groupType, groupId, data.name);
  }

  // Handle start editing parent from subcomponent
  onParentStartEdit(groupType: 'income' | 'expense', groupId: string): void {
    this.budgetService.startEditingParentCategoryName(groupType, groupId);
  }

  // Handle cancel editing parent from subcomponent
  onParentCancelEdit(groupType: 'income' | 'expense', groupId: string): void {
    this.budgetService.cancelEditingParentCategoryName(groupType, groupId);
  }

  // Handle delete parent from subcomponent
  onParentDelete(groupType: 'income' | 'expense', groupId: string): void {
    this.budgetService.deleteParentCategory(groupType, groupId);
  }

  // Handle set parent pending delete from subcomponent
  onParentSetPendingDelete(groupType: 'income' | 'expense', groupId: string, data: { pending: boolean }): void {
    this.budgetService.setParentCategoryPendingDelete(groupType, groupId, data.pending);
  }

  // Handle add parent category
  addParentCategory(type: 'income' | 'expense'): void {
    this.budgetService.addParentCategory(type);
  }

  // Handle right click on cell from subcomponent
  onCellRightClick(groupType: 'income' | 'expense', groupId: string, data: { event: MouseEvent; categoryId: string; monthKey: string }): void {
    const input = data.event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;

    this.contextMenuData.set({
      groupType,
      groupId,
      categoryId: data.categoryId,
      monthKey: data.monthKey,
      value
    });
    this.contextMenuPosition.set({ x: data.event.clientX, y: data.event.clientY });
    this.contextMenuVisible.set(true);
  }

  // Handle keyboard navigation from subcomponent
  onCellKeyDown(groupType: 'income' | 'expense', groupId: string, data: { event: KeyboardEvent; categoryId: string; monthKey: string }): void {
    const event = data.event;
    const input = event.target as HTMLInputElement;
    const currentCell = input.closest('td');

    if (!currentCell) return;

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        this.budgetService.addCategory(groupType, groupId);
        break;

      case 'Tab':
        // Let default tab behavior work
        break;

      case 'ArrowRight':
        event.preventDefault();
        this.moveFocusHorizontal(currentCell, 1);
        break;

      case 'ArrowLeft':
        event.preventDefault();
        this.moveFocusHorizontal(currentCell, -1);
        break;

      case 'ArrowDown':
        event.preventDefault();
        this.moveFocusVertical(currentCell, 1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.moveFocusVertical(currentCell, -1);
        break;
    }
  }

  // Improved horizontal focus movement
  private moveFocusHorizontal(currentCell: Element, direction: number): void {
    const row = currentCell.closest('tr');
    if (!row) return;

    const cells = Array.from(row.querySelectorAll('td.value-cell'));
    const currentIndex = cells.indexOf(currentCell as HTMLTableCellElement);

    if (currentIndex === -1) return;

    const targetIndex = currentIndex + direction;
    if (targetIndex >= 0 && targetIndex < cells.length) {
      const targetCell = cells[targetIndex];
      const input = targetCell.querySelector('input[type="number"]') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    }
  }

  // Improved vertical focus movement - skips non-data rows
  private moveFocusVertical(currentCell: Element, direction: number): void {
    const currentRow = currentCell.closest('tr');
    if (!currentRow) return;

    const table = currentRow.closest('table');
    if (!table) return;

    // Get all category rows (rows that have value-cell td elements)
    const allRows = Array.from(table.querySelectorAll('tr.category-row'));
    const currentRowIndex = allRows.indexOf(currentRow as HTMLTableRowElement);

    if (currentRowIndex === -1) return;

    // Get current cell's month key for column matching
    const monthKey = currentCell.getAttribute('data-month-key');
    if (!monthKey) return;

    // Find the target row
    const targetRowIndex = currentRowIndex + direction;
    if (targetRowIndex >= 0 && targetRowIndex < allRows.length) {
      const targetRow = allRows[targetRowIndex];
      // Find cell with same month key
      const targetCell = targetRow.querySelector(`td.value-cell[data-month-key="${monthKey}"]`);
      if (targetCell) {
        const input = targetCell.querySelector('input[type="number"]') as HTMLInputElement;
        if (input) {
          input.focus();
          input.select();
        }
      }
    }
  }

  applyToAllMonths(event: Event): void {
    event.stopPropagation();
    const data = this.contextMenuData();
    if (data) {
      this.budgetService.applyToAllMonths(data.groupType, data.groupId, data.categoryId, data.value);
    }
    this.contextMenuVisible.set(false);
  }

  trackByGroupId(index: number, group: ParentCategory): string {
    return group.id;
  }

  trackByMonthKey(index: number, month: MonthColumn): string {
    return month.key;
  }
}
