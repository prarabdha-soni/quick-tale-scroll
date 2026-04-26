export type StoryPage = {
  text: string;
  /** Optional beat illustration (Hindi tale uses these; other stories omit). */
  image?: { src: string; alt: string };
};

export type Story = {
  title: string;
  author: string;
  genre: string;
  coverImage: string;
  coverAlt: string;
  /** Mood / filter chips (e.g. Rain, Night, Mystery). */
  tags: string[];
  /** One-line pitch for cards. */
  hook: string;
  /** Approximate reading time in minutes. */
  estimatedMinutes: number;
  pages: StoryPage[];
};

export const textOnly = (lines: string[]): StoryPage[] => lines.map((text) => ({ text }));

export const stories: Story[] = [
  /** Original 10-beat Hindi tale — three scene images (library, corridor, photograph). */
  {
    title: "आख़िरी घंटी",
    author: "Prarabdha Soni",
    genre: "हिंदी रहस्य",
    coverImage: "/stories/aarav-lib.png",
    coverAlt: "लाइब्रेरी, रात, बारिश",
    tags: ["Rain", "Night", "Mystery"],
    hook: "एक बंद घंटी, एक खुली किताब, और एक तारीख़ जो आरव के जन्म से पहले की है।",
    estimatedMinutes: 6,
    pages: [
      {
        text: "रात के ग्यारह बजे कॉलेज की पुरानी लाइब्रेरी में सिर्फ़ आरव बचा था। बाहर बारिश थी, और अंदर किताबों की गंध में एक अजीब-सी ठंड घुली हुई थी।",
        image: {
          src: "/stories/aarav-lib.png",
          alt: "पुरानी लाइब्रेरी, रात, बारिश",
        },
      },
      {
        text: "वह परीक्षा की तैयारी कर रहा था, तभी गलियारे में लगी पुरानी घंटी अपने आप बज उठी। वह घंटी वर्षों से बंद थी, यह बात हर छात्र जानता था।",
      },
      {
        text: "आरव ने सोचा शायद हवा होगी, लेकिन अगली घंटी के साथ उसकी मेज़ पर रखी किताब अपने आप खुल गई। पन्ने वहीं रुके जहाँ किसी ने लाल स्याही से लिखा था: मत मुड़ना।",
      },
      {
        text: "उसने फिर भी पीछे देखा। गलियारे के अंत में एक लड़की खड़ी थी, सफ़ेद सलवार में, भीगे बालों के साथ। उसका चेहरा साफ़ नहीं दिख रहा था।",
        image: {
          src: "/stories/aarav-girl-visit.png",
          alt: "गलियारे के अंत में सफ़ेद सलवार में लड़की",
        },
      },
      {
        text: "लड़की ने कोई आवाज़ नहीं की। बस हाथ उठाकर उसे अपने पीछे आने का इशारा किया। आरव का डर और जिज्ञासा एक साथ जाग गए।",
      },
      {
        text: "वह उसके पीछे-पीछे बंद रिकॉर्ड रूम तक पहुँचा। दरवाज़ा बिना छुए खुल गया, और अंदर धूल से ढकी फ़ाइलों के बीच एक पुरानी तस्वीर रखी थी।",
      },
      {
        text: "तस्वीर में वही लड़की थी—पर उसके साथ आरव भी खड़ा था। नीचे तारीख़ लिखी थी: 18 जुलाई 1998। आरव का जन्म भी तब नहीं हुआ था।",
        image: {
          src: "/stories/aarav-photo.png",
          alt: "धूल भरी फ़ाइलों पर पुरानी तस्वीर",
        },
      },
      {
        text: "उसके हाथ काँपने लगे। तभी घंटी फिर बजी, इस बार बहुत पास से। लड़की ने पहली बार कहा, तुम हर बार देर से याद करते हो।",
      },
      {
        text: "कमरा घूमने लगा। फ़ाइलें हवा में उड़ने लगीं। आरव ने आँखें बंद कर लीं, और जब खोलीं तो वह फिर अपनी मेज़ पर बैठा था। सुबह हो चुकी थी।",
      },
      {
        text: "किताब खुली पड़ी थी। लाल स्याही में अब एक नई पंक्ति लिखी थी: अगली बार घंटी बजे, तो मत भूलना कि तुम कौन थे।",
      },
    ],
  },
  {
    title: "Harry Potter and the Ink That Remembered",
    author: "Original fan tale",
    genre: "Wizarding mystery",
    coverImage: "/stories/hp-library-candles.png",
    coverAlt: "Magical school library at night with floating candles",
    tags: ["Mystery", "Night", "Emotional", "Magic"],
    hook: "Past curfew, Harry, Ron, and Hermione open a book that writes back — and it knows a secret from before Hogwarts.",
    estimatedMinutes: 11,
    pages: [
      {
        text: "The Restricted Section was never quiet, not really. Dust drifted like slow snow under a ceiling of candle smoke, and somewhere a quill ticked as if someone unseen were taking notes. Harry's scar gave a single dull pulse — not pain, more like a door rattling in a draft.",
        image: {
          src: "/stories/hp-library-candles.png",
          alt: "Castle library at night with floating candles and tall shelves",
        },
      },
      {
        text: "Hermione had dragged them here with a borrowed key and a whispered promise: one book, five minutes, no wand-light. She set a slim volume on the lectern. Its title had been scratched out and rewritten in three different hands, the last in neat green ink: Ask only what you are ready to carry.",
        image: {
          src: "/stories/hp-ink-book.png",
          alt: "Ancient spellbook open on a lectern with green-ink glow",
        },
      },
      {
        text: "Ron muttered that this was exactly how detention letters started. Then every flame along the aisle dipped at once, as though the castle had drawn a breath and held it. The book opened without being touched. The first line was addressed to Harry by name — spelled correctly, which somehow felt ruder than a mistake.",
      },
      {
        text: "Hermione read aloud, voice tight. The page described a corridor Harry had dreamed about more than once: torch brackets shaped like coiled serpents, a floor damp with meltwater that should not exist inside stone. At the margin, a doodle appeared while they watched: a cupboard under a staircase, a thin boy, a birthday nobody remembered.",
        image: {
          src: "/stories/hp-stone-corridor.png",
          alt: "Torchlit stone corridor in an old castle",
        },
      },
      {
        text: "Harry slammed the book shut. The sound bounced off the stacks and came back softer, like an echo that had learned politeness. When he opened it again, the doodle was gone. In its place was a map line — not the Marauder's Map, but something older, drawn with compass strokes and a smudge of ash.",
      },
      {
        text: "They followed the line through chill air until stone turned to older stone, a part of the castle Filch never swept because his broom bristles refused to lie flat there. A door stood ajar with no handle on this side. From inside came the smell of petrol and rain-on-concrete — impossible, and therefore true enough to walk through.",
      },
      {
        text: "The room beyond was small. On a desk sat a teacup ring on wood, a child-sized cloak folded too neatly, and a note pinned by a bent spoon. The handwriting was shaky but determined: If you find this, you are already braver than I was. Trust the girl who reads everything. Trust the boy who jokes when he's frightened. Trust yourself last — you will lie to stay kind.",
      },
      {
        text: "Hermione's eyes shone. Ron swallowed, jokes gone. Harry felt the familiar anger rise — not at the author, but at every adult silence that had made a child write a letter like this and hide it in magic. He whispered, \"Who wrote it?\" The book answered on a fresh page with one word: Almost you.",
      },
      {
        text: "The candles flared. Shadows stretched into shapes that could have been people who had tried to help and failed, or succeeded and paid for it. Harry lifted his wand not to fight, but to cast the widest Lumos he knew. Light bounced from brass to glass to mirror — and for a heartbeat he saw himself at nine, smaller, hungrier, not yet believing in trains that ran through walls.",
      },
      {
        text: "When the light folded, the book was blank again. On the lectern lay a chocolate frog card with a face he almost recognized — not a famous witch, not a headmaster, just someone smiling as if proud. Hermione tucked it into her bag for the library return slot. Ron clapped Harry on the shoulder. They walked back under waking candles, and Hogwarts, huge and old, felt for once like a house that was learning to apologize in its sleep.",
      },
    ],
  },
];

export function uniqueGenres(list: Story[]): string[] {
  return [...new Set(list.map((s) => s.genre))];
}

export function uniqueTags(list: Story[]): string[] {
  const order = ["Rain", "Night", "Mystery", "Emotional", "Magic", "Folk", "Personal"];
  const set = new Set(list.flatMap((s) => s.tags));
  return order.filter((t) => set.has(t));
}

export function filterStoriesByTag(list: Story[], tag: string | null): Story[] {
  if (!tag) return list;
  return list.filter((s) => s.tags.includes(tag));
}
