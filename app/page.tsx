"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type LessonId = 23 | 24;
type SectionId = "overview" | "dialogue" | "vocab" | "grammar" | "practice" | "writing";
type Vocab = { hanzi: string; pinyin: string; meaning: string; note?: string; example: string; examplePinyin: string; exampleMeaning: string };
type Line = { speaker: string; hanzi: string; pinyin: string; meaning: string };
type Quiz = { prompt: string; pinyin?: string; options: string[]; answer: number; feedback: string };

const sections: { id: SectionId; label: string; icon: string }[] = [
  { id: "overview", label: "Tổng quan", icon: "◎" },
  { id: "dialogue", label: "Hội thoại", icon: "◌" },
  { id: "vocab", label: "Từ vựng", icon: "字" },
  { id: "grammar", label: "Ngữ pháp", icon: "法" },
  { id: "practice", label: "Luyện tập", icon: "✦" },
  { id: "writing", label: "Viết chữ", icon: "✎" },
];

const vocab23: Vocab[] = [
  { hanzi: "……边儿", pinyin: "…biānr", meaning: "bên, phía…", note: "Danh từ phương vị", example: "邮局在图书馆西边儿。", examplePinyin: "Yóujú zài túshūguǎn xībiānr.", exampleMeaning: "Bưu điện ở phía tây thư viện." },
  { hanzi: "东边儿", pinyin: "dōngbiānr", meaning: "phía đông", example: "学校东边儿有一个公园。", examplePinyin: "Xuéxiào dōngbiānr yǒu yí ge gōngyuán.", exampleMeaning: "Phía đông trường có một công viên." },
  { hanzi: "西边儿", pinyin: "xībiānr", meaning: "phía tây", example: "商店在邮局西边儿。", examplePinyin: "Shāngdiàn zài yóujú xībiānr.", exampleMeaning: "Cửa hàng ở phía tây bưu điện." },
  { hanzi: "南边儿", pinyin: "nánbiānr", meaning: "phía nam", example: "越南在中国南边儿。", examplePinyin: "Yuènán zài Zhōngguó nánbiānr.", exampleMeaning: "Việt Nam ở phía nam Trung Quốc." },
  { hanzi: "北边儿", pinyin: "běibiānr", meaning: "phía bắc", example: "中国在越南北边儿。", examplePinyin: "Zhōngguó zài Yuènán běibiānr.", exampleMeaning: "Trung Quốc ở phía bắc Việt Nam." },
  { hanzi: "前边儿 / 后边儿", pinyin: "qiánbiānr / hòubiānr", meaning: "phía trước / phía sau", example: "宿舍楼在邮局前边儿。", examplePinyin: "Sùshèlóu zài yóujú qiánbiānr.", exampleMeaning: "Tòa ký túc xá ở trước bưu điện." },
  { hanzi: "左边儿 / 右边儿", pinyin: "zuǒbiānr / yòubiānr", meaning: "bên trái / bên phải", example: "银行在学校左边儿。", examplePinyin: "Yínháng zài xuéxiào zuǒbiānr.", exampleMeaning: "Ngân hàng ở bên trái trường." },
  { hanzi: "里边儿 / 外边儿", pinyin: "lǐbiānr / wàibiānr", meaning: "bên trong / bên ngoài", example: "学校里边儿有邮局吗？", examplePinyin: "Xuéxiào lǐbiānr yǒu yóujú ma?", exampleMeaning: "Trong trường có bưu điện không?" },
  { hanzi: "上边儿 / 下边儿", pinyin: "shàngbiānr / xiàbiānr", meaning: "phía trên / phía dưới", example: "书在桌子上边儿。", examplePinyin: "Shū zài zhuōzi shàngbiānr.", exampleMeaning: "Sách ở trên bàn." },
  { hanzi: "离", pinyin: "lí", meaning: "cách", note: "Giới từ chỉ khoảng cách", example: "这儿离博物馆远吗？", examplePinyin: "Zhèr lí bówùguǎn yuǎn ma?", exampleMeaning: "Đây cách bảo tàng xa không?" },
  { hanzi: "远 / 近", pinyin: "yuǎn / jìn", meaning: "xa / gần", example: "不远，很近。", examplePinyin: "Bù yuǎn, hěn jìn.", exampleMeaning: "Không xa, rất gần." },
  { hanzi: "地方", pinyin: "dìfang", meaning: "nơi, chỗ, địa phương", example: "那是什么地方？", examplePinyin: "Nà shì shénme dìfang?", exampleMeaning: "Đó là nơi nào?" },
  { hanzi: "足球场", pinyin: "zúqiúchǎng", meaning: "sân bóng đá", example: "图书馆东边儿是一个足球场。", examplePinyin: "Túshūguǎn dōngbiānr shì yí ge zúqiúchǎng.", exampleMeaning: "Phía đông thư viện là một sân bóng đá." },
  { hanzi: "劳驾", pinyin: "láojià", meaning: "cảm phiền, làm ơn", note: "Mở đầu lời hỏi lịch sự", example: "劳驾，我打听一下儿。", examplePinyin: "Láojià, wǒ dǎting yíxiàr.", exampleMeaning: "Cảm phiền, cho tôi hỏi thăm một chút." },
  { hanzi: "打听", pinyin: "dǎting", meaning: "hỏi thăm, dò hỏi", example: "我想打听一下儿博物馆在哪儿。", examplePinyin: "Wǒ xiǎng dǎting yíxiàr bówùguǎn zài nǎr.", exampleMeaning: "Tôi muốn hỏi thăm bảo tàng ở đâu." },
  { hanzi: "博物馆", pinyin: "bówùguǎn", meaning: "viện bảo tàng", example: "博物馆在和平公园旁边儿。", examplePinyin: "Bówùguǎn zài Hépíng Gōngyuán pángbiānr.", exampleMeaning: "Bảo tàng ở cạnh công viên Hòa Bình." },
  { hanzi: "和平 / 广场", pinyin: "hépíng / guǎngchǎng", meaning: "hòa bình / quảng trường", example: "博物馆在和平公园和人民广场中间。", examplePinyin: "Bówùguǎn zài Hépíng Gōngyuán hé Rénmín Guǎngchǎng zhōngjiān.", exampleMeaning: "Bảo tàng nằm giữa công viên Hòa Bình và quảng trường Nhân Dân." },
  { hanzi: "中间", pinyin: "zhōngjiān", meaning: "ở giữa", example: "书店在银行和邮局中间。", examplePinyin: "Shūdiàn zài yínháng hé yóujú zhōngjiān.", exampleMeaning: "Hiệu sách ở giữa ngân hàng và bưu điện." },
  { hanzi: "从……到……", pinyin: "cóng… dào…", meaning: "từ… đến…", example: "从这儿到那儿有七八百米。", examplePinyin: "Cóng zhèr dào nàr yǒu qī bā bǎi mǐ.", exampleMeaning: "Từ đây đến đó khoảng bảy, tám trăm mét." },
  { hanzi: "一直", pinyin: "yìzhí", meaning: "thẳng, một mạch; luôn", example: "你从这儿一直往东走。", examplePinyin: "Nǐ cóng zhèr yìzhí wǎng dōng zǒu.", exampleMeaning: "Bạn từ đây cứ đi thẳng về phía đông." },
  { hanzi: "红绿灯", pinyin: "hónglǜdēng", meaning: "đèn giao thông", example: "到红绿灯那儿往左拐。", examplePinyin: "Dào hónglǜdēng nàr wǎng zuǒ guǎi.", exampleMeaning: "Đến đèn giao thông thì rẽ trái." },
  { hanzi: "往 / 拐", pinyin: "wǎng / guǎi", meaning: "về phía / rẽ", example: "往右拐，然后一直走。", examplePinyin: "Wǎng yòu guǎi, ránhòu yìzhí zǒu.", exampleMeaning: "Rẽ phải, sau đó đi thẳng." },
  { hanzi: "马路 / 座 / 白色", pinyin: "mǎlù / zuò / báisè", meaning: "đường cái / tòa (lượng từ) / màu trắng", example: "马路东边儿有一座白色的大楼。", examplePinyin: "Mǎlù dōngbiānr yǒu yí zuò báisè de dàlóu.", exampleMeaning: "Phía đông đường có một tòa nhà lớn màu trắng." },
];

