export interface ItemType {
  id: string;
  title: string;
  notes: string;
  status: boolean;
  index: number;
}

export interface ItemProps {
  item: ItemType;
  index: number;
  moveItem?: (from: number, to: number) => void;
  toggleCheck: ( id: string, status: boolean) => void;
}
