"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type AudioController = {
  voices: SpeechSynthesisVoice[];
  voiceName: string;
  setVoiceName: (name: string) => void;
  rate: number;
  setRate: (rate: number) => void;
  status: string;
  speak: (text: string, delay?: number) => void;
  activate: () => void;
};

const AUDIO_KEY = "cb2-audio-settings";

function preferredVoice(voices: SpeechSynthesisVoice[]) {
  return voices.find((voice) => /xiaoxiao|晓晓/i.test(voice.name))
    || voices.find((voice) => /zh[-_]?CN/i.test(`${voice.lang} ${voice.name}`))
    || voices.find((voice) => /^zh/i.test(voice.lang))
    || voices[0];
}

export function useLessonAudio(): AudioController {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceNameState] = useState("");
  const [rate, setRateState] = useState(0.8);
  const [status, setStatus] = useState("Bấm “Nghe thử” để kích hoạt âm thanh.");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    const restoreTimer = window.setTimeout(() => {
      const saved = localStorage.getItem(AUDIO_KEY);
      if (!saved) return;
      try {
        const parsed = JSON.parse(saved) as { voiceName?: string; rate?: number };
        if (parsed.voiceName) setVoiceNameState(parsed.voiceName);
        if (parsed.rate) setRateState(parsed.rate);
      } catch {
        localStorage.removeItem(AUDIO_KEY);
      }
    }, 0);

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      const chinese = available.filter((voice) => /^zh/i.test(voice.lang) || /chinese|xiaoxiao|晓晓/i.test(voice.name));
      const next = chinese.length ? chinese : available;
      setVoices(next);
      setVoiceNameState((current) => current || preferredVoice(next)?.name || "");
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.clearTimeout(restoreTimer);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      window.speechSynthesis.cancel();
    };
  }, []);

  const setVoiceName = useCallback((name: string) => {
    setVoiceNameState(name);
    localStorage.setItem(AUDIO_KEY, JSON.stringify({ voiceName: name, rate }));
  }, [rate]);

  const setRate = useCallback((nextRate: number) => {
    setRateState(nextRate);
    localStorage.setItem(AUDIO_KEY, JSON.stringify({ voiceName, rate: nextRate }));
  }, [voiceName]);

  const voice = useMemo(
    () => voices.find((item) => item.name === voiceName) || preferredVoice(voices),
    [voiceName, voices],
  );

  const speak = useCallback((text: string, delay = 700) => {
    if (!("speechSynthesis" in window)) {
      setStatus("Trình duyệt này không hỗ trợ đọc văn bản.");
      return;
    }
    window.speechSynthesis.cancel();
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    setStatus("Đang chuẩn bị giọng đọc…");
    timerRef.current = window.setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = rate;
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setStatus(`Đang đọc bằng ${voice?.name || "giọng mặc định"}.`);
      utterance.onend = () => setStatus("Sẵn sàng. Bạn có thể nghe lại bất cứ lúc nào.");
      utterance.onerror = () => setStatus("Không phát được âm thanh. Hãy bấm “Nghe thử” rồi thử lại.");
      window.speechSynthesis.speak(utterance);
    }, delay);
  }, [rate, voice]);

  const activate = useCallback(() => speak("你好，欢迎学习中文。", 0), [speak]);

  return { voices, voiceName, setVoiceName, rate, setRate, status, speak, activate };
}
