import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReviewItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 py-4 border-b">
      {/* Header: Avatar + Tên + Ngày */}
      <div className="flex items-start gap-3">
        <Skeleton circle width={40} height={40} />
        <div className="flex flex-col gap-1">
          <Skeleton width={120} height={14} />
          <Skeleton width={100} height={12} />
        </div>
      </div>

      {/* Rating sao */}
      <div className="flex gap-1 mt-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} width={16} height={16} />
          ))}
      </div>

      {/* Nội dung bình luận */}
      <div className="mt-1">
        <Skeleton count={2} height={12} width="90%" />
      </div>

      {/* Ảnh review nếu có */}
      <div className="w-[80px] h-[80px] mt-2">
        <Skeleton width="100%" height="100%" />
      </div>

      {/* Footer: thời gian - thích - trả lời */}
      <div className="flex gap-4 text-sm text-gray-500 mt-2">
        <Skeleton width={50} height={10} />
        <Skeleton width={40} height={10} />
        <Skeleton width={50} height={10} />
      </div>
    </div>
  );
};
export default ReviewItemSkeleton;