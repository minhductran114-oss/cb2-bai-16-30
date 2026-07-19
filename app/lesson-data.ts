import type {
  Dialogue,
  GrammarPoint,
  LessonId,
  Quiz,
  SectionId,
  Triplet,
  VocabEntry,
  WritingCharacter,
} from "./lesson-types";

export const sections: Array<{ id: SectionId; label: string; icon: string }> = [
  { id: "overview", label: "Tổng quan", icon: "◎" },
  { id: "dialogue", label: "Hội thoại", icon: "话" },
  { id: "vocab", label: "Từ vựng", icon: "字" },
  { id: "grammar", label: "Ngữ pháp", icon: "法" },
  { id: "practice", label: "Luyện tập", icon: "练" },
  { id: "writing", label: "Viết chữ", icon: "写" },
];

export const lessonMeta: Record<LessonId, Triplet & { canDo: string[] }> = {
  23: {
    hanzi: "学校里边儿有邮局吗？",
    pinyin: "Xuéxiào lǐbiānr yǒu yóujú ma?",
    meaning: "Trong trường có bưu điện không?",
    canDo: [
      "Mô tả vị trí bằng phương vị từ",
      "Hỏi và nói khoảng cách",
      "Hỏi đường, nghe mốc và chỉ đường từng bước",
      "Phân biệt 在 / 有 / 是 trong câu vị trí",
    ],
  },
  24: {
    hanzi: "我想学太极拳",
    pinyin: "Wǒ xiǎng xué tàijíquán",
    meaning: "Tôi muốn học Thái Cực Quyền",
    canDo: [
      "Nói điều mình biết, có thể và muốn làm",
      "Xin phép và nhờ người khác nhắc lại",
      "Hỏi lịch học từ mấy giờ đến mấy giờ",
      "Mô tả triệu chứng và xin phép nghỉ",
    ],
  },
};

