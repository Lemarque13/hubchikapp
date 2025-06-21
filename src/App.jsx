// App.jsx — финальный функционал
import { useState, useEffect } from 'react';
import './index.css';
import {
  HomeIcon,
  HeartIcon,
  ShoppingCartIcon,
  CrownIcon,
  StarIcon
} from 'lucide-react';

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [banners, setBanners] = useState([
    { image: "https://via.placeholder.com/400x150?text=🔥+Продукт+дня" },
    { image: "https://via.placeholder.com/400x150?text=🎁+Сторис+бонус" },
    { image: "https://via.placeholder.com/400x150?text=🏆+Челлендж" },
  ]);
  const [cart, setCart] = useState({});
  const [navTab, setNavTab] = useState("Главная");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const merchItems = [
    { id: 1, name: "Футболка Hubchik", image: "https://via.placeholder.com/100x100?text=Tee", price: "149000" },
    { id: 2, name: "Кепка Hubchik", image: "https://via.placeholder.com/100x100?text=Cap", price: "89000" },
    { id: 3, name: "Термокружка Hubchik", image: "https://via.placeholder.com/100x100?text=Mug", price: "109000" },
  ];

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setToastMessage("Добавлено в корзину! 🛒");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id] -= 1;
      else delete updated[id];
      return updated;
    });
  };

  const renderCart = () => {
    const itemsInCart = merchItems.filter((item) => cart[item.id]);
    const total = itemsInCart.reduce((acc, item) => acc + (cart[item.id] * parseInt(item.price)), 0);

    return (
      <div className="p-4">
        <h2 className="text-[#2c924d] text-xl font-bold mb-4">🛒 Корзина</h2>
        {itemsInCart.length === 0 ? (
          <p className="text-gray-600">Корзина пуста</p>
        ) : (
          <div className="space-y-4">
            {itemsInCart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
                <img src={item.image} className="w-16 h-16 rounded-md" alt={item.name} />
                <div className="flex-1">
                  <div className="text-[#ec6839] font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">{parseInt(item.price).toLocaleString()} сум x {cart[item.id]}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">-</button>
                  <button onClick={() => addToCart(item.id)} className="px-2 py-1 bg-green-600 text-white rounded">+</button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-lg mt-4">Итого: {total.toLocaleString()} сум</div>
          </div>
        )}
      </div>
    );
  };

  const renderHero = () => {
    const totalItems = Object.values(cart).reduce((acc, count) => acc + count, 0);
    const progress = Math.min(100, totalItems * 10);
    return (
      <div className="p-4">
        <h2 className="text-[#2c924d] text-xl font-bold mb-4">🕶 Hubchik's Hero</h2>
        <p className="text-gray-700 mb-2">Прогресс челленджа: {progress}%</p>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="bg-[#ffb800] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress >= 100 && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-xl">
            Поздравляем! Вы стали Hubchik’s Hero 🎉 Получите эксклюзивный подарок в следующем заказе.
          </div>
        )}
      </div>
    );
  };

  const renderSubscription = () => (
    <div className="p-4">
      <h2 className="text-[#2c924d] text-xl font-bold mb-4">✨ Подписка Hubchik+</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Каждую неделю напиток бесплатно</li>
        <li>15% скидка на новинки</li>
        <li>Ранний доступ к акциям</li>
        <li>Привилегии в Club Hero</li>
      </ul>
      <button
        onClick={() => setIsSubscribed(true)}
        className={`mt-6 px-4 py-2 text-white font-semibold rounded-xl transition-all ${isSubscribed ? 'bg-green-400 cursor-default' : 'bg-[#2c924d] hover:bg-green-700'}`}
        disabled={isSubscribed}
      >
        {isSubscribed ? 'Вы уже подписаны ✅' : 'Подключить Hubchik+'}
      </button>
    </div>
  );

  return (
    <div className="font-jost bg-[#f2f2f2] min-h-screen pb-28">
      {navTab === "Главная" && (
        <>
          <div className="px-4 pt-4 space-y-4">
            {banners.map((b, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow">
                <img src={b.image} alt="banner" className="w-full h-36 object-cover" />
              </div>
            ))}
          </div>

          <div className="p-4">
            <h2 className="text-[#2c924d] text-xl font-bold mb-4 flex items-center gap-2">
              🎁 Мерч Hubchik
            </h2>
            <div className="space-y-3">
              {merchItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="text-[#ec6839] font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">{parseInt(item.price).toLocaleString()} сум</div>
                  </div>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="bg-[#2c924d] hover:bg-green-700 text-white text-sm px-3 py-1 rounded-xl"
                  >
                    В корзину
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {navTab === "Корзина" && renderCart()}
      {navTab === "Hero" && renderHero()}
      {navTab === "Подписка" && renderSubscription()}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2">
        <button onClick={() => setNavTab("Главная")} className={`flex flex-col items-center text-sm ${navTab === 'Главная' ? 'text-[#ffb800]' : 'text-gray-500'}`}>
          <HomeIcon size={20} /> Главная
        </button>
        <button className="flex flex-col items-center text-sm text-gray-500">
          <HeartIcon size={20} /> Избранное
        </button>
        <button onClick={() => setNavTab("Корзина")} className={`flex flex-col items-center text-sm ${navTab === 'Корзина' ? 'text-[#ffb800]' : 'text-gray-500'}`}>
          <ShoppingCartIcon size={20} /> Корзина
        </button>
        <button onClick={() => setNavTab("Подписка")} className={`flex flex-col items-center text-sm ${navTab === 'Подписка' ? 'text-[#ffb800]' : 'text-gray-500'}`}>
          <StarIcon size={20} /> Подписка
        </button>
        <button onClick={() => setNavTab("Hero")} className={`flex flex-col items-center text-sm ${navTab === 'Hero' ? 'text-[#ffb800]' : 'text-gray-500'}`}>
          <CrownIcon size={20} /> Hero
        </button>
      </div>

      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
