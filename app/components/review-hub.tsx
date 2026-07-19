"use client";

import type { CourseStore } from "../hooks/use-course-store";

export function ReviewHub({ store, navigate }: { store: CourseStore; navigate: (hash: string) => void }) {
  const reviews = Object.values(store.state.reviews);
  return <main className="course-surface">
    <section className="surface-intro"><span className="course-kicker">ÔN TÍCH LŨY</span><h1>Ôn ít hơn, nhưng đúng lúc hơn</h1><p>Các mục bạn chủ động đánh dấu sẽ quay lại theo nhịp 1–3–7–14–30 ngày.</p></section>
    {!reviews.length ? <section className="empty-state"><span className="hanzi-font">复</span><h2>Chưa có mục nào trong lịch ôn</h2><p>Vào Kho kiến thức và chọn “Ôn tích lũy” ở những từ, cấu trúc hoặc chữ bạn muốn ghi nhớ lâu dài.</p><button className="primary" onClick={() => navigate("#/kho-kien-thuc")}>Mở Kho kiến thức</button></section> : <section className="review-list">
      <div className="surface-heading"><div><h2>{store.dueReviews.length} mục đến hạn</h2><p>{reviews.length} mục đang được theo dõi</p></div></div>
      {store.dueReviews.length === 0 && <div className="empty-state compact"><h3>Hôm nay đã ôn xong</h3><p>Lịch tiếp theo đã được tự động sắp xếp.</p></div>}
      {store.dueReviews.map((item) => <article key={item.knowledgeId} className="review-card"><div><span>Bài {item.lessonId} · lần {item.stage + 1}</span><h3 className="hanzi-font">{item.label}</h3><button onClick={() => navigate(`#/bai/${item.lessonId}/overview`)}>Xem trong bài học</button></div><div className="rating-buttons"><button onClick={() => store.rateKnowledge(item.knowledgeId, "again")}>Quên</button><button onClick={() => store.rateKnowledge(item.knowledgeId, "hard")}>Khó</button><button onClick={() => store.rateKnowledge(item.knowledgeId, "good")}>Nhớ</button><button onClick={() => store.rateKnowledge(item.knowledgeId, "easy")}>Rất dễ</button></div></article>)}
    </section>}
  </main>;
}