export const focusVocabulary: Record<LessonId, VocabEntry[]> = {
  23: [
    {
      hanzi: "边儿",
      pinyin: "biānr",
      meaning: "bên, phía",
      type: "Danh từ phương vị",
      group: "Vị trí",
      structure: "边 (biān) có bộ 辶 (chuò, bước đi) ôm phần 力 (lì); 儿 (r) ghi âm uốn lưỡi miền Bắc.",
      memory: "Hãy hình dung một bước chân 辶 (chuò) men theo mép đường rồi dừng ở rìa. Cảnh bước sát mép ấy gọi lại 边儿 (biānr): bên, phía.",
      compounds: [
        { hanzi: "东边儿", pinyin: "dōngbiānr", meaning: "phía đông" },
        { hanzi: "旁边儿", pinyin: "pángbiānr", meaning: "bên cạnh" },
      ],
      examples: [
        { hanzi: "邮局在图书馆西边儿。", pinyin: "Yóujú zài túshūguǎn xībiānr.", meaning: "Bưu điện ở phía tây thư viện." },
        { hanzi: "我在门口旁边儿等你。", pinyin: "Wǒ zài ménkǒu pángbiānr děng nǐ.", meaning: "Tôi đợi bạn bên cạnh cửa ra vào." },
      ],
      strokeChars: ["边"],
    },
    {
      hanzi: "离",
      pinyin: "lí",
      meaning: "cách, rời khỏi",
      type: "Giới từ / động từ",
      group: "Khoảng cách",
      structure: "Viết từ trên xuống dưới; phần trên che phần giữa, phần dưới giữ bố cục cân bằng.",
      memory: "Một chú chim đội lưới bay khỏi cành, khoảng trống giữa chim và cây cứ xa dần. Khoảng trống ấy giúp nhớ 离 (lí): cách hoặc rời khỏi.",
      compounds: [
        { hanzi: "距离", pinyin: "jùlí", meaning: "khoảng cách" },
        { hanzi: "离开", pinyin: "líkāi", meaning: "rời khỏi" },
      ],
      examples: [
        { hanzi: "宿舍离教室远吗？", pinyin: "Sùshè lí jiàoshì yuǎn ma?", meaning: "Ký túc xá cách lớp học xa không?" },
        { hanzi: "这里离地铁站很近。", pinyin: "Zhèlǐ lí dìtiězhàn hěn jìn.", meaning: "Đây cách ga tàu điện rất gần." },
      ],
      strokeChars: ["离"],
    },
    {
      hanzi: "远 / 近",
      pinyin: "yuǎn / jìn",
      meaning: "xa / gần",
      type: "Tính từ",
      group: "Khoảng cách",
      structure: "Cả hai chữ đều có bộ 辶 (chuò, con đường) ở bên trái/dưới; viết phần chính trước, bộ sước sau.",
      memory: "Trên con đường 辶 (chuò), đồng tiền 元 (yuán) lăn mãi thành 远 (yuǎn), còn chiếc rìu 斤 (jīn) vừa hạ xuống ngay cạnh chân thành 近 (jìn). Một vật đi mãi là xa; một vật ngay cạnh là gần.",
      compounds: [
        { hanzi: "远方", pinyin: "yuǎnfāng", meaning: "phương xa" },
        { hanzi: "附近", pinyin: "fùjìn", meaning: "gần đây, lân cận" },
      ],
      examples: [
        { hanzi: "不远，走路五分钟。", pinyin: "Bù yuǎn, zǒulù wǔ fēnzhōng.", meaning: "Không xa, đi bộ năm phút." },
        { hanzi: "附近有便利店吗？", pinyin: "Fùjìn yǒu biànlìdiàn ma?", meaning: "Gần đây có cửa hàng tiện lợi không?" },
      ],
      strokeChars: ["远", "近"],
    },
    {
      hanzi: "打听",
      pinyin: "dǎting",
      meaning: "hỏi thăm, dò hỏi",
      type: "Động từ",
      group: "Hỏi đường",
      structure: "打 (dǎ) có bộ tay 扌 (shǒu); 听 (tīng) có bộ miệng 口 (kǒu).",
      memory: "Bàn tay 扌 (shǒu) khẽ gõ cửa, rồi chiếc miệng 口 (kǒu) cất lời hỏi người bên trong. Gõ rồi hỏi là cảnh của 打听 (dǎting): hỏi thăm.",
      compounds: [
        { hanzi: "打听一下儿", pinyin: "dǎting yíxiàr", meaning: "hỏi thăm một chút" },
        { hanzi: "到处打听", pinyin: "dàochù dǎting", meaning: "hỏi thăm khắp nơi" },
      ],
      examples: [
        { hanzi: "劳驾，我打听一下儿。", pinyin: "Láojià, wǒ dǎting yíxiàr.", meaning: "Cảm phiền, cho tôi hỏi thăm một chút." },
        { hanzi: "我想打听一下儿邮局在哪儿。", pinyin: "Wǒ xiǎng dǎting yíxiàr yóujú zài nǎr.", meaning: "Tôi muốn hỏi thăm bưu điện ở đâu." },
      ],
      strokeChars: ["打", "听"],
    },
    {
      hanzi: "博物馆",
      pinyin: "bówùguǎn",
      meaning: "bảo tàng",
      type: "Danh từ",
      group: "Địa điểm",
      structure: "博 (bó), 物 (wù) và 馆 (guǎn) ghép thành tên nơi trưng bày nhiều hiện vật.",
      memory: "Một người gom thật nhiều 博 (bó) đồ vật 物 (wù), mang vào tòa nhà có mái 馆 (guǎn) để mọi người cùng xem. Tòa nhà đầy hiện vật ấy là 博物馆 (bówùguǎn), bảo tàng.",
      compounds: [
        { hanzi: "历史博物馆", pinyin: "lìshǐ bówùguǎn", meaning: "bảo tàng lịch sử" },
        { hanzi: "参观博物馆", pinyin: "cānguān bówùguǎn", meaning: "tham quan bảo tàng" },
      ],
      examples: [
        { hanzi: "周末我们去参观博物馆吧。", pinyin: "Zhōumò wǒmen qù cānguān bówùguǎn ba.", meaning: "Cuối tuần chúng ta đi tham quan bảo tàng nhé." },
        { hanzi: "博物馆在公园和广场中间。", pinyin: "Bówùguǎn zài gōngyuán hé guǎngchǎng zhōngjiān.", meaning: "Bảo tàng nằm giữa công viên và quảng trường." },
      ],
      strokeChars: ["博", "物", "馆"],
    },
    {
      hanzi: "从……到……",
      pinyin: "cóng… dào…",
      meaning: "từ… đến…",
      type: "Kết cấu giới từ",
      group: "Lộ trình",
      structure: "从 (cóng) đánh dấu điểm đầu; 到 (dào) đánh dấu điểm cuối.",
      memory: "Hai người 人 (rén) trong 从 (cóng) cùng bước khỏi vạch xuất phát, đi cho tới khi con dao 刂 (dāo) trong 到 (dào) cắt ngang vạch đích. Từ vạch đầu đến vạch cuối là 从……到…… (cóng… dào…).",
      compounds: [
        { hanzi: "从早到晚", pinyin: "cóng zǎo dào wǎn", meaning: "từ sáng đến tối" },
        { hanzi: "从这儿到那儿", pinyin: "cóng zhèr dào nàr", meaning: "từ đây đến đó" },
      ],
      examples: [
        { hanzi: "从学校到地铁站要十分钟。", pinyin: "Cóng xuéxiào dào dìtiězhàn yào shí fēnzhōng.", meaning: "Từ trường đến ga tàu điện mất mười phút." },
        { hanzi: "我从星期一到星期五都有课。", pinyin: "Wǒ cóng xīngqīyī dào xīngqīwǔ dōu yǒu kè.", meaning: "Tôi có lớp từ thứ Hai đến thứ Sáu." },
      ],
      strokeChars: ["从", "到"],
    },
    {
      hanzi: "一直",
      pinyin: "yìzhí",
      meaning: "thẳng, liên tục",
      type: "Phó từ",
      group: "Chỉ đường",
      structure: "一 (yī) là một nét ngang; 直 (zhí) dựng thẳng từ trên xuống dưới.",
      memory: "Một vạch 一 (yī) kéo không đứt, dẫn mắt chạy thẳng qua chữ 直 (zhí). Đường không đổi hướng ấy giúp nhớ 一直 (yìzhí): cứ thẳng, liên tục.",
      compounds: [
        { hanzi: "一直走", pinyin: "yìzhí zǒu", meaning: "cứ đi thẳng" },
        { hanzi: "一直等", pinyin: "yìzhí děng", meaning: "đợi mãi" },
      ],
      examples: [
        { hanzi: "你一直往前走。", pinyin: "Nǐ yìzhí wǎng qián zǒu.", meaning: "Bạn cứ đi thẳng về phía trước." },
        { hanzi: "我一直在门口等你。", pinyin: "Wǒ yìzhí zài ménkǒu děng nǐ.", meaning: "Tôi vẫn luôn đợi bạn ở cửa." },
      ],
      strokeChars: ["直"],
    },
    {
      hanzi: "红绿灯",
      pinyin: "hónglǜdēng",
      meaning: "đèn giao thông",
      type: "Danh từ",
      group: "Mốc đường",
      structure: "红 (hóng) và 绿 (lǜ) cùng có bộ tơ 纟 (sī); 灯 (dēng) có bộ lửa 火 (huǒ).",
      memory: "Hai sợi dây 纟 (sī) mang màu đỏ 红 (hóng) và xanh 绿 (lǜ) chạy vào ngọn lửa 火 (huǒ), làm chiếc đèn đổi màu. Cảnh đèn đỏ–xanh bật sáng chính là 红绿灯 (hónglǜdēng), đèn giao thông.",
      compounds: [
        { hanzi: "等红绿灯", pinyin: "děng hónglǜdēng", meaning: "đợi đèn giao thông" },
        { hanzi: "红绿灯路口", pinyin: "hónglǜdēng lùkǒu", meaning: "ngã tư có đèn giao thông" },
      ],
      examples: [
        { hanzi: "到红绿灯那儿往左拐。", pinyin: "Dào hónglǜdēng nàr wǎng zuǒ guǎi.", meaning: "Đến đèn giao thông thì rẽ trái." },
        { hanzi: "过了红绿灯就是银行。", pinyin: "Guò le hónglǜdēng jiù shì yínháng.", meaning: "Qua đèn giao thông là ngân hàng." },
      ],
      strokeChars: ["红", "绿", "灯"],
    },
    {
      hanzi: "往 / 拐",
      pinyin: "wǎng / guǎi",
      meaning: "về phía / rẽ",
      type: "Giới từ / động từ",
      group: "Chỉ đường",
      structure: "往 (wǎng) có bộ bước chân 彳 (chì); 拐 (guǎi) có bộ tay 扌 (shǒu).",
      memory: "Đôi chân 彳 (chì) bước về một hướng, bàn tay 扌 (shǒu) giơ lên ra hiệu ngoặt ở góc đường. Chân chỉ hướng là 往 (wǎng), tay báo ngoặt là 拐 (guǎi).",
      compounds: [
        { hanzi: "往前走", pinyin: "wǎng qián zǒu", meaning: "đi về phía trước" },
        { hanzi: "往右拐", pinyin: "wǎng yòu guǎi", meaning: "rẽ phải" },
      ],
      examples: [
        { hanzi: "请往前走，再往右拐。", pinyin: "Qǐng wǎng qián zǒu, zài wǎng yòu guǎi.", meaning: "Hãy đi về phía trước rồi rẽ phải." },
        { hanzi: "不要拐，一直走。", pinyin: "Bú yào guǎi, yìzhí zǒu.", meaning: "Đừng rẽ, cứ đi thẳng." },
      ],
      strokeChars: ["往", "拐"],
    },
  ],
  24: [
    {
      hanzi: "会",
      pinyin: "huì",
      meaning: "biết, có kỹ năng đã học",
      type: "Động từ năng nguyện",
      group: "Năng lực",
      structure: "Viết phần trên trước, phần 云 (yún) phía dưới sau; toàn chữ gọn theo trục giữa.",
      memory: "Một mái nhà gom những đám mây 云 (yún) lại thành buổi học; luyện đủ lâu, điều từng lạ trở thành kỹ năng. Buổi học trong mái nhà giúp nhớ 会 (huì): biết làm.",
      compounds: [
        { hanzi: "会说汉语", pinyin: "huì shuō Hànyǔ", meaning: "biết nói tiếng Trung" },
        { hanzi: "学会", pinyin: "xuéhuì", meaning: "học được, biết làm" },
      ],
      examples: [
        { hanzi: "你会打太极拳吗？", pinyin: "Nǐ huì dǎ tàijíquán ma?", meaning: "Bạn biết tập Thái Cực Quyền không?" },
        { hanzi: "我刚学会骑自行车。", pinyin: "Wǒ gāng xuéhuì qí zìxíngchē.", meaning: "Tôi vừa học được cách đi xe đạp." },
      ],
      strokeChars: ["会"],
    },
    {
      hanzi: "能",
      pinyin: "néng",
      meaning: "có thể, đủ điều kiện",
      type: "Động từ năng nguyện",
      group: "Năng lực",
      structure: "Chữ gồm phần 厶 (sī), 月 (yuè) và hai 匕 (bǐ); giữ bốn phần cân nhau.",
      memory: "Một người kiểm tra túi đồ, sức khỏe và thời gian; mọi điều kiện đều đủ nên cánh cửa mở ra. Khoảnh khắc đủ điều kiện ấy là 能 (néng): có thể.",
      compounds: [
        { hanzi: "能不能", pinyin: "néng bu néng", meaning: "có thể hay không" },
        { hanzi: "能力", pinyin: "nénglì", meaning: "năng lực" },
      ],
      examples: [
        { hanzi: "我今天不能来上课。", pinyin: "Wǒ jīntiān bù néng lái shàngkè.", meaning: "Hôm nay tôi không thể đến lớp." },
        { hanzi: "您能不能再说一遍？", pinyin: "Nín néng bu néng zài shuō yí biàn?", meaning: "Thầy/cô có thể nói lại một lượt không?" },
      ],
      strokeChars: ["能"],
    },
    {
      hanzi: "可以",
      pinyin: "kěyǐ",
      meaning: "có thể, được phép",
      type: "Động từ năng nguyện",
      group: "Xin phép",
      structure: "可 (kě) bao miệng 口 (kǒu); 以 (yǐ) có nét cong bên trái và phần người bên phải.",
      memory: "Chiếc miệng 口 (kǒu) hỏi xin, người đối diện gật đầu mở lối. Lời đồng ý mở lối ấy giúp nhớ 可以 (kěyǐ): được phép, có thể.",
      compounds: [
        { hanzi: "可以吗", pinyin: "kěyǐ ma", meaning: "có được không" },
        { hanzi: "不可以", pinyin: "bù kěyǐ", meaning: "không được phép" },
      ],
      examples: [
        { hanzi: "现在可以报名吗？", pinyin: "Xiànzài kěyǐ bàomíng ma?", meaning: "Bây giờ có thể đăng ký không?" },
        { hanzi: "这里可以拍照。", pinyin: "Zhèlǐ kěyǐ pāizhào.", meaning: "Ở đây được phép chụp ảnh." },
      ],
      strokeChars: ["可", "以"],
    },
    {
      hanzi: "想",
      pinyin: "xiǎng",
      meaning: "muốn; nghĩ",
      type: "Động từ năng nguyện",
      group: "Ý muốn",
      structure: "相 (xiāng) ở trên, 心 (xīn, trái tim) ở dưới; viết trên trước, dưới sau.",
      memory: "Mắt nhìn cây 木 (mù), rồi trái tim 心 (xīn) khẽ rung và kéo ý nghĩ về phía điều mình mong. Cây trong mắt, nhịp trong tim gợi 想 (xiǎng): nghĩ, muốn.",
      compounds: [
        { hanzi: "想学", pinyin: "xiǎng xué", meaning: "muốn học" },
        { hanzi: "想一想", pinyin: "xiǎng yi xiǎng", meaning: "nghĩ một chút" },
      ],
      examples: [
        { hanzi: "我想学太极拳。", pinyin: "Wǒ xiǎng xué tàijíquán.", meaning: "Tôi muốn học Thái Cực Quyền." },
        { hanzi: "你想不想一起去？", pinyin: "Nǐ xiǎng bu xiǎng yìqǐ qù?", meaning: "Bạn có muốn đi cùng không?" },
      ],
      strokeChars: ["想"],
    },
    {
      hanzi: "报名",
      pinyin: "bàomíng",
      meaning: "đăng ký, ghi danh",
      type: "Động từ",
      group: "Lớp học",
      structure: "报 (bào) có bộ tay 扌 (shǒu); 名 (míng) có 夕 (xī) trên 口 (kǒu).",
      memory: "Bàn tay 扌 (shǒu) đưa tờ đơn lên, chiếc miệng 口 (kǒu) đọc rõ tên 名 (míng). Trao đơn rồi đọc tên là 报名 (bàomíng): đăng ký.",
      compounds: [
        { hanzi: "报名表", pinyin: "bàomíngbiǎo", meaning: "phiếu đăng ký" },
        { hanzi: "报名参加", pinyin: "bàomíng cānjiā", meaning: "đăng ký tham gia" },
      ],
      examples: [
        { hanzi: "我们去报名吧。", pinyin: "Wǒmen qù bàomíng ba.", meaning: "Chúng ta đi đăng ký nhé." },
        { hanzi: "报名需要带学生证。", pinyin: "Bàomíng xūyào dài xuéshengzhèng.", meaning: "Đăng ký cần mang theo thẻ sinh viên." },
      ],
      strokeChars: ["报", "名"],
    },
    {
      hanzi: "再",
      pinyin: "zài",
      meaning: "lại, thêm lần nữa (chưa xảy ra)",
      type: "Phó từ",
      group: "Lặp lại",
      structure: "Các nét ngang xếp lớp quanh phần giữa; giữ khoảng cách đều để chữ không nặng.",
      memory: "Một lớp đường vừa đi xong, phía trước lại mở thêm một lớp nữa. Bước lặp còn ở tương lai giúp nhớ 再 (zài): sẽ làm lại.",
      compounds: [
        { hanzi: "再说一遍", pinyin: "zài shuō yí biàn", meaning: "nói lại một lượt" },
        { hanzi: "再见", pinyin: "zàijiàn", meaning: "hẹn gặp lại" },
      ],
      examples: [
        { hanzi: "请再说一遍。", pinyin: "Qǐng zài shuō yí biàn.", meaning: "Xin nói lại một lượt." },
        { hanzi: "明天我们再练习。", pinyin: "Míngtiān wǒmen zài liànxí.", meaning: "Ngày mai chúng ta luyện lại." },
      ],
      strokeChars: ["再"],
    },
    {
      hanzi: "遍 / 次",
      pinyin: "biàn / cì",
      meaning: "lượt trọn vẹn / lần xảy ra",
      type: "Lượng từ động tác",
      group: "Số lần",
      structure: "遍 (biàn) có bộ 辶 (chuò), gợi đi hết một vòng; 次 (cì) có hai chấm và 欠 (qiàn).",
      memory: "Người học đi trọn con đường 辶 (chuò) quanh bài đọc là một 遍 (biàn); chiếc chuông chỉ kêu mỗi khi việc xảy ra là một 次 (cì). Đi hết vòng đếm lượt, chuông kêu đếm lần.",
      compounds: [
        { hanzi: "读两遍", pinyin: "dú liǎng biàn", meaning: "đọc hai lượt" },
        { hanzi: "去过三次", pinyin: "qù guo sān cì", meaning: "đã đi ba lần" },
      ],
      examples: [
        { hanzi: "这句话请读两遍。", pinyin: "Zhè jù huà qǐng dú liǎng biàn.", meaning: "Hãy đọc câu này hai lượt." },
        { hanzi: "我去过北京两次。", pinyin: "Wǒ qù guo Běijīng liǎng cì.", meaning: "Tôi từng đi Bắc Kinh hai lần." },
      ],
      strokeChars: ["遍", "次"],
    },
    {
      hanzi: "懂",
      pinyin: "dǒng",
      meaning: "hiểu",
      type: "Động từ",
      group: "Lớp học",
      structure: "Bộ tim đứng 忄 (xīn) ở trái, phần 董 (dǒng) ở phải; viết trái trước, phải sau.",
      memory: "Trái tim 忄 (xīn) đứng lắng nghe, từng tầng thông tin bên phải chậm rãi rơi vào đúng chỗ. Khi trong lòng sáng rõ, ta 懂 (dǒng): hiểu.",
      compounds: [
        { hanzi: "听懂", pinyin: "tīngdǒng", meaning: "nghe hiểu" },
        { hanzi: "看懂", pinyin: "kàndǒng", meaning: "đọc/xem hiểu" },
      ],
      examples: [
        { hanzi: "我没听懂。", pinyin: "Wǒ méi tīngdǒng.", meaning: "Tôi chưa nghe hiểu." },
        { hanzi: "你看懂这个通知了吗？", pinyin: "Nǐ kàndǒng zhège tōngzhī le ma?", meaning: "Bạn đã đọc hiểu thông báo này chưa?" },
      ],
      strokeChars: ["懂"],
    },
    {
      hanzi: "请假",
      pinyin: "qǐngjià",
      meaning: "xin phép nghỉ",
      type: "Động từ",
      group: "Sức khỏe",
      structure: "请 (qǐng) có bộ lời 讠 (yán); 假 (jià) có bộ người 亻 (rén).",
      memory: "Lời nói 讠 (yán) bước tới bên người 亻 (rén), lễ phép xin tạm rời chỗ học. Lời xin rời lớp ấy là 请假 (qǐngjià): xin nghỉ.",
      compounds: [
        { hanzi: "请一天假", pinyin: "qǐng yì tiān jià", meaning: "xin nghỉ một ngày" },
        { hanzi: "请病假", pinyin: "qǐng bìngjià", meaning: "xin nghỉ bệnh" },
      ],
      examples: [
        { hanzi: "我想请一天假。", pinyin: "Wǒ xiǎng qǐng yì tiān jià.", meaning: "Tôi muốn xin nghỉ một ngày." },
        { hanzi: "她让我帮她请假。", pinyin: "Tā ràng wǒ bāng tā qǐngjià.", meaning: "Cô ấy nhờ tôi xin nghỉ giúp." },
      ],
      strokeChars: ["请", "假"],
    },
    {
      hanzi: "感冒",
      pinyin: "gǎnmào",
      meaning: "cảm, cảm cúm",
      type: "Động từ / danh từ",
      group: "Sức khỏe",
      structure: "感 (gǎn) có 心 (xīn) ở dưới; 冒 (mào) có 日 (rì) trên 目 (mù).",
      memory: "Cơn lạnh chạm vào tim 心 (xīn), mắt 目 (mù) nặng xuống dưới vầng trán nóng như mặt trời 日 (rì). Cảnh người nóng mắt nặng giúp nhớ 感冒 (gǎnmào): bị cảm.",
      compounds: [
        { hanzi: "有点儿感冒", pinyin: "yǒudiǎnr gǎnmào", meaning: "hơi bị cảm" },
        { hanzi: "感冒药", pinyin: "gǎnmàoyào", meaning: "thuốc cảm" },
      ],
      examples: [
        { hanzi: "她可能感冒了。", pinyin: "Tā kěnéng gǎnmào le.", meaning: "Có lẽ cô ấy bị cảm rồi." },
        { hanzi: "我有点儿感冒，今天不能上课。", pinyin: "Wǒ yǒudiǎnr gǎnmào, jīntiān bù néng shàngkè.", meaning: "Tôi hơi bị cảm, hôm nay không thể đi học." },
      ],
      strokeChars: ["感", "冒"],
    },
  ],
};

