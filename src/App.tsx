import './App.css'
import Hamster from './icons/Hamster';

function App() {

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

        </div>

      </div>
    </div>
  )
}

export default App
