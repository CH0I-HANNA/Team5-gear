
import Image from 'next/image';
import CommentSection from "@/components/CommentSection";

const TentSelectionGuide = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            초보 캠퍼를 위한 필수 텐트 선택 가이드
          </h1>
          <p className="text-gray-600 mb-8">
            캠핑의 시작, 좋은 텐트 선택이 반입니다.
          </p>
        </div>

        <div className="prose max-w-none">
          <p>
            캠핑을 처음 시작하는 분들에게 텐트 선택은 가장 어렵고 중요한
            과정입니다. 수많은 종류와 브랜드 속에서 어떤 텐트를 골라야 할지
            막막하기만 합니다. 이 가이드에서는 초보 캠퍼들이 자신에게 맞는
            텐트를 선택할 수 있도록 필수적인 정보들을 제공합니다.
          </p>

          <p>
            첫 캠핑, 어떤 텐트를 사야 할지 막막하신가요? 가격대별, 종류별 텐트를 비교하고 나에게 맞는 최고의 텐트를 찾아보세요.
          </p>

          <p>
            텐트 선택은 캠핑의 시작이자 가장 중요한 부분입니다. 이 글에서는 1-2인용 백패킹 텐트부터 4인 이상 가족을 위한 거실형 텐트까지, 다양한 종류의 텐트를 살펴보고 각 상황에 맞는 최적의 선택을 도와드립니다. 또한, 내수압, 폴대 재질, 설치 편의성 등 텐트 구매 시 반드시 고려해야 할 기술적인 스펙에 대해서도 자세히 알아봅니다.
          </p>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">
            1. 텐트 종류: 어떤 스타일의 캠핑을 원하시나요?
          </h2>

          <p>
            텐트는 사용 목적과 형태에 따라 다양하게 나뉩니다. 대표적인 텐트
            종류와 특징을 살펴보겠습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">돔 텐트</h3>
              <Image
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="돔 텐트"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p>
                가장 일반적인 형태로, 설치가 쉽고 바람에 강합니다. 1-4인용
                소형 텐트가 많아 백패킹이나 미니멀 캠핑에 적합합니다.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">터널형 텐트</h3>
              <Image
                src="https://images.unsplash.com/photo-1599054802237-7d735ade9c44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="터널형 텐트"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p>
                넓은 실내 공간을 제공하여 가족 단위 캠핑에 인기가 많습니다.
                거실 공간과 침실 공간이 분리되어 편리합니다.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">티피 텐트</h3>
              <Image
                src="https://images.unsplash.com/photo-1563299796-17596e6a936a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="티피 텐트"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p>
                중앙 폴대를 중심으로 원뿔 형태를 이루는 감성적인 디자인의
                텐트입니다. 내부가 넓고 쾌적하며, 화목난로 사용이 가능한
                제품도 있습니다.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">차박 텐트</h3>
              <Image
                src="https://images.unsplash.com/photo-1601884841821-5602a4531e35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="차박 텐트"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p>
                차량과 연결하여 사용하는 텐트로, 빠르고 간편하게 설치할 수
                있습니다. 차량 내부 공간을 침실로 활용하고 텐트 공간을
                거실로 사용할 수 있습니다.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">
            2. 텐트 선택 시 고려해야 할 5가지
          </h2>

          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>사용 인원:</strong> 실제 사용하는 인원보다 1-2명 더
              여유 있는 크기를 선택하는 것이 좋습니다. 짐을 보관할 공간도
              고려해야 합니다.
            </li>
            <li>
              <strong>내수압:</strong> 텐트 원단이 비를 얼마나 잘 막아주는지를
              나타내는 수치입니다. 최소 1,500mm 이상의 내수압을 가진 텐트를
              선택하는 것이 안전합니다.
            </li>
            <li>
              <strong>결로 현상:</strong> 텐트 내외부의 온도 차이로 인해 물방울이
              맺히는 현상입니다. 통풍이 잘 되는 벤틸레이션 시스템이 있는지
              확인해야 합니다.
            </li>
            <li>
              <strong>무게와 부피:</strong> 오토캠핑이라면 무게가 크게 문제 되지
              않지만, 백패킹이나 미니멀 캠핑을 계획한다면 가볍고 부피가 작은
              텐트를 선택해야 합니다.
            </li>
            <li>
              <strong>설치 편의성:</strong> 초보 캠퍼는 설치가 쉽고 빠른 텐트를
              선택하는 것이 좋습니다. 원터치 텐트나 폴대 구조가 단순한
              텐트를 추천합니다.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-8 mb-4">
            3. 추천 텐트 제품
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                로티캠프 육각 원터치 텐트
              </h3>
              <p className="mb-4">
                설치가 간편하고 가성비가 좋아 입문용으로 적합합니다.
              </p>
              <a
                href="https://www.coupang.com/vp/products/1497269498?itemId=2570388333&vendorItemId=70562898903&q=%EB%A1%9C%ED%8B%B0%EC%BA%A0%ED%94%84+%EC%9C%A1%EA%B0%81+%EC%9B%90%ED%84%B0%EC%B9%98+%ED%85%90%ED%8A%B8&itemsCount=36&searchId=2619a7d2624a46c981bf8313698b0799&rank=1&isAddedCart="
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                제품 보러가기
              </a>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                어반캠퍼 4윈도우 헥사곤 5
              </h3>
              <p className="mb-4">
                예쁜 디자인과 넓은 공간으로 감성 캠핑을 즐기기에 좋습니다.
              </p>
              <a
                href="https://www.coupang.com/vp/products/7889450081?itemId=21596344819&vendorItemId=88647811183&q=%EC%96%B4%EB%B0%98%EC%BA%A0%ED%8D%BC+4%EC%9C%88%EB%8F%84%EC%9A%B0+%ED%97%A5%EC%82%AC%EA%B3%A4+5&itemsCount=36&searchId=9d33e19a7cde4a5b9a7333e56a16443c&rank=0&isAddedCart="
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                제품 보러가기
              </a>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">
                지프 인스턴트 헥사 돔 세트
              </h3>
              <p className="mb-4">
                넉넉한 공간으로 가족 모두가 편안하게 캠핑을 즐길 수 있습니다.
              </p>
              <a
                href="https://www.coupang.com/vp/products/7889450081?itemId=21596344819&vendorItemId=88647811183&q=%EC%96%B4%EB%B0%98%EC%BA%A0%ED%8D%BC+4%EC%9C%88%EB%8F%84%EC%9A%B0+%ED%97%A5%EC%82%AC%EA%B3%A4+5&itemsCount=36&searchId=9d33e19a7cde4a5b9a7333e56a16443c&rank=0&isAddedCart="
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                제품 보러가기
              </a>
            </div>
          </div>

          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default TentSelectionGuide;
