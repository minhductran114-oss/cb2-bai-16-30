import type { Dialogue, GrammarPoint, Quiz, Triplet, VocabEntry, WritingCharacter } from "./lesson-types";

export const lesson25Meta: Triplet & { canDo: string[] } = {
  hanzi: "她学得很好",
  pinyin: "Tā xué de hěn hǎo",
  meaning: "Cô ấy học rất giỏi",
  canDo: [
    "Dùng 得 để đánh giá một hành động diễn ra thế nào",
    "Đặt tân ngữ đúng chỗ khi câu có bổ ngữ trạng thái",
    "Hỏi và đưa nhận xét lịch sự về năng lực, tiết mục hoặc tiến bộ",
    "Khen, đáp lời khen và nói về kế hoạch cải thiện bản thân",
  ],
};

export const lesson25Vocabulary: VocabEntry[] = [
  {
    hanzi: "得", pinyin: "de", meaning: "trợ từ nối động từ với bổ ngữ trạng thái", type: "Trợ từ kết cấu", group: "Bổ ngữ trạng thái",
    structure: "Bên trái là 彳 (chì, bước chân); bên phải có 日 (rì) và 寸 (cùn).",
    memory: "Những bước chân 彳 (chì) vừa hoàn thành một hành động thì dừng dưới ánh 日 (rì), để bàn tay 寸 (cùn) đo xem làm tốt, nhanh hay chính xác đến đâu. Trạm đo sau động từ ấy là 得 (de).",
    compounds: [{ hanzi: "学得很好", pinyin: "xué de hěn hǎo", meaning: "học rất tốt" }, { hanzi: "说得很清楚", pinyin: "shuō de hěn qīngchu", meaning: "nói rất rõ" }],
    examples: [{ hanzi: "她学得很好。", pinyin: "Tā xué de hěn hǎo.", meaning: "Cô ấy học rất giỏi." }, { hanzi: "老师讲得很清楚。", pinyin: "Lǎoshī jiǎng de hěn qīngchu.", meaning: "Giáo viên giảng rất rõ." }],
    strokeChars: ["得"],
  },
  {
    hanzi: "表演", pinyin: "biǎoyǎn", meaning: "biểu diễn; màn biểu diễn", type: "Động từ / danh từ", group: "Truyền hình & biểu diễn",
    structure: "表 (biǎo) mở phần dưới như tà áo; 演 (yǎn) có bộ nước 氵 (shuǐ) bên trái.",
    memory: "Tà áo trong 表 (biǎo) tung ra khi dòng nước 氵 (shuǐ) của 演 (yǎn) cuốn động tác chảy liên tục trên sân khấu. Tà áo và dòng chuyển động hợp thành một màn 表演 (biǎoyǎn).",
    compounds: [{ hanzi: "上台表演", pinyin: "shàngtái biǎoyǎn", meaning: "lên sân khấu biểu diễn" }, { hanzi: "表演节目", pinyin: "biǎoyǎn jiémù", meaning: "biểu diễn tiết mục" }],
    examples: [{ hanzi: "她表演得非常自然。", pinyin: "Tā biǎoyǎn de fēicháng zìrán.", meaning: "Cô ấy biểu diễn rất tự nhiên." }, { hanzi: "你愿意上台表演吗？", pinyin: "Nǐ yuànyì shàngtái biǎoyǎn ma?", meaning: "Bạn có sẵn lòng lên sân khấu biểu diễn không?" }],
    strokeChars: ["表", "演"],
  },
  {
    hanzi: "节目", pinyin: "jiémù", meaning: "tiết mục; chương trình", type: "Danh từ", group: "Truyền hình & biểu diễn",
    structure: "节 (jié) có đầu tre 艹/竹 giản hóa ở trên; 目 (mù) là hình con mắt.",
    memory: "Những nhánh tre trên 节 (jié) chia buổi diễn thành từng đoạn, còn con mắt 目 (mù) chăm chú theo dõi. Mỗi đoạn được mắt khán giả dõi theo là một 节目 (jiémù).",
    compounds: [{ hanzi: "电视节目", pinyin: "diànshì jiémù", meaning: "chương trình truyền hình" }, { hanzi: "文化节目", pinyin: "wénhuà jiémù", meaning: "chương trình văn hóa" }],
    examples: [{ hanzi: "你看这个节目怎么样？", pinyin: "Nǐ kàn zhège jiémù zěnmeyàng?", meaning: "Bạn thấy chương trình này thế nào?" }, { hanzi: "这个节目拍得很有意思。", pinyin: "Zhège jiémù pāi de hěn yǒuyìsi.", meaning: "Chương trình này được quay rất thú vị." }],
    strokeChars: ["节", "目"],
  },
  {
    hanzi: "愿意", pinyin: "yuànyì", meaning: "sẵn lòng, bằng lòng", type: "Động từ năng nguyện", group: "Ý muốn & thái độ",
    structure: "愿 (yuàn) và 意 (yì) đều có 心 (xīn, tim) ở phần dưới.",
    memory: "Hai trái tim 心 (xīn) cùng gật đầu: một trái tim hiểu điều mình mong, trái tim kia nghe rõ ý định. Khi cả hai cùng bước tới không bị ép buộc, ta 愿意 (yuànyì), sẵn lòng.",
    compounds: [{ hanzi: "愿意帮助", pinyin: "yuànyì bāngzhù", meaning: "sẵn lòng giúp đỡ" }, { hanzi: "不太愿意", pinyin: "bú tài yuànyì", meaning: "không thật sự muốn" }],
    examples: [{ hanzi: "我愿意每天练习。", pinyin: "Wǒ yuànyì měitiān liànxí.", meaning: "Tôi sẵn lòng luyện tập mỗi ngày." }, { hanzi: "你愿意参加我们的节目吗？", pinyin: "Nǐ yuànyì cānjiā wǒmen de jiémù ma?", meaning: "Bạn có sẵn lòng tham gia chương trình của chúng tôi không?" }],
    strokeChars: ["愿", "意"],
  },
  {
    hanzi: "进步", pinyin: "jìnbù", meaning: "tiến bộ; sự tiến bộ", type: "Động từ / danh từ", group: "Đánh giá & tiến bộ",
    structure: "进 (jìn) có con đường 辶 (chuò); 步 (bù) mang hình những bước chân nối tiếp.",
    memory: "Viết mốc 井 (jǐng) trước rồi cho con đường 辶 (chuò) trong 进 (jìn) chạy qua; tiếp đó những dấu chân của 步 (bù) bước tiếp. Mỗi bước vượt một mốc làm ta 进步 (jìnbù).",
    compounds: [{ hanzi: "进步很快", pinyin: "jìnbù hěn kuài", meaning: "tiến bộ rất nhanh" }, { hanzi: "有明显进步", pinyin: "yǒu míngxiǎn jìnbù", meaning: "có tiến bộ rõ rệt" }],
    examples: [{ hanzi: "你的听力进步得很快。", pinyin: "Nǐ de tīnglì jìnbù de hěn kuài.", meaning: "Kỹ năng nghe của bạn tiến bộ rất nhanh." }, { hanzi: "我比上个月进步多了。", pinyin: "Wǒ bǐ shàng ge yuè jìnbù duō le.", meaning: "Tôi tiến bộ hơn tháng trước nhiều." }],
    strokeChars: ["进", "步"],
  },
  {
    hanzi: "水平", pinyin: "shuǐpíng", meaning: "trình độ, mức", type: "Danh từ", group: "Đánh giá & tiến bộ",
    structure: "水 (shuǐ) là dòng nước tỏa hai bên; 平 (píng) có các nét giữ mặt phẳng cân bằng.",
    memory: "Dòng 水 (shuǐ) chảy rồi lắng yên dưới mặt 平 (píng), tạo một đường ngang để đo cao thấp. Đường chuẩn ấy gợi 水平 (shuǐpíng), mức độ hay trình độ.",
    compounds: [{ hanzi: "汉语水平", pinyin: "Hànyǔ shuǐpíng", meaning: "trình độ tiếng Trung" }, { hanzi: "实际水平", pinyin: "shíjì shuǐpíng", meaning: "trình độ thực tế" }],
    examples: [{ hanzi: "你觉得自己的汉语水平怎么样？", pinyin: "Nǐ juéde zìjǐ de Hànyǔ shuǐpíng zěnmeyàng?", meaning: "Bạn thấy trình độ tiếng Trung của mình thế nào?" }, { hanzi: "她的写作水平提高了。", pinyin: "Tā de xiězuò shuǐpíng tígāo le.", meaning: "Trình độ viết của cô ấy đã nâng lên." }],
    strokeChars: ["水", "平"],
  },
  {
    hanzi: "提高", pinyin: "tígāo", meaning: "nâng cao, cải thiện", type: "Động từ", group: "Đánh giá & tiến bộ",
    structure: "提 (tí) có bộ tay 扌 (shǒu); 高 (gāo) là tòa cao nhiều tầng.",
    memory: "Bàn tay 扌 (shǒu) nắm một vật và nhấc lên từng tầng của tòa 高 (gāo). Mỗi lần nâng thêm một tầng là 提高 (tígāo), cải thiện mức hiện tại.",
    compounds: [{ hanzi: "提高水平", pinyin: "tígāo shuǐpíng", meaning: "nâng cao trình độ" }, { hanzi: "提高效率", pinyin: "tígāo xiàolǜ", meaning: "nâng cao hiệu suất" }],
    examples: [{ hanzi: "跟读可以提高发音水平。", pinyin: "Gēndú kěyǐ tígāo fāyīn shuǐpíng.", meaning: "Đọc nhại có thể nâng cao trình độ phát âm." }, { hanzi: "我想提高听说能力。", pinyin: "Wǒ xiǎng tígāo tīngshuō nénglì.", meaning: "Tôi muốn cải thiện năng lực nghe nói." }],
    strokeChars: ["提", "高"],
  },
  {
    hanzi: "准", pinyin: "zhǔn", meaning: "chuẩn, chính xác", type: "Tính từ", group: "Phát âm & biểu đạt",
    structure: "Bên trái là hai chấm băng 冫 (bīng); bên phải là chim đuôi ngắn 隹 (zhuī).",
    memory: "Hai giọt 冫 (bīng) đứng yên như hai điểm căn, còn chim 隹 (zhuī) đáp đúng vào giữa. Khi mọi điểm khớp nhau, ta có 准 (zhǔn), chuẩn xác.",
    compounds: [{ hanzi: "发音很准", pinyin: "fāyīn hěn zhǔn", meaning: "phát âm rất chuẩn" }, { hanzi: "说得很准", pinyin: "shuō de hěn zhǔn", meaning: "nói rất chính xác" }],
    examples: [{ hanzi: "她的声调说得很准。", pinyin: "Tā de shēngdiào shuō de hěn zhǔn.", meaning: "Cô ấy nói thanh điệu rất chuẩn." }, { hanzi: "时间说得不准，我们再确认一下儿。", pinyin: "Shíjiān shuō de bù zhǔn, wǒmen zài quèrèn yíxiàr.", meaning: "Thời gian nói chưa chính xác, chúng ta xác nhận lại nhé." }],
    strokeChars: ["准"],
  },
  {
    hanzi: "流利", pinyin: "liúlì", meaning: "lưu loát, trôi chảy", type: "Tính từ", group: "Phát âm & biểu đạt",
    structure: "流 (liú) có nước 氵 (shuǐ); 利 (lì) có lúa 禾 (hé) và dao 刂 (dāo).",
    memory: "Dòng nước 氵 (shuǐ) trong 流 (liú) chảy không ngắt, rồi lưỡi dao 刂 (dāo) trong 利 (lì) lướt qua bó lúa thật gọn. Lời nói vừa liên tục vừa rõ gọn là 流利 (liúlì).",
    compounds: [{ hanzi: "说得流利", pinyin: "shuō de liúlì", meaning: "nói lưu loát" }, { hanzi: "流利地回答", pinyin: "liúlì de huídá", meaning: "trả lời một cách lưu loát" }],
    examples: [{ hanzi: "她汉语说得很流利。", pinyin: "Tā Hànyǔ shuō de hěn liúlì.", meaning: "Cô ấy nói tiếng Trung rất lưu loát." }, { hanzi: "先说对，再说得流利。", pinyin: "Xiān shuō duì, zài shuō de liúlì.", meaning: "Trước tiên nói đúng, sau đó mới nói cho lưu loát." }],
    strokeChars: ["流", "利"],
  },
  {
    hanzi: "努力", pinyin: "nǔlì", meaning: "nỗ lực, cố gắng", type: "Động từ / tính từ", group: "Thói quen học tập",
    structure: "努 (nǔ) có 力 (lì, sức) ở dưới; 力 (lì) là chữ chỉ sức lực.",
    memory: "Trong 努 (nǔ), phần trên ghì xuống nhưng sức 力 (lì) bên dưới vẫn đẩy lên; sang chữ 力 (lì) thứ hai, lực ấy tiếp tục không dừng. Hai lần dồn sức tạo thành 努力 (nǔlì), cố gắng.",
    compounds: [{ hanzi: "努力学习", pinyin: "nǔlì xuéxí", meaning: "nỗ lực học tập" }, { hanzi: "继续努力", pinyin: "jìxù nǔlì", meaning: "tiếp tục cố gắng" }],
    examples: [{ hanzi: "他学习得很努力。", pinyin: "Tā xuéxí de hěn nǔlì.", meaning: "Anh ấy học rất chăm chỉ." }, { hanzi: "只要努力，就会有进步。", pinyin: "Zhǐyào nǔlì, jiù huì yǒu jìnbù.", meaning: "Chỉ cần cố gắng thì sẽ tiến bộ." }],
    strokeChars: ["努", "力"],
  },
  {
    hanzi: "认真", pinyin: "rènzhēn", meaning: "nghiêm túc, chăm chú", type: "Tính từ / trạng thái", group: "Thói quen học tập",
    structure: "认 (rèn) có bộ lời 讠 (yán); 真 (zhēn) xếp các nét theo trục giữa.",
    memory: "Lời 讠 (yán) được nói rõ với người 人 (rén), rồi mọi nét của 真 (zhēn) được đặt ngay ngắn không qua loa. Nói thật và làm kỹ gợi 认真 (rènzhēn), nghiêm túc.",
    compounds: [{ hanzi: "认真听", pinyin: "rènzhēn tīng", meaning: "chăm chú nghe" }, { hanzi: "认真准备", pinyin: "rènzhēn zhǔnbèi", meaning: "chuẩn bị nghiêm túc" }],
    examples: [{ hanzi: "她上课听得很认真。", pinyin: "Tā shàngkè tīng de hěn rènzhēn.", meaning: "Cô ấy nghe rất chăm chú trong giờ học." }, { hanzi: "请认真地读一遍。", pinyin: "Qǐng rènzhēn de dú yí biàn.", meaning: "Hãy đọc kỹ một lượt." }],
    strokeChars: ["认", "真"],
  },
  {
    hanzi: "坚持", pinyin: "jiānchí", meaning: "kiên trì, duy trì", type: "Động từ", group: "Thói quen học tập",
    structure: "坚 (jiān) đứng vững trên 土 (tǔ); 持 (chí) có bàn tay 扌 (shǒu) bên trái.",
    memory: "Các nét của 坚 (jiān) đứng chắc trên nền 土 (tǔ), rồi bàn tay 扌 (shǒu) trong 持 (chí) nắm chặt và không buông. Đứng vững rồi giữ đều qua ngày tháng là 坚持 (jiānchí).",
    compounds: [{ hanzi: "坚持练习", pinyin: "jiānchí liànxí", meaning: "kiên trì luyện tập" }, { hanzi: "坚持到底", pinyin: "jiānchí dàodǐ", meaning: "kiên trì đến cùng" }],
    examples: [{ hanzi: "我坚持每天听十分钟中文。", pinyin: "Wǒ jiānchí měitiān tīng shí fēnzhōng Zhōngwén.", meaning: "Tôi duy trì nghe tiếng Trung mười phút mỗi ngày." }, { hanzi: "你坚持得很好，继续加油！", pinyin: "Nǐ jiānchí de hěn hǎo, jìxù jiāyóu!", meaning: "Bạn duy trì rất tốt, tiếp tục cố lên!" }],
    strokeChars: ["坚", "持"],
  },
];

