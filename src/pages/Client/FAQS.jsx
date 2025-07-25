import ReactMarkdown from "react-markdown";
import React from "react";

const FAQS = () => {
  const autoLinkImages = (text) => {
    return text.replace(/\[Hình ảnh:\s*(https?:\/\/[^\]]+\.(?:png|jpg|jpeg|webp|gif))\]/gi, "![]($1)");
  };

  const markdownText = `Chào bạn! Bạn muốn mua tai nghe. Dựa trên các sản phẩm chúng tôi có,
   đây là một số gợi ý phù hợp với bạn: Chúng tôi có các loại tai nghe khác nhau với nhiều mức
    giá và tính năng:  **Sony WH-1000XM5 (349,000 VND):** Đây là tai nghe chống ồn chủ động cao cấp với 
    chất lượng âm thanh tuyệt vời và thời lượng pin dài (30 giờ). Rất phù hợp nếu bạn cần một chiếc tai
     nghe chất lượng cao với khả năng khử tiếng ồn tốt. [Hình ảnh: https://res.cloudinary.com/drdbweosy/image/upload/v1751444976/StorageImages/v67aex0hjfoi7qxvl8h2.png]
      * **Bose QuietComfort 45 (329,000 VND):** Tai nghe này nổi bật với sự thoải mái và công nghệ khử tiếng ồn chủ động vượt trội. Nếu sự thoải mái khi đeo là 
     ưu tiên hàng đầu của bạn, đây là một lựa chọn tốt. [Hình ảnh: https://res.cloudinary.com/drdbweosy/image/upload/v1751878414/StorageImages/m8jw374jsaec73hun03d.png]
      * **Apple AirPods Max (549,000 VND):** Đây là tai nghe over-ear cao cấp của Apple, với chip H1 và âm thanh không gian. Nếu bạn sử dụng hệ sinh thái Apple và muốn
      trải nghiệm âm thanh không gian, đây là lựa chọn đáng xem xét. Tuy nhiên, đây là sản phẩm có giá cao nhất trong danh sách. 
      [Hình ảnh: https://res.cloudinary.com/drdbweosy/image/upload/v1751878452/StorageImages/ubljyefqyzgbqwhzao2f.png] * **Sennheiser Momentum 4 Wireless (379,000 VND):** Tai 
      nghe này mang đến chất âm cân bằng và khả năng chống ồn chủ động hiện đại. Đây là một sự lựa chọn tốt nếu bạn muốn sự cân bằng giữa chất lượng âm thanh, khả năng chống
       ồn và giá cả. [Hình ảnh: https://res.cloudinary.com/drdbweosy/image/upload/v1751878546/StorageImages/jp76polbqmyhyidwtrck.png] * **JBL Live 660NC (199,000 VND):** 
       Nếu bạn cần một chiếc tai nghe không dây với âm bass mạnh mẽ và thời lượng pin cực lâu (50 giờ), đây là lựa chọn tiết kiệm nhất. Tuy nhiên, chất lượng âm thanh tổng 
       thể có thể không được xuất sắc như các sản phẩm cao cấp hơn.
        [Hình ảnh: https://res.cloudinary.com/drdbweosy/image/upload/v1751878569/StorageImages/zy2ck6kvjvdsgxo3g5ky.png] Để giúp tôi 
        tư vấn chính xác hơn, bạn có thể cho tôi biết: * **Ngân sách của bạn là bao nhiêu?** * **Bạn thường dùng tai nghe để làm gì?
         (Nghe nhạc, gọi điện, chơi game,...)** * **Bạn ưu tiên tính năng nào nhất? (Chống ồn, chất lượng âm thanh, thời lượng pin, sự 
         thoải mái khi đeo,...)** Cung cấp thêm thông tin sẽ giúp tôi đưa ra lời khuyên phù hợp nhất cho bạn.
`;
  return (
    <div className="max-w-2xl p-6 bg-white rounded shadow-md mt-30">
      <ReactMarkdown>{autoLinkImages(markdownText)}</ReactMarkdown>
    </div>
  );
};

export default FAQS;
