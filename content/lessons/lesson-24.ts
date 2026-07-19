import { createLessonModule, knowledgeId } from "./create-module";

export const lesson24 = createLessonModule({
  id: 24,
  theme: "Khả năng, mong muốn, xin phép và nhờ giúp",
  summary: "Phân biệt điều mình biết làm, có điều kiện làm, được phép làm và mong muốn làm.",
  estimatedMinutes: 75,
  tags: ["khả năng", "mong muốn", "xin phép", "sức khỏe"],
  sources: [
    "../Slide bài giảng/CB2/Slides-bài-giảng-bài-24.pdf",
    "../Giáo trình Hán ngữ quyển 2.pdf",
    "../Tài liệu Claude/Bai-24_Noi-dung-mo-rong-ngoai-slide.docx",
    "PWA bài 23–24 hiện có",
  ],
  prerequisites: [
    knowledgeId("vocabulary-21-shijian"),
    knowledgeId("grammar-22-dasuan"),
  ],
  reinforces: [
    knowledgeId("vocabulary-21-shijian"),
    knowledgeId("grammar-22-dasuan"),
  ],
  preparesFor: [knowledgeId("grammar-25-request-help")],
  memory: {
    hanzi: "会 = kỹ năng · 能 = điều kiện · 可以 = cho phép · 想 = mong muốn",
    pinyin: "huì · néng · kěyǐ · xiǎng",
    meaning: "Bốn chữ không cùng nghĩa ‘có thể’: hãy gắn mỗi chữ với một câu hỏi thực tế khác nhau.",
  },
  visual: "ability",
});

export default lesson24;

