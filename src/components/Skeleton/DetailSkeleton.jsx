import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Hình ảnh sản phẩm */}
      <div className="flex justify-center items-center">
        <Skeleton height={500} width={500} borderRadius={20} />
      </div>

      {/* Thông tin chi tiết */}
      <div className="space-y-4 w-full">
        <Skeleton width={250} height={30} /> {/* Tên sản phẩm */}
        <Skeleton width={120} height={20} /> {/* Tồn kho */}
        <Skeleton width={350} height={30} /> {/* Đồng hồ đếm ngược */}

        {/* Size options */}
        <div>
          <Skeleton width={100} height={20} />
          <div className="flex gap-2 mt-2">
            {Array(5)
              .fill()
              .map((_, idx) => (
                <Skeleton key={idx} width={45} height={35} borderRadius={6} />
              ))}
          </div>
        </div>

        {/* Color options */}
        <div>
          <Skeleton width={100} height={20} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {Array(5)
              .fill()
              .map((_, idx) => (
                <Skeleton key={idx} width={70} height={35} borderRadius={6} />
              ))}
          </div>
        </div>

        {/* Add to cart */}
        <Skeleton height={45} borderRadius={50} />

        {/* Description */}
        <div>
          <Skeleton width={150} height={20} />
          <Skeleton count={2} />
        </div>

        {/* Shipping box */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {Array(4)
            .fill()
            .map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Skeleton circle width={40} height={40} />
                <div>
                  <Skeleton width={80} height={12} />
                  <Skeleton width={100} height={16} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
