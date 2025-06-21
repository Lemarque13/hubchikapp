import { useState, useEffect } from 'react';

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [banners, setBanners] = useState([
    { image: "https://via.placeholder.com/400x150?text=🔥+Продукт+дня", label: "🔥 Продукт дня", tag: "ХИТ" },
    { image: "https://via.placeholder.com/400x150?text=🎁+Бонус+за+Stories", label: "🎁 Бонус за Stories", tag: "АКЦИЯ" },
    { image: "https://via.placeholder.com/400x150?text=🏆+Челлендж", label: "🏆 Челлендж для героев", tag: "ЧЕЛЛЕНДЖ" },
  ]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [cart, setCart] = useState({});
  const [navTab, setNavTab] = useState("Главная");
  const [paymentMethod, setPaymentMethod] = useState("Click");
  const [votes, setVotes] = useState({});
  const [heroProgress, setHeroProgress] = useState(0);

  const merchItems = [
    { id: 1, name: "Футболка Hubchik", image: "https://via.placeholder.com/100x100?text=Футболка", price: "149000" },
    { id: 2, name: "Кепка Hubchik", image: "https://via.placeholder.com/100x100?text=Кепка", price: "89000" },
    { id: 3, name: "Термокружка Hubchik", image: "https://via.placeholder.com/100x100?text=Кружка", price: "109000" },
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
    setHeroProgress(Math.min(100, count * 10));
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
    <div className="pb-24 font-sans bg-white min-h-screen">
      {navTab === "Главная" && (
        <div className="p-4 space-y-4">
          {banners.map((banner, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow">
              <img src={banner.image} alt="banner" className="w-full h-32 object-cover" />
            </div>
          ))}

          <h2 className="text-xl font-semibold text-[#2c924d] mt-4 flex items-center gap-2">
            🎁 <span>Мерч Hubchik</span>
          </h2>
          {merchItems.map((item) => (
            <div key={item.id} className="border rounded-xl p-3 flex items-center gap-4 shadow-sm">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <div className="font-medium text-[#ec6839]">{item.name}</div>
                <div className="text-sm text-gray-600">{parseInt(item.price).toLocaleString()} сум</div>
              </div>
              <button
                onClick={() => addToCart(item.id)}
                className="px-3 py-1 text-sm bg-[#2c924d] text-white rounded-xl hover:bg-green-700"
              >
                В корзину
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
