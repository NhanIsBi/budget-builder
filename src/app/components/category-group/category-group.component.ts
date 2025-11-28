import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParentCategory, Category, MonthColumn } from '../../models/budget.model';

@Component({
  selector: 'app-category-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-group.component.html',
  styles: [':host { display: contents; }']
})
export class CategoryGroupComponent implements AfterViewInit {
  @Input() group!: ParentCategory;
  @Input() groupType!: 'income' | 'expense';
  @Input() monthColumns: MonthColumn[] = [];
  @Input() colorScheme: 'blue' | 'red' = 'blue';

  @Output() categoryValueChange = new EventEmitter<{ categoryId: string; monthKey: string; value: number }>();
  @Output() categoryNameChange = new EventEmitter<{ categoryId: string; name: string }>();
  @Output() categoryAdd = new EventEmitter<void>();
  @Output() categoryDelete = new EventEmitter<{ categoryId: string }>();
  @Output() categoryStartEdit = new EventEmitter<{ categoryId: string }>();
  @Output() categoryCancelEdit = new EventEmitter<{ categoryId: string }>();
  @Output() categorySetPendingDelete = new EventEmitter<{ categoryId: string; pending: boolean }>();
  @Output() parentNameChange = new EventEmitter<{ name: string }>();
  @Output() parentStartEdit = new EventEmitter<void>();
  @Output() parentCancelEdit = new EventEmitter<void>();
  @Output() parentDelete = new EventEmitter<void>();
  @Output() parentSetPendingDelete = new EventEmitter<{ pending: boolean }>();
  @Output() cellRightClick = new EventEmitter<{ event: MouseEvent; categoryId: string; monthKey: string }>();
  @Output() cellKeyDown = new EventEmitter<{ event: KeyboardEvent; categoryId: string; monthKey: string }>();
  @Output() focusNewCategory = new EventEmitter<{ categoryId: string }>();

  @ViewChildren('categoryNameInput') categoryNameInputs!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('parentNameInput') parentNameInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private pendingFocusCategoryId: string | null = null;

  ngAfterViewInit(): void {
    this.categoryNameInputs.changes.subscribe(() => {
      if (this.pendingFocusCategoryId) {
        this.focusInput(this.pendingFocusCategoryId);
        this.pendingFocusCategoryId = null;
      }
    });
  }

  get bgHeaderClass(): string {
    return this.colorScheme === 'blue' ? 'bg-blue-100' : 'bg-red-100';
  }

  get bgSubtotalClass(): string {
    return this.colorScheme === 'blue' ? 'bg-blue-200' : 'bg-red-200';
  }

  get textColorClass(): string {
    return this.colorScheme === 'blue' ? 'text-blue-900' : 'text-red-900';
  }

  get borderColorClass(): string {
    return this.colorScheme === 'blue' ? 'border-blue-400' : 'border-red-400';
  }

  get focusRingClass(): string {
    return this.colorScheme === 'blue' ? 'focus:ring-blue-500' : 'focus:ring-red-500';
  }

  get buttonColorClass(): string {
    return this.colorScheme === 'blue' ? 'text-blue-600 hover:text-blue-800' : 'text-red-600 hover:text-red-800';
  }

  get colspanValue(): number {
    return this.monthColumns.length + 1;
  }

  onCellValueChange(categoryId: string, monthKey: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;
    this.categoryValueChange.emit({ categoryId, monthKey, value });
  }

  onCategoryNameBlur(categoryId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.categoryNameChange.emit({ categoryId, name: input.value });
  }

  onCategoryNameKeyDown(categoryId: string, event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      this.categoryNameChange.emit({ categoryId, name: input.value });
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.categoryCancelEdit.emit({ categoryId });
    }
  }

  onParentNameBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.parentNameChange.emit({ name: input.value.trim() });
    }
  }

  onParentNameKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      if (input.value.trim()) {
        this.parentNameChange.emit({ name: input.value.trim() });
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.parentCancelEdit.emit();
    }
  }

  onCellKeyDown(categoryId: string, monthKey: string, event: KeyboardEvent): void {
    this.cellKeyDown.emit({ event, categoryId, monthKey });
  }

  onCellRightClick(categoryId: string, monthKey: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.cellRightClick.emit({ event, categoryId, monthKey });
  }

  requestDeleteCategory(categoryId: string): void {
    this.categorySetPendingDelete.emit({ categoryId, pending: true });
  }

  confirmDeleteCategory(categoryId: string): void {
    this.categoryDelete.emit({ categoryId });
  }

  cancelDeleteCategory(categoryId: string): void {
    this.categorySetPendingDelete.emit({ categoryId, pending: false });
  }

  requestDeleteParent(): void {
    this.parentSetPendingDelete.emit({ pending: true });
  }

  confirmDeleteParent(): void {
    this.parentDelete.emit();
  }

  cancelDeleteParent(): void {
    this.parentSetPendingDelete.emit({ pending: false });
  }

  getSubTotal(monthKey: string): number {
    return this.group.categories.reduce((sum, cat) => sum + (cat.values[monthKey] || 0), 0);
  }

  trackByCategoryId(index: number, category: Category): string {
    return category.id;
  }

  trackByMonthKey(index: number, month: MonthColumn): string {
    return month.key;
  }

  requestFocus(categoryId: string): void {
    this.pendingFocusCategoryId = categoryId;
  }

  private focusInput(categoryId: string): void {
    const inputRef = this.categoryNameInputs.find((_, i) => {
      const cat = this.group.categories[i];
      return cat && cat.id === categoryId;
    });
    if (inputRef) {
      inputRef.nativeElement.focus();
    }
  }
}
