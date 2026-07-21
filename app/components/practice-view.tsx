"use client";

import { useState } from "react";
import type { Quiz, Triplet } from "../lesson-types";
import type { AvailableLessonId, MistakeRecord } from "../../content/schema";
import type { AudioController } from "../use-lesson-audio";
import { LearningText, SpeakButton } from "./learning-ui";

function normalizeAnswer(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s\p{P}\p{S}]/gu, "").toLocaleLowerCase();
}

export function PracticeView({
  lesson,
  quizzes,
  orderTask,
  dictationTask,
  translationTask,
  recordMistake,
  showPinyin,
  showMeaning,
  speak,
}: {
  lesson: AvailableLessonId;
  quizzes: Quiz[];
  orderTask: { tokens: string[]; answer: string; translation: string; pinyin: string };
  dictationTask: Triplet;
  translationTask: Triplet & { hint: string };
  recordMistake: (input: Omit<MistakeRecord, "id" | "wrongCount" | "firstWrongAt" | "lastWrongAt">) => void;
  showPinyin: boolean;
  showMeaning: boolean;
  speak: AudioController["speak"];
}) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [dictation, setDictation] = useState("");
  const [dictationChecked, setDictationChecked] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const quiz = quizzes[quizIndex] || quizzes[0];
  const orderCorrect = order.join("") === orderTask.answer;
  const dictationCorrect = [dictationTask.hanzi, dictationTask.pinyin].some((answer) => normalizeAnswer(answer) === normalizeAnswer(dictation));

  const selectAnswer = (option: number) => {
    if (selected !== null) return;
    setSelected(option);
    if (option === quiz.answer) setScore((value) => value + 1);
    else recordMistake({
      lessonId: lesson,
      exerciseId: `lesson-${lesson}-quiz-${quizIndex}`,
      prompt: quiz.prompt,
      learnerAnswer: quiz.options[option].hanzi,
      expectedAnswer: quiz.options[quiz.answer].hanzi,
      feedback: quiz.feedback,
    });
  };

  const nextQuiz = () => {
    setQuizIndex((value) => (value + 1) % quizzes.length);
    setSelected(null);
  };

  return <div className="content-stack">
    <section className="practice-head">
      <div><span className="panel-kicker">NHỚ LẠI → NHẬN PHẢN HỒI → TỰ DÙNG</span><h2>Bốn kiểu bài tập, bốn đường gọi lại trí nhớ</h2></div>
      <div className="score-badge"><span>Điểm trắc nghiệm</span><b>{score}/{quizzes.length}</b></div>
    </section>

    <section className="quiz-card panel">
      <div className="quiz-meta"><span>Câu {quizIndex + 1}/{quizzes.length}</span><b>1 · Chọn theo ngữ cảnh</b></div>
      <h3>{quiz.prompt}</h3>
      <div className="quiz-options detailed">{quiz.options.map((option, index) => <button key={option.hanzi} className={selected === null ? "" : index === quiz.answer ? "correct" : selected === index ? "wrong" : "muted"} onClick={() => selectAnswer(index)}>
        <span>{String.fromCharCode(65 + index)}</span>
        <div><b className="hanzi-font">{option.hanzi}</b>{showPinyin && <i className="pinyin-text">{option.pinyin}</i>}{showMeaning && <em className="meaning-text">{option.meaning}</em>}</div>
      </button>)}</div>
      {selected !== null && <div className={selected === quiz.answer ? "feedback good" : "feedback"}><b>{selected === quiz.answer ? "Đúng rồi!" : "Chưa đúng."}</b><p>{quiz.feedback}</p><button onClick={nextQuiz}>Câu tiếp theo →</button></div>}
    </section>

    <div className="practice-grid">
      <section className="order-card panel">
        <span className="panel-kicker">2 · XẾP CÂU</span>
        <h3>{orderTask.translation}</h3>
        {showPinyin && <p className="pinyin-text">{orderTask.pinyin}</p>}
        <div className="answer-zone">{order.length ? order.map((token, index) => <button key={`${token}-${index}`} onClick={() => setOrder(order.filter((_, itemIndex) => itemIndex !== index))}>{token}</button>) : <span>Chạm các mảnh theo đúng thứ tự…</span>}</div>
        <div className="token-bank">{orderTask.tokens.filter((token) => !order.includes(token)).map((token) => <button key={token} onClick={() => setOrder([...order, token])}>{token}</button>)}</div>
        {order.length === orderTask.tokens.length && <div className={orderCorrect ? "mini-result correct" : "mini-result wrong"}>{orderCorrect ? `✓ ${orderTask.answer}` : "Thứ tự chưa đúng. Hãy xác định chủ ngữ và khung cấu trúc trước."}</div>}
        <button className="text-button" onClick={() => setOrder([])}>Làm lại</button>
      </section>

      <section className="dictation-card panel">
        <span className="panel-kicker">3 · NGHE VÀ GÕ LẠI</span>
        <h3>Nghe câu rồi gõ chữ Hán hoặc pinyin</h3>
        <SpeakButton text={dictationTask.hanzi} speak={speak} label="Nghe câu" />
        <label><span>Câu bạn nghe được</span><textarea value={dictation} onChange={(event) => { setDictation(event.target.value); setDictationChecked(false); }} placeholder="Gõ chữ Hán hoặc pinyin…" /></label>
        <button className="primary" onClick={() => {
          setDictationChecked(true);
          if (!dictationCorrect) recordMistake({ lessonId: lesson, exerciseId: `lesson-${lesson}-dictation`, prompt: "Nghe và gõ lại câu", learnerAnswer: dictation, expectedAnswer: dictationTask.hanzi, feedback: `Đáp án: ${dictationTask.hanzi} · ${dictationTask.pinyin}` });
        }} disabled={!dictation.trim()}>Kiểm tra</button>
        {dictationChecked && <div className={dictationCorrect ? "mini-result correct" : "mini-result wrong"}>
          <b>{dictationCorrect ? "✓ Nghe đúng rồi." : "Chưa khớp; nghe lại và chú ý từ chỉ hướng/khả năng."}</b>
          {!dictationCorrect && <LearningText item={dictationTask} showPinyin showMeaning speak={speak} compact />}
        </div>}
      </section>
    </div>

    <section className="translation-card panel">
      <div>
        <span className="panel-kicker">4 · DỊCH VIỆT → TRUNG</span>
        <h2>{translationTask.meaning}</h2>
        <p><b>Gợi ý cấu trúc:</b> <span className="hanzi-font">{translationTask.hint}</span></p>
      </div>
      <div>
        <button className="reveal-answer" onClick={() => setShowTranslation(!showTranslation)}>{showTranslation ? "Ẩn đáp án" : "Tự nói trước, rồi xem đáp án"}</button>
        {showTranslation && <LearningText item={translationTask} showPinyin={showPinyin} showMeaning={showMeaning} speak={speak} />}
      </div>
    </section>

    <RoleplayMission lesson={lesson} />
  </div>;
}

