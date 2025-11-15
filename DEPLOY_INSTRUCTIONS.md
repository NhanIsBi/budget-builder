# 🚀 HƯỚNG DẪN DEPLOY BUDGET BUILDER LÊN VERCEL

## ✅ Đã hoàn thành:
- ✅ Git repository đã setup
- ✅ Vercel CLI đã cài đặt
- ✅ File `vercel.json` đã tạo
- ✅ Code đã commit

---

## 🎯 OPTION A: Deploy qua Vercel Website (KHUYẾN NGHỊ - DỄ NHẤT)

### Bước 1: Truy cập Vercel
👉 Mở trình duyệt và vào: **https://vercel.com**

### Bước 2: Đăng nhập
- Click **"Sign Up"** hoặc **"Login"**
- Chọn **"Continue with GitHub"**
- Authorize Vercel truy cập GitHub của bạn

### Bước 3: Import Project
- Sau khi login, click **"Add New..."** → **"Project"**
- Tìm repository: **`budget-builder`**
- Click **"Import"**

### Bước 4: Configure Project
Vercel sẽ tự động detect Angular và điền:
```
Framework Preset: Angular
Build Command: npm run build
Output Directory: dist/budget-builder/browser
Install Command: npm install
```
→ **Không cần thay đổi gì!**

### Bước 5: Deploy
- Click **"Deploy"**
- Đợi 2-3 phút
- ✅ XONG! Vercel sẽ cho bạn URL dạng: `https://budget-builder-xxx.vercel.app`

### Bước 6: Chia sẻ
Copy URL và chia sẻ cho mọi người! 🎉

---

## 🎯 OPTION B: Deploy qua CLI (Nâng cao)

### Bước 1: Login Vercel CLI
```bash
cd budget-builder
vercel login
```
→ Làm theo hướng dẫn trên terminal (sẽ mở browser để login)

### Bước 2: Deploy
```bash
vercel --prod
```
→ Trả lời các câu hỏi:
- Set up and deploy? **Y**
- Which scope? **Chọn account của bạn**
- Link to existing project? **N**
- What's your project's name? **budget-builder** (hoặc tên bạn muốn)
- In which directory is your code located? **./**
- Want to override the settings? **N**

### Bước 3: Đợi deploy
- CLI sẽ build và upload
- Sau 2-3 phút sẽ có URL: `https://budget-builder-xxx.vercel.app`

---

## 🔄 Auto-Deploy (Deploy tự động khi push code)

Nếu bạn dùng **OPTION A** (Vercel Website):
- Mỗi khi bạn push code lên GitHub
- Vercel sẽ tự động build và deploy!
- Không cần làm gì thêm! 🚀

```bash
# Sau này khi cập nhật code:
git add .
git commit -m "Update features"
git push origin main

# → Vercel tự động deploy! ✨
```

---

## 🌐 Custom Domain (Tùy chọn)

Nếu bạn có domain riêng:
1. Vào Vercel Dashboard
2. Chọn project **budget-builder**
3. Settings → Domains
4. Add domain của bạn
5. Follow hướng dẫn cập nhật DNS

---

## 📊 URL Mẫu

Sau khi deploy thành công, bạn sẽ có URL dạng:
```
https://budget-builder.vercel.app
https://budget-builder-nhanis-projects.vercel.app
https://your-custom-domain.com (nếu có)
```

---

## 🎉 Hoàn tất!

Bây giờ app của bạn đã online:
- ✅ Có HTTPS miễn phí
- ✅ CDN toàn cầu (nhanh)
- ✅ Auto-deploy khi push code
- ✅ Bandwidth không giới hạn
- ✅ Miễn phí 100%!

Chia sẻ link cho bạn bè và enjoy! 🚀
