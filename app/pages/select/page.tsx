import Link from 'next/link';

export default function Selectpage(){
  return(
    <div className=" bg-white w-[1000px] h-[600px] mx-auto mt-[2%] p-[30px] border border-gray-400 rounded-xl" > 
      <p className="text-5xl font-bold text-blue-800 mt-10">レベルを選択しよう！</p>

      <div className="flex justify-center mt-[150px] gap-20">
        <Link
          href="/pages/Level1-1"
          className="bg-blue-800 w-[180px] h-[180px] rounded-xl flex items-center justify-center hover:bg-blue-500"
        >
          <p className="text-white font-bold text-4xl">レベル１</p>
        </Link>

        <Link
          href=""
          className="bg-green-500 w-[180px] h-[180px] rounded-xl flex items-center justify-center hover:bg-green-400"
        >
          <p className="text-white font-bold text-4xl">レベル２
          </p>
        </Link>

        <Link
          href=""
          className="bg-yellow-400 w-[180px] h-[180px] rounded-xl flex items-center justify-center hover:bg-yellow-300"
        >
          <p className="text-white font-bold text-4xl">レベル３</p>
        </Link>
        
       

      </div>
      
    </div>
  );
  
}