export const glossary: Record<LessonId, Triplet[]> = {
  23: [
    ["东边儿", "dōngbiānr", "phía đông"], ["西边儿", "xībiānr", "phía tây"], ["南边儿", "nánbiānr", "phía nam"], ["北边儿", "běibiānr", "phía bắc"],
    ["前边儿", "qiánbiānr", "phía trước"], ["后边儿", "hòubiānr", "phía sau"], ["左边儿", "zuǒbiānr", "bên trái"], ["右边儿", "yòubiānr", "bên phải"],
    ["里边儿", "lǐbiānr", "bên trong"], ["外边儿", "wàibiānr", "bên ngoài"], ["地方", "dìfang", "nơi, chỗ"], ["足球场", "zúqiúchǎng", "sân bóng đá"],
    ["劳驾", "láojià", "cảm phiền, làm ơn"], ["和平", "hépíng", "hòa bình"], ["广场", "guǎngchǎng", "quảng trường"], ["中间", "zhōngjiān", "ở giữa"],
    ["马路", "mǎlù", "đường cái"], ["座", "zuò", "tòa (lượng từ)"], ["白色", "báisè", "màu trắng"], ["拐", "guǎi", "rẽ"],
  ].map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning })),
  24: [
    ["打", "dǎ", "đánh, chơi, tập"], ["太极拳", "tàijíquán", "Thái Cực Quyền"], ["听说", "tīngshuō", "nghe nói"], ["下星期", "xià xīngqī", "tuần sau"],
    ["开始", "kāishǐ", "bắt đầu"], ["舒服", "shūfu", "thoải mái"], ["意思", "yìsi", "ý nghĩa"], ["小时", "xiǎoshí", "tiếng đồng hồ"],
    ["头疼", "tóuténg", "đau đầu"], ["发烧", "fāshāo", "sốt"], ["可能", "kěnéng", "có lẽ"], ["咳嗽", "késou", "ho"],
    ["了", "le", "rồi; trạng thái mới"], ["看病", "kànbìng", "khám bệnh"], ["一三五", "yī sān wǔ", "thứ Hai, Tư, Sáu"], ["不舒服", "bù shūfu", "khó chịu trong người"],
  ].map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning })),
};

