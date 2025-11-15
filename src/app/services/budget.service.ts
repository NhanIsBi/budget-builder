import { Injectable, computed, signal } from '@angular/core';
import { BudgetData, ParentCategory, Category, MonthColumn, DateRange, MonthData } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  // Signals for reactive state
  private dateRangeSignal = signal<DateRange>({
    startMonth: 1,
    startYear: 2024,
    endMonth: 12,
    endYear: 2024
  });

  private budgetDataSignal = signal<BudgetData>({
    incomeGroups: [],
    expenseGroups: []
  });

  // Public computed signals
  dateRange = this.dateRangeSignal.asReadonly();
  budgetData = this.budgetDataSignal.asReadonly();

  // Computed month columns based on date range
  monthColumns = computed(() => {
    const range = this.dateRangeSignal();
    const columns: MonthColumn[] = [];

    // Validate date range
    const startDate = new Date(range.startYear, range.startMonth - 1, 1);
    const endDate = new Date(range.endYear, range.endMonth - 1, 1);

    if (startDate > endDate) {
      console.warn('Invalid date range: start is after end');
      return columns;
    }

    let currentYear = range.startYear;
    let currentMonth = range.startMonth;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Loop until we pass the end date
    while (
      currentYear < range.endYear ||
      (currentYear === range.endYear && currentMonth <= range.endMonth)
    ) {
      const monthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

      columns.push({
        key: monthKey,
        display: `${monthNames[currentMonth - 1]} ${currentYear}`,
        year: currentYear,
        month: currentMonth
      });

      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }

      // Safety check to prevent infinite loop
      if (columns.length > 1200) {
        console.error('Too many months generated, breaking loop');
        break;
      }
    }

    console.log(`Generated ${columns.length} months from ${range.startMonth}/${range.startYear} to ${range.endMonth}/${range.endYear}`);
    return columns;
  });

  // Computed totals
  incomeTotals = computed(() => {
    const data = this.budgetDataSignal();
    const months = this.monthColumns();
    const totals: MonthData = {};

    months.forEach(month => {
      totals[month.key] = this.calculateGroupsTotal(data.incomeGroups, month.key);
    });

    return totals;
  });

  expenseTotals = computed(() => {
    const data = this.budgetDataSignal();
    const months = this.monthColumns();
    const totals: MonthData = {};

    months.forEach(month => {
      totals[month.key] = this.calculateGroupsTotal(data.expenseGroups, month.key);
    });

    return totals;
  });

  profitLoss = computed(() => {
    const income = this.incomeTotals();
    const expense = this.expenseTotals();
    const months = this.monthColumns();
    const profitLoss: MonthData = {};

    months.forEach(month => {
      profitLoss[month.key] = (income[month.key] || 0) - (expense[month.key] || 0);
    });

    return profitLoss;
  });

  balances = computed(() => {
    const profitLoss = this.profitLoss();
    const months = this.monthColumns();
    const opening: MonthData = {};
    const closing: MonthData = {};

    let runningBalance = 0;
    months.forEach(month => {
      opening[month.key] = runningBalance;
      runningBalance += profitLoss[month.key] || 0;
      closing[month.key] = runningBalance;
    });

    return { opening, closing };
  });

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData(): void {
    const months = this.monthColumns();
    const defaultValues: MonthData = {};
    months.forEach(m => defaultValues[m.key] = 0);

    const incomeGroups: ParentCategory[] = [
      {
        id: this.generateId(),
        name: 'General Income',
        type: 'income',
        isExpanded: true,
        categories: [
          { id: this.generateId(), name: 'Sales', values: { ...defaultValues } },
          { id: this.generateId(), name: 'Commission', values: { ...defaultValues } }
        ]
      },
      {
        id: this.generateId(),
        name: 'Other Income',
        type: 'income',
        isExpanded: true,
        categories: [
          { id: this.generateId(), name: 'Training', values: { ...defaultValues } },
          { id: this.generateId(), name: 'Consulting', values: { ...defaultValues } }
        ]
      }
    ];

    const expenseGroups: ParentCategory[] = [
      {
        id: this.generateId(),
        name: 'Operational Expenses',
        type: 'expense',
        isExpanded: true,
        categories: [
          { id: this.generateId(), name: 'Management Fees', values: { ...defaultValues } },
          { id: this.generateId(), name: 'Cloud Hosting', values: { ...defaultValues } }
        ]
      },
      {
        id: this.generateId(),
        name: 'Salaries & Wages',
        type: 'expense',
        isExpanded: true,
        categories: [
          { id: this.generateId(), name: 'Full Time Dev Salaries', values: { ...defaultValues } },
          { id: this.generateId(), name: 'Part Time Dev Salaries', values: { ...defaultValues } }
        ]
      }
    ];

    this.budgetDataSignal.set({ incomeGroups, expenseGroups });
  }

  // Update methods
  updateDateRange(range: DateRange): void {
    // Force update by creating a new object
    this.dateRangeSignal.set({
      startMonth: range.startMonth,
      startYear: range.startYear,
      endMonth: range.endMonth,
      endYear: range.endYear
    });

    // Wait for computed signal to update
    setTimeout(() => {
      this.updateAllCategoriesWithNewMonths();
    }, 0);
  }

  private updateAllCategoriesWithNewMonths(): void {
    const data = this.budgetDataSignal();
    const months = this.monthColumns();

    const updateCategories = (categories: Category[]) => {
      categories.forEach(cat => {
        months.forEach(month => {
          if (!(month.key in cat.values)) {
            cat.values[month.key] = 0;
          }
        });
      });
    };

    data.incomeGroups.forEach(g => updateCategories(g.categories));
    data.expenseGroups.forEach(g => updateCategories(g.categories));

    this.budgetDataSignal.set({ ...data });
  }

  updateCategoryValue(groupType: 'income' | 'expense', groupId: string, categoryId: string, monthKey: string, value: number): void {
    const data = this.budgetDataSignal();
    const groups = groupType === 'income' ? data.incomeGroups : data.expenseGroups;

    const group = groups.find(g => g.id === groupId);
    if (group) {
      const category = group.categories.find(c => c.id === categoryId);
      if (category) {
        category.values[monthKey] = value;
        this.budgetDataSignal.set({ ...data });
      }
    }
  }

  applyToAllMonths(groupType: 'income' | 'expense', groupId: string, categoryId: string, value: number): void {
    const data = this.budgetDataSignal();
    const groups = groupType === 'income' ? data.incomeGroups : data.expenseGroups;
    const months = this.monthColumns();

    const group = groups.find(g => g.id === groupId);
    if (group) {
      const category = group.categories.find(c => c.id === categoryId);
      if (category) {
        months.forEach(month => {
          category.values[month.key] = value;
        });
        this.budgetDataSignal.set({ ...data });
      }
    }
  }

  addCategory(groupType: 'income' | 'expense', groupId: string, categoryName: string = ''): void {
    const data = this.budgetDataSignal();
    const groups = groupType === 'income' ? data.incomeGroups : data.expenseGroups;
    const months = this.monthColumns();

    const group = groups.find(g => g.id === groupId);
    if (group) {
      const defaultValues: MonthData = {};
      months.forEach(m => defaultValues[m.key] = 0);

      group.categories.push({
        id: this.generateId(),
        name: categoryName,
        values: defaultValues,
        isEditing: categoryName === ''
      });

      this.budgetDataSignal.set({ ...data });
    }
  }

  updateCategoryName(groupType: 'income' | 'expense', groupId: string, categoryId: string, name: string): void {
    const data = this.budgetDataSignal();
    const groups = groupType === 'income' ? data.incomeGroups : data.expenseGroups;

    const group = groups.find(g => g.id === groupId);
    if (group) {
      const category = group.categories.find(c => c.id === categoryId);
      if (category) {
        category.name = name;
        category.isEditing = false;
        this.budgetDataSignal.set({ ...data });
      }
    }
  }

  deleteCategory(groupType: 'income' | 'expense', groupId: string, categoryId: string): void {
    const data = this.budgetDataSignal();
    const groups = groupType === 'income' ? data.incomeGroups : data.expenseGroups;

    const group = groups.find(g => g.id === groupId);
    if (group) {
      group.categories = group.categories.filter(c => c.id !== categoryId);
      this.budgetDataSignal.set({ ...data });
    }
  }

  addParentCategory(type: 'income' | 'expense', name: string = 'New Category'): void {
    const data = this.budgetDataSignal();
    const months = this.monthColumns();
    const defaultValues: MonthData = {};
    months.forEach(m => defaultValues[m.key] = 0);

    const newGroup: ParentCategory = {
      id: this.generateId(),
      name,
      type,
      isExpanded: true,
      categories: []
    };

    if (type === 'income') {
      data.incomeGroups.push(newGroup);
    } else {
      data.expenseGroups.push(newGroup);
    }

    this.budgetDataSignal.set({ ...data });
  }

  updateParentCategoryName(type: 'income' | 'expense', groupId: string, name: string): void {
    const data = this.budgetDataSignal();
    const groups = type === 'income' ? data.incomeGroups : data.expenseGroups;

    const group = groups.find(g => g.id === groupId);
    if (group) {
      group.name = name;
      group.isEditingName = false;
      this.budgetDataSignal.set({ ...data });
    }
  }

  startEditingParentCategoryName(type: 'income' | 'expense', groupId: string): void {
    const data = this.budgetDataSignal();
    const groups = type === 'income' ? data.incomeGroups : data.expenseGroups;

    const group = groups.find(g => g.id === groupId);
    if (group) {
      group.isEditingName = true;
      this.budgetDataSignal.set({ ...data });
    }
  }

  deleteParentCategory(type: 'income' | 'expense', groupId: string): void {
    const data = this.budgetDataSignal();

    if (type === 'income') {
      data.incomeGroups = data.incomeGroups.filter(g => g.id !== groupId);
    } else {
      data.expenseGroups = data.expenseGroups.filter(g => g.id !== groupId);
    }

    this.budgetDataSignal.set({ ...data });
  }

  getSubTotal(group: ParentCategory, monthKey: string): number {
    return group.categories.reduce((sum, cat) => sum + (cat.values[monthKey] || 0), 0);
  }

  private calculateGroupsTotal(groups: ParentCategory[], monthKey: string): number {
    return groups.reduce((sum, group) => sum + this.getSubTotal(group, monthKey), 0);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