const vocab24: Vocab[] = [
  { hanzi: "会", pinyin: "huì", meaning: "biết; có khả năng đã học được", example: "你会打太极拳吗？", examplePinyin: "Nǐ huì dǎ tàijíquán ma?", exampleMeaning: "Bạn biết tập Thái Cực Quyền không?" },
  { hanzi: "打", pinyin: "dǎ", meaning: "đánh, chơi, tập (động tác dùng tay)", example: "我不会打太极拳。", examplePinyin: "Wǒ bú huì dǎ tàijíquán.", exampleMeaning: "Tôi không biết tập Thái Cực Quyền." },
  { hanzi: "太极拳", pinyin: "tàijíquán", meaning: "Thái Cực Quyền", example: "我想学太极拳。", examplePinyin: "Wǒ xiǎng xué tàijíquán.", exampleMeaning: "Tôi muốn học Thái Cực Quyền." },
  { hanzi: "听说", pinyin: "tīngshuō", meaning: "nghe nói", example: "听说体育老师教太极拳。", examplePinyin: "Tīngshuō tǐyù lǎoshī jiāo tàijíquán.", exampleMeaning: "Nghe nói giáo viên thể dục dạy Thái Cực Quyền." },
  { hanzi: "下", pinyin: "xià", meaning: "tới, sau (thời gian)", example: "下星期一开始上课。", examplePinyin: "Xià xīngqīyī kāishǐ shàngkè.", exampleMeaning: "Thứ Hai tuần sau bắt đầu học." },
  { hanzi: "报名", pinyin: "bàomíng", meaning: "đăng ký, ghi danh", example: "我们去报名吧。", examplePinyin: "Wǒmen qù bàomíng ba.", exampleMeaning: "Chúng ta đi đăng ký nhé." },
  { hanzi: "开始", pinyin: "kāishǐ", meaning: "bắt đầu", example: "什么时候开始上课？", examplePinyin: "Shénme shíhou kāishǐ shàngkè?", exampleMeaning: "Khi nào bắt đầu học?" },
  { hanzi: "能", pinyin: "néng", meaning: "có thể; có điều kiện, khả năng", example: "您能不能再说一遍？", examplePinyin: "Nín néng bu néng zài shuō yí biàn?", exampleMeaning: "Thầy/cô có thể nói lại một lần nữa không?" },
  { hanzi: "再", pinyin: "zài", meaning: "lại, lần nữa (chưa xảy ra)", example: "请再说一遍。", examplePinyin: "Qǐng zài shuō yí biàn.", exampleMeaning: "Xin hãy nói lại một lần nữa." },
  { hanzi: "遍", pinyin: "biàn", meaning: "lần, lượt từ đầu đến cuối", example: "我听了三遍。", examplePinyin: "Wǒ tīng le sān biàn.", exampleMeaning: "Tôi đã nghe ba lượt." },
  { hanzi: "懂", pinyin: "dǒng", meaning: "hiểu", example: "我不懂“一三五”是什么意思。", examplePinyin: "Wǒ bù dǒng “yī sān wǔ” shì shénme yìsi.", exampleMeaning: "Tôi không hiểu ‘một, ba, năm’ có nghĩa là gì." },
  { hanzi: "舒服", pinyin: "shūfu", meaning: "thoải mái, dễ chịu", example: "她今天有点儿不舒服。", examplePinyin: "Tā jīntiān yǒudiǎnr bù shūfu.", exampleMeaning: "Hôm nay cô ấy hơi khó chịu trong người." },
  { hanzi: "意思", pinyin: "yìsi", meaning: "ý nghĩa", example: "这句话是什么意思？", examplePinyin: "Zhè jù huà shì shénme yìsi?", exampleMeaning: "Câu này có nghĩa là gì?" },
  { hanzi: "次", pinyin: "cì", meaning: "lần (số lần xảy ra)", example: "我去过两次北京。", examplePinyin: "Wǒ qù guo liǎng cì Běijīng.", exampleMeaning: "Tôi từng đi Bắc Kinh hai lần." },
  { hanzi: "小时", pinyin: "xiǎoshí", meaning: "giờ, tiếng đồng hồ", example: "一次一个小时。", examplePinyin: "Yí cì yí ge xiǎoshí.", exampleMeaning: "Mỗi buổi một tiếng." },
  { hanzi: "请假", pinyin: "qǐngjià", meaning: "xin phép nghỉ", example: "玛丽让我给她请个假。", examplePinyin: "Mǎlì ràng wǒ gěi tā qǐng ge jià.", exampleMeaning: "Mã Lệ nhờ tôi xin phép nghỉ giúp cô ấy." },
  { hanzi: "头疼", pinyin: "tóuténg", meaning: "đau đầu", example: "她头疼，不能来上课。", examplePinyin: "Tā tóuténg, bù néng lái shàngkè.", exampleMeaning: "Cô ấy đau đầu, không thể đến lớp." },
  { hanzi: "发烧", pinyin: "fāshāo", meaning: "sốt", example: "我发烧了。", examplePinyin: "Wǒ fāshāo le.", exampleMeaning: "Tôi bị sốt rồi." },
  { hanzi: "可能", pinyin: "kěnéng", meaning: "có lẽ, có khả năng", example: "她可能感冒了。", examplePinyin: "Tā kěnéng gǎnmào le.", exampleMeaning: "Có lẽ cô ấy bị cảm rồi." },
  { hanzi: "咳嗽", pinyin: "késou", meaning: "ho", example: "他咳嗽得很厉害。", examplePinyin: "Tā késou de hěn lìhai.", exampleMeaning: "Anh ấy ho rất nặng." },
  { hanzi: "感冒", pinyin: "gǎnmào", meaning: "cảm, cảm cúm", example: "我有点儿感冒。", examplePinyin: "Wǒ yǒudiǎnr gǎnmào.", exampleMeaning: "Tôi hơi bị cảm." },
  { hanzi: "了", pinyin: "le", meaning: "rồi; đánh dấu trạng thái mới", example: "她感冒了。", examplePinyin: "Tā gǎnmào le.", exampleMeaning: "Cô ấy bị cảm rồi." },
  { hanzi: "看病", pinyin: "kànbìng", meaning: "khám bệnh", example: "她要去医院看病。", examplePinyin: "Tā yào qù yīyuàn kànbìng.", exampleMeaning: "Cô ấy cần đi bệnh viện khám bệnh." },
];