export const lesson25Glossary: Triplet[] = [
  ["电视台", "diànshìtái", "đài truyền hình"], ["台", "tái", "đài, bục, sân khấu"], ["为什么", "wèishénme", "tại sao"], ["因为", "yīnwèi", "bởi vì"],
  ["不错", "búcuò", "không tồi, khá tốt"], ["哪里", "nǎlǐ", "ở đâu; đâu có"], ["看", "kàn", "xem; theo ý kiến"], ["这么", "zhème", "như thế này, đến mức này"],
  ["那么", "nàme", "như thế kia; vậy thì"], ["快", "kuài", "nhanh"], ["早", "zǎo", "sớm"], ["晚", "wǎn", "muộn"],
  ["运动", "yùndòng", "vận động, thể thao"], ["跑步", "pǎobù", "chạy bộ"], ["篮球", "lánqiú", "bóng rổ"], ["刚才", "gāngcái", "lúc nãy"],
  ["可以", "kěyǐ", "có thể; khá ổn trong 还可以"], ["球", "qiú", "quả bóng; môn bóng"],
].map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning }));

export const lesson25Dialogues: Dialogue[] = [
  {
    title: "校园电视台：这个节目怎么样？",
    setting: "Linh và Minh đi từ thư viện sang đài truyền hình của trường để xem buổi ghi hình thử.",
    goal: "Hỏi đường ngắn, xin tham gia, nhận xét một màn biểu diễn và đáp lời khen.",
    lines: [
      { speaker: "林 · Linh", hanzi: "学校电视台离图书馆远吗？", pinyin: "Xuéxiào diànshìtái lí túshūguǎn yuǎn ma?", meaning: "Đài truyền hình của trường cách thư viện xa không?" },
      { speaker: "明 · Minh", hanzi: "不远，在图书馆东边儿。一直往前走就到了。", pinyin: "Bù yuǎn, zài túshūguǎn dōngbiānr. Yìzhí wǎng qián zǒu jiù dào le.", meaning: "Không xa, ở phía đông thư viện. Cứ đi thẳng là tới." },
      { speaker: "林 · Linh", hanzi: "听说今天有学生表演节目，我也想参加。", pinyin: "Tīngshuō jīntiān yǒu xuésheng biǎoyǎn jiémù, wǒ yě xiǎng cānjiā.", meaning: "Nghe nói hôm nay có sinh viên biểu diễn, mình cũng muốn tham gia." },
      { speaker: "明 · Minh", hanzi: "你会唱中文歌，当然可以。", pinyin: "Nǐ huì chàng Zhōngwén gē, dāngrán kěyǐ.", meaning: "Bạn biết hát tiếng Trung, tất nhiên có thể." },
      { speaker: "林 · Linh", hanzi: "你看刚才那个节目怎么样？", pinyin: "Nǐ kàn gāngcái nàge jiémù zěnmeyàng?", meaning: "Bạn thấy tiết mục vừa rồi thế nào?" },
      { speaker: "明 · Minh", hanzi: "还不错。那个女孩唱得很自然，发音也很准。", pinyin: "Hái búcuò. Nàge nǚhái chàng de hěn zìrán, fāyīn yě hěn zhǔn.", meaning: "Khá ổn. Cô gái đó hát rất tự nhiên, phát âm cũng chuẩn." },
      { speaker: "主持人 · MC", hanzi: "林，你汉语说得很流利，也来试试吧！", pinyin: "Lín, nǐ Hànyǔ shuō de hěn liúlì, yě lái shìshi ba!", meaning: "Linh, bạn nói tiếng Trung rất lưu loát, cũng thử tham gia nhé!" },
      { speaker: "林 · Linh", hanzi: "哪里哪里，我还要多练习。", pinyin: "Nǎlǐ nǎlǐ, wǒ hái yào duō liànxí.", meaning: "Đâu có, mình vẫn phải luyện thêm nhiều." },
    ],
  },
  {
    title: "学习诊所：怎样进步得更快？",
    setting: "Sau giờ học, Minh nhờ giáo viên giúp chẩn đoán điểm mạnh và lập kế hoạch luyện tập thực tế.",
    goal: "Mô tả chất lượng kỹ năng, hỏi nguyên nhân và thống nhất một thói quen cải thiện.",
    lines: [
      { speaker: "明 · Minh", hanzi: "老师，您觉得我的汉语水平怎么样？", pinyin: "Lǎoshī, nín juéde wǒ de Hànyǔ shuǐpíng zěnmeyàng?", meaning: "Thưa cô, cô thấy trình độ tiếng Trung của em thế nào?" },
      { speaker: "老师 · Giáo viên", hanzi: "你听得不错，也敢说，但是说得有点儿快。", pinyin: "Nǐ tīng de búcuò, yě gǎn shuō, dànshì shuō de yǒudiǎnr kuài.", meaning: "Em nghe khá tốt và cũng dám nói, nhưng nói hơi nhanh." },
      { speaker: "明 · Minh", hanzi: "我为什么总是说不准声调？", pinyin: "Wǒ wèishénme zǒngshì shuō bu zhǔn shēngdiào?", meaning: "Tại sao em luôn nói thanh điệu chưa chuẩn?" },
      { speaker: "老师 · Giáo viên", hanzi: "因为你听完以后马上说，没有先慢慢模仿。", pinyin: "Yīnwèi nǐ tīng wán yǐhòu mǎshàng shuō, méiyǒu xiān mànmàn mófǎng.", meaning: "Vì nghe xong em nói ngay, chưa mô phỏng chậm trước." },
      { speaker: "明 · Minh", hanzi: "那我每天应该怎么练？", pinyin: "Nà wǒ měitiān yīnggāi zěnme liàn?", meaning: "Vậy mỗi ngày em nên luyện thế nào?" },
      { speaker: "老师 · Giáo viên", hanzi: "先听三遍，再跟读三遍，最后录下来比较。", pinyin: "Xiān tīng sān biàn, zài gēndú sān biàn, zuìhòu lù xiàlai bǐjiào.", meaning: "Đầu tiên nghe ba lượt, rồi đọc nhại ba lượt, cuối cùng thu âm để so sánh." },
      { speaker: "明 · Minh", hanzi: "每天十分钟可以吗？", pinyin: "Měitiān shí fēnzhōng kěyǐ ma?", meaning: "Mỗi ngày mười phút được không ạ?" },
      { speaker: "老师 · Giáo viên", hanzi: "可以。只要认真练、坚持练，你会进步得更快。", pinyin: "Kěyǐ. Zhǐyào rènzhēn liàn, jiānchí liàn, nǐ huì jìnbù de gèng kuài.", meaning: "Được. Chỉ cần luyện nghiêm túc và kiên trì, em sẽ tiến bộ nhanh hơn." },
    ],
  },
];

