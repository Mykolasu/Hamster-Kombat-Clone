import "./App.css";
import Hamster from "./icons/Hamster";
import { useEffect, useState } from "react";
import {
  binanceLogo,
  dollarCoin,
  dailyReward,
  dailyCipher,
  dailyCombo,
} from "./images";
import Info from "./icons/Info";
import Settings from "./icons/Settings";

function App() {
  const levelNames = [
    "Bronze", // from 0 to 4999 coins
    "Silver", // from 5000 coins to 24,999 coins
    "Gold", // from 25,000 coins to 99,999 coins
    "Platinum", // from 100,000 coins to 999,999 coins
    "Diamond", // from 1,000,000 coins to 1,999,999 coins
    "Epic", // from 2,000,000 coins to 9,999,999 coins
    "Legendary", // from 10,000,000 coins to 49,999,999 coins
    "Master", // from 50,000,000 coins to 99,999,999 coins
    "GrandMaster", // from 100,000,000 coins to 999,999,999 coins
    "Lord", // from 1,000,000,000 coins to infinity
  ];

  const levelMinPoints = [
    0, // bronze
    5000, // silver
    25000, // gold
    100000, // platinum
    1000000, // diamond
    2000000, // epic
    10000000, // legendary
    50000000, // master
    100000000, // grandMaster
    1000000000, // lord
  ];

  const [levelIndex, setLevelIndex] = useState(2);
  const [points, setPoints] = useState(49855);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const pointsToAdd = 11;
  const profitPerHour = 132344;

  const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
  const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
  const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}`;
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY (${x / 10})deg`;
    setTimeout(() => {
      card.style.transform = '';
    }, 100);

    setPoints(points + pointsToAdd);
    setClicks([...clicks, {id: Date.now(), x: e.pageX, y: e.pageY}])
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setDailyRewardTimeLeft(calculateTimeLeft(0));
      setDailyCipherTimeLeft(calculateTimeLeft(19));
      setDailyComboTimeLeft(calculateTimeLeft(12));
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress =
      ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  const formatProfitPerHour = (profit: number) => {
    if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
    if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
    if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
    return `+${profit}`;
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
        <div className="px-4 z-10">
          <div className="flex items-center space-x-2 pt-4">
            <div className="p-1 rounded-lg bg-[#1d2025]">
              <Hamster size={24} className="text-[#d4d4d4]" />
            </div>
            <div>
              <p className="text-sm">Mykolka (CEO)</p>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4 mt-1">
            <div className="flex items-center w-1/3">
              <div className="w-full">
                <div className="flex justify-between">
                  <p className="text-sm">{levelNames[levelIndex]}</p>
                  <p className="text-sm">
                    {levelIndex + 1}{" "}
                    <span className="text-[#95908a]">
                      / {levelNames.length}
                    </span>
                  </p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div
                      className="progress-gradient h-2 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full
            px-4 py-[2px] bg-[#43433b]/[0.6] max-w-64"
            >
              <img src={binanceLogo} alt="Exchange" className="w-8 h-8" />
              <div className="flex-1 text-center">
                <p className="text-xs text-[#85827d] font-medium">
                  Profit per hour
                </p>
                <div className="flex items-center justify-center space-x-1">
                  <img src={dollarCoin} alt="Dollar Coin" className="w-5 h-5" />
                  <p className="text-sm">
                    {formatProfitPerHour(profitPerHour)}
                  </p>
                  <Info size={20} className="text-[#43433b]" />
                </div>
              </div>
              <Settings className="text-white" />
            </div>
          </div>
        </div>

        <div className="top-glow flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="absolute top-1 left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]">
            <div className="px-4 mt-6 flex justify-between gap-2">
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img
                  src={dailyReward}
                  alt="Daily Reward"
                  className="mx-auto w-12 h-12"
                />
                <p className="text-[10px] text-center text-white mt-1">
                  Daily reward
                </p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailyRewardTimeLeft}
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img
                  src={dailyCipher}
                  alt="Daily Cipher"
                  className="mx-auto w-12 h-12"
                />
                <p className="text-[10px] text-center text-white mt-1">
                  Daily cipher
                </p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailyCipherTimeLeft}
                </p>
              </div>
              <div className="bg-[#272a2f] rounded-lg px-4 py-2 w-full relative">
                <div className="dot"></div>
                <img
                  src={dailyCombo}
                  alt="Daily Combo"
                  className="mx-auto w-12 h-12"
                />
                <p className="text-[10px] text-center text-white mt-1">
                  Daily combo
                </p>
                <p className="text-[10px] font-medium text-center text-gray-400 mt-2">
                  {dailyComboTimeLeft}
                </p>
              </div>
            </div>

            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2">
                <img src={dollarCoin} alt="Dollar Coin" className="w-10 h-10" />
                <p className="text-4xl text-white">
                  {points.toLocaleString("en-EN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