const dialogues: Record<LessonId, { title: string; lines: Line[] }[]> = {
  23: [
    { title: "学校里边儿有邮局吗？ · Trong trường có bưu điện không?", lines: [
      { speaker: "山本", hanzi: "学校里边儿有邮局吗？", pinyin: "Xuéxiào lǐbiānr yǒu yóujú ma?", meaning: "Trong trường có bưu điện không?" },
      { speaker: "张东", hanzi: "有。", pinyin: "Yǒu.", meaning: "Có." },
      { speaker: "山本", hanzi: "邮局在哪儿？", pinyin: "Yóujú zài nǎr?", meaning: "Bưu điện ở đâu?" },
      { speaker: "张东", hanzi: "在图书馆西边儿。", pinyin: "Zài túshūguǎn xībiānr.", meaning: "Ở phía tây thư viện." },
      { speaker: "山本", hanzi: "离这儿远吗？", pinyin: "Lí zhèr yuǎn ma?", meaning: "Có xa đây không?" },
      { speaker: "张东", hanzi: "不远。很近。", pinyin: "Bù yuǎn. Hěn jìn.", meaning: "Không xa. Rất gần." },
      { speaker: "山本", hanzi: "图书馆东边儿是什么地方？", pinyin: "Túshūguǎn dōngbiānr shì shénme dìfang?", meaning: "Phía đông thư viện là nơi nào?" },
      { speaker: "张东", hanzi: "图书馆东边儿是一个足球场。", pinyin: "Túshūguǎn dōngbiānr shì yí ge zúqiúchǎng.", meaning: "Phía đông thư viện là một sân bóng đá." },
    ]},
    { title: "从这儿到博物馆有多远？ · Từ đây đến bảo tàng bao xa?", lines: [
      { speaker: "玛丽", hanzi: "劳驾，我打听一下儿，博物馆在哪儿？", pinyin: "Láojià, wǒ dǎting yíxiàr, bówùguǎn zài nǎr?", meaning: "Cảm phiền, cho tôi hỏi thăm một chút, bảo tàng ở đâu?" },
      { speaker: "路人", hanzi: "博物馆在东边儿，在和平公园和人民广场中间。", pinyin: "Bówùguǎn zài dōngbiānr, zài Hépíng Gōngyuán hé Rénmín Guǎngchǎng zhōngjiān.", meaning: "Bảo tàng ở phía đông, giữa công viên Hòa Bình và quảng trường Nhân Dân." },
      { speaker: "玛丽", hanzi: "离这儿有多远？", pinyin: "Lí zhèr yǒu duō yuǎn?", meaning: "Cách đây bao xa?" },
      { speaker: "路人", hanzi: "从这儿到那儿大概有七八百米。", pinyin: "Cóng zhèr dào nàr dàgài yǒu qī bā bǎi mǐ.", meaning: "Từ đây đến đó khoảng bảy, tám trăm mét." },
      { speaker: "玛丽", hanzi: "怎么走呢？", pinyin: "Zěnme zǒu ne?", meaning: "Đi như thế nào?" },
      { speaker: "路人", hanzi: "你从这儿一直往东走，到红绿灯那儿往左拐，马路东边儿有一座白色的大楼，那就是博物馆。", pinyin: "Nǐ cóng zhèr yìzhí wǎng dōng zǒu, dào hónglǜdēng nàr wǎng zuǒ guǎi, mǎlù dōngbiānr yǒu yí zuò báisè de dàlóu, nà jiù shì bówùguǎn.", meaning: "Từ đây bạn cứ đi thẳng về phía đông, đến đèn giao thông thì rẽ trái; phía đông đường có một tòa nhà lớn màu trắng, đó chính là bảo tàng." },
      { speaker: "玛丽", hanzi: "谢谢您！", pinyin: "Xièxie nín!", meaning: "Cảm ơn bác!" },
      { speaker: "路人", hanzi: "不客气。", pinyin: "Bú kèqi.", meaning: "Không có gì." },
    ]},
  ],
  24: [
    { title: "我想学太极拳 · Tôi muốn học Thái Cực Quyền", lines: [
      { speaker: "玛丽", hanzi: "你会打太极拳吗？", pinyin: "Nǐ huì dǎ tàijíquán ma?", meaning: "Bạn biết tập Thái Cực Quyền không?" },
      { speaker: "罗兰", hanzi: "不会。你呢？", pinyin: "Bú huì. Nǐ ne?", meaning: "Không biết. Còn bạn?" },
      { speaker: "玛丽", hanzi: "我也不会。你想不想学？", pinyin: "Wǒ yě bú huì. Nǐ xiǎng bu xiǎng xué?", meaning: "Tôi cũng không biết. Bạn có muốn học không?" },
      { speaker: "罗兰", hanzi: "想学。", pinyin: "Xiǎng xué.", meaning: "Muốn học." },
      { speaker: "玛丽", hanzi: "我也想学。听说体育老师下星期教太极拳，我们去报名吧。", pinyin: "Wǒ yě xiǎng xué. Tīngshuō tǐyù lǎoshī xià xīngqī jiāo tàijíquán, wǒmen qù bàomíng ba.", meaning: "Tôi cũng muốn học. Nghe nói giáo viên thể dục tuần sau dạy Thái Cực Quyền, chúng ta đi đăng ký nhé." },
      { speaker: "罗兰", hanzi: "好。", pinyin: "Hǎo.", meaning: "Được." },
    ]},
    { title: "您能不能再说一遍？ · Có thể nói lại một lần nữa không?", lines: [
      { speaker: "玛丽", hanzi: "老师，我们想学太极拳，现在可以报名吗？", pinyin: "Lǎoshī, wǒmen xiǎng xué tàijíquán, xiànzài kěyǐ bàomíng ma?", meaning: "Thưa thầy/cô, chúng em muốn học Thái Cực Quyền, bây giờ có thể đăng ký không ạ?" },
      { speaker: "老师", hanzi: "可以。", pinyin: "Kěyǐ.", meaning: "Có thể." },
      { speaker: "玛丽", hanzi: "什么时候开始上课？", pinyin: "Shénme shíhou kāishǐ shàngkè?", meaning: "Khi nào bắt đầu học?" },
      { speaker: "老师", hanzi: "下星期一。", pinyin: "Xià xīngqīyī.", meaning: "Thứ Hai tuần sau." },
      { speaker: "玛丽", hanzi: "每天下午都有课吗？", pinyin: "Měitiān xiàwǔ dōu yǒu kè ma?", meaning: "Chiều nào cũng có lớp ạ?" },
      { speaker: "老师", hanzi: "不，只一三五下午。", pinyin: "Bù, zhǐ yī sān wǔ xiàwǔ.", meaning: "Không, chỉ chiều thứ Hai, Tư, Sáu." },
      { speaker: "玛丽", hanzi: "对不起，您能不能再说一遍？我不懂“一三五”是什么意思。", pinyin: "Duìbuqǐ, nín néng bu néng zài shuō yí biàn? Wǒ bù dǒng “yī sān wǔ” shì shénme yìsi.", meaning: "Xin lỗi, thầy/cô có thể nói lại một lần nữa không? Em không hiểu ‘một, ba, năm’ nghĩa là gì." },
      { speaker: "老师", hanzi: "就是星期一、星期三、星期五。", pinyin: "Jiù shì xīngqīyī, xīngqīsān, xīngqīwǔ.", meaning: "Chính là thứ Hai, thứ Tư và thứ Sáu." },
      { speaker: "玛丽", hanzi: "从几点到几点上课？", pinyin: "Cóng jǐ diǎn dào jǐ diǎn shàngkè?", meaning: "Học từ mấy giờ đến mấy giờ?" },
      { speaker: "老师", hanzi: "四点半到五点半。一次一个小时。", pinyin: "Sì diǎn bàn dào wǔ diǎn bàn. Yí cì yí ge xiǎoshí.", meaning: "Từ bốn rưỡi đến năm rưỡi. Mỗi buổi một tiếng." },
    ]},
    { title: "玛丽怎么没来？ · Sao Mã Lệ không đến?", lines: [
      { speaker: "老师", hanzi: "玛丽！……玛丽怎么没来？", pinyin: "Mǎlì! … Mǎlì zěnme méi lái?", meaning: "Mã Lệ!… Sao Mã Lệ không đến?" },
      { speaker: "罗兰", hanzi: "老师，玛丽让我给她请个假。", pinyin: "Lǎoshī, Mǎlì ràng wǒ gěi tā qǐng ge jià.", meaning: "Thưa thầy/cô, Mã Lệ nhờ em xin phép nghỉ giúp." },
      { speaker: "罗兰", hanzi: "她今天有点儿不舒服，头疼、发烧、咳嗽，可能感冒了。", pinyin: "Tā jīntiān yǒudiǎnr bù shūfu, tóuténg, fāshāo, késou, kěnéng gǎnmào le.", meaning: "Hôm nay cô ấy hơi khó chịu, đau đầu, sốt và ho; có lẽ bị cảm rồi." },
      { speaker: "罗兰", hanzi: "她要去医院看病，不能来上课。", pinyin: "Tā yào qù yīyuàn kànbìng, bù néng lái shàngkè.", meaning: "Cô ấy phải đi bệnh viện khám bệnh, không thể đến lớp." },
    ]},
  ],
};

