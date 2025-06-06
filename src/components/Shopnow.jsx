import { MdArrowOutward } from "react-icons/md";
const Shopnow = ({ props }) => {
  console.log(props);

  return (
    <div>
      <div className={` ${props === 'See More' ? 'flex justify-center mt-15' : 'ml-27'}`}>
        <button
        className={`${
          props === "See More"
            ? "bg-blue-950 text-white h-15 max-w-40 w-full rounded-full inline-flex items-center gap-2 relative text-center p-4"
            : "bg-blue-950 text-white h-15 w-[190px] rounded-full inline-flex items-center gap-2 relative text-center p-4"
        }`}
      >
        {props}
        <span className="text-xl w-10 h-10 rounded-full bg-white text-black absolute right-2 flex items-center justify-center">
          <MdArrowOutward/>
        </span>
      </button>
      </div>
    </div>
  );
};

export default Shopnow;
