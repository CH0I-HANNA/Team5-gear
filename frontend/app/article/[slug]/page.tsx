import { notFound } from 'next/navigation';

// NOTE: In a real app, this data would come from a CMS or database.
const campingArticles = [
  {
    slug: "tent-guide-for-beginners",
    title: "초보 캠퍼를 위한 필수 텐트 선택 가이드",
    description: "첫 캠핑, 어떤 텐트를 사야 할지 막막하신가요? 가격대별, 종류별 텐트를 비교하고 나에게 맞는 최고의 텐트를 찾아보세요.",
    author: "김캠핑",
    date: "2025년 10월 28일",
    content: "텐트 선택은 캠핑의 시작이자 가장 중요한 부분입니다. 이 글에서는 1-2인용 백패킹 텐트부터 4인 이상 가족을 위한 거실형 텐트까지, 다양한 종류의 텐트를 살펴보고 각 상황에 맞는 최적의 선택을 도와드립니다. 또한, 내수압, 폴대 재질, 설치 편의성 등 텐트 구매 시 반드시 고려해야 할 기술적인 스펙에 대해서도 자세히 알아봅니다."
  },
  {
    slug: "camping-lanterns-for-mood",
    title: "감성 캠핑의 시작, 랜턴 하나로 분위기 끝내기",
    description: "가스, 가솔린, LED 랜턴의 장단점을 비교하고 당신의 캠핑 스타일에 맞는 감성 랜턴을 추천해 드립니다.",
    author: "박감성",
    date: "2025년 10월 25일",
    content: "어두운 밤을 밝히는 랜턴은 단순한 조명 기구를 넘어 캠핑의 분위기를 좌우하는 핵심 아이템입니다. 이 글에서는 아날로그 감성의 가스/가솔린 랜턴과 편리하고 안전한 LED 랜턴의 특징을 비교 분석하고, 당신의 캠핑을 더욱 특별하게 만들어 줄 감성 랜턴들을 소개합니다."
  },
  {
    slug: "mastering-bbq-grills",
    title: "캠핑의 꽃, 바베큐 그릴 완벽 정복",
    description: "숯, 가스 그릴부터 그리들까지. 캠핑 바베큐를 위한 모든 종류의 그릴을 알아보고 맛있는 캠핑 요리를 즐겨보세요.",
    author: "이요리",
    date: "2025년 10월 22일",
    content: "캠핑의 즐거움에서 빼놓을 수 없는 바베큐 파티! 이 글에서는 직화의 맛을 살리는 숯 그릴, 편리함의 끝판왕 가스 그릴, 그리고 요즘 대세인 그리들까지 다양한 바베큐 장비의 종류와 특징, 그리고 활용 팁을 알려드립니다. 더 이상 고기를 태우지 마세요!"
  },
];

type Props = {
  params: {
    slug: string;
  };
};

export default function ArticlePage({ params }: Props) {
  const { slug } = params;
  const article = campingArticles.find(a => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article>
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{article.title}</h1>
          <p className="mt-4 text-lg text-gray-500">{article.author} · {article.date}</p>
        </header>
        
        <div className="prose lg:prose-xl mx-auto">
          <div className="aspect-video bg-gray-100 rounded-lg mb-8 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <p className="lead">{article.description}</p>
          <p>{article.content}</p>
        </div>
      </article>
    </main>
  );
}
