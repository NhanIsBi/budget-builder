export interface MonthData {
  [key: string]: number; // key is 'YYYY-MM' format
}

export interface Category {
  id: string;
  name: string;
  values: MonthData;
  isEditing?: boolean;
}

export interface ParentCategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  categories: Category[];
  isExpanded?: boolean;
  isEditingName?: boolean;
}

export interface BudgetData {
  incomeGroups: ParentCategory[];
  expenseGroups: ParentCategory[];
}

export interface MonthColumn {
  key: string; // 'YYYY-MM'
  display: string; // 'January 2024'
  year: number;
  month: number;
}

export interface CellPosition {
  groupIndex: number;
  categoryIndex: number;
  monthKey: string;
  groupType: 'income' | 'expense';
}

export interface DateRange {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
}
