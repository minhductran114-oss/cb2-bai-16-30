"use client";

import { useEffect, useRef, useState } from "react";

type WriterInstance = { animateCharacter: () => Promise<unknown> };

export function StrokePlayer({ chars, compact = false }: { chars: string[]; compact?: boolean }) {
  const [active, setActive] = useState(chars[0] || "");
  const [status, setStatus] = useState("Đang tải mô phỏng nét…");
  const boxRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<WriterInstance | null>(null);

  useEffect(() => {
    let cancelled = false;
    const renderWriter = async () => {
      const box = boxRef.current;
      if (!box || !active) return;
      box.replaceChildren();
      setStatus("Đang tải mô phỏng nét…");
      try {
        const writerPackage = await import("hanzi-writer");
        if (cancelled) return;
        writerRef.current = writerPackage.default.create(box, active, {
          width: compact ? 132 : 220,
          height: compact ? 132 : 220,
          padding: 10,
          showOutline: true,
          showCharacter: false,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 240,
          radicalColor: "#a43f2d",
        });
        setStatus("Bấm “Phát nét” để xem thứ tự viết.");
      } catch {
        const fallback = document.createElement("span");
        fallback.className = "stroke-fallback hanzi-font";
        fallback.textContent = active;
        box.appendChild(fallback);
        setStatus("Không tải được mô phỏng; hãy dùng chữ mẫu để luyện.");
      }
    };
    void renderWriter();
    return () => { cancelled = true; };
  }, [active, compact]);

  const play = async () => {
    if (!writerRef.current) return;
    setStatus(`Đang phát nét chữ ${active}…`);
    await writerRef.current.animateCharacter();
    setStatus("Đã phát xong. Hãy viết lại bằng tay.");
  };

  return <div className={compact ? "stroke-player compact" : "stroke-player"}>
    <div className="stroke-box" ref={boxRef} aria-label={`Mô phỏng thứ tự nét chữ ${active}`} />
    <div className="stroke-controls">
      <div className="stroke-chips" role="group" aria-label="Chọn chữ xem thứ tự nét">
        {chars.map((char) => <button key={char} className={active === char ? "active" : ""} onClick={() => setActive(char)}>{char}</button>)}
      </div>
      <button className="primary small" onClick={() => void play()}>✍ Phát nét</button>
      <small>{status}</small>
    </div>
  </div>;
}
