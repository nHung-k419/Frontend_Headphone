import { useState } from "react";

export default function FAQS() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  const faqs = [
    {
      category: "Thanh toán",
      questions: [
        {
          q: "Tôi có thể thanh toán bằng phương thức nào?",
          a: "Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử và COD."
        },
        {
          q: "Thanh toán online có an toàn không?",
          a: "Hoàn toàn an toàn vì chúng tôi sử dụng công nghệ mã hóa SSL và chứng thực 3D Secure."
        }
      ]
    },
    {
      category: "Vận chuyển",
      questions: [
        {
          q: "Bao lâu tôi nhận được hàng?",
          a: "Thời gian giao hàng từ 2–5 ngày làm việc tùy khu vực."
        },
        {
          q: "Tôi có thể theo dõi đơn hàng không?",
          a: "Có, bạn sẽ nhận được mã vận đơn để theo dõi trực tiếp trên website."
        }
      ]
    },
    {
      category: "Bảo hành & đổi trả",
      questions: [
        {
          q: "Sản phẩm có bảo hành không?",
          a: "Mỗi sản phẩm đều được bảo hành chính hãng từ 6–12 tháng."
        },
        {
          q: "Tôi muốn đổi trả thì làm thế nào?",
          a: "Bạn chỉ cần liên hệ CSKH trong vòng 7 ngày để được hỗ trợ đổi trả miễn phí."
        }
      ]
    }
  ];

  return (
    <section className="bg-gray-50 py-30 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Câu hỏi thường gặp
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Tất cả những thắc mắc phổ biến của khách hàng về sản phẩm, dịch vụ và chính sách của chúng tôi.
          </p>
        </div>

        {/* Grid 3 cột danh mục */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faqs.map((cat, i) => (
            <div key={i} className="bg-white shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-teal-600 mb-4 border-b pb-2">
                {cat.category}
              </h3>
              <div className="space-y-4">
                {cat.questions.map((item, j) => (
                  <div
                    key={j}
                    className="border-b last:border-none pb-2 cursor-pointer"
                  >
                    <div
                      onClick={() => toggle(`${i}-${j}`)}
                      className="flex justify-between items-center"
                    >
                      <p className="font-medium text-gray-800">{item.q}</p>
                      <span className="text-teal-600">
                        {open === `${i}-${j}` ? "−" : "+"}
                      </span>
                    </div>
                    {open === `${i}-${j}` && (
                      <p className="text-gray-600 mt-2">{item.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Layout 2 cột dạng Q&A trực tiếp */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Câu hỏi phổ biến
            </h3>
            <ul className="space-y-6">
              <li>
                <p className="font-semibold text-gray-800">
                  Làm sao để hủy đơn hàng?
                </p>
                <p className="text-gray-600 mt-1">
                  Bạn có thể hủy trực tiếp trong mục “Đơn hàng của tôi” hoặc liên hệ CSKH.
                </p>
              </li>
              <li>
                <p className="font-semibold text-gray-800">
                  Tôi muốn xuất hóa đơn VAT thì làm sao?
                </p>
                <p className="text-gray-600 mt-1">
                  Vui lòng nhập thông tin doanh nghiệp khi thanh toán, chúng tôi sẽ xuất hóa đơn cho bạn.
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-teal-600 text-white rounded-2xl p-10 shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Bạn chưa tìm thấy câu trả lời?</h3>
            <p className="mb-6">
              Đội ngũ chăm sóc khách hàng sẵn sàng hỗ trợ bạn 24/7 qua nhiều kênh.
            </p>
            <button className="px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
              Liên hệ hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
