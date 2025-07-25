import ReactMarkdown from "react-markdown";

const ChatBubble = ({ from, text }) => {
  const autoLinkImages = (text) => {
    return text.replace(/\[Hình ảnh:\s*(https?:\/\/[^\]]+\.(?:png|jpg|jpeg|webp|gif))\]/gi, "![]($1)");
  };
  const isBot = from === "bot";
  return (
     <div className={`flex ${from === "user" ? "justify-end" : "justify-start"}`}>
      {isBot && <div className="w-7 h-full rounded-full bg-teal-500 text-white flex flex-col justify-end mr-2 text-sm text-center leading-6.5">AI</div>}
      <div
        className={`max-w-[85%] p-3 rounded-xl text-sm leading-snug shadow whitespace-pre-wrap
        ${from === "user" ? "bg-teal-500 text-white rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none"}`}
      >
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              const isImage = href.match(/\.(png|jpg|jpeg|webp|gif)$/i);
              if (isImage) {
                return <img src={href} alt={children?.[0] || "Hình ảnh"} className="my-2 w-45 h-50 rounded-md shadow object-contain bg-white hover:scale-105 transform duration-300 ease-in-out cursor-pointer" />;
              }
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {children}
                </a>
              );
            },
            img: ({ src, alt }) => <img src={src} alt={alt} className="my-2 w-48 rounded-md border shadow" />,
            p: ({ children }) => <p className="mb-2">{children}</p>,
            li: ({ children }) => <li className="list-disc ml-5">{children}</li>,
          }}
        >
          {autoLinkImages(text)}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatBubble;
