import { useQuery } from "@tanstack/react-query";
import { productBestSeller } from "../services/Client/Product";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState, useCallback, useRef } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import ReactStars from "react-rating-stars-component";
import { motion } from "framer-motion";
const ProductSeller = () => {
  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, slidesToScroll: 1 });
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const autoplay = useRef(
    Autoplay(
      { delay: 3000, stopOnInteraction: false },
      (emblaRoot) => emblaRoot.parentElement // bắt đầu auto từ viewport
    )
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1,align:"start" }, [autoplay.current]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const { data } = useQuery({
    queryKey: ["productBestSeller"],
    queryFn: productBestSeller,
  });
  return (
    <section className="relative w-full">
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="font-bold text-3xl text-center">Sản phẩm bán chạy</h1>

        <div className="embla  mt-10">
          {/* Viewport phải đặt ref */}
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            {/* Container flex để có thể scroll */}
            <motion.div  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    y: {
                      delay: 0.5,
                      type: "spring",
                      stiffness: 60,
                    },
                    opacity: {
                      delay: 0.5,
                      duration: 1,
                    },
                  }}  className="embla__container flex gap-6 select-none">
              {data?.AllProductSellerReviews?.map((item) => (   
                <Link
                  to={`/Products/Detail/${item?.item?.Id_Products?._id}`}
                  key={item?.item?.Id_Products?._id}
                  className="embla__slide shrink-0 min-w-[280px] max-w-[280px] h-[350px] lg:p-10 rounded-md relative overflow-hidden group cursor-pointer flex justify-center"
                >
                  <img className="lg:w-full w-[140px] h-full object-contain" src={item?.item?.Image?.path} alt="" />
                  <div className="absolute inset-0 bg-black/60 text-white transform translate-y-full group-hover:translate-y-0 transition duration-400 px-4 py-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold truncate">{item?.item?.Id_Products?.Name}</h2>
                        <span className="bg-red-500 text-xs font-bold px-2 py-1 rounded">SALE</span>
                      </div>
                      {/* <div className="text-yellow-400 text-sm mt-2">★★★★★ (123)</div> */}
                      <div className="flex space-x-1 items-center">
                        <ReactStars count = {5} size={17} value={item?.item?.Id_Products?.Rating} isHalf={true}  edit={false} />
                        <span>( {item?.reviews?.length} đánh giá )</span>
                      </div>
                      <p>Đã bán : {item?.item?.Sold} / {item?.item?.Stock}</p>
                      <p className="text-md text-white font-normal mt-2 line-clamp-4">{item?.item?.Id_Products?.Description}</p>
                    </div>
                    <Link to={`/Products/Detail/${item?.item?.Id_Products?._id}`} className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-lg font-semibold">{item?.item?.Price?.toLocaleString("vi-VN")}đ</span>
                        <del className="text-sm text-red-400 ml-2">$249</del>
                      </div>
                      <button className="bg-white text-black text-sm px-5 py-2 cursor-pointer rounded-md hover:bg-gray-200 transition">
                        Xem thêm
                      </button>
                    </Link>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute flex justify-between items-center pointer-events-none w-full top-1/2">
        <button
          onClick={() => emblaApi && emblaApi?.scrollPrev()}
          // disabled={!prevEnabled}
          className="pointer-events-auto w-10 h-10 bg-gray-100 text-black rounded-full hover:text-white hover:bg-black transition shadow-md flex items-center justify-center cursor-pointer lg:ml-25 ml-7"
        >
          <IoArrowBack />
        </button>
        <button
          onClick={() => emblaApi && emblaApi?.scrollNext()}
          // disabled={!nextEnabled}
          className="pointer-events-auto w-10 h-10 bg-gray-100 text-black rounded-full hover:text-white hover:bg-black transition shadow-md flex items-center justify-center cursor-pointer lg:mr-25 mr-7"
        >
          <IoArrowForward />
        </button>
      </div>
    </section>
  );
};

export default ProductSeller;
