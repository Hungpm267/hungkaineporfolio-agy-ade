# 📘 Hướng Dẫn Sử Dụng Trang Web Portfolio Cá Nhân

Chào mừng bạn đến với hệ thống Portfolio cá nhân đa ngôn ngữ (Việt/Anh) tích hợp trang quản trị (Admin Panel) sử dụng dữ liệu trình duyệt (LocalStorage). Tài liệu này sẽ hướng dẫn chi tiết cách khởi chạy và quản lý trang web của bạn.

---

## 🚀 1. Hướng Dẫn Khởi Chạy Dự Án

Trang web được viết bằng HTML, CSS, và JavaScript thuần, do đó không cần cài đặt phức tạp. Bạn có hai cách để chạy dự án:

### Cách 1: Chạy bằng Node.js (Khuyên dùng)
Nếu máy bạn đã cài Node.js, mở terminal tại thư mục dự án và chạy:
```bash
npx serve
```
👉 Truy cập trang web tại địa chỉ hiển thị trong terminal (thường là **`http://localhost:3000`**).

### Cách 2: Chạy bằng Python
Nếu máy bạn đã cài Python, mở terminal tại thư mục dự án và chạy:
```bash
python -m http.server 8000
```
👉 Truy cập trang web tại địa chỉ: **`http://localhost:8000`**.

---

## 🔐 2. Cách Truy Cập & Đăng Nhập Trang Quản Trị (Admin Panel)

Bạn có hai cách để đi tới trang quản trị:

1.  **Cách trực tiếp từ URL:** Nhập **`/login.html`** sau địa chỉ localhost (ví dụ: `http://localhost:3000/login.html`).
2.  **Cách từ trang chủ:** Cuộn xuống cuối cùng của trang chủ Portfolio, ở phần chân trang (Footer), nhấp vào liên kết **"Admin Portal"**.

### 🔑 Thông tin đăng nhập mặc định:
*   **Tên tài khoản (Username):** `admin`
*   **Mật khẩu (Password):** `admin123`

> ⚠️ **Quan trọng:** Ngay sau lần đăng nhập đầu tiên, hãy đi tới mục **Quản lý tài khoản** ở cuối Sidebar của trang Admin để đổi mật khẩu bảo mật mới.

---

## 🛠️ 3. Hướng Dẫn Quản Lý Nội Dung Trên Trang Admin

Giao diện quản trị được chia làm các mục chính sau trên thanh Sidebar:

### 3.1. Dashboard (Bảng điều khiển)
*   Hiển thị số liệu tổng quan về các mục (Dự án, Kinh nghiệm, Bài viết, Đánh giá).
*   Cung cấp nút **"Xem trang Portfolio"** để bạn nhanh chóng kiểm tra kết quả hiển thị thực tế.

### 3.2. Giới Thiệu (Profile)
*   **Thông tin cơ bản:** Nhập Họ tên, Chức danh công việc và mô tả ngắn. Hệ thống hỗ trợ nhập độc lập 2 tab **Tiếng Việt (VI)** và **Tiếng Anh (EN)**.
*   **Ảnh đại diện (Avatar):** Nhập URL trực tiếp hoặc nhấp **"Tải ảnh lên"** để chọn ảnh từ máy tính (ảnh sẽ tự động chuyển đổi thành mã Base64 lưu vào bộ nhớ trình duyệt).
*   **Mạng xã hội:** Thêm các liên kết mạng xã hội của bạn (GitHub, LinkedIn, Twitter/X...). Chọn nền tảng tương ứng để biểu tượng tự động hiển thị trên trang chủ.

### 3.3. Dự Án (Projects)
*   Nhấp **"Thêm dự án mới"** để mở form nhập liệu.
*   Nhập tên, mô tả dự án bằng cả 2 ngôn ngữ, công nghệ sử dụng (tags), link demo và link source code.
*   Bật tính năng **"Nổi bật" (Featured)** để dự án hiển thị lớn gấp đôi và có nhãn sao vàng nổi bật trên trang chủ.

### 3.4. Kinh Nghiệm (Experience) & Học Vấn (Education)
*   Cho phép quản lý các mốc thời gian nghề nghiệp hoặc học tập.
*   Mỗi mục gồm: Tên tổ chức, vai trò, thời gian bắt đầu/kết thúc (hoặc tích chọn "Hiện tại"), mô tả chi tiết các công việc đã thực hiện.

### 3.5. Kỹ Năng (Skills)
*   Quản lý kỹ năng theo từng nhóm chuyên môn (Ví dụ: Frontend, Backend, Tools...).
*   Trong mỗi nhóm, bạn có thể thêm các kỹ năng cụ thể và kéo thanh trượt từ `0%` đến `100%` tương đương mức độ thành thạo.