export const dialogues: Record<LessonId, Dialogue[]> = {
  23: [
    {
      title: "新生第一天：邮局怎么走？",
      setting: "Ngày đầu ở trường, Linh cần gửi hồ sơ trước giờ học.",
      goal: "Hỏi vị trí, khoảng cách và xác nhận mốc rẽ.",
      lines: [
        { speaker: "林 · Linh", hanzi: "劳驾，我想打听一下儿，学校里边儿有邮局吗？", pinyin: "Láojià, wǒ xiǎng dǎting yíxiàr, xuéxiào lǐbiānr yǒu yóujú ma?", meaning: "Cảm phiền, cho mình hỏi trong trường có bưu điện không?" },
        { speaker: "志愿者 · Tình nguyện viên", hanzi: "有，在图书馆西边儿，咖啡店旁边儿。", pinyin: "Yǒu, zài túshūguǎn xībiānr, kāfēidiàn pángbiānr.", meaning: "Có, ở phía tây thư viện, cạnh quán cà phê." },
        { speaker: "林 · Linh", hanzi: "离这儿远吗？我十点有课。", pinyin: "Lí zhèr yuǎn ma? Wǒ shí diǎn yǒu kè.", meaning: "Có xa đây không? Mười giờ mình có lớp." },
        { speaker: "志愿者 · Tình nguyện viên", hanzi: "不远，走路五分钟。你从这儿一直往北走。", pinyin: "Bù yuǎn, zǒulù wǔ fēnzhōng. Nǐ cóng zhèr yìzhí wǎng běi zǒu.", meaning: "Không xa, đi bộ năm phút. Bạn từ đây cứ đi thẳng về phía bắc." },
        { speaker: "林 · Linh", hanzi: "到红绿灯那儿拐吗？", pinyin: "Dào hónglǜdēng nàr guǎi ma?", meaning: "Đến đèn giao thông thì rẽ phải không?" },
        { speaker: "志愿者 · Tình nguyện viên", hanzi: "对，往左拐。白色的小楼就是邮局。", pinyin: "Duì, wǎng zuǒ guǎi. Báisè de xiǎolóu jiù shì yóujú.", meaning: "Đúng, rẽ trái. Tòa nhà nhỏ màu trắng chính là bưu điện." },
        { speaker: "林 · Linh", hanzi: "我确认一下：一直往北走，到红绿灯往左拐，对吗？", pinyin: "Wǒ quèrèn yíxià: yìzhí wǎng běi zǒu, dào hónglǜdēng wǎng zuǒ guǎi, duì ma?", meaning: "Mình xác nhận lại: đi thẳng về bắc, đến đèn giao thông rẽ trái, đúng không?" },
        { speaker: "志愿者 · Tình nguyện viên", hanzi: "对。别着急，来得及。", pinyin: "Duì. Bié zháojí, láidejí.", meaning: "Đúng. Đừng vội, vẫn kịp giờ." },
      ],
    },
    {
      title: "周末见面：在博物馆门口等",
      setting: "Hai người hẹn gặp cuối tuần nhưng đang đứng ở hai cổng khác nhau.",
      goal: "Mô tả vị trí bằng mốc đời thực và sửa hiểu nhầm.",
      lines: [
        { speaker: "安 · An", hanzi: "你到博物馆了吗？我在正门口。", pinyin: "Nǐ dào bówùguǎn le ma? Wǒ zài zhèngménkǒu.", meaning: "Bạn đến bảo tàng chưa? Mình ở cổng chính." },
        { speaker: "明 · Minh", hanzi: "我到了，可是这儿只有一个广场。", pinyin: "Wǒ dào le, kěshì zhèr zhǐ yǒu yí ge guǎngchǎng.", meaning: "Mình đến rồi, nhưng ở đây chỉ có một quảng trường." },
        { speaker: "安 · An", hanzi: "你可能在南门。正门在和平公园和咖啡店中间。", pinyin: "Nǐ kěnéng zài nánmén. Zhèngmén zài Hépíng Gōngyuán hé kāfēidiàn zhōngjiān.", meaning: "Có lẽ bạn đang ở cổng nam. Cổng chính nằm giữa công viên Hòa Bình và quán cà phê." },
        { speaker: "明 · Minh", hanzi: "从南门到正门有多远？", pinyin: "Cóng nánmén dào zhèngmén yǒu duō yuǎn?", meaning: "Từ cổng nam đến cổng chính bao xa?" },
        { speaker: "安 · An", hanzi: "大概三百米。你沿着马路一直走，别拐。", pinyin: "Dàgài sānbǎi mǐ. Nǐ yánzhe mǎlù yìzhí zǒu, bié guǎi.", meaning: "Khoảng ba trăm mét. Bạn cứ đi dọc đường, đừng rẽ." },
        { speaker: "明 · Minh", hanzi: "我看见咖啡店了。你在店的左边儿还是右边儿？", pinyin: "Wǒ kànjiàn kāfēidiàn le. Nǐ zài diàn de zuǒbiānr háishi yòubiānr?", meaning: "Mình thấy quán cà phê rồi. Bạn ở bên trái hay bên phải quán?" },
        { speaker: "安 · An", hanzi: "我在右边儿，穿白色衣服。", pinyin: "Wǒ zài yòubiānr, chuān báisè yīfu.", meaning: "Mình ở bên phải, mặc áo màu trắng." },
        { speaker: "明 · Minh", hanzi: "看见你了！我们进去吧。", pinyin: "Kànjiàn nǐ le! Wǒmen jìnqu ba.", meaning: "Thấy bạn rồi! Chúng ta vào nhé." },
      ],
    },
  ],
  24: [
    {
      title: "体验课报名：我想学太极拳",
      setting: "Linh hỏi quầy thể thao về một lớp trải nghiệm phù hợp người mới.",
      goal: "Dùng 会 / 能 / 可以 / 想 trong đúng ngữ cảnh.",
      lines: [
        { speaker: "林 · Linh", hanzi: "你好，我想学太极拳。现在可以报名吗？", pinyin: "Nǐ hǎo, wǒ xiǎng xué tàijíquán. Xiànzài kěyǐ bàomíng ma?", meaning: "Xin chào, mình muốn học Thái Cực Quyền. Bây giờ có thể đăng ký không?" },
        { speaker: "前台 · Lễ tân", hanzi: "可以。你以前学过吗？", pinyin: "Kěyǐ. Nǐ yǐqián xué guo ma?", meaning: "Được. Trước đây bạn từng học chưa?" },
        { speaker: "林 · Linh", hanzi: "没有，我不会打。初学者能参加吗？", pinyin: "Méiyǒu, wǒ bú huì dǎ. Chūxuézhě néng cānjiā ma?", meaning: "Chưa, mình không biết tập. Người mới có thể tham gia không?" },
        { speaker: "前台 · Lễ tân", hanzi: "当然能。老师会从基本动作开始教。", pinyin: "Dāngrán néng. Lǎoshī huì cóng jīběn dòngzuò kāishǐ jiāo.", meaning: "Tất nhiên có thể. Giáo viên sẽ dạy từ động tác cơ bản." },
        { speaker: "林 · Linh", hanzi: "什么时候上课？", pinyin: "Shénme shíhou shàngkè?", meaning: "Khi nào học?" },
        { speaker: "前台 · Lễ tân", hanzi: "下星期一开始，一三五下午四点半到五点半。", pinyin: "Xià xīngqīyī kāishǐ, yī sān wǔ xiàwǔ sì diǎn bàn dào wǔ diǎn bàn.", meaning: "Bắt đầu thứ Hai tuần sau, chiều thứ Hai, Tư, Sáu từ 4:30 đến 5:30." },
        { speaker: "林 · Linh", hanzi: "对不起，您能不能再说一遍“一三五”？", pinyin: "Duìbuqǐ, nín néng bu néng zài shuō yí biàn “yī sān wǔ”?", meaning: "Xin lỗi, anh/chị có thể giải thích lại ‘một, ba, năm’ không?" },
        { speaker: "前台 · Lễ tân", hanzi: "就是星期一、星期三和星期五。每次一个小时。", pinyin: "Jiù shì xīngqīyī, xīngqīsān hé xīngqīwǔ. Měi cì yí ge xiǎoshí.", meaning: "Tức là thứ Hai, thứ Tư và thứ Sáu. Mỗi buổi một tiếng." },
        { speaker: "林 · Linh", hanzi: "懂了，谢谢。我现在就报名。", pinyin: "Dǒng le, xièxie. Wǒ xiànzài jiù bàomíng.", meaning: "Mình hiểu rồi, cảm ơn. Mình đăng ký ngay bây giờ." },
      ],
    },
    {
      title: "生病请假：今天不能来上课",
      setting: "Minh gọi cho bạn cùng lớp trước giờ học vì bị ốm.",
      goal: "Mô tả triệu chứng, suy đoán và nhờ xin nghỉ tự nhiên.",
      lines: [
        { speaker: "明 · Minh", hanzi: "喂，小安，我今天有点儿不舒服。", pinyin: "Wéi, Xiǎo Ān, wǒ jīntiān yǒudiǎnr bù shūfu.", meaning: "A lô, An, hôm nay mình hơi khó chịu trong người." },
        { speaker: "安 · An", hanzi: "你怎么了？头疼吗？", pinyin: "Nǐ zěnme le? Tóuténg ma?", meaning: "Bạn sao vậy? Có đau đầu không?" },
        { speaker: "明 · Minh", hanzi: "头疼，还咳嗽，可能感冒了。", pinyin: "Tóuténg, hái késou, kěnéng gǎnmào le.", meaning: "Mình đau đầu, còn ho nữa, có lẽ bị cảm rồi." },
        { speaker: "安 · An", hanzi: "发烧了吗？你能去医院看病吗？", pinyin: "Fāshāo le ma? Nǐ néng qù yīyuàn kànbìng ma?", meaning: "Có sốt không? Bạn có thể đi bệnh viện khám không?" },
        { speaker: "明 · Minh", hanzi: "有一点儿发烧。我姐姐能陪我去。", pinyin: "Yǒu yìdiǎnr fāshāo. Wǒ jiějie néng péi wǒ qù.", meaning: "Mình hơi sốt. Chị mình có thể đi cùng." },
        { speaker: "明 · Minh", hanzi: "你能不能帮我跟老师请个假吗？", pinyin: "Nǐ néng bu néng bāng wǒ gēn lǎoshī qǐng ge jià?", meaning: "Bạn có thể giúp mình xin phép giáo viên nghỉ không?" },
        { speaker: "安 · An", hanzi: "可以。你先休息，别担心。", pinyin: "Kěyǐ. Nǐ xiān xiūxi, bié dānxīn.", meaning: "Được. Bạn nghỉ trước đi, đừng lo." },
        { speaker: "明 · Minh", hanzi: "谢谢。等我好一点儿，你再教我今天的动作。", pinyin: "Xièxie. Děng wǒ hǎo yìdiǎnr, nǐ zài jiāo wǒ jīntiān de dòngzuò.", meaning: "Cảm ơn. Khi mình đỡ hơn, bạn chỉ lại động tác hôm nay nhé." },
      ],
    },
  ],
};