const grammar: Record<LessonId, { title: string; formula: string; explanation: string; examples: [string, string, string][]; warning?: string }[]> = {
  23: [
    { title: "Phương vị từ", formula: "Danh từ + phương vị từ", explanation: "Tiếng Trung đặt vật mốc trước, vị trí sau: 学校左边儿 = bên trái trường. Khi phương vị đứng trước danh từ làm định ngữ, phải có 的: 左边儿的学校.", examples: [["学校前边儿", "xuéxiào qiánbiānr", "phía trước trường"], ["旁边儿的学生", "pángbiānr de xuésheng", "học sinh ở bên cạnh"], ["桌子上有一本书。", "Zhuōzi shàng yǒu yì běn shū.", "Trên bàn có một quyển sách."]], warning: "Không nói 在中国里 hoặc 在北京里. Sau tên nước/thành phố thường không thêm 里." },
    { title: "Ba cách nói vị trí", formula: "A 在 nơi chốn · Nơi chốn 有 A · Nơi chốn 是 A", explanation: "在 trả lời ‘A ở đâu’; 有 trả lời ‘ở đó có gì’; 是 xác định ‘thứ ở đó là gì’. Thay đổi trật tự sẽ thay đổi trọng tâm thông tin.", examples: [["邮局在学校里边儿。", "Yóujú zài xuéxiào lǐbiānr.", "Bưu điện ở trong trường."], ["学校里边儿有一个邮局。", "Xuéxiào lǐbiānr yǒu yí ge yóujú.", "Trong trường có một bưu điện."], ["学校西边儿是邮局。", "Xuéxiào xībiānr shì yóujú.", "Phía tây trường là bưu điện."]]},
    { title: "离、从、往", formula: "A 离 B… · 从 A 到 B · 往 + hướng + động từ", explanation: "离 đo khoảng cách; 从 nêu điểm xuất phát; 往 nêu hướng chuyển động. Đây là ba góc nhìn khác nhau nên không đổi lẫn cho nhau.", examples: [["公园离邮局很近。", "Gōngyuán lí yóujú hěn jìn.", "Công viên cách bưu điện rất gần."], ["从学校到博物馆有多远？", "Cóng xuéxiào dào bówùguǎn yǒu duō yuǎn?", "Từ trường đến bảo tàng bao xa?"], ["一直往前走。", "Yìzhí wǎng qián zǒu.", "Cứ đi thẳng về phía trước."]]},
    { title: "多 + tính từ và ước lượng", formula: "多远 / 多高 / 多大 / 多重 / 多长", explanation: "多 đi với tính từ đơn âm tiết để hỏi mức độ. Khi ước lượng, có thể dùng 有 trước số lượng hoặc hai số liền nhau.", examples: [["你多高？", "Nǐ duō gāo?", "Bạn cao bao nhiêu?"], ["这个箱子多重？", "Zhège xiāngzi duō zhòng?", "Vali này nặng bao nhiêu?"], ["有七八百米。", "Yǒu qī bā bǎi mǐ.", "Khoảng bảy, tám trăm mét."]]},
  ],
  24: [
    { title: "会、能、可以", formula: "会 + kỹ năng · 能 + điều kiện/năng lực · 可以 + cho phép", explanation: "会 nhấn mạnh kỹ năng học được. 能 nói khả năng hoặc điều kiện thực tế. 可以 thường dùng để xin/cho phép và đưa ra gợi ý. Trong hội thoại thực tế, 能 và 可以 đôi khi cùng dùng được nhưng trọng tâm khác nhau.", examples: [["我会说汉语。", "Wǒ huì shuō Hànyǔ.", "Tôi biết nói tiếng Trung."], ["我今天不能来。", "Wǒ jīntiān bù néng lái.", "Hôm nay tôi không thể đến."], ["现在可以报名吗？", "Xiànzài kěyǐ bàomíng ma?", "Bây giờ được phép đăng ký không?"]], warning: "Xin phép: 可以吗 / 能…吗. Từ chối: 不可以 hoặc 不能 tùy ý nghĩa; không nên học một công thức phủ định duy nhất." },
    { title: "想、要 và câu chính phản", formula: "想不想 / 能不能 / 会不会 + động từ", explanation: "Động từ năng nguyện đứng trước động từ chính. Trong câu chính phản, lặp lại động từ năng nguyện chứ không lặp lại động từ phía sau.", examples: [["你想不想学？", "Nǐ xiǎng bu xiǎng xué?", "Bạn có muốn học không?"], ["你会不会打太极拳？", "Nǐ huì bu huì dǎ tàijíquán?", "Bạn có biết tập Thái Cực Quyền không?"], ["您能不能再说一遍？", "Nín néng bu néng zài shuō yí biàn?", "Thầy/cô có thể nói lại một lượt không?"]], warning: "Không nói *你想学不学 hoặc *你会打不打太极拳 khi đang hỏi chính phản về ý muốn/năng lực." },
    { title: "再 và 又", formula: "再 + V: sẽ lặp lại · 又 + V: đã/đang lặp lại", explanation: "再 hướng tới một lần lặp chưa xảy ra. 又 mô tả việc đã lặp hoặc đang lặp. Gắn hai từ với trục thời gian sẽ dễ nhớ hơn dịch đơn thuần là ‘lại’.", examples: [["请再说一遍。", "Qǐng zài shuō yí biàn.", "Xin nói lại một lượt nữa."], ["明年我再去中国。", "Míngnián wǒ zài qù Zhōngguó.", "Năm sau tôi sẽ lại đi Trung Quốc."], ["他今天又迟到了。", "Tā jīntiān yòu chídào le.", "Hôm nay anh ấy lại đến muộn rồi."]]},
    { title: "怎么: cách thức và nguyên nhân", formula: "怎么 + V? · 怎么 + 没/不 + V? · …怎么了?", explanation: "Với động từ khẳng định, 怎么 thường hỏi cách làm. Trước dạng phủ định, nó thường hỏi nguyên nhân. 怎么了 hỏi ‘có chuyện gì/sao vậy’. Nghĩa phải được suy ra từ toàn câu.", examples: [["这个字怎么写？", "Zhège zì zěnme xiě?", "Chữ này viết thế nào?"], ["玛丽怎么没来？", "Mǎlì zěnme méi lái?", "Sao Mã Lệ không đến?"], ["你的手怎么了？", "Nǐ de shǒu zěnme le?", "Tay bạn làm sao vậy?"]]},
    { title: "Từ… đến… và 遍 / 次", formula: "从 + thời điểm A + 到 + thời điểm B · V + số + 遍/次", explanation: "从…到… nêu điểm đầu và cuối. 遍 đếm một lượt hoàn chỉnh từ đầu đến cuối; 次 chỉ đếm số lần xảy ra.", examples: [["从四点半到五点半上课。", "Cóng sì diǎn bàn dào wǔ diǎn bàn shàngkè.", "Học từ 4:30 đến 5:30."], ["请读两遍。", "Qǐng dú liǎng biàn.", "Hãy đọc hai lượt."], ["我去过三次。", "Wǒ qù guo sān cì.", "Tôi đã từng đi ba lần."]]},
  ],
};

