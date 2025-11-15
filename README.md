# Budget Builder

A powerful and intuitive budget planning application built with Angular 17. This application helps users track income and expenses across multiple months with an interactive spreadsheet-like interface.

## Features

### Core Functionality

- **Dynamic Date Range Selection**: Choose custom start and end periods (month/year) to view and plan your budget
- **Income & Expense Tracking**: Separate sections for managing income sources and expense categories
- **Hierarchical Category Management**: Organize budget items with parent categories and sub-categories
- **Multi-Month View**: View and edit budget data across multiple months simultaneously
- **Real-Time Calculations**: Automatic calculation of:
  - Sub-totals for each parent category
  - Total income and total expenses
  - Profit/Loss per month
  - Opening and closing balances

### User Experience

- **Excel-Like Navigation**:
  - Use arrow keys (←↑→↓) to navigate between cells
  - Tab key for sequential navigation
  - Enter key to add new categories quickly

- **Inline Editing**:
  - Click on category names to edit them
  - Double-click or start typing to edit values
  - Right-click on any cell to access quick actions

- **Quick Actions**:
  - Right-click context menu with "Apply to all months" feature
  - Bulk update values across all months with a single click
  - Add/delete categories and parent categories dynamically

- **Smart Focus Management**: Automatic focus on input fields for seamless data entry

### Category Management

- **Add Parent Categories**: Create new top-level categories for both income and expenses
- **Add Sub-Categories**: Add unlimited sub-categories under any parent category
- **Edit Names**: Rename categories inline by clicking on them
- **Delete Categories**: Remove individual categories or entire parent category groups
- **Flexible Structure**: Build a budget structure that matches your specific needs

### Visual Design

- **Color-Coded Sections**:
  - Blue theme for income sections
  - Red theme for expense sections
  - Yellow highlight for profit/loss row
  - Green indicators for positive balances, red for negative

- **Responsive Layout**: Clean, modern interface built with Tailwind CSS
- **Professional Styling**: Clear visual hierarchy and intuitive design

## Technology Stack

- **Framework**: Angular 17 (with Standalone Components)
- **Styling**: Tailwind CSS
- **State Management**: Angular Signals for reactive state management
- **Language**: TypeScript
- **Build Tool**: Angular CLI

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (install globally with `npm install -g @angular/cli`)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/budget-builder.git
   cd budget-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open your browser**:
   Navigate to `http://localhost:4200/`

The application will automatically reload when you make changes to the source files.

## Usage Guide

### Getting Started

1. **Set Your Date Range**:
   - Select start month and year from the top dropdowns
   - Select end month and year
   - The table will automatically update to show the selected period

2. **Adding Income Categories**:
   - Click "+ Add New Parent Category" in the Income section
   - Enter a name for the parent category (e.g., "Salary", "Investments")
   - Click "+ Add a new [Category Name] Category" to add sub-categories
   - Name your sub-category and press Enter

3. **Adding Expense Categories**:
   - Same process as income in the Expenses section
   - Examples: "Housing", "Transportation", "Entertainment"

4. **Entering Values**:
   - Click on any cell in the month columns
   - Type the amount
   - Press Enter to move to a new category
   - Use arrow keys to navigate between cells
   - Press Tab to move to the next cell

5. **Quick Fill Feature**:
   - Enter a value in any month
   - Right-click on the cell
   - Select "Apply to all months" to copy that value to all months

6. **Editing Categories**:
   - Click on any category name to edit it
   - Press Enter to save or Escape to cancel
   - Click the "Edit" button on parent categories to rename them

7. **Deleting Categories**:
   - Click the "×" button next to any sub-category to delete it
   - Click "Delete" on parent categories to remove the entire group
   - Confirmation prompts will appear before deletion

### Understanding the Summary Rows

- **Sub Totals**: Sum of all sub-categories within a parent category for each month
- **Income Total**: Total of all income categories
- **Total Expenses**: Total of all expense categories
- **Profit/Loss**: Income minus Expenses (green for profit, red for loss)
- **Opening Balance**: Starting balance for each month
- **Closing Balance**: Opening balance plus profit/loss

## Project Structure

```
budget-builder/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── budget-builder/
│   │   │       ├── budget-builder.component.ts
│   │   │       ├── budget-builder.component.html
│   │   │       └── budget-builder.component.css
│   │   ├── models/
│   │   │   └── budget.model.ts
│   │   ├── services/
│   │   │   └── budget.service.ts
│   │   └── app.component.ts
│   ├── assets/
│   └── styles.css
├── angular.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build the project for production
- `npm test` - Run unit tests
- `npm run watch` - Build and watch for changes

## Building for Production

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. The production build is optimized for best performance.

## Key Features Explained

### 1. Excel-Like Interface
The application mimics Excel's behavior with keyboard navigation, making it familiar and efficient for users who regularly work with spreadsheets.

### 2. Real-Time Calculations
All totals, subtotals, and balances are calculated automatically as you type, providing immediate feedback on your budget status.

### 3. Flexible Time Periods
Unlike fixed monthly or yearly views, you can select any date range that suits your planning needs - from a few months to multiple years.

### 4. Apply to All Months
This powerful feature saves time when you have recurring income or expenses. Enter once, apply everywhere.

### 5. Hierarchical Organization
Group related categories together under parent categories for better organization and clearer budget overview.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

Potential features for future versions:

- Export to Excel/CSV
- Import from CSV
- Save/Load budget templates
- LocalStorage persistence
- Multi-currency support
- Budget vs Actual comparison
- Visual charts and graphs
- Budget goals and alerts
- Collaboration features
- Mobile responsive improvements

## Known Limitations

- Data is stored in memory only (resets on page refresh)
- No backend API integration
- Single user mode (no authentication)
- No data export feature yet

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

## Acknowledgments

- Built with [Angular](https://angular.io/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons and UI inspiration from modern design principles
