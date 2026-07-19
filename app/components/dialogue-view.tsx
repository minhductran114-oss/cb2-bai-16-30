"use client";

import { useState } from "react";
import type { Dialogue } from "../lesson-types";
import type { AudioController } from "../use-lesson-audio";
import { SpeakButton } from "./learning-ui";

export function DialogueView({
  dialogues,
  showPinyin,
  showMeaning,
  speak,
}: {
  dialogues: Dialogue[];
  showPinyin: boolean;
  showMeaning: boolean;
  speak: AudioController["speak"];
}) {
  const [active, setActive] = useState(0);
  const dialogue = dialogues[active] || dialogues[0];

  return <div className="content-stack">
    <div className="tabs" role="tablist" aria-label="Chọn hội thoại ứng dụng">
      {dialogues.map((item, index) => <button key={item.title} role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}>Tình huống {index + 1}</button>)}
    </div>
    <section className="dialogue-panel panel">
      <div className="panel-heading dialogue-heading">
        <div>
          <span className="panel-kicker">HỘI THOẠI ỨNG DỤNG · KHÔNG CHÉP LẠI SÁCH</span>
          <h2 className="hanzi-font">{dialogue.title}</h2>
        </div>
        <SpeakButton text={dialogue.lines.map((line) => line.hanzi).join("。") } speak={speak} label="Nghe toàn bài" className="listen-main compact" />
      </div>
      <div className="dialogue-context">
        <p><b>Bối cảnh</b>{dialogue.setting}</p>
        <p><b>Mục tiêu nói</b>{dialogue.goal}</p>
      </div>
      <div className="dialogue-list">
        {dialogue.lines.map((line, index) => <article className="dialogue-line" key={`${line.hanzi}-${index}`}>
          <div className="speaker-avatar hanzi-font" aria-hidden="true">{line.speaker.slice(0, 1)}</div>
          <div className="speech">
            <span className="speaker-name">{line.speaker}</span>
            <button className="hanzi-line" onClick={() => speak(line.hanzi)}>{line.hanzi}<span aria-hidden="true">▶</span></button>
            {showPinyin && <p className="pinyin-text">{line.pinyin}</p>}
            {showMeaning && <p className="meaning-text">{line.meaning}</p>}
          </div>
        </article>)}
      </div>
      <div className="shadow-tip"><b>Shadowing 3 lượt</b><span>① Nghe không nhìn chữ　② Nghe và nhại cùng nhịp　③ Đổi tên, giờ hoặc địa điểm bằng thông tin thật của bạn</span></div>
    </section>
  </div>;
}