const quizzes: Record<LessonId, Quiz[]> = {
  23: [
    { prompt: "Chọn câu có nghĩa: ‘Trong trường có một bưu điện.’", options: ["邮局在学校里边儿。", "学校里边儿有一个邮局。", "学校里边儿是一个邮局。"], answer: 1, feedback: "Muốn giới thiệu sự tồn tại ở một nơi, dùng: Nơi chốn + 有 + người/vật." },
    { prompt: "Điền từ: 公园___邮局很近。", pinyin: "Gōngyuán ___ yóujú hěn jìn.", options: ["从", "往", "离"], answer: 2, feedback: "离 kết nối hai địa điểm để nói khoảng cách." },
    { prompt: "Bạn muốn hỏi đường đi tới bảo tàng. Câu nào phù hợp?", options: ["博物馆多大？", "博物馆怎么走？", "博物馆有什么？"], answer: 1, feedback: "Địa điểm + 怎么走? dùng để hỏi đường." },
    { prompt: "‘Rẽ trái ở đèn giao thông’ là…", options: ["到红绿灯那儿往左拐。", "从红绿灯往右走。", "红绿灯在左边儿。"], answer: 0, feedback: "到…那儿 xác định điểm thực hiện hành động; 往左拐 = rẽ trái." },
    { prompt: "图书馆东边儿___一个足球场。 Chọn từ khi người nói muốn xác định nơi đó là gì.", options: ["有", "在", "是"], answer: 2, feedback: "Khi đã biết vị trí và xác định vật ở đó là gì, dùng 是." },
    { prompt: "Cách nói tự nhiên cho ‘khoảng 7–8 trăm mét’ là…", options: ["七百八百米", "七八百米", "七到八百个米"], answer: 1, feedback: "Hai số liền nhau biểu thị ước lượng: 七八百米." },
  ],
  24: [
    { prompt: "Bạn đã học lái xe. Chọn từ đúng: 我___开车。", options: ["会", "能", "可能"], answer: 0, feedback: "会 nhấn mạnh kỹ năng có được qua học tập." },
    { prompt: "Hôm nay bị sốt nên không thể đến lớp: 我今天___来上课。", options: ["不会", "不能", "不想"], answer: 1, feedback: "不能 diễn tả điều kiện thực tế không cho phép." },
    { prompt: "Xin phép đăng ký: 现在___报名吗？", options: ["会", "可以", "可能"], answer: 1, feedback: "可以 dùng rất tự nhiên để hỏi xin phép." },
    { prompt: "Năm sau tôi muốn lại đi Trung Quốc.", options: ["明年我想又去中国。", "明年我想再去中国。", "明年我想去又中国。"], answer: 1, feedback: "Hành động lặp lại trong tương lai dùng 再 + động từ." },
    { prompt: "Chọn câu chính phản đúng.", options: ["你想学不学太极拳？", "你想不想学太极拳？", "你想学太极拳不想？"], answer: 1, feedback: "Lặp lại động từ năng nguyện: 想不想 + 学." },
    { prompt: "Tôi nghe toàn bộ bài đọc ba lượt. Chọn lượng từ.", options: ["我听了三次课文。", "我听了三遍课文。", "我听了三个课文。"], answer: 1, feedback: "遍 đếm một lượt hành động hoàn chỉnh từ đầu đến cuối." },
  ],
};

const orderTasks: Record<LessonId, { tokens: string[]; answer: string; translation: string }> = {
  23: { tokens: ["往东", "从这儿", "一直", "走"], answer: "从这儿一直往东走", translation: "Từ đây cứ đi thẳng về phía đông." },
  24: { tokens: ["再", "您", "一遍", "说", "能不能"], answer: "您能不能再说一遍", translation: "Thầy/cô có thể nói lại một lần nữa không?" },
};

const writingCharacters: Record<LessonId, { char: string; pinyin: string; cue: string }[]> = {
  23: [
    { char: "边", pinyin: "biān", cue: "bên, phía" }, { char: "里", pinyin: "lǐ", cue: "bên trong" }, { char: "离", pinyin: "lí", cue: "cách" },
    { char: "远", pinyin: "yuǎn", cue: "xa" }, { char: "近", pinyin: "jìn", cue: "gần" }, { char: "往", pinyin: "wǎng", cue: "về phía" },
    { char: "左", pinyin: "zuǒ", cue: "trái" }, { char: "右", pinyin: "yòu", cue: "phải" }, { char: "路", pinyin: "lù", cue: "đường" },
  ],
  24: [
    { char: "会", pinyin: "huì", cue: "biết" }, { char: "能", pinyin: "néng", cue: "có thể" }, { char: "再", pinyin: "zài", cue: "lại" },
    { char: "遍", pinyin: "biàn", cue: "lượt" }, { char: "懂", pinyin: "dǒng", cue: "hiểu" }, { char: "疼", pinyin: "téng", cue: "đau" },
    { char: "烧", pinyin: "shāo", cue: "sốt/đốt" }, { char: "病", pinyin: "bìng", cue: "bệnh" }, { char: "想", pinyin: "xiǎng", cue: "muốn/nghĩ" },
  ],
};

const lessonMeta = {
  23: { hanzi: "学校里边儿有邮局吗？", pinyin: "Xuéxiào lǐbiānr yǒu yóujú ma?", vi: "Trong trường có bưu điện không?", color: "jade" },
  24: { hanzi: "我想学太极拳", pinyin: "Wǒ xiǎng xué tàijíquán", vi: "Tôi muốn học Thái Cực Quyền", color: "coral" },
};

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.76;
  window.speechSynthesis.speak(utterance);
}

