import { useState } from 'react';

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

  const handleVote = (qIdx, option) => {
    setVotes((prev) => ({ ...prev, [qIdx]: option }));
    setToastMessage("Ваш голос учтён 🙌");
    setTimeout(() => setToastMessage(""), 2500);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-[#2c924d]">🗳️ Голосование</h1>

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

      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#2c924d] text-white rounded-xl shadow">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
