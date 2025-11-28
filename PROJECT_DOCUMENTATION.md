# Budget Builder Application - Project Documentation

## 1. Project Overview

This is a comprehensive Budget Builder web application built with Angular 17.3+, designed to provide an Excel-like interface for managing personal or business budgets. The application allows users to track income and expenses across multiple months with automatic calculations and a clean, intuitive user interface.

**Đây là ứng dụng web Quản Lý Ngân Sách toàn diện được xây dựng bằng Angular 17.3+, thiết kế giao diện giống Excel để quản lý ngân sách cá nhân hoặc doanh nghiệp. Ứng dụng cho phép người dùng theo dõi thu nhập và chi phí qua nhiều tháng với tính toán tự động và giao diện trực quan, dễ sử dụng.**

---

## 2. Technology Stack

### Core Technologies:
- **Angular 17.3+**: Modern web framework with standalone components
- **TypeScript**: Type-safe programming language
- **RxJS & Signals**: Reactive state management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vercel**: Deployment and hosting platform

### Công Nghệ Sử Dụng:
- **Angular 17.3+**: Framework web hiện đại với standalone components
- **TypeScript**: Ngôn ngữ lập trình có kiểm tra kiểu dữ liệu
- **RxJS & Signals**: Quản lý trạng thái reactive
- **Tailwind CSS**: Framework CSS tiện ích để styling
- **Vercel**: Nền tảng deploy và hosting

---

## 3. Project Requirements & Implementation

### Requirement 1: Excel-like Interface
**Requirement**: Create a spreadsheet-style interface similar to Excel with rows for categories and columns for months.

**Implementation**:
- Created a grid layout using Tailwind CSS with fixed headers
- Implemented sticky columns for category names
- Used HTML table structure for better semantic meaning
- Added hover effects and visual feedback for better UX

**Yêu cầu**: Tạo giao diện giống bảng tính Excel với các hàng cho danh mục và cột cho tháng.

**Triển khai**:
- Tạo layout dạng lưới bằng Tailwind CSS với header cố định
- Sử dụng sticky columns cho tên danh mục
- Dùng cấu trúc HTML table để có ngữ nghĩa tốt hơn
- Thêm hiệu ứng hover và phản hồi trực quan cho UX tốt hơn

---

### Requirement 2: Keyboard Navigation
**Requirement**: Support keyboard shortcuts for efficient data entry (Enter, Tab, Arrow keys).

**Implementation**:
- **Enter key**: Move to the cell below in the same column
- **Tab key**: Move to the next cell horizontally
- **Arrow keys**: Navigate in all four directions
- **Escape key**: Cancel editing mode for category names
- Implemented custom event handlers in `onCellKeyDown()` method
- Used `getElementById()` and calculated indices for cell navigation

**Yêu cầu**: Hỗ trợ phím tắt để nhập liệu hiệu quả (Enter, Tab, phím mũi tên).

**Triển khai**:
- **Phím Enter**: Di chuyển xuống ô bên dưới trong cùng cột
- **Phím Tab**: Di chuyển sang ô tiếp theo theo chiều ngang
- **Phím mũi tên**: Di chuyển theo 4 hướng
- **Phím Escape**: Hủy chế độ chỉnh sửa tên danh mục
- Triển khai custom event handlers trong method `onCellKeyDown()`
- Dùng `getElementById()` và tính toán indices để điều hướng ô

---

### Requirement 3: Dynamic Date Range
**Requirement**: Allow users to select start and end dates (month/year) and dynamically generate columns.

**Implementation**:
- Created date range selectors with month and year dropdowns
- Implemented `getMonthColumns()` computed signal that automatically recalculates when date range changes
- Used Angular Signals for reactive updates
- Added validation to ensure start date is before end date
- Month columns update immediately when date range changes

**Yêu cầu**: Cho phép người dùng chọn ngày bắt đầu và kết thúc (tháng/năm) và tự động tạo các cột.

**Triển khai**:
- Tạo bộ chọn khoảng thời gian với dropdown tháng và năm
- Triển khai computed signal `getMonthColumns()` tự động tính toán lại khi thay đổi khoảng thời gian
- Dùng Angular Signals cho reactive updates
- Thêm validation đảm bảo ngày bắt đầu trước ngày kết thúc
- Các cột tháng cập nhật ngay lập tức khi thay đổi khoảng thời gian

---

### Requirement 4: Auto Calculation
**Requirement**: Automatically calculate totals, subtotals, profit/loss, and running balance.

