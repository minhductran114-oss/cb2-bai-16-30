import type { LessonExtension, LessonId } from "./lesson-types";

export const lessonExtensions: Record<LessonId, LessonExtension> = {
  23: {
    bridgeTitle: "Từ bản đồ trong sách đến một lần hỏi đường thật",
    bridgeSummary: "Không chỉ thuộc phương vị từ: hãy học cách mở lời, chia chỉ dẫn thành mốc nhỏ, rồi nói lại để xác nhận trước khi rời đi.",
    priorKnowledge: [
      { hanzi: "学校里边儿有邮局吗？", pinyin: "Xuéxiào lǐbiānr yǒu yóujú ma?", meaning: "Trong trường có bưu điện không?" },
      { hanzi: "我想打听一下儿。", pinyin: "Wǒ xiǎng dǎting yíxiàr.", meaning: "Tôi muốn hỏi thăm một chút." },
    ],
    topics: [
      {
        eyebrow: "CHIẾN LƯỢC GIAO TIẾP",
        title: "Một câu hỏi đường tốt có bốn mảnh",
        explanation: "Mở lời lịch sự → nêu địa điểm → hỏi khoảng cách hoặc đường đi → nhắc lại mốc để xác nhận. Chỉ cần bốn mảnh này, bạn ít bị lạc dù vốn từ chưa nhiều.",
        examples: [
          { hanzi: "劳驾，地铁站离这儿远吗？", pinyin: "Láojià, dìtiězhàn lí zhèr yuǎn ma?", meaning: "Cảm phiền, ga tàu điện cách đây xa không?" },
          { hanzi: "我确认一下儿：到路口往右拐，对吗？", pinyin: "Wǒ quèrèn yíxiàr: dào lùkǒu wǎng yòu guǎi, duì ma?", meaning: "Tôi xác nhận lại: đến giao lộ thì rẽ phải, đúng không?" },
        ],
        practicalTip: "Khi nghe đường, ghi lại ‘mốc + hướng’ thay vì cố nhớ cả câu: 红绿灯 → 左拐 → 白楼。",
      },
      {
        eyebrow: "MỞ RỘNG TỰ NHIÊN",
        title: "走路五分钟 thường hữu ích hơn 500米",
        explanation: "Ngoài đời, người nói thường ước lượng bằng thời gian đi bộ. Có thể dùng 走路, 骑车 hoặc 开车 + thời lượng để câu trả lời thiết thực hơn.",
        examples: [
          { hanzi: "不远，走路大概五分钟。", pinyin: "Bù yuǎn, zǒulù dàgài wǔ fēnzhōng.", meaning: "Không xa, đi bộ khoảng năm phút." },
          { hanzi: "骑车十分钟就到了。", pinyin: "Qíchē shí fēnzhōng jiù dào le.", meaning: "Đi xe đạp mười phút là tới." },
        ],
        practicalTip: "大概 làm con số mềm hơn; 就到了 cho cảm giác ‘chỉ cần vậy là đến’. Đây là hai mảnh rất đáng học theo cụm.",
      },
      {
        eyebrow: "AN TOÀN KHI KHÔNG HIỂU",
        title: "Xin nhắc lại và xin nói chậm",
        explanation: "Đây là cầu nối trực tiếp sang Bài 24. Không hiểu chỉ dẫn không phải thất bại; biết yêu cầu người khác điều chỉnh tốc độ mới là kỹ năng giao tiếp.",
        examples: [
          { hanzi: "对不起，您能不能再说一遍？", pinyin: "Duìbuqǐ, nín néng bu néng zài shuō yí biàn?", meaning: "Xin lỗi, anh/chị có thể nói lại một lượt không?" },
          { hanzi: "请说慢一点儿。", pinyin: "Qǐng shuō màn yìdiǎnr.", meaning: "Xin nói chậm một chút." },
        ],
        practicalTip: "Dùng điện thoại mở bản đồ và hỏi 请在地图上指一下儿，可以吗？ nếu chỉ nghe vẫn chưa hình dung được.",
      },
    ],
    fieldMission: { title: "Bản đồ ba điểm", prompt: "Chọn ba nơi gần nhà. Tự nói vị trí tương đối, khoảng cách và chỉ đường từ điểm A đến B.", checklist: ["Có một câu 在 / 有 / 是", "Có một câu 离 hoặc 从…到…", "Có ít nhất hai mốc + hướng", "Có câu xác nhận 对吗？"] },
  },
  24: {
    bridgeTitle: "Từ ‘có thể’ chung chung đến bốn quyết định giao tiếp",
    bridgeSummary: "会, 能, 可以 và 想 không phải bốn bản dịch giống nhau. Khu mở rộng này biến chúng thành câu hỏi chẩn đoán: đã học chưa, đủ điều kiện không, có được phép không, và có muốn không.",
    priorKnowledge: [
      { hanzi: "您能不能再说一遍？", pinyin: "Nín néng bu néng zài shuō yí biàn?", meaning: "Thầy/cô có thể nói lại một lượt không?" },
      { hanzi: "我想学太极拳。", pinyin: "Wǒ xiǎng xué tàijíquán.", meaning: "Tôi muốn học Thái Cực Quyền." },
    ],
    topics: [
      {
        eyebrow: "BỘ LỌC 4 CÂU HỎI",
        title: "Chọn 会, 能, 可以 hay 想 trong ba giây",
        explanation: "Hỏi lần lượt: đây là kỹ năng đã học? điều kiện thực tế? sự cho phép? hay mong muốn? Câu trả lời đầu tiên ‘có’ thường chỉ ra từ cần dùng.",
        examples: [
          { hanzi: "我会游泳，但是今天不能游。", pinyin: "Wǒ huì yóuyǒng, dànshì jīntiān bù néng yóu.", meaning: "Tôi biết bơi, nhưng hôm nay không thể bơi." },
          { hanzi: "这里可以游泳吗？", pinyin: "Zhèlǐ kěyǐ yóuyǒng ma?", meaning: "Ở đây được phép bơi không?" },
        ],
        practicalTip: "Một người có thể 会开车 nhưng hôm nay 不能开车 vì mệt, và ở một con đường nào đó 不可以开车 vì bị cấm.",
      },
      {
        eyebrow: "LỊCH SỰ THEO MỨC",
        title: "Từ mệnh lệnh đến lời nhờ dễ nghe",
        explanation: "Thêm 请, 能不能 hoặc 可以……吗 biến yêu cầu trực tiếp thành lời nhờ có khoảng lựa chọn cho người nghe.",
        examples: [
          { hanzi: "请再说一遍。", pinyin: "Qǐng zài shuō yí biàn.", meaning: "Xin nói lại một lượt." },
          { hanzi: "您能不能帮我看一下儿？", pinyin: "Nín néng bu néng bāng wǒ kàn yíxiàr?", meaning: "Anh/chị có thể giúp tôi xem một chút không?" },
        ],
        practicalTip: "Với giáo viên hoặc người lạ, dùng 您 và thêm 对不起 ở đầu khi ngắt lời.",
      },
      {
        eyebrow: "MẪU TIN NHẮN THỰC TẾ",
        title: "Xin nghỉ: triệu chứng + ảnh hưởng + yêu cầu",
        explanation: "Một tin nhắn xin nghỉ rõ ràng không cần dài: nói triệu chứng, nói mình không thể tham gia, rồi xin phép và hứa cập nhật.",
        examples: [
          { hanzi: "老师，我有点儿发烧，今天不能来上课，想请一天假。", pinyin: "Lǎoshī, wǒ yǒudiǎnr fāshāo, jīntiān bù néng lái shàngkè, xiǎng qǐng yì tiān jià.", meaning: "Thưa cô, em hơi sốt, hôm nay không thể đến lớp, em muốn xin nghỉ một ngày." },
          { hanzi: "好一点儿以后，我会补今天的作业。", pinyin: "Hǎo yìdiǎnr yǐhòu, wǒ huì bǔ jīntiān de zuòyè.", meaning: "Sau khi đỡ hơn, em sẽ làm bù bài tập hôm nay." },
        ],
        practicalTip: "Không dùng 会 để nói trở ngại hiện tại; ‘hôm nay không thể đến’ là 今天不能来.",
      },
    ],
    fieldMission: { title: "Một kỹ năng, ba giới hạn", prompt: "Chọn một kỹ năng của bạn và tạo chuỗi câu có 会, 能/不能, 可以/不可以 và 想.", checklist: ["会 nói kỹ năng thật", "能 nói điều kiện hôm nay", "可以 nói quy định hoặc xin phép", "想 nói kế hoạch tiếp theo"] },
  },
  25: {
    bridgeTitle: "Từ ‘biết làm’ ở Bài 24 đến ‘làm như thế nào’ ở Bài 25",
    bridgeSummary: "Bài 24 cho bạn động từ năng nguyện trước hành động; Bài 25 thêm chiếc thước 得 sau hành động. Ghép hai lớp này, bạn có thể nói vừa khả năng vừa chất lượng thực hiện.",
    priorKnowledge: [
      { hanzi: "我会说汉语。", pinyin: "Wǒ huì shuō Hànyǔ.", meaning: "Tôi biết nói tiếng Trung." },
      { hanzi: "我会说汉语，但是说得不太流利。", pinyin: "Wǒ huì shuō Hànyǔ, dànshì shuō de bú tài liúlì.", meaning: "Tôi biết nói tiếng Trung nhưng nói chưa thật lưu loát." },
      { hanzi: "您能不能说慢一点儿？", pinyin: "Nín néng bu néng shuō màn yìdiǎnr?", meaning: "Anh/chị có thể nói chậm một chút không?" },
    ],
    topics: [
      {
        eyebrow: "BẢN ĐỒ CÂU",
        title: "Trước động từ nói khả năng; sau động từ đo chất lượng",
        explanation: "会/能/可以/想 đứng trước động từ và thay đổi quan hệ với hành động. 得 đứng sau động từ và mở phần mô tả hành động diễn ra tốt, nhanh, rõ hoặc chính xác đến đâu.",
        examples: [
          { hanzi: "她会唱中文歌，而且唱得很自然。", pinyin: "Tā huì chàng Zhōngwén gē, érqiě chàng de hěn zìrán.", meaning: "Cô ấy biết hát tiếng Trung và hát rất tự nhiên." },
          { hanzi: "我想说得更流利。", pinyin: "Wǒ xiǎng shuō de gèng liúlì.", meaning: "Tôi muốn nói lưu loát hơn." },
        ],
        practicalTip: "Dùng khung ‘我会……，但是……得不太……’ để nói năng lực thật mà không tự đánh giá quá cao.",
      },
      {
        eyebrow: "DE KHÔNG CHỈ CÓ MỘT",
        title: "的, 地, 得: nhìn vị trí thay vì học thuộc tên",
        explanation: "的 đứng trước danh từ; 地 thường đứng trước động từ để mô tả cách thực hiện; 得 đứng sau động từ để bổ sung kết quả hoặc trạng thái. Trong khẩu ngữ, 地 đôi khi bị lược nhưng vị trí vẫn là chìa khóa.",
        examples: [
          { hanzi: "认真的学生", pinyin: "rènzhēn de xuésheng", meaning: "học sinh nghiêm túc" },
          { hanzi: "认真地学习", pinyin: "rènzhēn de xuéxí", meaning: "học một cách nghiêm túc" },
          { hanzi: "学习得很认真", pinyin: "xuéxí de hěn rènzhēn", meaning: "học rất nghiêm túc" },
        ],
        practicalTip: "Tự hỏi: phía sau là danh từ → 的; phía sau là động từ → 地; phía trước vừa là động từ → 得.",
      },
      {
        eyebrow: "KHUYẾN KHÍCH CÓ ÍCH",
        title: "Khen cụ thể rồi đưa một bước tiếp theo",
        explanation: "‘Rất tốt’ dễ nghe nhưng ít chỉ dẫn. Lời phản hồi tốt nêu chính xác điểm mạnh rồi đề xuất một hành động nhỏ có thể làm ngay.",
        examples: [
          { hanzi: "你的声调说得很准，接下来可以练语速。", pinyin: "Nǐ de shēngdiào shuō de hěn zhǔn, jiēxiàlai kěyǐ liàn yǔsù.", meaning: "Thanh điệu của bạn rất chuẩn; tiếp theo có thể luyện tốc độ nói." },
          { hanzi: "你读得很流利，再注意一下儿停顿。", pinyin: "Nǐ dú de hěn liúlì, zài zhùyì yíxiàr tíngdùn.", meaning: "Bạn đọc rất lưu loát; hãy chú ý thêm một chút đến chỗ ngắt." },
        ],
        practicalTip: "Công thức phản hồi: điểm mạnh cụ thể + 接下来/再 + hành động nhỏ. Đây cũng là cách tự đánh giá bản ghi âm của mình.",
      },
      {
        eyebrow: "KẾ HOẠCH 10 PHÚT",
        title: "Shadowing có vòng phản hồi, không chỉ nghe lặp",
        explanation: "Nghe một câu ba lượt, nhại chậm ba lượt, thu một lượt, rồi chỉ chọn một lỗi để sửa. Vòng nhỏ này dễ duy trì hơn luyện dài nhưng không đo được tiến bộ.",
        examples: [
          { hanzi: "先听三遍，再跟读三遍。", pinyin: "Xiān tīng sān biàn, zài gēndú sān biàn.", meaning: "Đầu tiên nghe ba lượt, rồi đọc nhại ba lượt." },
          { hanzi: "今天只改一个声调。", pinyin: "Jīntiān zhǐ gǎi yí ge shēngdiào.", meaning: "Hôm nay chỉ sửa một thanh điệu." },
        ],
        practicalTip: "Lưu một bản ghi mỗi tuần và so với tuần trước; đừng so với người bản xứ ngay từ đầu.",
      },
    ],
    fieldMission: { title: "Huấn luyện viên phát âm 90 giây", prompt: "Nghe một đoạn ngắn của chính bạn hoặc bạn học, đưa hai lời khen cụ thể và một đề xuất cải thiện bằng cấu trúc của Bài 25.", checklist: ["Có hai câu V + 得 + đánh giá", "Có một câu 你觉得……怎么样？", "Có một lời đáp 谢谢 hoặc 哪里哪里", "Có một bước luyện tập cụ thể"] },
  },
};
