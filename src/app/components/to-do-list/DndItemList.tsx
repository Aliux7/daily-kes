"use client";
import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Item from "./Item";
import { ItemType } from "./Types";
import {
  fetchAndSortTasks,
  getOnGoingTask,
  updateItemStatus,
  updateItemsIndex,
} from "@/lib/utils/server/task";
import { EditTask } from "./EditTask";
import { AddTask } from "./AddTask";
import getUserCookies from "@/lib/utils/server/server";

interface DndItemListProps {
  isAddFormOpen: boolean;
  setIsAddFormOpen: (open: boolean) => void;
}

const ItemList: React.FC<DndItemListProps> = ({
  isAddFormOpen,
  setIsAddFormOpen,
}) => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [email, setEmail] = useState("example@gmail.com");

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const [currentItem, setCurrentItem] = useState<ItemType | null>(null);

  const loadItems = useCallback(async () => {
    const orderedTaskList = await fetchAndSortTasks(email);
    setItems(orderedTaskList);
  }, [email]);

  const moveItem = useCallback(
    async (fromIndex: number, toIndex: number) => {
      const updatedItems = [...items];
      const [movedItem] = updatedItems.splice(fromIndex, 1);
      updatedItems.splice(toIndex, 0, movedItem);
      updatedItems.forEach((item, index) => {
        item.index = index;
      });

      setItems(updatedItems);
      await updateItemsIndex(updatedItems);
    },
    [items]
  );

  const toggleCheck = async (id: string, status: boolean) => {
    updateItemStatus(id, status).then(() => {
      loadItems();
    });
  };

  const handleEditItem = (item: ItemType) => {
    setCurrentItem(item);
    setIsEditFormOpen(true);
  };

  useEffect(() => {
    getUserCookies().then((user) => {
      setEmail(user.email);
    });
  }, [loadItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <div>
      {isEditFormOpen && currentItem && (
        <div
          className="fixed w-screen h-screen z-10 bg-black/80 top-0 left-0 flex justify-center items-center"
          onClick={() => {
            setIsEditFormOpen(false);
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative w-full max-w-screen-sm"
          >
            <EditTask
              item={currentItem}
              setIsEditFormOpen={setIsEditFormOpen}
              onTaskUpdated={loadItems}
            />
          </div>
        </div>
      )}
      {isAddFormOpen && (
        <div
          className="fixed w-screen h-screen z-10 bg-black/80 top-0 left-0 flex justify-center items-center"
          onClick={() => {
            setIsAddFormOpen(false);
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative w-full max-w-screen-sm"
          >
            <AddTask
              onTaskUpdated={loadItems}
              setIsAddFormOpen={setIsAddFormOpen}
            />
          </div>
        </div>
      )}

      <DndProvider backend={HTML5Backend}>
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            index={index}
            moveItem={moveItem}
            toggleCheck={toggleCheck}
            handleEditItem={handleEditItem}
          />
        ))}
      </DndProvider>
    </div>
  );
};

export default ItemList;