export const grammar: Record<LessonId, GrammarPoint[]> = {
  23: [
    {
      title: "在 / 有 / 是: ba góc nhìn vị trí",
      formula: "A 在 nơi chốn · Nơi chốn 有 A · Nơi chốn 是 A",
      explanation: "在 trả lời ‘A ở đâu’; 有 giới thiệu ‘ở đó có gì’; 是 xác định ‘thứ ở đó là gì’. Cùng một cảnh nhưng trọng tâm thông tin khác nhau.",
      examples: [
        { hanzi: "邮局在学校里边儿。", pinyin: "Yóujú zài xuéxiào lǐbiānr.", meaning: "Bưu điện ở trong trường." },
        { hanzi: "学校里边儿有一个邮局。", pinyin: "Xuéxiào lǐbiānr yǒu yí ge yóujú.", meaning: "Trong trường có một bưu điện." },
        { hanzi: "学校西边儿是邮局。", pinyin: "Xuéxiào xībiānr shì yóujú.", meaning: "Phía tây trường là bưu điện." },
      ],
    },
    {
      title: "离 / 从 / 往: khoảng cách, điểm đầu, hướng đi",
      formula: "A 离 B… · 从 A 到 B · 往 + hướng + động từ",
      explanation: "离 đo khoảng cách; 从 nêu điểm xuất phát; 往 chỉ hướng chuyển động. Hãy hỏi mình đang nói về khoảng cách, điểm đầu hay hướng đi.",
      examples: [
        { hanzi: "公园离邮局很近。", pinyin: "Gōngyuán lí yóujú hěn jìn.", meaning: "Công viên cách bưu điện rất gần." },
        { hanzi: "从学校到博物馆有多远？", pinyin: "Cóng xuéxiào dào bówùguǎn yǒu duō yuǎn?", meaning: "Từ trường đến bảo tàng bao xa?" },
        { hanzi: "一直往前走。", pinyin: "Yìzhí wǎng qián zǒu.", meaning: "Cứ đi thẳng về phía trước." },
      ],
      warning: {
        wrong: { hanzi: "我从学校很近。", pinyin: "Wǒ cóng xuéxiào hěn jìn.", meaning: "(Sai) Tôi từ trường rất gần." },
        right: { hanzi: "我家离学校很近。", pinyin: "Wǒ jiā lí xuéxiào hěn jìn.", meaning: "Nhà tôi cách trường rất gần." },
        note: "Nói khoảng cách giữa hai nơi phải dùng 离, không dùng 从.",
      },
    },
    {
      title: "多 + tính từ: hỏi mức độ",
      formula: "多远 / 多高 / 多大 / 多重 / 多长",
      explanation: "多 đứng trước tính từ để hỏi mức độ. Với khoảng cách ước lượng, 七八百米 nghĩa là khoảng bảy đến tám trăm mét.",
      examples: [
        { hanzi: "你家离学校多远？", pinyin: "Nǐ jiā lí xuéxiào duō yuǎn?", meaning: "Nhà bạn cách trường bao xa?" },
        { hanzi: "这条路多长？", pinyin: "Zhè tiáo lù duō cháng?", meaning: "Con đường này dài bao nhiêu?" },
        { hanzi: "大概有七八百米。", pinyin: "Dàgài yǒu qī bā bǎi mǐ.", meaning: "Khoảng bảy, tám trăm mét." },
      ],
    },
  ],
  24: [
    {
      title: "会 / 能 / 可以: kỹ năng, điều kiện, cho phép",
      formula: "会 + kỹ năng · 能 + điều kiện · 可以 + cho phép",
      explanation: "会 nói kỹ năng đã học; 能 nói điều kiện hoặc năng lực thực tế; 可以 thường dùng khi xin hoặc cho phép.",
      examples: [
        { hanzi: "我会说汉语。", pinyin: "Wǒ huì shuō Hànyǔ.", meaning: "Tôi biết nói tiếng Trung." },
        { hanzi: "我今天不能来。", pinyin: "Wǒ jīntiān bù néng lái.", meaning: "Hôm nay tôi không thể đến." },
        { hanzi: "这里可以拍照吗？", pinyin: "Zhèlǐ kěyǐ pāizhào ma?", meaning: "Ở đây được phép chụp ảnh không?" },
      ],
      warning: {
        wrong: { hanzi: "我今天不会来。", pinyin: "Wǒ jīntiān bú huì lái.", meaning: "(Không đúng ý) Hôm nay tôi không biết đến." },
        right: { hanzi: "我今天不能来。", pinyin: "Wǒ jīntiān bù néng lái.", meaning: "Hôm nay tôi không thể đến." },
        note: "Bị ốm là điều kiện thực tế cản trở, vì vậy dùng 不能.",
      },
    },
    {
      title: "Câu chính phản với động từ năng nguyện",
      formula: "想不想 / 能不能 / 会不会 + động từ",
      explanation: "Lặp lại động từ năng nguyện rồi mới đặt động từ chính phía sau. Cấu trúc này tự nhiên và trung tính hơn câu hỏi có 吗 trong nhiều tình huống.",
      examples: [
        { hanzi: "你想不想学？", pinyin: "Nǐ xiǎng bu xiǎng xué?", meaning: "Bạn có muốn học không?" },
        { hanzi: "你会不会打太极拳？", pinyin: "Nǐ huì bu huì dǎ tàijíquán?", meaning: "Bạn có biết tập Thái Cực Quyền không?" },
        { hanzi: "您能不能再说一遍？", pinyin: "Nín néng bu néng zài shuō yí biàn?", meaning: "Thầy/cô có thể nói lại một lượt không?" },
      ],
      warning: {
        wrong: { hanzi: "你想学不学太极拳？", pinyin: "Nǐ xiǎng xué bu xué tàijíquán?", meaning: "(Không tự nhiên trong ý muốn hỏi) Bạn muốn học hay không học?" },
        right: { hanzi: "你想不想学太极拳？", pinyin: "Nǐ xiǎng bu xiǎng xué tàijíquán?", meaning: "Bạn có muốn học Thái Cực Quyền không?" },
        note: "Khi hỏi về ý muốn, lặp 想: 想不想 + động từ.",
      },
    },
    {
      title: "再 / 又: ‘lại’ trên hai trục thời gian",
      formula: "再 + V: chưa xảy ra · 又 + V: đã/đang lặp lại",
      explanation: "再 hướng tới lần lặp ở phía trước; 又 nhìn lại lần lặp đã xảy ra. Chỉ cần đặt hành động lên trục thời gian là dễ chọn.",
      examples: [
        { hanzi: "请再说一遍。", pinyin: "Qǐng zài shuō yí biàn.", meaning: "Xin nói lại một lượt nữa." },
        { hanzi: "明年我再去中国。", pinyin: "Míngnián wǒ zài qù Zhōngguó.", meaning: "Năm sau tôi sẽ lại đi Trung Quốc." },
        { hanzi: "他今天又迟到了。", pinyin: "Tā jīntiān yòu chídào le.", meaning: "Hôm nay anh ấy lại đến muộn rồi." },
      ],
    },
    {
      title: "遍 / 次: một lượt trọn vẹn hay số lần",
      formula: "V + số + 遍 · V + số + 次",
      explanation: "遍 nhấn mạnh làm từ đầu đến cuối; 次 chỉ đếm số lần sự việc xảy ra. Đọc hết bài ba lượt dùng 遍.",
      examples: [
        { hanzi: "请读两遍。", pinyin: "Qǐng dú liǎng biàn.", meaning: "Hãy đọc hai lượt." },
        { hanzi: "我去过三次。", pinyin: "Wǒ qù guo sān cì.", meaning: "Tôi từng đi ba lần." },
        { hanzi: "这个动作再做一遍。", pinyin: "Zhège dòngzuò zài zuò yí biàn.", meaning: "Làm lại động tác này một lượt." },
      ],
    },
  ],
};

