"use client";

import { useState } from "react";
import type { LessonExtension } from "../lesson-types";
import type { AudioController } from "../use-lesson-audio";
import { LearningText } from "./learning-ui";

export function ExtensionView({ extension, showPinyin, showMeaning, speak }: {
  extension: LessonExtension;
  showPinyin: boolean;
  showMeaning: boolean;
  speak: AudioController["speak"];
}) {
  const [active, setActive] = useState(0);
  const [missionReady, setMissionReady] = useState(false);
  const topic = extension.topics[active] || extension.topics[0];

  return <div className="content-stack extension-view">
    <section className="extension-bridge panel">
      <div><span className="panel-kicker">KẾT NỐI LIÊN BÀI</span><h2>{extension.bridgeTitle}</h2><p>{extension.bridgeSummary}</p></div>
      <div className="bridge-examples">{extension.priorKnowledge.map((item) => <LearningText key={item.hanzi} item={item} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} compact />)}</div>
    </section>

    <section className="extension-lab">
      <aside className="extension-index" aria-label="Chọn chuyên đề mở rộng">
        {extension.topics.map((item, index) => <button key={item.title} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span><small>{item.eyebrow}</small><b>{item.title}</b></button>)}
      </aside>
      <article className="extension-topic panel">
        <span className="panel-kicker">{topic.eyebrow}</span>
        <h2>{topic.title}</h2>
        <p className="extension-explain">{topic.explanation}</p>
        <div className="extension-examples">{topic.examples.map((item) => <LearningText key={item.hanzi} item={item} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} compact />)}</div>
        <div className="practical-tip"><span className="hanzi-font">用</span><div><b>Mẹo dùng ngay</b><p>{topic.practicalTip}</p></div></div>
      </article>
    </section>

    <section className="field-mission panel">
      <div><span className="panel-kicker">NHIỆM VỤ NGOÀI MÀN HÌNH</span><h2>{extension.fieldMission.title}</h2><p>{extension.fieldMission.prompt}</p></div>
      <ul>{extension.fieldMission.checklist.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
      <button className={missionReady ? "complete-button completed" : "complete-button"} onClick={() => setMissionReady(!missionReady)}>{missionReady ? "✓ Đã tự kiểm tra đủ tiêu chí" : "Bắt đầu nhiệm vụ"}</button>
    </section>
  </div>;
}