export const lesson25Grammar: GrammarPoint[] = [
  {
    title: "得: đánh giá cách hành động diễn ra",
    formula: "S + V + 得 + (mức độ) + tính từ",
    explanation: "Đặt 得 ngay sau động từ khi phần sau trả lời ‘làm như thế nào’. Đây là đánh giá hành động, không chỉ mô tả người hoặc vật.",
    examples: [{ hanzi: "她学得很好。", pinyin: "Tā xué de hěn hǎo.", meaning: "Cô ấy học rất giỏi." }, { hanzi: "你跑得太快了。", pinyin: "Nǐ pǎo de tài kuài le.", meaning: "Bạn chạy nhanh quá." }, { hanzi: "老师讲得很清楚。", pinyin: "Lǎoshī jiǎng de hěn qīngchu.", meaning: "Giáo viên giảng rất rõ." }],
    warning: { wrong: { hanzi: "她学很好。", pinyin: "Tā xué hěn hǎo.", meaning: "(Thiếu liên kết) Cô ấy học rất tốt." }, right: { hanzi: "她学得很好。", pinyin: "Tā xué de hěn hǎo.", meaning: "Cô ấy học rất giỏi." }, note: "很好 đánh giá cách 学 diễn ra nên phải nối bằng 得." },
  },
  {
    title: "Có tân ngữ: đưa tân ngữ lên trước 得",
    formula: "S + O + V + 得… · hoặc S + V + O + V + 得…",
    explanation: "得 cần đứng sát động từ được đánh giá. Với tân ngữ, có thể đưa tân ngữ lên trước động từ hoặc lặp lại động từ để giữ 得 sát động từ thứ hai.",
    examples: [{ hanzi: "她汉语说得很流利。", pinyin: "Tā Hànyǔ shuō de hěn liúlì.", meaning: "Cô ấy nói tiếng Trung rất lưu loát." }, { hanzi: "她说汉语说得很流利。", pinyin: "Tā shuō Hànyǔ shuō de hěn liúlì.", meaning: "Cô ấy nói tiếng Trung rất lưu loát." }, { hanzi: "他篮球打得很好。", pinyin: "Tā lánqiú dǎ de hěn hǎo.", meaning: "Anh ấy chơi bóng rổ rất giỏi." }],
    warning: { wrong: { hanzi: "她说得汉语很流利。", pinyin: "Tā shuō de Hànyǔ hěn liúlì.", meaning: "(Sai vị trí) Cô ấy nói tiếng Trung lưu loát." }, right: { hanzi: "她汉语说得很流利。", pinyin: "Tā Hànyǔ shuō de hěn liúlì.", meaning: "Cô ấy nói tiếng Trung rất lưu loát." }, note: "Không đặt tân ngữ 汉语 chen giữa 得 và phần bổ ngữ." },
  },
  {
    title: "Phủ định và nghi vấn nằm sau 得",
    formula: "V + 得 + 不 + tính từ · V + 得 + A 不 A / A 吗？",
    explanation: "Khi phủ định mức độ hoặc cách thực hiện, 不 đứng sau 得. Muốn hỏi, lặp tính từ hoặc dùng 吗.",
    examples: [{ hanzi: "他说得不太快。", pinyin: "Tā shuō de bú tài kuài.", meaning: "Anh ấy nói không quá nhanh." }, { hanzi: "她写得好不好？", pinyin: "Tā xiě de hǎo bu hǎo?", meaning: "Cô ấy viết có tốt không?" }, { hanzi: "你听得清楚吗？", pinyin: "Nǐ tīng de qīngchu ma?", meaning: "Bạn nghe có rõ không?" }],
    warning: { wrong: { hanzi: "他不跑得快。", pinyin: "Tā bù pǎo de kuài.", meaning: "(Sai trật tự) Anh ấy chạy không nhanh." }, right: { hanzi: "他跑得不快。", pinyin: "Tā pǎo de bù kuài.", meaning: "Anh ấy chạy không nhanh." }, note: "Không phủ định việc chạy; câu phủ định tốc độ chạy nên đặt 不 sau 得." },
  },
  {
    title: "Tính chất hay cách làm: 很流利 và 说得很流利",
    formula: "N + 很 + Adj · S + V + 得 + Adj",
    explanation: "她的汉语很流利 mô tả tiếng Trung của cô ấy; 她汉语说得很流利 đánh giá cách cô ấy nói. Hai câu gần nghĩa nhưng khác góc nhìn.",
    examples: [{ hanzi: "她的汉语很流利。", pinyin: "Tā de Hànyǔ hěn liúlì.", meaning: "Tiếng Trung của cô ấy rất lưu loát." }, { hanzi: "她汉语说得很流利。", pinyin: "Tā Hànyǔ shuō de hěn liúlì.", meaning: "Cô ấy nói tiếng Trung rất lưu loát." }, { hanzi: "他的字很漂亮，他写得也很认真。", pinyin: "Tā de zì hěn piàoliang, tā xiě de yě hěn rènzhēn.", meaning: "Chữ anh ấy đẹp, anh ấy viết cũng rất cẩn thận." }],
  },
  {
    title: "你看 / 你觉得……怎么样？",
    formula: "你看 / 你觉得 + người, vật, phương án + 怎么样？",
    explanation: "Dùng để xin nhận xét. 你看 có sắc thái ‘theo bạn thấy’; 你觉得 trực tiếp hỏi cảm nhận hoặc đánh giá.",
    examples: [{ hanzi: "你看这个节目怎么样？", pinyin: "Nǐ kàn zhège jiémù zěnmeyàng?", meaning: "Bạn thấy chương trình này thế nào?" }, { hanzi: "你觉得这个学习计划怎么样？", pinyin: "Nǐ juéde zhège xuéxí jìhuà zěnmeyàng?", meaning: "Bạn thấy kế hoạch học này thế nào?" }],
    warning: { wrong: { hanzi: "你看这个节目怎么？", pinyin: "Nǐ kàn zhège jiémù zěnme?", meaning: "(Thiếu 样) Bạn thấy chương trình này thế nào?" }, right: { hanzi: "你看这个节目怎么样？", pinyin: "Nǐ kàn zhège jiémù zěnmeyàng?", meaning: "Bạn thấy chương trình này thế nào?" }, note: "Hỏi đánh giá dùng 怎么样; 怎么 thường hỏi cách thức hoặc nguyên nhân." },
  },
  {
    title: "Khen và đáp lời khen cho tự nhiên",
    formula: "Khen cụ thể + 真 / 很… · 谢谢 / 哪里哪里 / 还要努力",
    explanation: "谢谢 hoàn toàn đúng và tự nhiên. 哪里哪里 mang sắc thái khiêm tốn truyền thống; có thể thêm 还要努力 để vừa nhận lời khen vừa thể hiện mình còn học tiếp.",
    examples: [{ hanzi: "你的发音真准！", pinyin: "Nǐ de fāyīn zhēn zhǔn!", meaning: "Phát âm của bạn chuẩn thật!" }, { hanzi: "谢谢，我还要多练习。", pinyin: "Xièxie, wǒ hái yào duō liànxí.", meaning: "Cảm ơn, tôi vẫn cần luyện thêm." }, { hanzi: "哪里哪里，你说得也很好。", pinyin: "Nǎlǐ nǎlǐ, nǐ shuō de yě hěn hǎo.", meaning: "Đâu có, bạn nói cũng rất tốt." }],
  },
];

