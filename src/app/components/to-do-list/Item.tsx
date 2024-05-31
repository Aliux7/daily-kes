import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemProps, ItemType } from "./Types";
import { EditTask } from "./EditTask";

const DND_ITEM_TYPE = "ITEM";

const Item: React.FC<ItemProps & { handleEditItem: (item: ItemType) => void }> = ({
  item,
  index,
  moveItem,
  toggleCheck,
  handleEditItem,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(draggedItem: { index: number }) {
      if (draggedItem.index !== index && moveItem) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DND_ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div>
      <div
        ref={ref}
        className={`flex items-center  mb-2 bg-[var(--item-color)] text-[var(--text-color)] rounded shadow cursor-move ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        <span className="w-full p-3" onClick={() => handleEditItem(item)}>{item.title}</span>
        <input
          type="checkbox"
          checked={item.status}
          onChange={() => toggleCheck(item.id, !item.status)}
          className="mx-5 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
        />
      </div>
    </div>
  );
};

export default Item;
