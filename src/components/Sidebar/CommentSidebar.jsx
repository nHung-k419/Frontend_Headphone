const CommentSidebar = ({ isOpen, onClose }) => {
     const reviews = [
    {
      name: "Nguyễn Ngọc Hùng",
      date: "March 18, 2025",
      avatar: "https://i.pravatar.cc/100?img=1",
      rating: 5,
      comment: "Đẹp lắm , muốn quay lại lần nữa",
      images: [
        "https://source.unsplash.com/100x100/?nature",
        "https://source.unsplash.com/100x100/?girl",
        "https://source.unsplash.com/100x100/?sleep",
      ],
    },
    {
      name: "Trần Thị Thanh Thảo",
      date: "March 16, 2025",
      avatar: "https://i.pravatar.cc/100?img=2",
      rating: 5,
      comment: "Một trải nghiệm tuyệt vời trong đời tôi , mong có thể quay trở lại đây một lần nữa !",
      images: [],
    },
     {
      name: "Trần Thị Thanh Thảo",
      date: "March 16, 2025",
      avatar: "https://i.pravatar.cc/100?img=2",
      rating: 5,
      comment: "Một trải nghiệm tuyệt vời trong đời tôi , mong có thể quay trở lại đây một lần nữa !",
      images: [],
    },
     {
      name: "Trần Thị Thanh Thảo",
      date: "March 16, 2025",
      avatar: "https://i.pravatar.cc/100?img=2",
      rating: 5,
      comment: "Một trải nghiệm tuyệt vời trong đời tôi , mong có thể quay trở lại đây một lần nữa !",
      images: [],
    },
     {
      name: "Trần Thị Thanh Thảo",
      date: "March 16, 2025",
      avatar: "https://i.pravatar.cc/100?img=2",
      rating: 5,
      comment: "Một trải nghiệm tuyệt vời trong đời tôi , mong có thể quay trở lại đây một lần nữa !",
      images: [],
    },
  ];
  return (
    <div>
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800">Tour Du Lịch Núi Thần Tài Đà Nẵng</h2>
          <button className="text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-md font-bold">5</div>
          <div className="flex text-yellow-500 space-x-1">
            {Array(5).fill(0).map((_, i) => <span key={i}>★</span>)}
          </div>
          <p className="text-gray-600 text-sm">7 đánh giá</p>
        </div>
        <p className="text-sm text-gray-500 mt-2">Chúng tôi hướng tới những đánh giá thực tế 100%</p>

        <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-600 rounded cursor-not-allowed" disabled>
          VIẾT ĐÁNH GIÁ
        </button>

        <div className="mt-6 space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center space-x-3">
                <img src={review.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-gray-500">Đã đánh giá: {review.date}</p>
                </div>
              </div>
              <div className="mt-2 text-yellow-500">
                {Array(review.rating).fill(0).map((_, i) => <span key={i}>★</span>)}
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              {review.images.length > 0 && (
                <div className="flex space-x-2 mt-2">
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt="review" className="w-20 h-20 object-cover rounded" />
                  ))}
                </div>
              )}
              <div className="mt-2 text-sm text-gray-600 flex space-x-4">
                <button className="hover:text-blue-600">HỮU ÍCH 0</button>
                <button className="hover:text-blue-600">KHÔNG HỮU ÍCH</button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default CommentSidebar