### 3.6. Blog / Bài Viết
*   Cho phép bạn viết bài hoặc ghi chú chia sẻ trực tiếp.
*   Hệ thống tích hợp một trình soạn thảo văn bản đơn giản (Rich Text Editor) cho phép bạn định dạng **In đậm**, *In nghiêng*, Chèn liên kết (`Link`) hay tiêu đề bài viết.

### 3.7. Nhận Xét (Testimonials)
*   Quản lý các đánh giá từ khách hàng hoặc đồng nghiệp cũ, bao gồm: tên người đánh giá, chức vụ, công ty, nội dung nhận xét và ảnh đại diện của họ.

### 3.8. Cài Đặt Trang (Page Settings)
*   **Thông tin SEO:** Đặt tiêu đề tab trình duyệt, từ khóa tìm kiếm (meta description) và thay đổi Favicon.
*   **Màu sắc chủ đạo (Accent Color):** Bạn có thể chọn bất kỳ màu nào mình thích bằng công cụ chọn màu chuyên nghiệp, toàn bộ các nút bấm, timeline, thanh tiến trình của trang chủ sẽ tự động đổi màu theo tông màu này!
*   **Cấu hình nhận Email (EmailJS):** Điền các khóa dịch vụ của EmailJS (Service ID, Template ID, Public Key) để form liên hệ hoạt động thực tế.

### 3.9. Sắp Xếp Bố Cục (Section Order) 🖱️
*   Một tính năng mạnh mẽ cho phép bạn **kéo thả (Drag & Drop)** để thay đổi thứ tự hiển thị của các khối nội dung trên trang chủ.
*   Tích/hủy chọn ô checkbox **"Hiển thị"** để ẩn bớt một khối nội dung nào đó mà không lo mất dữ liệu.

---

## 📧 4. Hướng Dẫn Cấu Hình Gửi Email Từ Form Liên Hệ

Hệ thống sử dụng dịch vụ miễn phí **EmailJS** để chuyển tiếp tin nhắn từ trang Portfolio thẳng tới hộp thư email cá nhân của bạn (ví dụ Gmail).

### Các bước cấu hình:
1.  Truy cập vào trang chủ **[EmailJS](https://www.emailjs.com/)** và đăng ký một tài khoản miễn phí.
2.  Trong trang dashboard của EmailJS, chọn **Add New Service** (ví dụ kết nối với Gmail cá nhân của bạn). Copy lại **Service ID**.
3.  Vào mục **Email Templates**, tạo một template gửi thư mới. Bạn có thể sử dụng các biến sau trong nội dung template:
    *   `{{from_name}}`: Tên người gửi.
    *   `{{reply_to}}`: Email người gửi.
    *   `{{subject}}`: Tiêu đề tin nhắn.
    *   `{{message}}`: Nội dung tin nhắn.
    Copy lại mã **Template ID**.
4.  Vào phần **Account** -> **API Keys** trên EmailJS để lấy mã **Public Key** (hoặc User ID).
5.  Truy cập trang Admin của Portfolio -> Vào mục **Cài đặt trang** -> Điền cả 3 thông số này vào rồi nhấn **Lưu cài đặt**.

*Lưu ý: Nếu chưa cấu hình các khóa này, hệ thống sẽ tự động chuyển đổi phương thức gửi thư sang dạng `mailto:email_cua_ban` để người dùng gửi email trực tiếp qua phần mềm trên máy của họ.*

---

## 💾 5. Cơ Chế Lưu Trữ Dữ Liệu (LocalStorage)

*   Toàn bộ thông tin bạn nhập trên trang Admin sẽ được lưu trữ trực tiếp trên **LocalStorage của trình duyệt** đang chạy.
*   **Ưu điểm:** Tải trang nhanh, hoạt động tức thì, không cần thuê cơ sở dữ liệu (Database) hoặc lập trình Backend.
*   **Hạn chế:** Dữ liệu chỉ nằm trên thiết bị và trình duyệt bạn đang sử dụng. Nếu bạn đổi sang máy tính khác hoặc trình duyệt khác, bạn sẽ thấy dữ liệu mẫu ban đầu.
*   💡 **Mẹo:** Trong trang Admin mục **Quản lý tài khoản**, bạn có thể dùng tính năng **Export Data** (Xuất dữ liệu ra file JSON) để sao lưu dữ liệu, sau đó sang trình duyệt hoặc máy tính khác dùng tính năng **Import Data** để khôi phục lại dữ liệu cực kỳ nhanh chóng.
