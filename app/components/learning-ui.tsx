"use client";

import type { AudioController } from "../use-lesson-audio";
import type { Triplet } from "../lesson-types";

export function SpeakButton({
  text,
  speak,
  label = "Nghe",
  className = "speak-button",
}: {
  text: string;
  speak: AudioController["speak"];
  label?: string;
  className?: string;
}) {
  return <button className={className} onClick={() => speak(text)} aria-label={`${label}: ${text}`}><span aria-hidden="true">▶</span>{label}</button>;
}

export function LearningText({
  item,
  showPinyin,
  showMeaning,
  speak,
  compact = false,
}: {
  item: Triplet;
  showPinyin: boolean;
  showMeaning: boolean;
  speak: AudioController["speak"];
  compact?: boolean;
}) {
  return <div className={compact ? "learning-text compact" : "learning-text"}>
    <button className="hanzi-text" onClick={() => speak(item.hanzi)}>{item.hanzi}<span aria-hidden="true">▶</span></button>
    {showPinyin && <p className="pinyin-text">{item.pinyin}</p>}
    {showMeaning && <p className="meaning-text">{item.meaning}</p>}
  </div>;
}

export function AudioSettings({ audio }: { audio: AudioController }) {
  return <section className="audio-settings panel" aria-labelledby="audio-heading">
    <div className="audio-copy">
      <span className="panel-kicker">TÙY CHỌN ÂM THANH</span>
      <h2 id="audio-heading">Nghe chậm, nghe rõ, rồi nhại lại</h2>
      <p>{audio.status}</p>
    </div>
    <div className="audio-actions">
      <button className="primary" onClick={audio.activate}><span aria-hidden="true">▶</span> Nghe thử / kích hoạt</button>
      <label>
        <span>Giọng đọc</span>
        <select value={audio.voiceName} onChange={(event) => audio.setVoiceName(event.target.value)}>
          {!audio.voices.length && <option value="">Giọng zh-CN mặc định</option>}
          {audio.voices.map((voice) => <option value={voice.name} key={`${voice.name}-${voice.lang}`}>{voice.name} · {voice.lang}{/xiaoxiao|晓晓/i.test(voice.name) ? " · ưu tiên Xiaoxiao" : ""}</option>)}
        </select>
      </label>
      <label>
        <span>Tốc độ</span>
        <select value={audio.rate} onChange={(event) => audio.setRate(Number(event.target.value))}>
          <option value={0.65}>Chậm · 0.65×</option>
          <option value={0.8}>Học tập · 0.8×</option>
          <option value={1}>Tự nhiên · 1×</option>
        </select>
      </label>
    </div>
  </section>;
}
