import Link from 'next/link';

export default function Home() {

  return (
    <div className='flex items-center mt-[200px] flex-col'>
      <h1 className='mb-10 text-5xl font-bold text-white'>モンサクン チェック</h1>

      <Link 
       href="/pages/page1"
       className="w-[200px] h-[50px] bg-white  text-blue-800 rounded text-center pt-2 font-bold text-xl"
      >
        はじめる
      </Link>
    </div>
    
  )
}