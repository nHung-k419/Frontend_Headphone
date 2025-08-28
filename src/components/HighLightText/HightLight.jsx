// utils/highlightText.js
import { IoSearch } from "react-icons/io5";
export function highlightText(text, keyword) {
  console.log(text, keyword);
  
  if (!keyword) return text;

  const parts = text.split(new RegExp(`(${keyword})`, "gi"));
  //   console.log(text,keyword);

  // console.log(parts);

  return (
    <div className="w-full hover:bg-gray-200 cursor-pointer rounded-sm">
      <div className="flex items-center ml-3 p-3 lg:text-md md:text-md text-sm">
        <span className="mr-3 text-gray-500">
          <IoSearch />{" "}
        </span>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <span key={i} className="font-medium text-[#3fd0d4]">
              {part}
            </span>
          ) : (
            <span className="" key={i}>
              {part}
            </span>
          )
        )}
      </div>
    </div>
  );
}