export const quizzes: Record<LessonId, Quiz[]> = {
  23: [
    {
      prompt: "Bạn muốn giới thiệu: ‘Trong trường có một bưu điện.’",
      options: [
        { hanzi: "邮局在学校里边儿。", pinyin: "Yóujú zài xuéxiào lǐbiānr.", meaning: "Bưu điện ở trong trường." },
        { hanzi: "学校里边儿有一个邮局。", pinyin: "Xuéxiào lǐbiānr yǒu yí ge yóujú.", meaning: "Trong trường có một bưu điện." },
        { hanzi: "学校里边儿是一个邮局。", pinyin: "Xuéxiào lǐbiānr shì yí ge yóujú.", meaning: "Phần bên trong trường là một bưu điện." },
      ],
      answer: 1,
      feedback: "Giới thiệu sự tồn tại tại một nơi: Nơi chốn + 有 + người/vật.",
    },
    {
      prompt: "Điền từ đúng: 公园___邮局很近。",
      options: [
        { hanzi: "从", pinyin: "cóng", meaning: "từ" },
        { hanzi: "往", pinyin: "wǎng", meaning: "về phía" },
        { hanzi: "离", pinyin: "lí", meaning: "cách" },
      ],
      answer: 2,
      feedback: "离 nối hai địa điểm để nói khoảng cách.",
    },
    {
      prompt: "Bạn nghe ‘一直往北走’. Người nói muốn bạn làm gì?",
      options: [
        { hanzi: "往北一直走", pinyin: "wǎng běi yìzhí zǒu", meaning: "cứ đi thẳng về phía bắc" },
        { hanzi: "往南拐", pinyin: "wǎng nán guǎi", meaning: "rẽ về phía nam" },
        { hanzi: "在北边儿等", pinyin: "zài běibiānr děng", meaning: "đợi ở phía bắc" },
      ],
      answer: 0,
      feedback: "往北 xác định hướng bắc; 一直走 yêu cầu tiếp tục đi thẳng.",
    },
    {
      prompt: "Câu nào xác nhận đường đi tự nhiên nhất?",
      options: [
        { hanzi: "我确认一下：到红绿灯往左拐，对吗？", pinyin: "Wǒ quèrèn yíxià: dào hónglǜdēng wǎng zuǒ guǎi, duì ma?", meaning: "Tôi xác nhận lại: đến đèn giao thông rẽ trái, đúng không?" },
        { hanzi: "红绿灯多大？", pinyin: "Hónglǜdēng duō dà?", meaning: "Đèn giao thông lớn bao nhiêu?" },
        { hanzi: "你有没有红绿灯？", pinyin: "Nǐ yǒu méiyǒu hónglǜdēng?", meaning: "Bạn có đèn giao thông không?" },
      ],
      answer: 0,
      feedback: "Nói lại mốc và hướng rồi thêm 对吗 là cách xác nhận rất hữu ích ngoài đời.",
    },
  ],
  24: [
    {
      prompt: "Bạn đã học lái xe. Chọn câu đúng.",
      options: [
        { hanzi: "我会开车。", pinyin: "Wǒ huì kāichē.", meaning: "Tôi biết lái xe." },
        { hanzi: "我能开车。", pinyin: "Wǒ néng kāichē.", meaning: "Tôi có điều kiện lái xe." },
        { hanzi: "我可以开车。", pinyin: "Wǒ kěyǐ kāichē.", meaning: "Tôi được phép lái xe." },
      ],
      answer: 0,
      feedback: "Kỹ năng học được dùng 会.",
    },
    {
      prompt: "Hôm nay bị sốt nên không thể đến lớp.",
      options: [
        { hanzi: "我今天不会来上课。", pinyin: "Wǒ jīntiān bú huì lái shàngkè.", meaning: "Hôm nay tôi không biết đến lớp." },
        { hanzi: "我今天不能来上课。", pinyin: "Wǒ jīntiān bù néng lái shàngkè.", meaning: "Hôm nay tôi không thể đến lớp." },
        { hanzi: "我今天不想会来。", pinyin: "Wǒ jīntiān bù xiǎng huì lái.", meaning: "Câu không tự nhiên." },
      ],
      answer: 1,
      feedback: "Bị sốt là điều kiện thực tế không cho phép, dùng 不能.",
    },
    {
      prompt: "Bạn chưa nghe rõ và muốn người nói lặp lại.",
      options: [
        { hanzi: "您能不能再说一遍？", pinyin: "Nín néng bu néng zài shuō yí biàn?", meaning: "Thầy/cô có thể nói lại một lượt không?" },
        { hanzi: "您又说一次。", pinyin: "Nín yòu shuō yí cì.", meaning: "Thầy/cô lại nói một lần." },
        { hanzi: "您会不会说了？", pinyin: "Nín huì bu huì shuō le?", meaning: "Thầy/cô biết nói chưa?" },
      ],
      answer: 0,
      feedback: "Lần lặp chưa xảy ra dùng 再; nói trọn câu từ đầu đến cuối dùng 遍.",
    },
    {
      prompt: "Bạn muốn xin nghỉ bệnh lịch sự.",
      options: [
        { hanzi: "老师，我有点儿发烧，想请一天假。", pinyin: "Lǎoshī, wǒ yǒudiǎnr fāshāo, xiǎng qǐng yì tiān jià.", meaning: "Thưa thầy/cô, em hơi sốt, muốn xin nghỉ một ngày." },
        { hanzi: "老师，我不会上课。", pinyin: "Lǎoshī, wǒ bú huì shàngkè.", meaning: "Thưa thầy/cô, em không biết đi học." },
        { hanzi: "老师，我可以感冒。", pinyin: "Lǎoshī, wǒ kěyǐ gǎnmào.", meaning: "Thưa thầy/cô, em được phép cảm." },
      ],
      answer: 0,
      feedback: "Nêu triệu chứng + 想请…假 là cách xin nghỉ rõ ràng và lịch sự.",
    },
  ],
};

