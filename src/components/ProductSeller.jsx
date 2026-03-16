import { useQuery } from "@tanstack/react-query";
import { productBestSeller } from "../services/Client/Product";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback, useRef, memo } from "react";
import { GrNext } from "react-icons/gr";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
import { getRoute } from "../helper/route";

// Memoize Product Card to prevent unnecessary re-renders when carousel shifts
const ProductCard = memo(({ item }) => {
  const stock = item?.item?.Stock || 1;
  const sold = item?.item?.Sold || 0;
  const progress = Math.min((sold / stock) * 100, 100);

  return (
    <div className="embla__slide shrink-0 min-w-[200px] w-[200px] lg:min-w-[240px] lg:w-[240px]">
      <Link
        to={getRoute(`/Products/Detail/${item?.item?.Id_Products?._id}`)}
        className="group flex flex-col h-full bg-transparent transition-all duration-300 relative"
      >
        {/* Image Container - Organic shape */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#fafafa] mb-4 group-hover:bg-[#f3f4f6] transition-colors duration-300">
          {/* Soft Sale Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] tracking-wider font-semibold px-2 py-1 rounded-full">
              SALE
            </span>
          </div>

          <img
            // Remove heavy scale transform on hover for better performance
            className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-500 ease-out will-change-transform"
            src={item?.item?.Image?.path}
            alt={item?.item?.Id_Products?.Name}
            loading="lazy"
          />

          {/* Subtle action button on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur text-gray-800 shadow-sm flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors">
              <GrNext size={14} />
            </div>
          </div>
        </div>

        {/* Content - Compact Layout */}
        <div className="flex flex-col flex-grow px-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-relaxed group-hover:text-emerald-700 transition-colors duration-300 mb-1.5 min-h-[22px]">
            {item?.item?.Id_Products?.Name}
          </h3>

          {/* Stars & Reviews */}
          <div className="flex items-center space-x-1.5 mb-2">
            <ReactStars
              count={5}
              size={14}
              value={item?.item?.Id_Products?.Rating || 0}
              isHalf={true}
              edit={false}
              activeColor="#fbbf24"
            />
            <span className="text-[11px] text-gray-400 mt-0.5">
              ({item?.reviews?.length || 0})
            </span>
          </div>

          {/* Price */}
          <div className="mt-auto grid grid-cols-1 gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-gray-900">
                {item?.item?.Price?.toLocaleString("vi-VN")}đ
              </span>
              <span className="text-[11px] text-gray-400 line-through">
                {(item?.item?.Price * 1.1)?.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>

          {/* Minimalist Stock Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
              <span>Đã bán {sold}</span>
            </div>
            {/* Removed internal framer-motion here to save computation during carousel scroll */}
            <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden relative">
              <div
                className="bg-emerald-400/80 h-1 rounded-full absolute top-0 left-0 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
});

const ProductSeller = () => {
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const autoplay = useRef(
    Autoplay(
      { delay: 4000, stopOnInteraction: false },
      (emblaRoot) => emblaRoot.parentElement
    )
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, slidesToScroll: 1, align: "start", dragFree: true },
    [autoplay.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const { data } = useQuery({
    queryKey: ["productBestSeller"],
    queryFn: productBestSeller,
  });

  return (
    <section className="relative w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header Section - Minimal & Natural */}
        <div className="flex flex-row justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <div>
            <h2 className="font-normal text-2xl md:text-3xl text-gray-900 mb-1 transition-colors">
              Được yêu thích nhất
            </h2>
            <p className="text-sm text-gray-400 font-light">
              Những lựa chọn hàng đầu từ khách hàng của chúng tôi
            </p>
          </div>

          {/* Subtle Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors will-change-transform"
            >
              <IoArrowBack size={18} />
            </button>
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors will-change-transform"
            >
              <IoArrowForward size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            {/* Reduced framer-motion complexity on container */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.5 }}
              className="embla__container flex gap-5 py-2"
            >
              {data?.AllProductSellerReviews?.map((item) => (
                <ProductCard key={item?.item?.Id_Products?._id} item={item} />
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center items-center gap-6 mt-6 md:hidden">
            <button
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 active:bg-gray-100 transition-colors"
            >
              <IoArrowBack size={18} />
            </button>
            <button
              onClick={() => emblaApi && emblaApi.scrollNext()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 active:bg-gray-100 transition-colors"
            >
              <IoArrowForward size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSeller;
