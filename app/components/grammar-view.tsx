"use client";

import { useState } from "react";
import type { GrammarPoint } from "../lesson-types";
import type { AudioController } from "../use-lesson-audio";
import { LearningText } from "./learning-ui";

export function GrammarView({
  points,
  showPinyin,
  showMeaning,
  speak,
}: {
  points: GrammarPoint[];
  showPinyin: boolean;
  showMeaning: boolean;
  speak: AudioController["speak"];
}) {
  const [active, setActive] = useState(0);
  const item = points[active] || points[0];

  return <div className="grammar-layout">
    <aside className="grammar-index" aria-label="Chọn điểm ngữ pháp">
      {points.map((point, index) => <button key={point.title} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{point.title}</button>)}
    </aside>
    <section className="grammar-card panel">
      <span className="panel-kicker">HIỂU BẰNG ĐỐI CHIẾU</span>
      <h2>{item.title}</h2>
      <div className="formula">{item.formula}</div>
      <p className="grammar-explain">{item.explanation}</p>
      <div className="grammar-examples">
        {item.examples.map((example) => <LearningText key={example.hanzi} item={example} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} compact />)}
      </div>
      {item.warning && <div className="contrast-box">
        <span className="panel-kicker">LỖI NGƯỜI VIỆT DỄ MẮC</span>
        <div className="contrast-grid">
          <div className="wrong-example"><b>✕ Chưa đúng ý</b><LearningText item={item.warning.wrong} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} compact /></div>
          <div className="right-example"><b>✓ Nên nói</b><LearningText item={item.warning.right} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} compact /></div>
        </div>
        <p>{item.warning.note}</p>
      </div>}
    </section>
  </div>;
}