**Implementation**:
- **Total Income**: Sum of all income categories for each month
- **Total Expenses**: Sum of all expense categories for each month
- **Profit/Loss**: Income - Expenses for each month
- **Balance**: Cumulative sum from initial balance + profit/loss
- Used computed signals (`totalIncome`, `totalExpenses`, `profitLoss`, `balance`) for automatic recalculation
- All calculations update in real-time as user enters data

**Yêu cầu**: Tự động tính tổng thu nhập, tổng chi, lợi nhuận/lỗ, và số dư chạy.

**Triển khai**:
- **Tổng Thu Nhập**: Tổng tất cả các danh mục thu nhập cho mỗi tháng
- **Tổng Chi Phí**: Tổng tất cả các danh mục chi phí cho mỗi tháng
- **Lợi Nhuận/Lỗ**: Thu nhập - Chi phí cho mỗi tháng
- **Số Dư**: Tổng tích lũy từ số dư ban đầu + lợi nhuận/lỗ
- Dùng computed signals (`totalIncome`, `totalExpenses`, `profitLoss`, `balance`) để tự động tính toán lại
- Tất cả tính toán cập nhật real-time khi người dùng nhập dữ liệu

---

### Requirement 5: Right-Click Context Menu
**Requirement**: Right-click on a cell to apply its value to all months in that row.

**Implementation**:
- Implemented `onCellRightClick()` method to show custom context menu
- Created `showContextMenu()` to display menu at cursor position
- Implemented `applyToAllMonths()` to copy value across all months
- Added `closeContextMenu()` to hide menu when clicking elsewhere
- Used absolute positioning and z-index for menu overlay

**Yêu cầu**: Nhấp chuột phải vào ô để áp dụng giá trị đó cho tất cả các tháng trong hàng.

**Triển khai**:
- Triển khai method `onCellRightClick()` để hiển thị context menu tùy chỉnh
- Tạo `showContextMenu()` để hiển thị menu tại vị trí con trỏ
- Triển khai `applyToAllMonths()` để sao chép giá trị qua tất cả các tháng
- Thêm `closeContextMenu()` để ẩn menu khi click ra ngoài
- Dùng absolute positioning và z-index cho menu overlay

---

### Requirement 6: Add/Edit/Delete Categories
**Requirement**: Allow users to add new categories, edit existing ones, and delete categories.

**Implementation**:
- **Add Category**: Click "Add Category" button to create new row with default name
- **Edit Parent Category**: Click "Edit" button next to parent category name to rename it
- **Edit Child Category**: Click directly on category name to edit inline
- **Delete Category**: Click "Delete" button to remove category
- Added `isEditing` flag to track edit state
- Implemented blur events to save changes
- Added Escape key support to cancel editing

**Yêu cầu**: Cho phép người dùng thêm danh mục mới, chỉnh sửa danh mục hiện có, và xóa danh mục.

**Triển khai**:
- **Thêm Danh Mục**: Click nút "Add Category" để tạo hàng mới với tên mặc định
- **Sửa Danh Mục Cha**: Click nút "Edit" bên cạnh tên danh mục cha để đổi tên
- **Sửa Danh Mục Con**: Click trực tiếp vào tên danh mục để chỉnh sửa inline
- **Xóa Danh Mục**: Click nút "Delete" để xóa danh mục
- Thêm flag `isEditing` để theo dõi trạng thái chỉnh sửa
- Triển khai blur events để lưu thay đổi
- Thêm hỗ trợ phím Escape để hủy chỉnh sửa

---

### Requirement 7: Expand/Collapse Groups
**Requirement**: Allow users to collapse and expand parent category groups.

**Implementation**:
- Added `isExpanded` property to `ParentCategory` interface
- Implemented `toggleGroup()` method to toggle expand/collapse state
- Used SVG chevron icons that rotate based on state
- Added smooth transitions for better UX
- Categories are expanded by default

**Yêu cầu**: Cho phép người dùng thu gọn và mở rộng các nhóm danh mục cha.

**Triển khai**:
- Thêm thuộc tính `isExpanded` vào interface `ParentCategory`
- Triển khai method `toggleGroup()` để chuyển đổi trạng thái mở/đóng
- Dùng SVG chevron icons xoay theo trạng thái
- Thêm transitions mượt mà cho UX tốt hơn
- Các danh mục mở rộng mặc định

---

## 4. Technical Challenges & Solutions

### Challenge 1: Date Range Not Updating Correctly

**Problem**: When user changed the date range (e.g., from 2024-2025 back to 2024), the month columns didn't update correctly.

**Root Cause**:
1. Using signals in component that weren't properly triggering service signal updates
2. `(change)` event not firing immediately on select elements
3. String vs number type coercion issues

