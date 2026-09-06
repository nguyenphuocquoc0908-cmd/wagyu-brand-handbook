# Wagyu Master Web App (Kobe Ushi Farm - うしぼく)

Ứng dụng Web tra cứu cơ sở dữ liệu Wagyu toàn diện tại Nhật Bản, xây dựng bằng **Next.js 14**, **Tailwind CSS**, và **TypeScript**, kết nối trực tiếp với Google Sheets API cá nhân.

---

## 📸 Phong cách thiết kế kế thừa từ Kobe Ushi Farm (うしぼく)
- **Tông màu chủ đạo**: Nền giấy Washi thủ công (`#FAF8F5`), mực tàu Sumi (`#1A1817`), điểm xuyết đỏ triện Hanko và vàng đất đặc trưng của thẻ số tai bò `5349`.
- **Nghệ thuật chữ Nhật Bản**: Phông Serif/Mincho trang nhã, chi tiết chữ dọc truyền thống (`[writing-mode: vertical-rl]`).
- **Thẻ Card & Hiệu ứng**: Bo góc tinh tế, viền mảnh cao cấp, hiệu ứng nâng thẻ khi rê chuột.

---

## ⚡ Các tính năng nổi bật
1. **Chuyển đổi 4 nguồn dữ liệu (Tabs)**:
   - **BRAND**: 363+ thương hiệu bò Wagyu đỉnh cao (Kobe Beef, Matsusaka, Sendai, Ozaki...).
   - **FARM**: Danh mục các siêu trang trại (Kobe Ushi Farm, Tanba Ranch, Kawagishi Bokujo...).
   - **COMPANY**: Cơ quan quản lý, hiệp hội (Bộ Nông nghiệp MAFF, JMGA, JGIC...).
   - **BRAND&FARM**: Bảng tra cứu 320+ dòng bò toàn quốc.
2. **Bộ lọc vùng miền (Region Filter Tabs)**:
   - Lọc nhanh theo các vùng địa lý Nhật Bản: Hokkaidō, Tōhoku, Kantō, Chūbu, Kansai, Chūgoku, Shikoku, Kyūshū・Okinawa.
3. **Tìm kiếm tức thì (Instant Search)**:
   - Tìm theo tên bò, tên nông trại, tỉnh thành, tiêu chuẩn nuôi.
4. **Hộp thoại xem chi tiết (Detail Modal)**:
   - Bấm vào bất kỳ thẻ nào để mở popup phóng to xem toàn bộ mô tả chi tiết, tiêu chuẩn thịt, địa chỉ và bản đồ.
5. **Nút liên kết & Mạng xã hội thông minh**:
   - Tự động nhận diện đường dẫn để hiển thị nút icon bấm được: Instagram, Website, Bản đồ Google Maps, YouTube, Tài liệu PDF.
6. **Huy hiệu trạng thái & Chỉ số**:
   - Phân biệt bò F1 Crossbreed và bò thuần chủng Kuroge Washu, thẻ số ID dạng ear-tag.

---

## 🚀 Hướng dẫn khởi chạy dự án

1. Mở PowerShell hoặc Terminal tại thư mục này:
   ```bash
   cd C:\Users\LENOVO\Desktop\du-an-moi
   ```

2. Chạy ứng dụng ở chế độ phát triển:
   ```bash
   npm run dev
   ```

3. Mở trình duyệt và truy cập:
   ```
   http://localhost:3000
   ```

---

## 📁 Cấu trúc thư mục
```
du-an-moi/
├── public/
│   └── images/
│       └── kobe-hero.png   # Ảnh chụp thực tế bò Wagyu tại Kobe Ushi Farm
├── src/
│   ├── app/
│   │   ├── globals.css     # Cấu hình Tailwind, phông Noto Serif JP & texture Washi
│   │   ├── layout.tsx      # Root layout & SEO metadata
│   │   └── page.tsx        # Trang chủ điều khiển dữ liệu, tìm kiếm & bộ lọc
│   ├── components/
│   │   ├── Header.tsx       # Thanh điều hướng kiểu Nhật (menu chữ dọc & logo)
│   │   ├── HeroBanner.tsx   # Banner ảnh Kobe Ushi Farm với chữ dọc 但馬牛・神戸牛
│   │   ├── TabNavigation.tsx# Tab chuyển BRAND, FARM, COMPANY, BRAND&FARM
│   │   ├── RegionFilter.tsx # Bộ lọc nhanh theo vùng miền Nhật Bản
│   │   ├── SearchBar.tsx    # Ô tìm kiếm tức thì & nút làm mới dữ liệu
│   │   ├── CardBrand.tsx    # Thẻ thương hiệu Wagyu
│   │   ├── CardFarm.tsx     # Thẻ trang trại chăn nuôi
│   │   ├── CardCompany.tsx  # Thẻ tổ chức & hiệp hội
│   │   ├── CardBrandFarm.tsx# Thẻ danh mục tra cứu nhanh
│   │   ├── DetailModal.tsx  # Hộp thoại popup xem chi tiết phóng to
│   │   ├── LinkButtons.tsx  # Bộ nút icon Instagram, Website, Youtube, Map
│   │   └── Footer.tsx       # Chân trang phong cách thủ công Nhật Bản
│   └── lib/
│       ├── api.ts           # Kết nối trực tiếp Google Apps Script API
│       ├── types.ts         # TypeScript types
│       └── utils.ts         # Tiện ích phân tách URL, làm sạch văn bản
└── package.json
```