export default function Home() {
  const [lesson, setLesson] = useState<LessonId>(23);
  const [section, setSection] = useState<SectionId>("overview");
  const [showPinyin, setShowPinyin] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const restoreProgress = window.setTimeout(() => {
      const saved = localStorage.getItem("cb2-pwa-progress");
      if (saved) setCompleted(JSON.parse(saved));
    }, 0);
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    return () => window.clearTimeout(restoreProgress);
  }, []);

  const markComplete = () => {
    const key = `${lesson}-${section}`;
    const next = completed.includes(key) ? completed.filter((item) => item !== key) : [...completed, key];
    setCompleted(next);
    localStorage.setItem("cb2-pwa-progress", JSON.stringify(next));
  };

  const progress = Math.round((completed.filter((x) => x.startsWith(`${lesson}-`)).length / sections.length) * 100);

  return (
    <main className={`app lesson-${lesson}`}>
      <header className="topbar">
        <button className="brand" onClick={() => setSection("overview")} aria-label="Về trang tổng quan">
          <span className="brand-mark">木</span>
          <span><strong>Mộc Mộc · CB2</strong><small>Học để dùng được</small></span>
        </button>
        <div className="study-controls">
          <button className={showPinyin ? "toggle active" : "toggle"} onClick={() => setShowPinyin(!showPinyin)}>Pinyin</button>
          <button className={showMeaning ? "toggle active" : "toggle"} onClick={() => setShowMeaning(!showMeaning)}>Nghĩa Việt</button>
        </div>
      </header>

      <aside className="sidebar">
        <div className="lesson-switch" role="group" aria-label="Chọn bài học">
          {([23, 24] as LessonId[]).map((id) => (
            <button key={id} className={lesson === id ? "lesson-chip active" : "lesson-chip"} onClick={() => { setLesson(id); setSection("overview"); }}>
              <span>Bài</span><strong>{id}</strong>
            </button>
          ))}
        </div>
        <nav aria-label="Các phần của bài học">
          {sections.map((item) => (
            <button key={item.id} className={section === item.id ? "nav-item active" : "nav-item"} onClick={() => setSection(item.id)}>
              <span className="nav-icon">{item.icon}</span><span>{item.label}</span>
              {completed.includes(`${lesson}-${item.id}`) && <span className="done">✓</span>}
            </button>
          ))}
        </nav>
        <div className="progress-card">
          <div><span>Tiến độ bài {lesson}</span><strong>{progress}%</strong></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <small>Tiến độ được lưu trên thiết bị này.</small>
        </div>
      </aside>

      <section className="workspace">
        <div className="lesson-heading">
          <div>
            <span className="eyebrow">第{lesson === 23 ? "二十三" : "二十四"}课 · BÀI {lesson}</span>
            <h1>{lessonMeta[lesson].hanzi}</h1>
            {showPinyin && <p className="heading-pinyin">{lessonMeta[lesson].pinyin}</p>}
            {showMeaning && <p className="heading-meaning">{lessonMeta[lesson].vi}</p>}
          </div>
          <button className="listen-main" onClick={() => speak(lessonMeta[lesson].hanzi)}><span>▶</span> Nghe tiêu đề</button>
        </div>

        {section === "overview" && <Overview lesson={lesson} showPinyin={showPinyin} showMeaning={showMeaning} go={setSection} />}
        {section === "dialogue" && <DialogueView lesson={lesson} showPinyin={showPinyin} showMeaning={showMeaning} />}
        {section === "vocab" && <VocabView lesson={lesson} showPinyin={showPinyin} showMeaning={showMeaning} />}
        {section === "grammar" && <GrammarView lesson={lesson} showPinyin={showPinyin} showMeaning={showMeaning} />}
        {section === "practice" && <PracticeView lesson={lesson} showPinyin={showPinyin} />}
        {section === "writing" && <WritingView lesson={lesson} />}

        <footer className="section-footer">
          <button className={completed.includes(`${lesson}-${section}`) ? "complete-button completed" : "complete-button"} onClick={markComplete}>
            {completed.includes(`${lesson}-${section}`) ? "✓ Đã hoàn thành phần này" : "Đánh dấu đã hoàn thành"}
          </button>
          <span>Nội dung bám sát Giáo trình Hán ngữ quyển 2 và slide CB2; ví dụ mở rộng được biên soạn mới.</span>
        </footer>
      </section>

      <nav className="mobile-nav" aria-label="Điều hướng di động">
        {sections.map((item) => (
          <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}><span>{item.icon}</span>{item.label}</button>
        ))}
      </nav>
    </main>
  );
}