export const orderTasks: Record<LessonId, { tokens: string[]; answer: string; translation: string; pinyin: string }> = {
  23: { tokens: ["一直", "从这儿", "往东", "走"], answer: "从这儿一直往东走", translation: "Từ đây cứ đi thẳng về phía đông.", pinyin: "Cóng zhèr yìzhí wǎng dōng zǒu." },
  24: { tokens: ["一遍", "再", "您", "能不能", "说"], answer: "您能不能再说一遍", translation: "Thầy/cô có thể nói lại một lượt không?", pinyin: "Nín néng bu néng zài shuō yí biàn?" },
};

export const dictationTasks: Record<LessonId, Triplet> = {
  23: { hanzi: "到红绿灯那儿往左拐。", pinyin: "Dào hónglǜdēng nàr wǎng zuǒ guǎi.", meaning: "Đến đèn giao thông thì rẽ trái." },
  24: { hanzi: "我有点儿发烧，今天不能来上课。", pinyin: "Wǒ yǒudiǎnr fāshāo, jīntiān bù néng lái shàngkè.", meaning: "Tôi hơi sốt, hôm nay không thể đến lớp." },
};

export const translationTasks: Record<LessonId, Triplet & { hint: string }> = {
  23: { hanzi: "博物馆离这儿远吗？", pinyin: "Bówùguǎn lí zhèr yuǎn ma?", meaning: "Bảo tàng cách đây xa không?", hint: "A + 离 + B + tính từ + 吗？" },
  24: { hanzi: "您能不能再说一遍？", pinyin: "Nín néng bu néng zài shuō yí biàn?", meaning: "Thầy/cô có thể nói lại một lượt không?", hint: "能不能 + 再 + động từ + 一遍" },
};

