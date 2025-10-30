
"use client";

const MyPageFavorites = () => {
  // This component would fetch and display the user's favorited items.
  // For now, it's a placeholder.
  const favoriteItems = [
    { id: 1, name: "캠핑 텐트", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "등산 배낭", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "낚시 의자", imageUrl: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">찜한 장비</h2>
      {favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favoriteItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex flex-col items-center">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mb-2" />
              <p className="font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>찜한 장비가 없습니다.</p>
      )}
    </div>
  );
};

export default MyPageFavorites;