**Solution**:
1. Changed component date range values from signals to primitive values
2. Changed from `(change)` to `(ngModelChange)` for immediate updates
3. Changed from `[value]` to `[ngValue]` to preserve number types
4. Added force update with new object in service: `this.dateRangeSignal.set({ ...newRange })`
5. Added `setTimeout()` to allow computed signal recalculation
6. Added console logging for debugging

**Code Changes**:
```typescript
// BEFORE (didn't work):
startMonth = signal(1);
<select [value]="month" (change)="onDateRangeChange()">

// AFTER (working):
startMonth = 1;
<select [ngValue]="month" (ngModelChange)="onDateRangeChange()">
```

**Vấn đề**: Khi người dùng thay đổi khoảng thời gian (ví dụ: từ 2024-2025 về 2024), các cột tháng không cập nhật đúng.

**Nguyên nhân**:
1. Dùng signals trong component không trigger đúng service signal updates
2. Event `(change)` không fire ngay lập tức trên select elements
3. Vấn đề ép kiểu string vs number

**Giải pháp**:
1. Đổi giá trị date range từ signals sang primitive values
2. Đổi từ `(change)` sang `(ngModelChange)` để cập nhật ngay
3. Đổi từ `[value]` sang `[ngValue]` để giữ nguyên kiểu number
4. Thêm force update với object mới trong service
5. Thêm `setTimeout()` để cho computed signal tính toán lại
6. Thêm console logging để debug

---

### Challenge 2: Vercel Deployment MIME Type Error

**Problem**: After deploying to Vercel, the website showed blank page with error: "Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of 'text/html'".

**Root Cause**:
Vercel's routing configuration was redirecting all requests (including .js and .css files) to index.html, causing JavaScript files to be served with text/html MIME type instead of application/javascript.

**Solution**:
Updated `vercel.json` to use `"handle": "filesystem"` route first, which tells Vercel to:
1. First, try to serve static files from filesystem (.js, .css, etc.)
2. Only if file doesn't exist, then fall back to serving index.html

**Final Working Configuration**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/budget-builder/browser",
  "installCommand": "npm install",
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**Vấn đề**: Sau khi deploy lên Vercel, website hiển thị trang trắng với lỗi MIME type.

**Nguyên nhân**:
Cấu hình routing của Vercel redirect tất cả requests (kể cả file .js và .css) về index.html, khiến JavaScript files bị serve với MIME type text/html thay vì application/javascript.

**Giải pháp**:
Cập nhật `vercel.json` để dùng route `"handle": "filesystem"` trước, báo cho Vercel:
1. Đầu tiên, thử serve static files từ filesystem (.js, .css, etc.)
2. Chỉ khi file không tồn tại, mới fallback về index.html

---

## 5. Project Structure

```
budget-builder/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── budget.model.ts          # Data interfaces and types
│   │   ├── services/
│   │   │   └── budget.service.ts        # State management with Signals
│   │   └── components/
│   │       └── budget-builder/
│   │           ├── budget-builder.component.ts    # Main component logic
│   │           ├── budget-builder.component.html  # Template
│   │           └── budget-builder.component.css   # Styles
│   ├── styles.css                       # Global styles with Tailwind
│   └── main.ts                          # Application entry point
├── angular.json                         # Angular configuration
├── tailwind.config.js                   # Tailwind CSS configuration
├── tsconfig.json                        # TypeScript configuration
├── package.json                         # Dependencies
└── vercel.json                          # Vercel deployment configuration
```

**Cấu trúc dự án** được tổ chức theo pattern Angular chuẩn với phân tách rõ ràng giữa models, services, và components.

---

## 6. Key Features Implementation Details

### 6.1 State Management with Signals

Used Angular's new Signals API for reactive state management:

```typescript
// Central state in service
private budgetDataSignal = signal<BudgetData>({...});
private dateRangeSignal = signal<DateRange>({...});

// Computed signals for automatic recalculation
totalIncome = computed(() => {
  // Automatically recalculates when budgetDataSignal changes
});

totalExpenses = computed(() => {
  // Automatically recalculates when budgetDataSignal changes
});
```

**Benefits**:
- Automatic dependency tracking
- Better performance than traditional RxJS observables for simple state
- Cleaner code with less boilerplate

**Sử dụng Signals API mới của Angular** cho quản lý trạng thái reactive với automatic dependency tracking và hiệu suất tốt hơn.

---

### 6.2 Responsive Design

- Mobile-friendly layout with horizontal scrolling for month columns
- Sticky headers and category columns for better navigation
- Touch-friendly button sizes
- Responsive typography and spacing

**Thiết kế responsive** với layout thân thiện trên mobile, horizontal scrolling, và sticky headers.

---

### 6.3 Data Persistence

