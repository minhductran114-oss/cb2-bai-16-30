"use client";

import type { CourseSurface } from "../../content/schema";

const links: Array<{ id: CourseSurface; label: string; hash: string }> = [
  { id: "course", label: "Lộ trình", hash: "#/lo-trinh" },
  { id: "knowledge", label: "Kho kiến thức", hash: "#/kho-kien-thuc" },
  { id: "review", label: "Ôn tích lũy", hash: "#/on-tap" },
  { id: "mistakes", label: "Sổ lỗi sai", hash: "#/so-loi" },
];

export function CourseHeader({ active, navigate }: { active: CourseSurface; navigate: (hash: string) => void }) {
  return <header className="course-header">
    <button className="course-brand" onClick={() => navigate("#/lo-trinh")}>
      <span className="brand-mark hanzi-font">学</span>
      <span><strong>Tài liệu học tiếng Trung</strong><small>CB2 · Bài 16–30</small></span>
    </button>
    <nav aria-label="Điều hướng khóa học">
      {links.map((link) => <button key={link.id} className={active === link.id ? "active" : ""} onClick={() => navigate(link.hash)}>{link.label}</button>)}
    </nav>
  </header>;
}
