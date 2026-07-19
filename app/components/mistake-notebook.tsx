"use client";

import type { CourseStore } from "../hooks/use-course-store";

export function MistakeNotebook({ store, navigate }: { store: CourseStore; navigate: (hash: string) => void }) {
  return <main className="course-surface">
    <section className="surface-intro"><span className="course-kicker">SỔ LỖI SAI</span><h1>Mỗi lỗi sai trở thành một đầu mối để học lại</h1><p>Trắc nghiệm và bài nghe sai được gom tại đây thay vì biến mất sau khi xem đáp án.</p></section>
    {!store.activeMistakes.length ? <section className="empty-state"><span className="hanzi-font">对</span><h2>Chưa có lỗi nào cần xử lý</h2><p>Khi làm sai trong phần Luyện tập, app sẽ tự ghi câu hỏi, câu trả lời và đáp án đúng.</p><button className="primary" onClick={() => navigate("#/bai/23/practice")}>Đi tới luyện tập</button></section> : <section className="mistake-grid">{store.activeMistakes.map((item) => <article key={item.id}>
      <div><span>Bài {item.lessonId} · sai {item.wrongCount} lần</span><h3>{item.prompt}</h3></div>
      <dl><div><dt>Bạn trả lời</dt><dd>{item.learnerAnswer}</dd></div><div><dt>Đáp án</dt><dd className="hanzi-font">{item.expectedAnswer}</dd></div></dl>
      <p>{item.feedback}</p><div><button onClick={() => navigate(`#/bai/${item.lessonId}/practice`)}>Làm lại trong bài</button><button className="primary" onClick={() => store.resolveMistake(item.id)}>Đã hiểu lỗi này</button></div>
    </article>)}</section>}
  </main>;
}