function RoleplayMission({ lesson }: { lesson: AvailableLessonId }) {
  const [done, setDone] = useState(false);
  const content = lesson === 23
    ? { title: "Bạn lạc ở cổng nam", prompt: "Hỏi một người qua đường: bảo tàng ở đâu, cách đây bao xa, đi thế nào; sau đó nói lại lộ trình để xác nhận.", frames: ["劳驾，我打听一下儿……", "……离这儿有多远？", "怎么走？", "我确认一下：……对吗？"] }
    : lesson === 24
      ? { title: "Bạn bị sốt trước giờ học", prompt: "Gọi cho bạn học: mô tả hai triệu chứng, nói vì sao không thể đến lớp và nhờ bạn xin nghỉ giúp.", frames: ["我今天有点儿……", "我……，还……", "所以我不能……", "你能不能帮我……？"] }
      : { title: "Phản hồi cho một bạn học", prompt: "Nhận xét một kỹ năng của bạn học: khen hai điểm cụ thể, hỏi bạn ấy tự đánh giá thế nào và đề xuất một bước luyện tiếp theo.", frames: ["你……得很……", "我觉得你的……", "你觉得……怎么样？", "接下来可以……"] };
  return <section className="roleplay-mission panel">
    <div><span className="panel-kicker">NHIỆM VỤ NÓI 60 GIÂY</span><h2>{content.title}</h2><p>{content.prompt}</p></div>
    <div className="roleplay-frames">{content.frames.map((frame) => <span className="hanzi-font" key={frame}>{frame}</span>)}</div>
    <button className={done ? "complete-button completed" : "complete-button"} onClick={() => setDone(!done)}>{done ? "✓ Đã nói đủ 60 giây" : "Tôi đã sẵn sàng nói"}</button>
  </section>;
}
