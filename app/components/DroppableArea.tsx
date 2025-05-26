'use client';

import { useDroppable } from '@dnd-kit/core';
import DraggableItem from './DraggableItem';

type Props = {
  id: string;
  color: 'red' | 'green' | 'yellow' | 'gray';
  items: string[];
  direction?: 'row' | 'column'; 
  isDraggable: boolean;

};

export default function DroppableArea({ id, color, items, direction = 'row', isDraggable}: Props) {
  const { setNodeRef, } = useDroppable({ id });  //ドロップエリアの定義


  const baseBorder = ` border-dashed border-[1px] rounded-xl flex ${
    direction === 'column' ? 'flex-col' : 'flex-row'  //エリアを縦か横にならべる
  } items-center justify-center gap-3 p-2` ;

  const borderColorClass = {
    red: 'border-red-400',
    green: 'border-green-400',
    yellow: 'border-yellow-400',
    gray: 'border-gray-500',
  }[color as string];

  const sizeClass =
    id === 'unplaced'
      ? 'w-[300px] min-h-[300px] -translate-y-12' 
      : 'w-[280px] h-[70px]';

  return (
    <div ref={setNodeRef} className={`${baseBorder} ${borderColorClass} ${sizeClass} text-center text-sm `}>
      {items.map((item) => (  //エリア描画
        <DraggableItem key={item} id={item} disabled={!isDraggable}/>
      ))}
    </div>
  );
}
