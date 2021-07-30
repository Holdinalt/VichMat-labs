export class IterationRow{

  XArray: number[]; // Иксы

  e: number;  // Абсолютное отклонение

  constructor(array: number[], e: number) {
    this.XArray = array.slice();
    this.e = e;
  }

}
