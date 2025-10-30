import MyPageHeader from "@/components/MyPage/MyPageHeader";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <MyPageHeader />
      <div className="mt-8">{children}</div>
    </div>
  );
}
