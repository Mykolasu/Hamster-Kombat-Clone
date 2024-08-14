import "./App.css";
import Hamster from "./icons/Hamster";
import { useState } from "react";

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
    0,         // bronze
    5000,      // silver
    25000,     // gold
    100000,    // platinum
    1000000,   // diamond
    2000000,   // epic
    10000000,  // legendary
    50000000,  // master
    100000000, // grandMaster
    1000000000 // lord
  ]

  const [levelIndex, setLevelIndex] = useState(2);
  const [points, setPoints] = useState(49855);

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  }

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
