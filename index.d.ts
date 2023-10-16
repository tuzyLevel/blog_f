declare type Result = {
  ok: boolean;
  code: number;
  data?: any;
  msg?: string;
};

declare type Posting = {
  id: number;
  order: number;
  readCount: number;
  title: string;
  content: string;
  boardId: number;
  board_id?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

declare type Board = {
  id: number;
  name: string;
  parentId: number;
  order: number;
  count: number;
};
declare type ParentBoard = Board & { children: Board[] };
// type BoardList = parentBoard[];

declare namespace Tetris {
  declare type BoardUnitData = {
    existence: boolean;
    color: string;
    type: "block" | "item";
  };
}
