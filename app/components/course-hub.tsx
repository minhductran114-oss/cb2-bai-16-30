"use client";

import { course } from "../../content/course";
import type { CourseState } from "../../content/schema";

const statusLabel = { available: "Học ngay", draft: "Đang chuyển đổi", planned: "Sắp bổ sung" } as const;

export function CourseHub({ state, navigate }: { state: CourseState; navigate: (hash: string) => void }) {
  const completed = state.completedSections.length;
  const availableSections = 12;
  const percentage = Math.min(100, Math.round(completed / availableSections * 100));

  return <main className="course-surface">
    <section className="course-hero">
      <div>
        <span className="course-kicker">MỘT LỘ TRÌNH · MỘT KHO KIẾN THỨC</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div className="course-actions"><button className="primary" onClick={() => navigate("#/bai/23/overview")}>Tiếp tục với Bài 23</button><button onClick={() => navigate("#/on-tap")}>Ôn kiến thức đến hạn</button></div>
      </div>
      <div className="course-progress-card">
        <span>Tiến độ nội dung hiện có</span><b>{percentage}%</b>
        <div className="progress-track"><span style={{ width: `${percentage}%` }} /></div>
        <small>{completed}/{availableSections} phần của Bài 23–24 đã hoàn thành. Dữ liệu được lưu trên thiết bị này.</small>
      </div>
    </section>

    <section className="continuity-strip" aria-label="Chu trình học tích lũy">
      <div><b>01</b><span>Học trong ngữ cảnh</span></div><i>→</i><div><b>02</b><span>Nối kiến thức cũ</span></div><i>→</i><div><b>03</b><span>Ôn đúng thời điểm</span></div><i>→</i><div><b>04</b><span>Sửa lỗi và dùng lại</span></div>
    </section>

    <section className="roadmap-section">
      <div className="surface-heading"><div><span className="course-kicker">LỘ TRÌNH 16–30</span><h2>Mỗi bài là một chặng, không phải một file rời</h2></div><p>Bài 23–24 đã sẵn sàng. Bài 16–22 đang chờ chuyển nội dung nguồn sang cùng khuôn dữ liệu.</p></div>
      <div className="lesson-roadmap">
        {course.lessons.map((item) => <article key={item.id} className={`lesson-roadmap-card status-${item.status}`}>
          <div className="lesson-number"><span>Bài</span><b>{item.id}</b></div>
          <div className="lesson-card-copy">
            <span className="status-pill">{statusLabel[item.status]}</span>
            <h3 className={item.title ? "hanzi-font" : ""}>{item.title?.hanzi || item.theme}</h3>
            {item.title && <><p className="pinyin-text">{item.title.pinyin}</p><p>{item.title.meaning}</p></>}
            <small>{item.sourceNote}</small>
          </div>
          {item.status === "available" ? <button className="lesson-open" onClick={() => navigate(`#/bai/${item.id}/overview`)}>Mở bài →</button> : <span className="lesson-locked" aria-label="Chưa có nội dung">{item.status === "draft" ? "Đang chuẩn hóa" : "Chờ nguồn"}</span>}
        </article>)}
      </div>
    </section>

    <section className="checkpoint-section">
      <div className="surface-heading"><div><span className="course-kicker">CHECKPOINT</span><h2>Các mốc buộc kiến thức gặp lại nhau</h2></div></div>
      <div className="checkpoint-grid">{course.checkpoints.map((item) => <article key={item.id}><b>{item.label}</b><span>{item.lessonRange.length} bài · {statusLabel[item.status]}</span><p>Từ vựng, ngữ pháp, nghe và lỗi sai được trộn lại theo tình huống mới.</p></article>)}</div>
    </section>
  </main>;
}