function Overview({ lesson, showPinyin, showMeaning, go }: { lesson: LessonId; showPinyin: boolean; showMeaning: boolean; go: (s: SectionId) => void }) {
  const canDo = lesson === 23
    ? ["Mô tả vị trí bằng phương vị từ", "Hỏi và nói khoảng cách", "Hỏi đường và chỉ đường từng bước", "Phân biệt 在 / 有 / 是 trong câu vị trí"]
    : ["Nói điều mình biết, có thể và muốn làm", "Xin phép và nhờ người khác nhắc lại", "Nói lịch học từ mấy giờ đến mấy giờ", "Mô tả triệu chứng và xin phép nghỉ"];
  const memory = lesson === 23
    ? { hanzi: "在 = ở · 有 = có · 是 = là", pinyin: "zài · yǒu · shì", vi: "Hỏi A ở đâu → 在. Hỏi nơi đó có gì → 有. Xác định nơi đó là gì → 是." }
    : { hanzi: "会 = kỹ năng · 能 = điều kiện · 可以 = cho phép", pinyin: "huì · néng · kěyǐ", vi: "Đừng học cả ba đều là ‘có thể’; hãy nhớ chúng trả lời ba câu hỏi khác nhau." };
  return (
    <div className="content-stack">
      <section className="hero-grid">
        <div className="can-do panel">
          <span className="panel-kicker">HỌC XONG, BẠN CÓ THỂ</span>
          <h2>Biến kiến thức thành hành động</h2>
          <ul>{canDo.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          <button className="primary" onClick={() => go("dialogue")}>Bắt đầu bằng hội thoại <span>→</span></button>
        </div>
        <div className={`visual-panel visual-${lesson}`} aria-label={lesson === 23 ? "Bản đồ ghi nhớ phương hướng" : "Sơ đồ ghi nhớ động từ năng nguyện"}>
          {lesson === 23 ? <MiniMap /> : <AbilityWheel />}
        </div>
      </section>
      <section className="memory-strip">
        <div className="memory-symbol">记</div>
        <div><span>MÓC GHI NHỚ</span><h3>{memory.hanzi}</h3>{showPinyin && <p className="pinyin">{memory.pinyin}</p>}{showMeaning && <p>{memory.vi}</p>}</div>
        <button onClick={() => speak(memory.hanzi)}>▶ Nghe</button>
      </section>
      <section className="route-grid">
        <button onClick={() => go("vocab")}><span>01</span><strong>Nhận diện</strong><small>Thẻ từ có âm, nghĩa và câu</small></button>
        <button onClick={() => go("grammar")}><span>02</span><strong>Hiểu cấu trúc</strong><small>So sánh bằng ngữ cảnh</small></button>
        <button onClick={() => go("practice")}><span>03</span><strong>Tự nhớ lại</strong><small>Làm bài và nhận phản hồi</small></button>
        <button onClick={() => go("writing")}><span>04</span><strong>Viết bằng tay</strong><small>Hướng dẫn mờ dần</small></button>
      </section>
    </div>
  );
}

function MiniMap() {
  return <div className="mini-map">
    <div className="compass"><b>北</b><span>西　✦　东</span><b>南</b></div>
    <div className="map-place park"><span>♧</span><b>和平公园</b><small>Công viên</small></div>
    <div className="map-road horizontal" /><div className="map-road vertical" />
    <div className="map-place museum"><span>🏛</span><b>博物馆</b><small>Bảo tàng</small></div>
    <div className="map-place square"><span>▦</span><b>人民广场</b><small>Quảng trường</small></div>
    <div className="route-arrow">一直往东走 → 左拐</div>
  </div>;
}

function AbilityWheel() {
  return <div className="ability-wheel">
    <div className="wheel-center"><b>我</b><small>Tôi</small></div>
    <div className="wheel-node skill"><b>会</b><span>kỹ năng</span></div>
    <div className="wheel-node condition"><b>能</b><span>điều kiện</span></div>
    <div className="wheel-node permit"><b>可以</b><span>cho phép</span></div>
    <div className="wheel-node desire"><b>想</b><span>mong muốn</span></div>
    <div className="tai-chi">◐</div>
  </div>;
}

function DialogueView({ lesson, showPinyin, showMeaning }: { lesson: LessonId; showPinyin: boolean; showMeaning: boolean }) {
  const [active, setActive] = useState(0);
  return <div className="content-stack">
    <div className="tabs">{dialogues[lesson].map((d, i) => <button key={d.title} className={active === i ? "active" : ""} onClick={() => setActive(i)}>Hội thoại {i + 1}</button>)}</div>
    <section className="dialogue-panel panel">
      <div className="panel-heading"><div><span className="panel-kicker">先听，后看 · NGHE TRƯỚC, NHÌN SAU</span><h2>{dialogues[lesson][active].title}</h2></div><button className="listen-main compact" onClick={() => speak(dialogues[lesson][active].lines.map((x) => x.hanzi).join("。"))}>▶ Nghe toàn bài</button></div>
      <div className="dialogue-list">
        {dialogues[lesson][active].lines.map((line, index) => <article className="dialogue-line" key={`${line.hanzi}-${index}`}>
          <div className="speaker-avatar">{line.speaker.slice(0, 1)}</div>
          <div className="speech"><span className="speaker-name">{line.speaker}</span><button className="hanzi-line" onClick={() => speak(line.hanzi)}>{line.hanzi}<span>▶</span></button>{showPinyin && <p className="pinyin">{line.pinyin}</p>}{showMeaning && <p className="meaning">{line.meaning}</p>}</div>
        </article>)}
      </div>
      <div className="shadow-tip"><b>Shadowing 3 bước</b><span>① Nghe không nhìn chữ　② Nghe và nhại cùng nhịp　③ Đóng vai, đổi thông tin thật của bạn</span></div>
    </section>
  </div>;
}

function VocabView({ lesson, showPinyin, showMeaning }: { lesson: LessonId; showPinyin: boolean; showMeaning: boolean }) {
  const words = lesson === 23 ? vocab23 : vocab24;
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => words.filter((w) => `${w.hanzi}${w.pinyin}${w.meaning}`.toLowerCase().includes(query.toLowerCase())), [words, query]);
  const word = words[index % words.length];
  const nextCard = () => { setIndex((index + 1) % words.length); setRevealed(false); };
  return <div className="content-stack">
    <section className="flash-zone">
      <div className="flash-info"><span className="panel-kicker">THẺ NHỚ CHỦ ĐỘNG</span><h2>Nhìn chữ, tự gọi âm và nghĩa</h2><p>Hãy tự trả lời trước khi chạm “Hiện đáp án”. Đây là luyện nhớ lại, không phải chỉ đọc lại.</p><div className="flash-counter">{index + 1} / {words.length}</div></div>
      <div className={revealed ? "flash-card revealed" : "flash-card"}>
        <button className="sound-fab" onClick={() => speak(word.hanzi)} aria-label={`Nghe ${word.hanzi}`}>▶</button>
        <span className="flash-hanzi">{word.hanzi}</span>
        {revealed ? <div className="flash-answer">{showPinyin && <b className="pinyin">{word.pinyin}</b>}{showMeaning && <p>{word.meaning}</p>}{word.note && <small>{word.note}</small>}<div className="example"><strong>{word.example}</strong>{showPinyin && <span>{word.examplePinyin}</span>}{showMeaning && <em>{word.exampleMeaning}</em>}</div></div> : <button className="reveal" onClick={() => setRevealed(true)}>Hiện âm và nghĩa</button>}
        <button className="next-card" onClick={nextCard}>Thẻ tiếp theo →</button>
      </div>
    </section>
    <section className="word-bank panel">
      <div className="panel-heading"><div><span className="panel-kicker">TỪ ĐIỂN CỦA BÀI</span><h2>{words.length} mục từ trong ngữ cảnh</h2></div><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm chữ, pinyin hoặc nghĩa…" aria-label="Tìm từ vựng" /></div>
      <div className="word-grid">{filtered.map((w) => <button className="word-row" key={w.hanzi} onClick={() => speak(w.hanzi)}><b>{w.hanzi}</b>{showPinyin && <span className="pinyin">{w.pinyin}</span>}{showMeaning && <span>{w.meaning}</span>}<i>▶</i></button>)}</div>
    </section>
  </div>;
}

function GrammarView({ lesson, showPinyin, showMeaning }: { lesson: LessonId; showPinyin: boolean; showMeaning: boolean }) {
  const [active, setActive] = useState(0);
  const item = grammar[lesson][active];
  return <div className="grammar-layout">
    <aside className="grammar-index">{grammar[lesson].map((g, i) => <button key={g.title} className={active === i ? "active" : ""} onClick={() => setActive(i)}><span>{String(i + 1).padStart(2, "0")}</span>{g.title}</button>)}</aside>
    <section className="grammar-card panel">
      <span className="panel-kicker">HIỂU BẰNG ĐỐI CHIẾU</span><h2>{item.title}</h2><div className="formula">{item.formula}</div><p className="grammar-explain">{item.explanation}</p>
      <div className="examples">{item.examples.map(([hanzi, pinyin, meaning]) => <button key={hanzi} onClick={() => speak(hanzi)}><strong>{hanzi}<span>▶</span></strong>{showPinyin && <i>{pinyin}</i>}{showMeaning && <em>{meaning}</em>}</button>)}</div>
      {item.warning && <div className="warning"><b>⚠ Lỗi người Việt dễ mắc</b><p>{item.warning}</p></div>}
    </section>
  </div>;
}

