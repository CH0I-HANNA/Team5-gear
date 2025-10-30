import MyPageHeader from "@/components/MyPage/MyPageHeader";
import MyPageInfo from "@/components/MyPage/MyPageInfo";

export default function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MyPageHeader />
      <div className="mt-8">
        <MyPageInfo />
      </div>
    </div>
  );
}
