import './App.css'
import Hamster from './icons/Hamster';
import { useState } from 'react';

function App() {

  const levelNames = [
    "Bronze",      // from 0 to 4999 coins
    "Silver",      // from 5000 coins to 24,999 coins
    "Gold",        // from 25,000 coins to 99,999 coins
    "Platinum",    // from 100,000 coins to 999,999 coins
    "Diamond",     // from 1,000,000 coins to 1,999,999 coins
    "Epic",        // from 2,000,000 coins to 9,999,999 coins
    "Legendary",   // from 10,000,000 coins to 49,999,999 coins
    "Master",      // from 50,000,000 coins to 99,999,999 coins
    "GrandMaster", // from 100,000,000 coins to 999,999,999 coins
    "Lord"         // from 1,000,000,000 coins to infinity
  ];

  const [levelIndex, setLevelIndex] = useState(6);

  return (
    <div className='bg-black flex justify-center'>
      <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>

        <div className='px-4 z-10'>

          <div className='flex items-center space-x-2 pt-4'>
            <div className='p-1 rounded-lg bg-[#1d2025]'>
              <Hamster size={24} className='text-[#d4d4d4]'/>
            </div>
            <div>
              <p className='text-sm'>Mykolka (CEO)</p>
            </div>
          </div>

          <div className='flex items-center justify-between space-x-4 mt-1'>
            <div className='flex items-center w-1/3'>
              <div className='w-full'>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default App