export const lesson25Quizzes: Quiz[] = [
  { prompt: "Chọn câu đúng với nghĩa ‘Cô ấy học rất giỏi.’", options: [{ hanzi: "她学很好。", pinyin: "Tā xué hěn hǎo.", meaning: "Thiếu 得." }, { hanzi: "她学得很好。", pinyin: "Tā xué de hěn hǎo.", meaning: "Cô ấy học rất giỏi." }, { hanzi: "她得学很好。", pinyin: "Tā de xué hěn hǎo.", meaning: "得 đứng sai vị trí." }], answer: 1, feedback: "得 đứng ngay sau động từ 学 để nối với phần đánh giá 很好." },
  { prompt: "Bạn muốn nói ‘Cô ấy nói tiếng Trung rất lưu loát.’", options: [{ hanzi: "她说得汉语很流利。", pinyin: "Tā shuō de Hànyǔ hěn liúlì.", meaning: "Tân ngữ chen sau 得." }, { hanzi: "她汉语说得很流利。", pinyin: "Tā Hànyǔ shuō de hěn liúlì.", meaning: "Cô ấy nói tiếng Trung rất lưu loát." }, { hanzi: "她汉语得说很流利。", pinyin: "Tā Hànyǔ de shuō hěn liúlì.", meaning: "得 đứng trước động từ." }], answer: 1, feedback: "Đưa 汉语 lên trước, rồi đặt 得 sát sau động từ 说." },
  { prompt: "Câu nào phủ định tốc độ chạy?", options: [{ hanzi: "他不跑得快。", pinyin: "Tā bù pǎo de kuài.", meaning: "Sai trật tự trong mẫu này." }, { hanzi: "他跑得不快。", pinyin: "Tā pǎo de bù kuài.", meaning: "Anh ấy chạy không nhanh." }, { hanzi: "他跑不得快。", pinyin: "Tā pǎo bu de kuài.", meaning: "Không phải mẫu đang học." }], answer: 1, feedback: "Phủ định cách hành động diễn ra: V + 得 + 不 + tính từ." },
  { prompt: "Bạn muốn hỏi ý kiến về một tiết mục.", options: [{ hanzi: "你看这个节目怎么样？", pinyin: "Nǐ kàn zhège jiémù zěnmeyàng?", meaning: "Bạn thấy chương trình này thế nào?" }, { hanzi: "你看这个节目为什么？", pinyin: "Nǐ kàn zhège jiémù wèishénme?", meaning: "Bạn xem chương trình này tại sao?" }, { hanzi: "你看这个节目哪里？", pinyin: "Nǐ kàn zhège jiémù nǎlǐ?", meaning: "Bạn xem chương trình này ở đâu?" }], answer: 0, feedback: "怎么样 dùng để hỏi nhận xét hoặc đánh giá." },
  { prompt: "Người khác khen ‘你的汉语说得真好！’. Cách đáp nào vừa tự nhiên vừa khiêm tốn?", options: [{ hanzi: "谢谢，我还要多练习。", pinyin: "Xièxie, wǒ hái yào duō liànxí.", meaning: "Cảm ơn, tôi vẫn phải luyện thêm." }, { hanzi: "为什么？", pinyin: "Wèishénme?", meaning: "Tại sao?" }, { hanzi: "刚才。", pinyin: "Gāngcái.", meaning: "Lúc nãy." }], answer: 0, feedback: "谢谢 là tự nhiên; thêm 还要多练习 thể hiện thái độ khiêm tốn mà không phủ nhận lời khen." },
  { prompt: "Kết nối Bài 24: bạn đã học hát và hát khá tốt.", options: [{ hanzi: "我能唱歌唱得不错。", pinyin: "Wǒ néng chànggē chàng de búcuò.", meaning: "Tôi có điều kiện hát khá tốt." }, { hanzi: "我会唱歌，唱得还不错。", pinyin: "Wǒ huì chànggē, chàng de hái búcuò.", meaning: "Tôi biết hát và hát khá ổn." }, { hanzi: "我可以唱歌得不错。", pinyin: "Wǒ kěyǐ chànggē de búcuò.", meaning: "Đặt 得 chưa đúng." }], answer: 1, feedback: "会 nói kỹ năng đã học; câu sau dùng 唱得还不错 để đánh giá cách hát." },
];

