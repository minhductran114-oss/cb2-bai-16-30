"use client";

import { useEffect, useRef, useState } from "react";
import type { WritingCharacter } from "../lesson-types";
import type { AudioController } from "../use-lesson-audio";
import { SpeakButton } from "./learning-ui";
import { StrokePlayer } from "./stroke-player";

export function WritingView({ chars, speak }: { chars: WritingCharacter[]; speak: AudioController["speak"] }) {
  const [charIndex, setCharIndex] = useState(0);
  const [guide, setGuide] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const selected = chars[charIndex] || chars[0];

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = Math.min(canvas.parentElement?.clientWidth || 480, 520);
    const ratio = window.devicePixelRatio || 1;
    canvas.width = size * ratio;
    canvas.height = size * ratio;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#183c39";
    context.lineWidth = Math.max(5, size / 58);
  };

  useEffect(() => {
    prepareCanvas();
    const resize = () => prepareCanvas();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [charIndex]);

  const position = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const down = (event: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = position(event);
    const context = event.currentTarget.getContext("2d");
    context?.beginPath();
    context?.moveTo(point.x, point.y);
  };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const point = position(event);
    const context = event.currentTarget.getContext("2d");
    context?.lineTo(point.x, point.y);
    context?.stroke();
  };
  const up = () => { drawing.current = false; };
  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    context?.save();
    context?.setTransform(1, 0, 0, 1, 0, 0);
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.restore();
  };

  return <div className="writing-layout">
    <aside className="character-picker panel">
      <span className="panel-kicker">CHỮ TRỌNG TÂM</span>
      <h2>Chọn một chữ</h2>
      <div className="char-grid">{chars.map((item, index) => <button key={item.hanzi} className={charIndex === index ? "active" : ""} onClick={() => { setCharIndex(index); setGuide(true); clear(); }}><span className="hanzi-font">{item.hanzi}</span><small>{item.pinyin}</small></button>)}</div>
      <div className="writing-method"><b>Phương pháp 4 lượt</b><ol><li>Xem thứ tự nét và viết trong không khí</li><li>Tô theo chữ mờ trong ô 米字格</li><li>Tắt mẫu và viết từ trí nhớ</li><li>Đọc âm, nghĩa và dùng chữ trong từ</li></ol></div>
    </aside>
    <section className="writing-studio panel">
      <div className="writing-head">
        <div><span>Đang luyện</span><h2 className="hanzi-font">{selected.hanzi} <small>{selected.pinyin} · {selected.meaning}</small></h2></div>
        <SpeakButton text={selected.hanzi} speak={speak} label="Nghe âm" />
      </div>
      <div className="writing-workbench">
        <div className="stroke-demo"><StrokePlayer key={selected.hanzi} chars={[selected.hanzi]} /><p><b>Thứ tự:</b> {selected.structure}</p></div>
        <div>
          <div className="canvas-wrap"><div className="rice-grid" />{guide && <span className="guide-char hanzi-font">{selected.hanzi}</span>}<canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up} aria-label={`Bảng luyện viết chữ ${selected.hanzi}`} /></div>
          <div className="canvas-tools"><button onClick={() => setGuide(!guide)}>{guide ? "Ẩn chữ mẫu" : "Hiện chữ mẫu"}</button><button onClick={clear}>Xóa và viết lại</button><button className="primary" onClick={() => { clear(); setCharIndex((value) => (value + 1) % chars.length); }}>Chữ tiếp theo →</button></div>
        </div>
      </div>
      <div className="writing-cue"><b>Mẹo gọi lại hình:</b><span>{selected.cue} Đọc to “{selected.hanzi} — {selected.pinyin} — {selected.meaning}”, tắt mẫu rồi viết lại.</span></div>
    </section>
  </div>;
}
