import type { CourseDefinition, LessonCatalogEntry } from "./schema";

const lesson = (
  id: LessonCatalogEntry["id"],
  status: LessonCatalogEntry["status"],
  theme: string,
  cluster: LessonCatalogEntry["cluster"],
  sourceNote: string,
  title?: LessonCatalogEntry["title"],
): LessonCatalogEntry => ({ id, status, theme, cluster, sourceNote, title });

export const course: CourseDefinition = {
  id: "cb2-lessons-16-30",
  title: "Lộ trình tiếng Trung CB2",
  description: "Một hành trình liên tục từ bài 16 đến bài 30: học mới, nối kiến thức cũ, ôn đúng lúc và dùng trong tình huống thật.",
  lessons: [
    lesson(16, "draft", "Nền tảng bài 16", "16-20", "Có slide và dữ liệu ôn tập 16–20; đang chuẩn hóa thành module."),
    lesson(17, "draft", "Nền tảng bài 17", "16-20", "Có slide và dữ liệu ôn tập 16–20; đang chuẩn hóa thành module."),
    lesson(18, "draft", "Nền tảng bài 18", "16-20", "Có slide và dữ liệu ôn tập 16–20; đang chuẩn hóa thành module."),
    lesson(19, "draft", "Nền tảng bài 19", "16-20", "Có slide và dữ liệu ôn tập 16–20; đang chuẩn hóa thành module."),
    lesson(20, "draft", "Tổng hợp bài 16–20", "16-20", "Có slide và app ôn tập tích lũy; sẽ tạo checkpoint sau bài 20."),
    lesson(21, "draft", "Thời gian và lịch trình", "21-24", "Có slide và app tương tác bài 21; đang chuẩn hóa thành module.", {
      hanzi: "一天的安排",
      pinyin: "Yì tiān de ānpái",
      meaning: "Sắp xếp một ngày",
    }),
    lesson(22, "draft", "Kế hoạch học Kinh kịch", "21-24", "Có slide và app tương tác bài 22; đang chuẩn hóa thành module.", {
      hanzi: "我打算请老师教京剧",
      pinyin: "Wǒ dǎsuàn qǐng lǎoshī jiāo jīngjù",
      meaning: "Tôi dự định nhờ giáo viên dạy Kinh kịch",
    }),
    lesson(23, "available", "Địa điểm và chỉ đường", "21-24", "Đã chuyển vào module dùng chung.", {
      hanzi: "学校里边儿有邮局吗？",
      pinyin: "Xuéxiào lǐbianr yǒu yóujú ma?",
      meaning: "Trong trường có bưu điện không?",
    }),
    lesson(24, "available", "Khả năng, mong muốn và xin phép", "21-24", "Đã chuyển vào module dùng chung.", {
      hanzi: "我想学太极拳",
      pinyin: "Wǒ xiǎng xué tàijíquán",
      meaning: "Tôi muốn học Thái Cực Quyền",
    }),
    lesson(25, "planned", "Bài 25", "25-27", "Sẽ bổ sung khi có nguồn bài giảng."),
    lesson(26, "planned", "Bài 26", "25-27", "Sẽ bổ sung khi có nguồn bài giảng."),
    lesson(27, "planned", "Bài 27", "25-27", "Sẽ bổ sung khi có nguồn bài giảng."),
    lesson(28, "planned", "Bài 28", "28-30", "Sẽ bổ sung khi có nguồn bài giảng."),
    lesson(29, "planned", "Bài 29", "28-30", "Sẽ bổ sung khi có nguồn bài giảng."),
    lesson(30, "planned", "Bài 30", "28-30", "Bài kết thúc khóa; sẽ bổ sung khi có nguồn bài giảng."),
  ],
  checkpoints: [
    { id: "checkpoint-20", afterLesson: 20, label: "Checkpoint bài 16–20", lessonRange: [16, 17, 18, 19, 20], status: "draft" },
    { id: "checkpoint-24", afterLesson: 24, label: "Checkpoint bài 16–24", lessonRange: [16, 17, 18, 19, 20, 21, 22, 23, 24], status: "draft" },
    { id: "checkpoint-27", afterLesson: 27, label: "Checkpoint bài 25–27", lessonRange: [25, 26, 27], status: "planned" },
    { id: "checkpoint-30", afterLesson: 30, label: "Tổng kết bài 16–30", lessonRange: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], status: "planned" },
  ],
};

export const availableLessonIds = course.lessons
  .filter((item) => item.status === "available")
  .map((item) => item.id);