function PracticeView({ lesson, showPinyin }: { lesson: LessonId; showPinyin: boolean }) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [missionChoice, setMissionChoice] = useState<number | null>(null);
  const quiz = quizzes[lesson][quizIndex];
  const task = orderTasks[lesson];
  const orderCorrect = order.join("") === task.answer;
  const selectAnswer = (i: number) => { if (selected !== null) return; setSelected(i); if (i === quiz.answer) setScore(score + 1); };
  const next = () => { setQuizIndex((quizIndex + 1) % quizzes[lesson].length); setSelected(null); };
  return <div className="content-stack">
    <section className="practice-head"><div><span className="panel-kicker">KHÔNG CHỈ CHỌN ĐÁP ÁN</span><h2>Nhớ lại → nhận phản hồi → dùng ngay</h2></div><div className="score-badge"><span>Điểm vòng này</span><b>{score}/{quizzes[lesson].length}</b></div></section>
    <div className="practice-grid">
      <section className="quiz-card panel">
        <div className="quiz-meta"><span>Câu {quizIndex + 1}/{quizzes[lesson].length}</span><b>Chọn theo ngữ cảnh</b></div>
        <h3>{quiz.prompt}</h3>{showPinyin && quiz.pinyin && <p className="pinyin">{quiz.pinyin}</p>}
        <div className="quiz-options">{quiz.options.map((option, i) => <button key={option} className={selected === null ? "" : i === quiz.answer ? "correct" : selected === i ? "wrong" : "muted"} onClick={() => selectAnswer(i)}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>
        {selected !== null && <div className={selected === quiz.answer ? "feedback good" : "feedback"}><b>{selected === quiz.answer ? "Đúng rồi!" : "Chưa đúng."}</b><p>{quiz.feedback}</p><button onClick={next}>Câu tiếp theo →</button></div>}
      </section>
      <section className="order-card panel">
        <span className="panel-kicker">XẾP CÂU</span><h3>{task.translation}</h3>
        <div className="answer-zone">{order.length ? order.map((token, i) => <button key={`${token}-${i}`} onClick={() => setOrder(order.filter((_, x) => x !== i))}>{token}</button>) : <span>Chạm các từ theo đúng thứ tự…</span>}</div>
        <div className="token-bank">{task.tokens.filter((t) => !order.includes(t)).map((token) => <button key={token} onClick={() => setOrder([...order, token])}>{token}</button>)}</div>
        {order.length === task.tokens.length && <div className={orderCorrect ? "mini-result correct" : "mini-result wrong"}>{orderCorrect ? "✓ Chính xác!" : "Thứ tự chưa đúng. Hãy thử lại."}</div>}
        <button className="text-button" onClick={() => setOrder([])}>Làm lại</button>
      </section>
    </div>
    {lesson === 23 ? <MapMission choice={missionChoice} setChoice={setMissionChoice} /> : <ScheduleMission choice={missionChoice} setChoice={setMissionChoice} />}
  </div>;
}

function MapMission({ choice, setChoice }: { choice: number | null; setChoice: (n: number) => void }) {
  const options = ["一直往东走 → 到红绿灯往左拐", "一直往西走 → 到银行往右拐", "往南走 → 过公园往东拐"];
  return <section className="mission panel"><div className="mission-copy"><span className="panel-kicker">NHIỆM VỤ BẢN ĐỒ</span><h2>Đưa Mã Lệ đến bảo tàng</h2><p>她从“这里”出发。请选正确的路线。<br/><span className="pinyin">Tā cóng “zhèlǐ” chūfā. Qǐng xuǎn zhèngquè de lùxiàn.</span></p><div className="mission-options">{options.map((o, i) => <button key={o} className={choice === null ? "" : i === 0 ? "correct" : choice === i ? "wrong" : "muted"} onClick={() => setChoice(i)}>{o}</button>)}</div>{choice !== null && <p className="mission-feedback">{choice === 0 ? "✓ Đúng: đi thẳng về đông, đến đèn giao thông thì rẽ trái." : "Hãy xác định điểm đầu, hướng đi và mốc rẽ trong hội thoại."}</p>}</div><div className="mission-map"><MiniMap /><span className="start-dot">这里</span></div></section>;
}

function ScheduleMission({ choice, setChoice }: { choice: number | null; setChoice: (n: number) => void }) {
  const slots = ["周一 16:30–17:30", "周三 16:30–17:30", "周五 16:30–17:30", "周日 16:30–17:30"];
  return <section className="mission panel"><div className="mission-copy"><span className="panel-kicker">NHIỆM VỤ LỊCH HỌC</span><h2>“一三五下午” là lịch nào?</h2><p>Chọn một ô không thuộc lịch học Thái Cực Quyền.</p><div className="schedule-grid">{slots.map((o, i) => <button key={o} className={choice === null ? "" : i === 3 ? "correct" : choice === i ? "wrong" : "muted"} onClick={() => setChoice(i)}><b>{o.slice(0, 2)}</b><span>{o.slice(3)}</span></button>)}</div>{choice !== null && <p className="mission-feedback">{choice === 3 ? "✓ Đúng: 一三五 là thứ Hai, Tư, Sáu; không có Chủ nhật." : "Ô này thuộc 一三五. Hãy tìm ngày còn lại."}</p>}</div><div className="calendar-visual"><span>太极拳</span><b>16:30</b><i>→</i><b>17:30</b><small>一次一个小时</small></div></section>;
}

function WritingView({ lesson }: { lesson: LessonId }) {
  const chars = writingCharacters[lesson];
  const [charIndex, setCharIndex] = useState(0);
  const [guide, setGuide] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const selected = chars[charIndex];

  const prepareCanvas = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const size = Math.min(canvas.parentElement?.clientWidth || 480, 520); const ratio = window.devicePixelRatio || 1;
    canvas.width = size * ratio; canvas.height = size * ratio; canvas.style.width = `${size}px`; canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d"); if (!ctx) return; ctx.scale(ratio, ratio); ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#173c38"; ctx.lineWidth = Math.max(5, size / 58);
  };
  useEffect(() => { prepareCanvas(); const resize = () => prepareCanvas(); window.addEventListener("resize", resize); return () => window.removeEventListener("resize", resize); }, [charIndex]);
  const position = (e: React.PointerEvent<HTMLCanvasElement>) => { const rect = e.currentTarget.getBoundingClientRect(); return { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
  const down = (e: React.PointerEvent<HTMLCanvasElement>) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); const p = position(e); const ctx = e.currentTarget.getContext("2d"); ctx?.beginPath(); ctx?.moveTo(p.x, p.y); };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => { if (!drawing.current) return; const p = position(e); const ctx = e.currentTarget.getContext("2d"); ctx?.lineTo(p.x, p.y); ctx?.stroke(); };
  const up = () => { drawing.current = false; };
  const clear = () => { const canvas = canvasRef.current; if (!canvas) return; canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height); prepareCanvas(); };

  return <div className="writing-layout">
    <aside className="character-picker panel"><span className="panel-kicker">CHỮ TRỌNG TÂM</span><h2>Chọn một chữ</h2><div className="char-grid">{chars.map((item, i) => <button key={item.char} className={charIndex === i ? "active" : ""} onClick={() => { setCharIndex(i); setGuide(true); }}>{item.char}<small>{item.pinyin}</small></button>)}</div><div className="writing-method"><b>Phương pháp 4 lượt</b><ol><li>Nhìn mẫu, viết trong không khí</li><li>Tô theo chữ mờ</li><li>Tắt mẫu và viết từ trí nhớ</li><li>Dùng chữ trong một từ/câu</li></ol></div></aside>
    <section className="writing-studio panel">
      <div className="writing-head"><div><span>Đang luyện</span><h2>{selected.char} <small>{selected.pinyin} · {selected.cue}</small></h2></div><button onClick={() => speak(selected.char)}>▶ Nghe âm</button></div>
      <div className="canvas-wrap"><div className="rice-grid" />{guide && <span className="guide-char">{selected.char}</span>}<canvas ref={canvasRef} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up} aria-label={`Bảng luyện viết chữ ${selected.char}`} /></div>
      <div className="canvas-tools"><button onClick={() => setGuide(!guide)}>{guide ? "Ẩn chữ mẫu" : "Hiện chữ mẫu"}</button><button onClick={clear}>Xóa và viết lại</button><button className="primary" onClick={() => { clear(); setCharIndex((charIndex + 1) % chars.length); }}>Chữ tiếp theo →</button></div>
      <div className="writing-cue"><b>Nhớ hình, không chép máy móc:</b><span>Đọc to “{selected.char} — {selected.pinyin} — {selected.cue}”, tắt chữ mẫu rồi viết lại. Sau 10 phút quay lại kiểm tra một lần nữa.</span></div>
    </section>
  </div>;
}
