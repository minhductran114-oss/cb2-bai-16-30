# CB2 content and presentation guide

## 1. Audience and learning promise

The primary learner is a Vietnamese-speaking adult at CB2 level. Content must
help the learner recognize, understand, recall, and use Chinese in realistic
situations. It must not become a decorative transcription of the textbook.

Each lesson should answer:

- What can I do after this lesson?
- Which earlier knowledge am I using again?
- What new knowledge entered my course library?
- What should I review next?
- Where would I use this in real life?

## 2. Language accuracy and sources

- Check Chinese against the lesson slides and textbook context.
- Use existing HTML/PWA material as a draft source, not unquestioned truth.
- Verify grammar distinctions and avoid false absolute rules.
- Vietnamese should sound natural, concise, and appropriate to the situation.
- Extended dialogues and examples must be newly authored and realistic.
- Do not reproduce a full textbook dialogue merely to fill the dialogue view.
- Avoid unexplained vocabulary substantially beyond the current level.
- If a harder word is necessary, explain it and keep it outside the assessed
  core unless explicitly introduced.

## 3. The three-line learning unit

Every learner-visible Chinese word, phrase, example, instruction answer, and
dialogue line uses this order:

1. Chinese characters
2. pinyin with tone marks
3. natural Vietnamese meaning

The layers may be hidden by study controls, but must remain available in the
data. Do not place a Chinese label, speaker name, or example on screen without
explaining what it means for a beginner.

## 4. Chinese typography

Use one consistent, handwriting-like Chinese font family across the course:

```css
--font-hanzi: "LXGW WenKai Lite", "LXGW WenKai", "KaiTi", "STKaiti",
  "Kaiti SC", "FangSong", "STFangsong", serif;
```

The project already ships `lxgw-wenkai-lite-webfont`; prefer it rather than
adding multiple Chinese font packages. Use it for:

- lesson titles in Chinese;
- vocabulary and example Hanzi;
- dialogue Hanzi;
- grammar examples;
- stroke/writing labels.

UI controls and Vietnamese copy use a highly readable sans-serif stack:

```css
--font-ui: "Segoe UI Variable", "Segoe UI", "Noto Sans", Arial, sans-serif;
```

Do not apply a serif Vietnamese display font that breaks Vietnamese diacritics.
Do not mix KaiTi, SongTi, YaHei, and unrelated decorative fonts across cards.

## 5. Size, contrast, and hierarchy

Minimum targets on a normal mobile viewport:

- main vocabulary/dialogue Hanzi: 28 px;
- supporting Hanzi examples: 21 px;
- pinyin: 17 px with comfortable line height;
- Vietnamese meaning/body text: 17 px;
- controls: 16 px and a touch target of at least 44 × 44 px.

Visual roles:

- Hanzi: darkest/highest-emphasis learning text;
- pinyin: distinct teal/green with WCAG AA contrast on its background;
- Vietnamese: neutral dark slate, not pale gray;
- instructions/metadata: lower emphasis but still readable;
- correct/wrong states: use text/icon plus color, never color alone.

Warm paper/cream surfaces, restrained dark green, and muted red accents remain
the default visual language. Cards need clear spacing and grouping, not dense
borders or excessive empty space.

## 6. Pinyin standard

- Use tone marks: `nǐ hǎo`, not `ni3 hao3` or `ni hao` in teaching content.
- Preserve neutral tone without an invented mark.
- Follow standard tone-change spelling where the course material teaches the
  spoken form, while keeping dictionary forms in vocabulary metadata when
  useful.
- Keep segmentation consistent within a lesson.
- Handle 儿化 consistently, for example `zhèr`, `lǐbianr`, according to the
  source and the target pronunciation.
- Capitalize only the beginning of a sentence or a proper name.
- Use apostrophes where pinyin syllable boundaries require them.

For dictation feedback, missing tones are a specific learning error. A pinyin
answer with correct letters but no tones is not silently treated as identical
to a fully correct answer.

## 7. Vocabulary entries

Every core vocabulary entry includes:

- Chinese, pinyin with tones, and Vietnamese meaning;
- word class;
- topic/function tags;
- objective written structure;
- a distinct visual mnemonic;
- at least two useful compounds/collocations when appropriate;
- at least two natural example sentences when appropriate;
- introduced/reinforced lesson links;
- stroke characters only for meaningful writing targets.

### Structure versus mnemonic

`structure` describes what is visibly present in the written character or word.
`memory` creates a concrete image with movement or a short causal story. The two
fields must not paraphrase each other.

Mnemonics:

- use specific objects, positions, and movement;
- connect the closing image directly to the meaning;
- help remember visual layout, not only semantic meaning;
- include pinyin immediately after any Chinese inserted in Vietnamese prose;
- never claim an invented image is historical etymology.

## 8. Grammar

Each grammar point contains:

- a learner-friendly title;
- a compact formula;
- a short Vietnamese explanation;
- at least two three-line examples;
- a common error/contrast when it adds real value;
- links to prerequisite and related grammar.

Prefer functional explanations (“dùng khi xin phép…”) over terminology-heavy
descriptions. If a structure is optional, contextual, or a matter of emphasis,
say so. Do not label an acceptable sentence as wrong merely because another
form is more common.

## 9. Dialogue and real-life application