export const lesson25OrderTask = { tokens: ["汉语", "她", "说得", "很流利"], answer: "她汉语说得很流利", translation: "Cô ấy nói tiếng Trung rất lưu loát.", pinyin: "Tā Hànyǔ shuō de hěn liúlì." };
export const lesson25DictationTask: Triplet = { hanzi: "因为她坚持练习，所以进步得很快。", pinyin: "Yīnwèi tā jiānchí liànxí, suǒyǐ jìnbù de hěn kuài.", meaning: "Vì cô ấy kiên trì luyện tập nên tiến bộ rất nhanh." };
export const lesson25TranslationTask: Triplet & { hint: string } = { hanzi: "你觉得我的发音怎么样？", pinyin: "Nǐ juéde wǒ de fāyīn zěnmeyàng?", meaning: "Bạn thấy phát âm của tôi thế nào?", hint: "你觉得 + nội dung + 怎么样？" };

export const lesson25WritingCharacters: WritingCharacter[] = [
  { hanzi: "得", pinyin: "de", meaning: "trợ từ bổ ngữ trạng thái", structure: "彳 trái trước, phần phải sau.", cue: "Bước chân dừng lại để đo mức độ." },
  { hanzi: "进", pinyin: "jìn", meaning: "tiến", structure: "井 trước, bộ 辶 sau.", cue: "Qua một mốc rồi đi tiếp." },
  { hanzi: "步", pinyin: "bù", meaning: "bước", structure: "Phần trên trước, các nét chân dưới sau.", cue: "Những dấu chân nối tiếp." },
  { hanzi: "提", pinyin: "tí", meaning: "nâng", structure: "扌 trái trước, 是 phải sau.", cue: "Bàn tay nhấc vật lên." },
  { hanzi: "准", pinyin: "zhǔn", meaning: "chuẩn", structure: "冫 trái trước, 隹 phải sau.", cue: "Chim đáp đúng giữa hai điểm căn." },
  { hanzi: "流", pinyin: "liú", meaning: "chảy", structure: "氵 trái trước, phần phải sau.", cue: "Dòng nước chảy không ngắt." },
  { hanzi: "努", pinyin: "nǔ", meaning: "cố gắng", structure: "Phần trên trước, 力 dưới sau.", cue: "Sức lực đẩy lên từ dưới." },
  { hanzi: "认", pinyin: "rèn", meaning: "nhận, công nhận", structure: "讠 trái trước, 人 phải sau.", cue: "Lời nói rõ với một người." },
  { hanzi: "坚", pinyin: "jiān", meaning: "vững, kiên", structure: "Phần trên trước, 土 dưới sau.", cue: "Đứng chắc trên mặt đất." },
  { hanzi: "持", pinyin: "chí", meaning: "giữ", structure: "扌 trái trước, 寺 phải sau.", cue: "Bàn tay giữ chặt không buông." },
];
