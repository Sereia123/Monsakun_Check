'use client';

import { useDraggable } from '@dnd-kit/core';

type Props = {
  id: string;
  disabled?: boolean;
};

export default function DraggableItem({ id, disabled = false }: Props) {
  const draggable = useDraggable({ id });  //動かしているアイテムid取得

  const style = {  //実際の動き
    transform: draggable.transform
      ? `translate(${draggable.transform.x}px, ${draggable.transform.y}px)`
      : undefined,
    opacity: disabled ? 0.5 : 1,  //動かせないとき不透明
    pointerEvents: disabled ? 'none' as const : 'auto' as const,
  };

  return (
    <div
      ref={draggable.setNodeRef}
      {...(disabled ? {} : draggable.listeners)}  //disabled → 動かせない
      {...(disabled ? {} : draggable.attributes)}
      style={style}
      className="flex items-center justify-center bg-sky-100 w-[150px] h-[40px] rounded-md shadow-md cursor-pointer"
    >
      {id}
    </div>
  );
}
