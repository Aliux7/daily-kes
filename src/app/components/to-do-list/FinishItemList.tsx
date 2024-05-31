"use client";
import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Item from "./Item";
import { ItemType } from "./Types";

const ItemList: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([]);

  const toggleCheck = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].status = !updatedItems[index].status;
    setItems(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center p-3 mb-2 bg-[var(--item-color)] text-[var(--text-color)] rounded shadow cursor-pointer"
        >
          <input
            type="checkbox"
            checked={item.status}
            onChange={() => toggleCheck(index)}
            className="mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
          />
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
