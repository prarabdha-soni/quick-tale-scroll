export type StoryPage = {
  text: string;
  /** Optional illustration; sleep tales omit. */
  image?: { src: string; alt: string };
};

export type Story = {
  title: string;
  author: string;
  genre: string;
  /** Cover art URL; omit for gradient-only cards. */
  coverImage?: string;
  coverAlt?: string;
  tags: string[];
  hook: string;
  estimatedMinutes: number;
  pages: StoryPage[];
};

export const textOnly = (lines: string[]): StoryPage[] => lines.map((text) => ({ text }));

const jheelDeepakPages = textOnly([
  "आज रात झील तक जाने वाला रास्ता असामान्य रूप से शांत था, जैसे पूरी दुनिया ने अपनी गति धीमी कर दी हो, सिर्फ तुम्हारे लिए।",
  "पेड़ों के बीच से आती हल्की हवा तुम्हें छूकर गुजर रही थी, ठंडी, नरम और एक अजीब सी सुकून देने वाली एहसास के साथ।",
  "तुम धीरे-धीरे चल रहे थे, थकान की वजह से नहीं, बल्कि इसलिए कि कहीं पहुंचने की कोई जल्दी तुम्हारे अंदर नहीं थी।",
  "दूर झील के पास एक छोटा सा दीपक जल रहा था, जिसकी रोशनी अंधेरे के बीच शांत और स्थिर दिखाई दे रही थी।",
  "तुमने यह सोचने की कोशिश नहीं की कि वह वहां क्यों है, या किसने उसे जलाया, वह बस सही जगह पर लग रहा था।",
  "झील का पानी बिल्कुल शांत था, इतना शांत कि दीपक की रोशनी उसमें बिना किसी हलचल के प्रतिबिंबित हो रही थी।",
  "तुम पास जाकर बैठ गए, जमीन की ठंडी सतह को महसूस करते हुए, जैसे वह तुम्हें थामे हुए हो, बिना कुछ कहे।",
  "दीपक की लौ बिना हिले बस जल रही थी, जैसे उसे किसी दिशा में जाने की जरूरत ही नहीं थी।",
  "तुम्हारे विचार धीरे-धीरे कम होने लगे, किसी ज़ोर से नहीं, बल्कि अपने आप, जैसे कोई दूर की आवाज़ धीरे-धीरे खत्म हो जाए।",
  "हर सांस अब और गहरी और शांत महसूस हो रही थी, जैसे हवा खुद तुम्हें आराम देने के लिए धीमी हो गई हो।",
  "झील के बाहर की दुनिया जैसे कहीं दूर छूट गई थी, और इस समय तुम्हें उसकी कोई ज़रूरत नहीं थी।",
  "दीपक की रोशनी तुम्हारी आंखों में हल्की चमक छोड़ रही थी, जैसे वह तुम्हें बिना शब्दों के कुछ समझा रही हो।",
  "तुम्हें महसूस हुआ कि यह खामोशी खाली नहीं है, बल्कि छोटी-छोटी बातों से भरी हुई है, जिन्हें तुमने पहले कभी नहीं सुना था।",
  "झील में एक हल्की सी लहर उठी और फिर गायब हो गई, जैसे कुछ हुआ ही नहीं, सब कुछ फिर से शांत हो गया।",
  "तुम्हारे कंधे अब पूरी तरह ढीले हो गए थे, और अंदर का सारा बोझ धीरे-धीरे हल्का होने लगा।",
  "अब कुछ सोचने की जरूरत नहीं थी, कुछ समझने की जरूरत नहीं थी, यह पल अपने आप में पूरा था।",
  "दीपक वैसे ही जलता रहा, बिना बदले, बिना रुके, जैसे वह सिर्फ तुम्हारे लिए वहां मौजूद हो।",
  "तुम्हारी आंखें भारी होने लगीं, किसी मजबूरी से नहीं, बल्कि जैसे उन्हें अब आराम की जरूरत महसूस हो रही हो।",
  "झील, हवा और रोशनी एक साथ मिलकर एक शांत एहसास बना रहे थे, जो धीरे-धीरे तुम्हें अंदर खींच रहा था।",
  "और फिर, बिना जाने कब, तुम उसी शांति में खो गए, जैसे नींद तुम्हें बहुत पहले से बुला रही थी।",
]);

const nightTrainPages = textOnly([
  "The train moved quietly through the night.\nAlmost as if it didn't want to wake anyone.",
  "You found your seat near the window.\nThe glass felt cool against your hand.",
  "Outside, the world was dark…\nbut not empty.",
  "Distant lights appeared sometimes—\nsmall, warm, and far away.",
  "Inside the train, everything was calm.\nNo loud voices. No hurry.",
  "Someone turned a page of a book.\nThe sound faded quickly.",
  "You leaned back slowly.\nThe seat held you gently.",
  "The train kept moving…\nsteady… soft… predictable.",
  "Tap… tap… tap…\nThe rhythm of the tracks stayed the same.",
  "Your thoughts followed that rhythm.\nOne by one, they slowed down.",
  "Nothing needed your attention anymore.\nNot tonight.",
  "The air felt quiet and still.\nEven your breath softened.",
  "Outside, a single light passed by.\nThen darkness again.",
  "You didn't need to know where you were.\nThe train knew the way.",
  "And for now… that was enough.",
  "Your eyes felt heavier.\nNot forced—just ready.",
  "The rhythm continued.\nTap… tap… tap…",
  "You didn't notice when your thoughts stopped.\nThey simply faded away.",
  "The train kept moving through the night.\nQuietly… steadily…",
  "And somewhere along the way…\nyou were already home.",
]);

export const stories: Story[] = [
  {
    title: "झील के किनारे एक दीपक",
    author: "नींद की कहानी",
    genre: "हिंदी · नींद",
    hook: "झील, एक स्थिर दीपक, और धीमी हवा—रात को आराम तक ले जाने वाली एक शांत यात्रा।",
    tags: ["Sleep", "Hindi", "Night"],
    estimatedMinutes: 2,
    pages: jheelDeepakPages,
  },
  {
    title: "The Night Train Home",
    author: "Sleep tale",
    genre: "Sleep story",
    hook: "A slow, gentle journey through the dark—one breath at a time.",
    tags: ["Sleep", "Night", "Train"],
    estimatedMinutes: 2,
    pages: nightTrainPages,
  },
];

export function uniqueGenres(list: Story[]): string[] {
  return [...new Set(list.map((s) => s.genre))];
}

export function uniqueTags(list: Story[]): string[] {
  const order = ["Sleep", "Hindi", "Night", "Train", "Rain", "Mystery", "Emotional", "Magic", "Folk", "Personal"];
  const set = new Set(list.flatMap((s) => s.tags));
  return order.filter((t) => set.has(t));
}

export function filterStoriesByTag(list: Story[], tag: string | null): Story[] {
  if (!tag) return list;
  return list.filter((s) => s.tags.includes(tag));
}
