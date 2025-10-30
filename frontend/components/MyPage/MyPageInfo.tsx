
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

const MyPageInfo = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <p className="text-gray-500">사용자 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8">
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md mb-6 md:mb-0">
          <Image
            src={user.profileImage || "/images/default-profile.png"}
            alt="프로필 이미지"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{user.nickname}</h2>
          <p className="text-md text-gray-600 mt-2">{user.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            가입일: {new Date(user.joinDate).toLocaleDateString()}
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105">
            프로필 이미지 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageInfo;