export const writingCharacters: Record<LessonId, WritingCharacter[]> = {
  23: [
    { hanzi: "边", pinyin: "biān", meaning: "bên, phía", structure: "Phần 力 trước, bộ 辶 sau.", cue: "Bước chân men theo mép đường." },
    { hanzi: "离", pinyin: "lí", meaning: "cách", structure: "Từ trên xuống dưới, giữ trục giữa.", cue: "Chim bay khỏi cành, khoảng trống mở ra." },
    { hanzi: "远", pinyin: "yuǎn", meaning: "xa", structure: "元 trước, bộ 辶 sau.", cue: "Đồng tiền lăn mãi trên đường." },
    { hanzi: "近", pinyin: "jìn", meaning: "gần", structure: "斤 trước, bộ 辶 sau.", cue: "Chiếc rìu hạ ngay cạnh chân." },
    { hanzi: "往", pinyin: "wǎng", meaning: "về phía", structure: "Bộ 彳 trái trước, phần 主 phải sau.", cue: "Đôi chân bước về một hướng." },
    { hanzi: "拐", pinyin: "guǎi", meaning: "rẽ", structure: "Bộ 扌 trái trước, phần phải sau.", cue: "Bàn tay giơ lên báo ngoặt." },
    { hanzi: "红", pinyin: "hóng", meaning: "đỏ", structure: "Bộ 纟 trái trước, 工 phải sau.", cue: "Sợi dây điện bật màu đỏ." },
    { hanzi: "灯", pinyin: "dēng", meaning: "đèn", structure: "Bộ 火 trái trước, 丁 phải sau.", cue: "Ngọn lửa sáng cạnh chiếc đinh." },
  ],
  24: [
    { hanzi: "会", pinyin: "huì", meaning: "biết", structure: "Trên trước, 云 dưới sau.", cue: "Buổi học biến điều lạ thành kỹ năng." },
    { hanzi: "能", pinyin: "néng", meaning: "có thể", structure: "Giữ bốn phần cân quanh trục giữa.", cue: "Mọi điều kiện đủ, cánh cửa mở." },
    { hanzi: "想", pinyin: "xiǎng", meaning: "muốn, nghĩ", structure: "相 trên trước, 心 dưới sau.", cue: "Cây trong mắt, nhịp ở tim." },
    { hanzi: "再", pinyin: "zài", meaning: "lại", structure: "Các nét ngang cách đều.", cue: "Phía trước mở thêm một lượt nữa." },
    { hanzi: "遍", pinyin: "biàn", meaning: "lượt", structure: "扁 trước, bộ 辶 sau.", cue: "Đi trọn một vòng quanh bài đọc." },
    { hanzi: "懂", pinyin: "dǒng", meaning: "hiểu", structure: "Bộ 忄 trái trước, 董 phải sau.", cue: "Thông tin rơi đúng chỗ trong lòng." },
    { hanzi: "请", pinyin: "qǐng", meaning: "xin, mời", structure: "Bộ 讠 trái trước, 青 phải sau.", cue: "Lời nói xanh dịu và lễ phép." },
    { hanzi: "病", pinyin: "bìng", meaning: "bệnh", structure: "Khung 疒 ngoài trước, phần trong sau.", cue: "Người nằm dưới mái bệnh." },
  ],
};

