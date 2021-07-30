import {Injectable} from '@angular/core';
import {Equation} from './Equation';

Injectable();
export class SimpleIterationMethodService{

  outTable: number[][];

  nowN = 0; // for table

  private makeRow(x: number, nextX: number, equal: Equation, lambda: number): void{

    const tempTable: number[] = [];

    tempTable.push(this.nowN);
    ++this.nowN;
    tempTable.push(x);
    tempTable.push(nextX);
    tempTable.push(this.makeFiResult(equal, nextX, lambda));
    tempTable.push(equal.getResult(nextX));
    tempTable.push(Math.abs(nextX - x));
    this.outTable.push(tempTable);

  }

  checkForExistence(equal: Equation, a: number, b: number): boolean{
    const lambda = this.makeLambda(equal, a, b);
    return Math.abs(this.makeFiDifferedResult(equal, a, lambda)) <= this.makeQ(equal, a, b) &&
      this.makeQ(equal, a, b) < 1;
  }

  private makeQ(equal: Equation, a: number, b: number): number{
    const lambda = this.makeLambda(equal, a, b);
    let max = this.makeFiDifferedResult(equal, a, lambda);
    for (let i = a * 10; i <= b * 10; i++){
      if (this.makeFiDifferedResult(equal, i / 10, lambda) > max){
        max = this.makeFiDifferedResult(equal, i / 10, lambda);
      }
    }
    return max;
  }

  private makeLambda(equal: Equation, a: number, b: number): number{
    let max = equal.getDiffedResult(a);
    for (let i = a * 10; i <= b * 10; i++){
      if (equal.getDiffedResult(i / 10) > max){
        max = equal.getDiffedResult(i / 10);
      }
    }

    return -1 / max;
  }

  private makeFiResult(equal: Equation, x: number, lambda: number): number{
    return x + lambda * equal.getResult(x);
  }

  private makeFiDifferedResult(equal: Equation, x: number, lambda: number): number{
    return 1 + lambda * equal.getDiffedResult(x);
  }

  execute(a: number, b: number, E: number, equal: Equation): number[][]{
    this.outTable = [];
    this.nowN = 0;
    // @ts-ignore
    this.outTable.push(['№', 'Xi', 'Xi+1', 'Fi(Xi+1)', 'f(Xi+1)', '|Xi+1-Xi|']);
    const lambda = this.makeLambda(equal, a, b);
    let x = a;
    let nextX = x;



    if (this.makeQ(equal, a, b) <= 0.5){
      console.log('q <= 0.5');
      do {
        x = nextX;
        nextX = this.makeFiResult(equal, x, lambda);
        this.makeRow(x, nextX, equal, lambda);
      } while (Math.abs(x - nextX) > E);

    }else{
      console.log('0.5 < q');
      const checker = ((1 - this.makeQ(equal, a, b)) / this.makeQ(equal, a, b)) * E;
      console.log(checker);
      do {
        x = nextX;
        nextX = this.makeFiResult(equal, x, lambda);
        this.makeRow(x, nextX, equal, lambda);
      } while (Math.abs(x - nextX) >= checker);

    }

    return this.outTable;
  }

}
