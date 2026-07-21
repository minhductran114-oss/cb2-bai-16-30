"use client";

import type { LessonModule } from "../../content/schema";
import type { SectionId } from "../lesson-types";
import type { AudioController } from "../use-lesson-audio";
import { AudioSettings, SpeakButton } from "./learning-ui";

export function Overview({
  lesson,
  showPinyin,
  showMeaning,
  go,
  audio,
}: {
  lesson: LessonModule;
  showPinyin: boolean;
  showMeaning: boolean;
  go: (section: SectionId) => void;
  audio: AudioController;
}) {
  const meta = lesson.title;
  const memory = lesson.memory;

  return <div className="content-stack">
    <section className="hero-grid">
      <div className="can-do panel">
        <span className="panel-kicker">HỌC XONG, BẠN CÓ THỂ</span>
        <h2>Dùng ngay trong một tình huống thật</h2>
        <ul>{meta.canDo.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
        <button className="primary" onClick={() => go("dialogue")}>Bắt đầu bằng hội thoại <span>→</span></button>
      </div>
      <div className={`visual-panel visual-${lesson.id}`}>
        {lesson.visual === "map" ? <MiniMap /> : lesson.visual === "ability" ? <AbilityWheel /> : <ProgressPath />}
      </div>
    </section>

    <section className="memory-strip">
      <div className="memory-symbol hanzi-font">记</div>
      <div>
        <span>MÓC GHI NHỚ</span>
        <h3 className="hanzi-font">{memory.hanzi}</h3>
        {showPinyin && <p className="pinyin-text">{memory.pinyin}</p>}
        {showMeaning && <p>{memory.meaning}</p>}
      </div>
      <SpeakButton text={memory.hanzi.replace(/=.*?(·|$)/g, " ")} speak={audio.speak} />
    </section>

    <AudioSettings audio={audio} />

    <section className="route-grid" aria-label="Lộ trình học đề xuất">
      <button onClick={() => go("dialogue")}><span>01</span><strong>Nghe tình huống</strong><small>Hội thoại mới, vai nói rõ ràng</small></button>
      <button onClick={() => go("vocab")}><span>02</span><strong>Nhớ bằng hình</strong><small>Cấu tạo, mẹo nhớ, cụm từ</small></button>
      <button onClick={() => go("grammar")}><span>03</span><strong>So sánh cấu trúc</strong><small>Đúng – sai theo ngữ cảnh</small></button>
      <button onClick={() => go("extension")}><span>04</span><strong>Kết nối & mở rộng</strong><small>Dùng thật, nối bài cũ</small></button>
      <button onClick={() => go("practice")}><span>05</span><strong>Tự tạo câu</strong><small>Nghe, xếp, gõ và dịch</small></button>
    </section>
  </div>;
}

function MiniMap() {
  return <div className="mini-map" role="img" aria-label="Bản đồ: bưu điện ở phía tây thư viện; bảo tàng nằm giữa công viên và quảng trường">
    <div className="compass hanzi-font"><b>北<small>běi · bắc</small></b><span>西　✦　东<small>xī · tây　/　dōng · đông</small></span><b>南<small>nán · nam</small></b></div>
    <div className="map-place park"><span aria-hidden="true">♧</span><b>和平公园</b><small>Hépíng Gōngyuán · Công viên</small></div>
    <div className="map-road horizontal" /><div className="map-road vertical" />
    <div className="map-place museum"><span aria-hidden="true">馆</span><b>博物馆</b><small>Bówùguǎn · Bảo tàng</small></div>
    <div className="map-place square"><span aria-hidden="true">▦</span><b>人民广场</b><small>Rénmín Guǎngchǎng · Quảng trường</small></div>
    <div className="route-arrow"><b>一直往东走</b><small>đi thẳng về đông</small><span>→</span><b>往左拐</b><small>rẽ trái</small></div>
  </div>;
}

function AbilityWheel() {
  return <div className="ability-wheel" role="img" aria-label="Sơ đồ phân biệt Hội là kỹ năng, Năng là điều kiện, Khả dĩ là cho phép và Tưởng là mong muốn">
    <div className="wheel-center"><b>我</b><small>wǒ · tôi</small></div>
    <div className="wheel-node skill"><b>会</b><span>huì</span><small>kỹ năng đã học</small></div>
    <div className="wheel-node condition"><b>能</b><span>néng</span><small>đủ điều kiện</small></div>
    <div className="wheel-node permit"><b>可以</b><span>kěyǐ</span><small>được cho phép</small></div>
    <div className="wheel-node desire"><b>想</b><span>xiǎng</span><small>mong muốn</small></div>
    <div className="tai-chi" aria-hidden="true">◐</div>
  </div>;
}

function ProgressPath() {
  return <div className="progress-path" role="img" aria-label="Sơ đồ từ hành động qua 得 đến phần đánh giá mức độ">
    <div className="progress-node action"><span>1</span><b className="hanzi-font">说</b><small>shuō · nói</small></div>
    <i>→</i>
    <div className="progress-node measure"><span>2</span><b className="hanzi-font">得</b><small>de · trạm đo</small></div>
    <i>→</i>
    <div className="progress-node quality"><span>3</span><b className="hanzi-font">很流利</b><small>hěn liúlì · rất lưu loát</small></div>
    <div className="progress-caption"><b>会说</b><span>biết nói</span><strong>≠</strong><b>说得好</b><span>nói tốt</span></div>
  </div>;
}
