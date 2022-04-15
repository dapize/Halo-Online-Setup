export interface INav {
  items: number;
  active: number;
  changedTo: ( item: number ) => void;
}
