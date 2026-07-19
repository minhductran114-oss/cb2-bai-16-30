"use client";

import { useEffect, useMemo, useState } from "react";
import type { Triplet, VocabEntry } from "../lesson-types";
import type { AvailableLessonId } from "../../content/schema";
import type { AudioController } from "../use-lesson-audio";
import { LearningText, SpeakButton } from "./learning-ui";
import { StrokePlayer } from "./stroke-player";

const REMEMBERED_KEY = "cb2-remembered-words";

export function VocabView({
  lessonId,
  words,
  glossary,
  showPinyin,
  showMeaning,
  speak,
}: {
  lessonId: AvailableLessonId;
  words: VocabEntry[];
  glossary: Triplet[];
  showPinyin: boolean;
  showMeaning: boolean;
  speak: AudioController["speak"];
}) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(words[0]?.hanzi || null);
  const [strokeWord, setStrokeWord] = useState<string | null>(null);
  const [remembered, setRemembered] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setRemembered(JSON.parse(localStorage.getItem(REMEMBERED_KEY) || "[]") as string[]);
      } catch {
        localStorage.removeItem(REMEMBERED_KEY);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const current = words[index % words.length];
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const filteredWords = useMemo(() => words.filter((word) => `${word.hanzi} ${word.pinyin} ${word.meaning} ${word.group}`.toLocaleLowerCase("vi").includes(normalizedQuery)), [normalizedQuery, words]);
  const filteredGlossary = useMemo(() => glossary.filter((word) => `${word.hanzi} ${word.pinyin} ${word.meaning}`.toLocaleLowerCase("vi").includes(normalizedQuery)), [glossary, normalizedQuery]);

  const nextCard = () => {
    setIndex((value) => (value + 1) % words.length);
    setRevealed(false);
  };

  const toggleRemembered = (hanzi: string) => {
    const key = `${lessonId}:${hanzi}`;
    const next = remembered.includes(key) ? remembered.filter((item) => item !== key) : [...remembered, key];
    setRemembered(next);
    localStorage.setItem(REMEMBERED_KEY, JSON.stringify(next));
  };

  return <div className="content-stack">
    <section className="flash-zone">
      <div className="flash-info">
        <span className="panel-kicker">THẺ NHỚ CHỦ ĐỘNG</span>
        <h2>Nhìn chữ → gọi âm → hình dung cảnh</h2>
        <p>Tự nói pinyin và nghĩa trước khi mở đáp án. Sau đó kể lại mẹo hình ảnh bằng lời của bạn.</p>
        <div className="flash-counter">{index + 1} / {words.length}</div>
      </div>
      <div className={revealed ? "flash-card revealed" : "flash-card"}>
        <SpeakButton text={current.hanzi} speak={speak} label="" className="sound-fab" />
        <span className="flash-hanzi hanzi-font">{current.hanzi}</span>
        {revealed ? <div className="flash-answer">
          {showPinyin && <b className="pinyin-text">{current.pinyin}</b>}
          {showMeaning && <p>{current.meaning}</p>}
          <small>{current.type} · {current.group}</small>
          <div className="flash-memory"><b>Mẹo nhớ</b><span>{current.memory}</span></div>
        </div> : <button className="reveal" onClick={() => setRevealed(true)}>Hiện âm, nghĩa và mẹo nhớ</button>}
        <button className="next-card" onClick={nextCard}>Thẻ tiếp theo →</button>
      </div>
    </section>

    <section className="vocab-tools panel">
      <div>
        <span className="panel-kicker">TỪ VỰNG TRỌNG TÂM</span>
        <h2>{words.length} cụm học sâu · {glossary.length} mục tra nhanh</h2>
      </div>
      <label className="search-box"><span>Tìm từ</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Chữ Hán, pinyin hoặc nghĩa…" /></label>
    </section>

    <section className="vocab-grid" aria-label="Thẻ từ vựng học sâu">
      {filteredWords.map((word) => {
        const isExpanded = expanded === word.hanzi;
        const isRemembered = remembered.includes(`${lessonId}:${word.hanzi}`);
        return <article className={isExpanded ? "vocab-card panel expanded" : "vocab-card panel"} key={word.hanzi}>
          <div className="vocab-meta"><span>{word.group}</span><small>{word.type}</small></div>
          <div className="vocab-title">
            <div><button className="vocab-hanzi hanzi-font" onClick={() => speak(word.hanzi)}>{word.hanzi}<span aria-hidden="true">▶</span></button>{showPinyin && <p className="pinyin-text">{word.pinyin}</p>}{showMeaning && <p className="meaning-text">{word.meaning}</p>}</div>
            <button className="stroke-toggle" onClick={() => setStrokeWord(strokeWord === word.hanzi ? null : word.hanzi)}>✍ Phát nét</button>
          </div>
          {strokeWord === word.hanzi && <StrokePlayer chars={word.strokeChars} compact />}
          <div className="vocab-actions">
            <button onClick={() => setExpanded(isExpanded ? null : word.hanzi)}>{isExpanded ? "Thu gọn" : "Học sâu"}</button>
            <button className={isRemembered ? "remembered" : ""} onClick={() => toggleRemembered(word.hanzi)}>{isRemembered ? "✓ Đã nhớ" : "Đánh dấu đã nhớ"}</button>
          </div>
          {isExpanded && <div className="vocab-details">
            <section><h3>Cấu tạo chữ</h3><p>{word.structure}</p></section>
            <section className="memory-note"><h3>Mẹo nhớ cách viết</h3><p>{word.memory}</p></section>
            <section><h3>Cụm từ thường dùng</h3><div className="mini-learning-list">{word.compounds.map((item) => <LearningText key={item.hanzi} item={item} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} compact />)}</div></section>
            <section><h3>Ví dụ đời thực</h3><div className="example-list">{word.examples.map((item) => <LearningText key={item.hanzi} item={item} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} compact />)}</div></section>
          </div>}
        </article>;
      })}
    </section>

    <section className="glossary panel">
      <div className="panel-heading"><div><span className="panel-kicker">TRA NHANH TOÀN BÀI</span><h2>Từ bổ trợ vẫn có âm, pinyin và nghĩa</h2></div></div>
      <div className="glossary-grid">{filteredGlossary.map((word) => <button key={word.hanzi} onClick={() => speak(word.hanzi)}><b className="hanzi-font">{word.hanzi}</b>{showPinyin && <span className="pinyin-text">{word.pinyin}</span>}{showMeaning && <span className="meaning-text">{word.meaning}</span>}<i aria-hidden="true">▶</i></button>)}</div>
    </section>
  </div>;
}
