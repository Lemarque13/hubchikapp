import { useState, useEffect } from 'react';

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [banners, setBanners] = useState([
    { image: "/images/banner1.jpg", label: "🔥 Продукт дня", tag: "ХИТ" },
    { image: "/images/banner2.jpg", label: "🎁 Бонус за Stories", tag: "АКЦИЯ" },
    { image: "/images/banner3.jpg", label: "🏆 Челлендж для героев", tag: "ЧЕЛЛЕНДЖ" },
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [cart, setCart] = useState({});
  const [navTab, setNavTab] = useState("Главная");
  const [paymentMethod, setPaymentMethod] = useState("Click");
  const [votes, setVotes] = useState({});
  const [heroProgress, setHeroProgress] = useState(0);

  const merchItems = [
    { id: 1, name: "Футболка Hubchik", image: "/images/merch1.jpg", price: "149000" },
    { id: 2, name: "Кепка Hubchik", image: "/images/merch2.jpg", price: "89000" },
    { id: 3, name: "Термокружка Hubchik", image: "/images/merch3.jpg", price: "109000" },
  ];

  const votingData = [
    {
      question: "Какое блюдо добавить в меню?",
      options: ["Кимчи лаваш", "Сырный баскет", "Острые крылья"]
    },
    {
      question: "Что напечатать на стаканах?",
      options: ["#hubchikpower", "Питайся как босс", "Бери больше"]
    }
  ];

  useEffect(() => {
    const count = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
    setHeroProgress(Math.min(100, count * 10)); // 10% за каждую покупку
  }, [cart]);

  const handleVote = (qIdx, option) => {
    setVotes((prev) => ({ ...prev, [qIdx]: option }));
    setToastMessage("Ваш голос учтён 🙌");
    setTimeout(() => setToastMessage(""), 2500);
  };

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setToastMessage("Добавлено в корзину! 🛒");
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id] -= 1;
      else delete updated[id];
      return updated;
    });
  };

  const cartItems = merchItems.filter((item) => cart[item.id]);
  const totalPrice = cartItems.reduce((acc, item) => acc + cart[item.id] * parseInt(item.price), 0);

  return (
    <div className="pb-24">
      {navTab === "Главная" && (
        <div className="p-4 space-y-4">
          {banners.map((banner, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow">
              <img src={banner.image} alt="banner" className="w-full h-32 object-cover" />
            </div>
          ))}

          <h2 className="text-xl font-semibold text-[#2c924d] mt-4">🎁 Мерч Hubchik</h2>
          {merchItems.map((item) => (
            <div key={item.id} className="border rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="font-medium text-[#ec6839]">{item.name}</div>
                <div className="text-sm text-gray-600">{parseInt(item.price).toLocaleString()} сум</div>
              </div>
              <button
                onClick={() => addToCart(item.id)}
                className="px-3 py-1 text-sm bg-[#2c924d] text-white rounded-xl"
              >
                В корзину
              </button>
            </div>
          ))}
        </div>
      )}

      {navTab === "Корзина" && (
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold text-[#ec6839]">🛒 Корзина</h2>
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Корзина пуста</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-2">
                  <div>{item.name}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(item.id)} className="px-2 bg-[#ec6839] text-white">−</button>
                    <span>{cart[item.id]}</span>
                    <button onClick={() => addToCart(item.id)} className="px-2 bg-[#2c924d] text-white">+</button>
                  </div>
                </div>
              ))}
              <div className="text-right font-medium text-[#2c924d]">
                Общая сумма: {totalPrice.toLocaleString()} сум
              </div>
              <label className="block text-sm font-medium mb-1">Способ оплаты:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Click">Click Pay</option>
                <option value="Payme">Payme</option>
                <option value="Cash">Наличные</option>
              </select>
              <button className="w-full mt-2 py-2 bg-[#2c924d] text-white rounded-xl">Оформить заказ</button>
            </>
          )}
        </div>
      )}

      {navTab === "Ты — БОСС" && (
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold text-[#2c924d]">🗳️ Ты — БОСС</h1>
          {votingData.map((vote, qIdx) => (
            <div key={qIdx} className="bg-white shadow rounded-xl p-4 border">
              <h2 className="text-lg font-semibold mb-3 text-[#ec6839]">{vote.question}</h2>
              <div className="flex flex-col gap-2">
                {vote.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleVote(qIdx, opt)}
                    className={`px-4 py-2 rounded border text-sm transition font-medium ${
                      votes[qIdx] === opt
                        ? 'bg-[#2c924d] text-white border-[#2c924d]'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {navTab === "Подписка" && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#2c924d]">🍹 Подписка Hubchik+</h2>
          <p className="text-sm mt-2 mb-4 text-gray-600">Каждую неделю напиток бесплатно, скидка 15%, ранний доступ к новинкам.</p>
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className="w-full py-2 rounded-xl text-white font-semibold bg-[#ec6839]"
          >
            {isSubscribed ? "Отписаться" : "Оформить подписку Hubchik+"}
          </button>
        </div>
      )}

      {navTab === "Hubchik’s Hero" && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#2c924d]">🦸 Hubchik’s Hero</h2>
          <p className="text-sm text-gray-600 mb-2">Ты в клубе элитных гостей! Получай привилегии, доступ к спецменю и бонусам.</p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-[#2c924d] h-full text-xs text-white text-center"
              style={{ width: `${heroProgress}%` }}
            >
              {heroProgress}%
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Совершай покупки, чтобы продвигаться!</p>
        </div>
      )}

      {/* Нижняя навигация */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex justify-around py-2">
        {["Главная", "Корзина", "Ты — БОСС", "Подписка", "Hubchik’s Hero"].map((tab) => (
          <button
            key={tab}
            onClick={() => setNavTab(tab)}
            className={`text-xs font-medium ${navTab === tab ? 'text-[#ec6839]' : 'text-gray-500'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Уведомление */}
      {toastMessage && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#2c924d] text-white rounded-xl shadow">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
