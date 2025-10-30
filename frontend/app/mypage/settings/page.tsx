
"use client";

import MyPageHeader from "@/components/MyPage/MyPageHeader";

const MyPageSettings = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">계정 설정</h2>
      <div className="space-y-4">
        <button className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-left">
          비밀번호 변경
        </button>
        <button className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-left">
          로그아웃
        </button>
        <button className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-left">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MyPageHeader />
      <div className="mt-8">
        <MyPageSettings />
      </div>
    </div>
  );
}
