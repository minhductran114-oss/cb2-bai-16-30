import { createLessonModule, knowledgeId } from "./create-module";

export const lesson23 = createLessonModule({
  id: 23,
  theme: "Địa điểm, khoảng cách và chỉ đường",
  summary: "Hỏi một địa điểm có gì, cách bao xa và nghe hoặc xác nhận lộ trình từng bước.",
  estimatedMinutes: 70,
  tags: ["địa điểm", "chỉ đường", "phương vị", "khoảng cách"],
  sources: [
    "../Slide bài giảng/CB2/Slides-bài-giảng-bài-23.pdf",
    "../Giáo trình Hán ngữ quyển 2.pdf",
    "PWA bài 23–24 hiện có",
  ],
  prerequisites: [
    knowledgeId("vocabulary-18-youju"),
    knowledgeId("grammar-20-you-haishi"),
  ],
  reinforces: [
    knowledgeId("vocabulary-18-youju"),
    knowledgeId("grammar-20-you-haishi"),
  ],
  preparesFor: [knowledgeId("grammar-24-neng-bu-neng")],
  memory: {
    hanzi: "在 = ở · 有 = có · 是 = là",
    pinyin: "zài · yǒu · shì",
    meaning: "Muốn nói vật ở đâu → 在. Muốn giới thiệu nơi đó có gì → 有. Muốn xác định thứ ở đó là gì → 是.",
  },
  visual: "map",
});

export default lesson23;

