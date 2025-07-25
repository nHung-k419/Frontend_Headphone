import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonProductCard = () => {
  return (
    <div className="rounded-xl shadow-md p-4 w-full max-w-sm">
      {/* Image */}
      <div className="flex justify-center">
        <Skeleton height={100} width={170} circle={false} />
      </div>

      {/* Title */}
      <div className="mt-4">
        <Skeleton height={20} width={`60%`} />
      </div>

      {/* Stars */}
      <div className="mt-2">
        <Skeleton height={16} width={`40%`} />
      </div>

      {/* Description */}
      <div className="mt-2">
        <Skeleton count={2} height={12} />
      </div>

      {/* Price & Sale */}
      <div className="flex items-center gap-4 mt-4">
        <Skeleton height={20} width={70} />
        <Skeleton height={16} width={40} />
      </div>

      {/* Button */}
      <div className="mt-4">
        <Skeleton height={36} width={100} borderRadius={8} />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
