export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">gear</h3>
            <p className="mt-2 text-sm text-gray-600">
              취미 장비를 쉽게 고르는 가장 좋은 방법.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">카테고리</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="/category/camping" className="text-gray-600 hover:underline">캠핑</a></li>
              <li><a href="/category/swimming" className="text-gray-600 hover:underline">수영</a></li>
              <li><a href="/category/golf" className="text-gray-600 hover:underline">골프</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">회사</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:underline">회사 소개</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">문의하기</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">법적 고지</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:underline">이용약관</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} gear. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  );
}