Currently, data is stored in memory only. For production use, consider adding:
- **LocalStorage**: Save data in browser for persistence between sessions
- **Backend API**: Connect to a database for multi-device sync
- **Export/Import**: Allow users to export to Excel/CSV format

**Hiện tại dữ liệu lưu trong memory**. Để sử dụng thực tế, có thể thêm LocalStorage, Backend API, hoặc Export/Import.

---

## 7. Future Enhancements

### Potential Features to Add:
1. **Data Persistence**: LocalStorage or backend integration
2. **Multiple Budgets**: Create and manage multiple budget sheets
3. **Charts & Visualizations**: Add graphs to visualize income/expenses trends
4. **Currency Support**: Multi-currency with exchange rates
5. **Budget Templates**: Pre-defined templates for different use cases
6. **Sharing & Collaboration**: Share budgets with family/team members
7. **Mobile App**: Native mobile apps for iOS/Android
8. **Export Functionality**: Export to Excel, PDF, or CSV
9. **Categories Library**: Predefined category templates
10. **Notifications**: Alerts for overspending or budget limits

### Tính Năng Tiềm Năng:
1. **Lưu trữ dữ liệu**: LocalStorage hoặc tích hợp backend
2. **Nhiều ngân sách**: Tạo và quản lý nhiều bảng ngân sách
3. **Biểu đồ**: Thêm graphs để visualize xu hướng
4. **Hỗ trợ đa tiền tệ**: Nhiều loại tiền với tỷ giá
5. **Templates**: Mẫu ngân sách định sẵn
6. **Chia sẻ**: Share ngân sách với gia đình/team
7. **Mobile App**: Ứng dụng native cho iOS/Android
8. **Export**: Xuất ra Excel, PDF, hoặc CSV
9. **Thư viện danh mục**: Templates danh mục định sẵn
10. **Thông báo**: Cảnh báo chi tiêu vượt mức

---

## 8. Deployment Process

### Steps Taken:
1. Created GitHub repository
2. Configured Git with remote origin
3. Committed all project files
4. Pushed to GitHub
5. Created Vercel account and connected to GitHub
6. Configured `vercel.json` for proper Angular deployment
7. Fixed routing issues with filesystem handler
8. Successfully deployed to Vercel

### Deployment URL:
The application is now live and accessible at the Vercel-provided URL.

**Quy trình deploy**: Tạo repo GitHub → Push code → Kết nối Vercel → Cấu hình vercel.json → Fix routing issues → Deploy thành công.

---

## 9. Lessons Learned

### Technical Lessons:
1. **Signals vs Traditional State**: Angular Signals provide cleaner code but require understanding of when to use primitives vs signals
2. **Event Handling**: `ngModelChange` is more reliable than `change` event for immediate updates
3. **Vercel Routing**: Static file serving must be explicitly configured with `"handle": "filesystem"`
4. **Type Safety**: Using `[ngValue]` instead of `[value]` preserves number types in select elements

### Development Process:
1. Start with clear requirements and data models
2. Build incrementally and test each feature
3. Use TypeScript interfaces for better type safety
4. Test deployment early to catch configuration issues
5. Document technical decisions and solutions

**Bài học kỹ thuật**: Signals API, event handling, Vercel routing, và type safety. **Quy trình phát triển**: Requirements rõ ràng, build từng bước, type safety, test deployment sớm, và document kỹ lưỡng.

---

## 10. Conclusion

This Budget Builder application successfully demonstrates modern Angular development practices with a clean, intuitive user interface. The project showcases:

- **Modern Angular Features**: Standalone components, Signals API
- **Reactive Programming**: Computed signals for automatic updates
- **User Experience**: Keyboard navigation, inline editing, context menus
- **Responsive Design**: Works on desktop and mobile devices
- **Type Safety**: Full TypeScript implementation
- **Cloud Deployment**: Production-ready deployment on Vercel

The application is ready for use and can be extended with additional features as needed.

**Ứng dụng Budget Builder này thể hiện thành công các practices phát triển Angular hiện đại với giao diện trực quan, sạch sẽ. Dự án showcase các tính năng Angular mới, reactive programming, UX tốt, responsive design, type safety, và deployment lên cloud. Ứng dụng sẵn sàng sử dụng và có thể mở rộng thêm tính năng khi cần.**

---

## Contact & Support

For questions or issues, please refer to:
- Angular Documentation: https://angular.dev
- Tailwind CSS: https://tailwindcss.com
- Vercel Documentation: https://vercel.com/docs

**Để được hỗ trợ hoặc có câu hỏi, vui lòng tham khảo tài liệu của Angular, Tailwind CSS, và Vercel.**

---

*Document created: November 15, 2024*
*Tài liệu tạo ngày: 15 tháng 11, 2024*
