'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { useState } from 'react';

type DropArea = 'dropRed' | 'dropGreen' | 'dropYellow';

export default function Judge({
  areaItems,
  setIsDraggable,
  setIsCheckable,
  showUnplaced,
  setShowUnplaced,
  selectedOption,
  toNext,
  setToNext,
  correctAnswers,
  changeConstraint,
  nextPage,
}: {
  areaItems: Record<string, string[]>;
  setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckable: React.Dispatch<React.SetStateAction<boolean>>;
  showUnplaced: boolean;
  setShowUnplaced: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
  toNext: boolean;
  setToNext: React.Dispatch<React.SetStateAction<boolean>>;
  correctAnswers: Record<string, string>;
  changeConstraint: string;
  nextPage: string;
}) { 
  const [result, setResult] = useState<string | null>(null);  //正誤判定
  const [restart, setRestart] = useState<boolean>(false);  //もう一度ボタン表示
  const [wrongReasons, setWrongReasons] = useState<string[]>([]);  //間違い理由
  const router = useRouter(); // useRouterフックを使用


  const handleJudge = () => {  //判定ボタン後
    let isCorrect:boolean = true;
    const newWrongReasons: string[] = [];
    setToNext(false);

    for (const key of Object.keys(correctAnswers) as DropArea[]) {  //正解配列のkeyを取得
      const correct = correctAnswers[key];
      const actual = areaItems[key]?.[0]; //?.:'undefined'を扱える(エラーにならない)



      if (correct !== actual) {
        isCorrect = false;
        newWrongReasons.push(`算数文章題を見直してみよう！`);
      }

      
      if(!isCorrect){
        break;
      }
    }

    if (selectedOption !== changeConstraint){
      isCorrect = false;
      newWrongReasons.push(`修正した制約を見直してみよう！`);
    }

    if(isCorrect){
      setToNext(true); // 正解なら「つぎへ」ボタンを表示

    }

    setWrongReasons(newWrongReasons);
    setResult(isCorrect ? '✅ 正解だよ！' : '❌ 間違っているよ');
    setRestart(true);
    setIsCheckable(false);
  };

  const handleCheck = () => {  //チェックボタン後
    setIsDraggable(false);
    setShowUnplaced(false);
  }

  const handleStop = () => {  //もう一度ボタン後
    setResult(null);
    setIsDraggable(true);
    setIsCheckable(true);
    setRestart(false);
    setShowUnplaced(true);
  };

  const handleNext = () =>{
    router.push(nextPage); // 「つぎへ」ボタンクリックでページ遷移
  }
  

  

  return (
    <div className="relative mt-2">
      <div className='flex items-center translate-x-4 h-[50px]'>
        {showUnplaced && (
          <button
            onClick={handleCheck}
            className='bg-yellow-300 w-[150px] h-[50px] text-white text-2xl font-bold px-4 py-2 rounded hover:bg-yellow-400 translate-x-[90px] shadow active:translate-y-[2px] active:shadow-none transition'
          >
            チェック
          </button>
        )}
        


        {!showUnplaced && !restart && (
          <button
            onClick={handleJudge}
            className="bg-blue-500 w-[150px] h-[50px] text-white text-2xl font-bold px-4 py-2 rounded hover:bg-blue-600 translate-x-[90px] shadow active:translate-y-[2px] active:shadow-none transition"
          >
           はんてい
          </button>   
        )}
        

        {restart && !toNext && (
          <button
            onClick={handleStop}
            className="bg-gray-500 w-[150px] h-[50px] text-white text-2xl font-bold px-4 py-2 rounded  hover:bg-gray-600 translate-x-[90px] shadow active:translate-y-[2px] active:shadow-none transition"
          >
            もういちど
          </button> 
        )}

        {toNext && (  //Nextボタン
           <button
              onClick={handleNext}
              className="bg-red-500 w-[150px] h-[50px] text-white text-2xl font-bold px-4 py-2 rounded  hover:bg-red-600 translate-x-[90px] shadow active:translate-y-[2px] active:shadow-none transition"
            >
              つぎへ
            </button> 
            

                      
        )}

      </div>
      

      {result && (  //useStateのresultに値が入っている場合実行
        
        <div className='absolute w-[400px] translate-x-[380px] -translate-y-[130px] font-semibold '>
          <p className="text-center mb-1 text-2xl">{result}</p>

          {restart && wrongReasons.length > 0 &&(
            <div className='ml-8 text-red-500 text-2xl'>
            {wrongReasons.map((reason, index) => (  //間違いの原因を表示
              <li key={index} className="mb-1">{reason}</li>
            ))}
            </div>
          )}
        </div>
          
      )}  
    </div>
  );
}
