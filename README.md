# Tài liệu học tiếng Trung CB2 · Bài 16–30

PWA học tiếng Trung theo một lộ trình liên tục, thay vì các bài học rời rạc.
Ứng dụng hướng tới máy tính, điện thoại và iPad, được xuất bản bằng GitHub
Pages.

## Trạng thái nội dung

- Bài 23–25: cụm pilot đã có module học đầy đủ; Bài 25 bổ sung kiến thức mở rộng, hội thoại tự biên soạn, luyện tập ứng dụng và liên kết ngược về Bài 23–24.
- Bài 16–22: đã có vị trí trong lộ trình, đang chờ chuẩn hóa nội dung nguồn.
- Bài 26–30: sẽ bổ sung khi có bài giảng mới.

Ứng dụng hiện có lộ trình khóa học, kho kiến thức, ôn tích lũy, sổ lỗi sai và
các mốc checkpoint. Tiến độ học được lưu cục bộ trên từng thiết bị.

## Chạy và kiểm tra

```powershell
pnpm run dev
pnpm run lint
pnpm run build
pnpm run build:pages
node --test tests/rendered-html.test.mjs
pnpm run preview:pages
```

Bản GitHub Pages được tạo trong `github-pages-dist/` và triển khai tự động khi
nhánh `main` được push lên repository này.

## Tài liệu dự án

- `AGENTS.md`: quy tắc làm việc và phát hành.
- `ARCHITECTURE.md`: kiến trúc PWA Bài 16–30.
- `LESSON_SCHEMA.md`: khuôn dữ liệu bài học.
- `CONTENT_GUIDE.md`: tiêu chuẩn nội dung tiếng Trung, pinyin, nghĩa Việt,
  audio và bài tập.

Trang công khai: <https://minhductran114-oss.github.io/cb2-bai-16-30/>
