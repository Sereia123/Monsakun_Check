'use client';

import Link from 'next/link';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { useState } from 'react';
import DroppableArea from '../../components/DroppableArea';
import Judge from '../../components/Judge';
import {question, A, B, C, D, E, F, correctAnswers, changeConstraint } from '../../components/Practice/Data2';
import CheckBox from '../../components/CheckBox';

export default function Page1() {

  type AreaId = 'unplaced' | 'dropRed' | 'dropGreen' | 'dropYellow' ;

  const [areaItems, setAreaItems] = useState<Record<AreaId, string[]>>({
    'unplaced': [A, B, C],  //カードの元場所・未配置 最初はここに生成
    'dropRed': [D],  //赤枠
    'dropGreen': [E],  //緑枠
    'dropYellow': [F],  //黄色枠
  });

  const [isDraggable, setIsDraggable] = useState(true);  //ドラッグアンドドロップ
  const [isCheckable, setIsCheckable] = useState(true);  //チェックボタン
  const [showUnplaced, setShowUnplaced] = useState(true);  //右の要素の切り替え
  const [selectedOption, setSelectedOption] = useState<string>('オブジェクト');  //制約
  const [toNext, setToNext] = useState<boolean>(false);  //Nextボタン表示

 
  return (
    <DndContext  //useDraggable useDroppableが使用可能
      collisionDetection={closestCenter}  //ドロップ領域の重なりを検知
      onDragEnd={({ active, over }) => {
        if (over) {  //どこに重なっていたかをcollisionDetectionから
          const to = over.id as 'dropRed' | 'dropGreen' | 'dropYellow' | 'unplaced';
          const item = String(active.id);  //重なりアイテム取得

          const newArea = Object.fromEntries(Object.entries(areaItems).map(([key, values]) => [  //areaitemsを配列にしてkey, valuesを埋め込む
            key,
            values.filter((v) => v !== item),  //areaItemsに配置しているものとitemが同じ場合削除
          ])) as typeof areaItems;  //型補完

          const isSingleItemArea = to !== 'unplaced'; // ← unplaced は複数配置可能

          if (isSingleItemArea && newArea[to].length > 0) return;
          //何かおいてたら何もしない

          // item を新しいドロップ先に追加
          newArea[to] = isSingleItemArea ? [item] : [...newArea[to], item]; //unplace以外だと記憶しているものにアイテム追加

          setAreaItems(newArea);  //useStateに状態を更新
          }
      }}>

      
      
      <div className=" bg-white w-[1000px] h-[700px] mx-auto mt-[100px] p-[10px] border border-gray-400 rounded-xl" > {/*背景*/}

        <div className='flex'>
          <p className='bg-blue-800 pt-[130px] pl-10 rounded-[50%] w-[250px] h-[250px] text-center ml-0 text-5xl font-bold mb-2 -translate-x-[100px] -translate-y-[100px] text-white'>Level２</p>

          <p className='text-blue-800 text-5xl font-bold translate-x-[80px] mt-[15px]'>モンサクン チェック</p>
        </div>
        

        <div className="flex w-[800px] h-[530px] mx-auto gap-10 px-10 -translate-y-[150px]">
          <div className="flex flex-col gap-3">
            <div className="bg-white w-[350px] h-[100px] text-center">  {/*問題*/}
              <p className='text-2xl'>
                {question[0]}<br/>
                {question[1]}
              </p>
            </div>
            <div className="bg-blue-800 w-[350px] h-[600px] rounded-xl p-3 flex flex-col items-center justify-center gap-7">{/*問題の解答配置エリア*/}

              <DroppableArea id="dropRed" color="red" items={areaItems['dropRed']} isDraggable={isDraggable}/>
              <DroppableArea id="dropGreen" color="green" items={areaItems['dropGreen']} isDraggable={isDraggable}/>
              <DroppableArea id="dropYellow" color="yellow" items={areaItems['dropYellow']} isDraggable={isDraggable}/>
              


              <div className="w-[280px] h-[30px] mx-auto text-white font-bold text-2xl">
                <p>算数文章題を直してみよう！</p>
              </div>

            </div>

            <div className='-translate-x-2'>
              <Judge  //チェック 判定 もう一度ボタン制御
                areaItems={areaItems}
                setIsDraggable={setIsDraggable}
                setIsCheckable={setIsCheckable}
                showUnplaced={showUnplaced}
                setShowUnplaced={setShowUnplaced}
                selectedOption={selectedOption}
                toNext={toNext} 
                setToNext={setToNext} 
                correctAnswers={correctAnswers}
                changeConstraint={changeConstraint}
              />
            </div>
          </div>

          <div className="w-[200px] min-h-[200px] translate-y-[70px] translate-x-[30px] rounded-xl">

            {showUnplaced && (  //元のカード配置エリア
              <DroppableArea
                id="unplaced"
                color="gray"
                items={areaItems['unplaced']}
                direction="column"
                isDraggable={isDraggable}
              />
            )}

            {!showUnplaced && (
              <CheckBox  //制約選択エリア
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                isCheckable={isCheckable}
              />
            )}

            {toNext && (  //Nextボタン
              <div className='-translate-x-[322px] translate-y-[95px] h-[60px] mb-2'>
                <Link 
                  href="/pages/page2"
                  className="bg-red-500 inline-block w-[150px] h-[50px] text-white text-2xl font-bold px-[46px] py-2 rounded hover:bg-red-600 shadow active:translate-y-[2px] active:shadow-none transition">
                  つぎへ
                </Link>
              </div>
              
            )}
            
            
          </div>
        </div>
      </div>
    </DndContext>
  );
}
