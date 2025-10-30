import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

const categoryNames: { [key: string]: string } = {
  camping: "캠핑",
  swimming: "수영",
  golf: "골프",
};

// Add slug to each article for URL routing
const campingArticles = [
  {
    slug: "tent-guide-for-beginners",
    title: "초보 캠퍼를 위한 필수 텐트 선택 가이드",
    description: "첫 캠핑, 어떤 텐트를 사야 할지 막막하신가요? 가격대별, 종류별 텐트를 비교하고 나에게 맞는 최고의 텐트를 찾아보세요.",
    author: "김캠핑",
    date: "2025년 10월 28일",
  },
  {
    slug: "camping-lanterns-for-mood",
    title: "감성 캠핑의 시작, 랜턴 하나로 분위기 끝내기",
    description: "가스, 가솔린, LED 랜턴의 장단점을 비교하고 당신의 캠핑 스타일에 맞는 감성 랜턴을 추천해 드립니다.",
    author: "박감성",
    date: "2025년 10월 25일",
  },
  {
    slug: "mastering-bbq-grills",
    title: "캠핑의 꽃, 바베큐 그릴 완벽 정복",
    description: "숯, 가스 그릴부터 그리들까지. 캠핑 바베큐를 위한 모든 종류의 그릴을 알아보고 맛있는 캠핑 요리를 즐겨보세요.",
    author: "이요리",
    date: "2025년 10월 22일",
  },
];

export default function CategoryPage({ params }: Props) {
  const { slug } = params;
  const categoryName = categoryNames[slug] || "알 수 없는 카테고리";

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">{categoryName} 장비</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
          {categoryName}에 필요한 모든 장비를 확인하세요.
        </p>
      </div>

      {slug === 'camping' && (
        <div className="space-y-12">
          {campingArticles.map((article, index) => (
            <article key={index} className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="aspect-video md:aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">{article.title}</h2>
                <p className="mt-2 text-sm text-gray-500">{article.author} · {article.date}</p>
                <p className="mt-4 text-gray-700 leading-relaxed hidden sm:block">{article.description}</p>
                <Link href={`/article/${article.slug}`} className="mt-4 inline-block font-medium text-indigo-600 hover:underline">자세히 보기 &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      )}
      
      {slug !== 'camping' && (
        <div className="text-center py-16">
          <p className="text-lg text-gray-500">이 카테고리에는 아직 기사가 없습니다.</p>
        </div>
      )}
    </section>
  );
}