Every lesson has at least one expanded dialogue that:

- follows a plausible real-life setting;
- uses the lesson's target vocabulary and grammar;
- deliberately reuses earlier knowledge;
- has human-readable participant names/roles;
- gives Chinese, pinyin, and Vietnamese for every line;
- supports listening by line and as a complete scene;
- ends with follow-up prompts or a role-play mission.

Dialogue should sound like people solving a real need: asking directions,
arranging a schedule, requesting help, shopping, making plans, describing a
problem, or confirming understanding.

## 10. Cumulative lesson design

Lessons after 16 should not be isolated. Use this content rhythm:

1. **Recall:** 3–5 quick prompts from earlier prerequisite knowledge.
2. **Learn:** introduce the current lesson's vocabulary and grammar.
3. **Connect:** explicitly compare or extend an earlier item.
4. **Apply:** use old and new items together in dialogue/exercises.
5. **Retrieve later:** add the new items to the review queue and future links.

For a normal lesson practice set, target roughly 20–30% earlier due knowledge.
Do not force the percentage when it produces unnatural sentences; semantic
quality comes first.

## 11. Exercise design

Use a balanced mix:

- contextual multiple choice;
- sentence ordering;
- listening and typing;
- Vietnamese-to-Chinese production;
- contextual cloze;
- confusing-word/grammar contrast;
- timed or guided speaking mission.

Quality rules:

- every answer gives explanatory feedback;
- distractors are plausible but unambiguously wrong in context;
- tests identify the knowledge IDs they assess;
- include active production, not only recognition;
- do not reveal answers through formatting or the instruction itself;
- test mode hides pinyin/meaning until deliberate reveal;
- a wrong response can enter the mistake notebook;
- repeated errors should return sooner in review.

Checkpoint tasks combine multiple lessons and culminate in an applied scenario.
Report vocabulary, grammar, listening, ordering, and production separately when
possible.

## 12. Audio

The baseline audio implementation is browser Speech Synthesis:

- language: `zh-CN`;
- default rate: about `0.8`;
- default delay after click: about `700ms`;
- prefer Microsoft Xiaoxiao/晓晓 when available;
- otherwise choose the best Chinese voice on the device;
- provide a static “Nghe thử” control and voice/rate settings;
- persist the selected voice and rate locally;
- support every vocabulary word, example, dialogue line, and writing target.

Mobile browsers may require a direct user gesture before speaking. Do not show
unnecessary permission popups. Audio controls and status belong in a normal
content block, not a sticky toolbar.

Web Speech voices vary by Windows, Android, and iOS. Optional human-recorded
audio can be added later using the same content IDs; it must be optimized and
loaded on demand. Do not depend on inaccessible `chatgpt.site` assets.

## 13. Hanzi and writing

- Use Hanzi Writer through lazy initialization only.
- Never instantiate writers for every vocabulary card at page load.
- Multi-character words allow choosing a character or playing characters in
  sequence.
- The dedicated writing view provides a larger stroke player and 米字格.
- Keep vocabulary `strokeChars`, writing plans, and Hanzi registry IDs aligned.
- Select core writing characters rather than forcing every character into the
  writing section.
- Maintain an accessible text fallback if stroke data cannot load.

## 14. Images and media

Use imagery only when it improves comprehension, memory, or task context.

- Prefer existing instructional images with clear reuse rights or original
  assets created for the course.
- Use WebP/AVIF where supported and keep a practical fallback when needed.
- Declare dimensions to prevent layout shift.
- Write meaningful Vietnamese alt text.
- Do not use generic decorative stock imagery that adds download weight without
  teaching value.
- Do not store large videos in the GitHub Pages repository.

## 15. Responsive and accessible interaction

- Desktop may use three-column vocabulary grids when cards remain readable.
- Tablet uses two columns.
- Mobile uses one column.
- Navigation may scroll horizontally on small screens but must expose the
  current section clearly.
- No horizontal page overflow at 320 px width.
- All buttons have accessible names and visible focus states.
- Keyboard operation must work for navigation, reveal controls, and exercises.
- Touch interactions must not depend on hover.
- Respect reduced-motion preferences for nonessential animation.

## 16. Progress, mastery, and wording

Distinguish these concepts in copy and data:

- **Đã xem/hoàn thành phần:** navigation progress only.
- **Đã tự đánh giá hoàn thành:** learner-reported action such as speaking.
- **Đang nhớ/đến hạn ôn:** review state.
- **Thành thạo:** evidence from multiple successful retrievals over time.

Do not turn a clicked checkbox into “mastered”. Course summaries should explain
how many items are new, due, weak, and reinforced.

## 17. UTF-8 and release checks

Before accepting content:

- inspect the rendered Vietnamese diacritics and Hanzi;
- search generated HTML/source for common mojibake fragments such as `Ã`, `Â`,
  `Æ`, or replacement characters;
- verify `<meta charset="UTF-8">` in the Pages entry;
- confirm the configured Chinese webfont actually loads;
- confirm Hanzi, pinyin, and Vietnamese remain distinct with study toggles;
- test one audio control, one stroke control, and each exercise family;
- test at mobile, tablet, and desktop widths;
- verify direct/reloaded GitHub Pages hash routes;
- verify the app works after the first online load and reports offline limits
  honestly.

