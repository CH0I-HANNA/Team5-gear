
"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const MyPageSettings = () => {
  const { token, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setMessageType(null);

    if (!token) {
      setMessage("로그인이 필요합니다.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("새 비밀번호는 6자 이상이어야 합니다.");
      setMessageType("error");
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "비밀번호가 성공적으로 변경되었습니다.");
        setMessageType("success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setMessage(data.message || "비밀번호 변경에 실패했습니다.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("비밀번호 변경 중 오류가 발생했습니다.");
      setMessageType("error");
      console.error("Error changing password:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!token) {
      setMessage("로그인이 필요합니다.");
      setMessageType("error");
      return;
    }

    if (!window.confirm("정말로 회원 탈퇴를 하시겠습니까? 모든 데이터가 삭제됩니다.")) {
      return;
    }

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "회원 탈퇴가 성공적으로 처리되었습니다.");
        setMessageType("success");
        logout(); // Log out after successful deletion
      } else {
        setMessage(data.message || "회원 탈퇴에 실패했습니다.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("회원 탈퇴 중 오류가 발생했습니다.");
      setMessageType("error");
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">계정 설정</h2>
      <div className="space-y-4">
        <button className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-left">
          비밀번호 변경
        </button>
        {/* Password Change Form */}
        <form onSubmit={handleChangePassword} className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">비밀번호 변경</h3>
          {message && (
            <p className={messageType === "success" ? "text-green-500" : "text-red-500"}>
              {message}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            비밀번호 변경
          </button>
        </form>
        <button onClick={logout} className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-left">
          로그아웃
        </button>
        <button onClick={handleDeleteAccount} className="w-full px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 text-left">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  return <MyPageSettings />;
}
