
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useRef } from "react";

const MyPageInfo = () => {
  const { user, token, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/auth/profile/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
            src={user.profileImageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
            alt="프로필 이미지"
            layout="fill"
            objectFit="cover"
            sizes="128px"
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-md text-gray-600 mt-2">{user.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            가입일: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleImageUpload}
            accept="image/*"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            프로필 이미지 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageInfo;
