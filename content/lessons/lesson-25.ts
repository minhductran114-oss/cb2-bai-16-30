import { createLessonModule, knowledgeId } from "./create-module";

export const lesson25 = createLessonModule({
  id: 25,
  theme: "Đánh giá cách hành động diễn ra, lời khen và tiến bộ",
  summary: "Dùng 得 để nói một người làm tốt đến đâu, xin nhận xét, đáp lời khen và xây kế hoạch cải thiện có thể thực hiện.",
  estimatedMinutes: 95,
  tags: ["bổ ngữ trạng thái", "đánh giá", "lời khen", "tiến bộ", "thói quen học"],
  sources: [
    "../Slide bài giảng/CB2/Slides-bài-giảng-bài-25.pdf",
    "../Giáo trình Hán ngữ quyển 2.pdf",
    "../lesson25_tieng-trung_interactive_xiaoxiao_kaiti_v1.html",
    "Ví dụ, hội thoại và hướng dẫn thực hành tự biên soạn cho pilot liên bài 23–25",
  ],
  prerequisites: [
    knowledgeId("grammar-24-01"),
    knowledgeId("grammar-24-02"),
    knowledgeId("vocabulary-24-01"),
  ],
  reinforces: [
    knowledgeId("grammar-24-01"),
    knowledgeId("grammar-24-02"),
    knowledgeId("vocabulary-24-01"),
    knowledgeId("vocabulary-24-03"),
  ],
  preparesFor: [knowledgeId("grammar-25-01"), knowledgeId("grammar-25-02")],
  memory: {
    hanzi: "会说 = biết nói · 说得好 = nói tốt",
    pinyin: "huì shuō · shuō de hǎo",
    meaning: "Từ đứng trước động từ nói khả năng hoặc ý muốn; 得 đứng sau động từ để mở chiếc thước đo chất lượng hành động.",
  },
  visual: "progress",
});

export default lesson25;
