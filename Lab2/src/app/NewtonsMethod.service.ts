import {Injectable} from '@angular/core';
import {Equation} from './Equation';

Injectable();
export class NewtonsMethodService{

  outTable: number[][];

  nowN = 0; // for table

  private makeH(x: number, equal: Equation): number{ // make new X
    return equal.getResult(x) / equal.getDiffedResult(x);
  }

  private findInitialApprox(a: number, b: number, equal: Equation): number{
    if (equal.getResult(a) * equal.getDiffedDiffedResult(a) > 0){
      return a;
    }
    if (equal.getResult(b) * equal.getDiffedDiffedResult(b) > 0){
      return b;
    }
    for (let i = a; i < b; i = i + 0.01){
      if (equal.getResult(i) * equal.getDiffedDiffedResult(i) > 0){
        return i;
      }
    }
    console.log('Error with findInitialApprox');
    return 0;
  }

  private makeRow(x: number, xNext: number, equal: Equation): void{

    const tempTable: number[] = [];

    tempTable.push(this.nowN);
    ++this.nowN;
    tempTable.push(x);
    tempTable.push(equal.getResult(x));
    tempTable.push(equal.getDiffedResult(x));
    tempTable.push(xNext);
    tempTable.push(Math.abs(xNext - x));
    this.outTable.push(tempTable);

  }

  checkForExistence(equal: Equation, a: number, b: number): boolean{
    return equal.getDiffedResult(a) * equal.getDiffedResult(b) >= 0 &&
      equal.getDiffedDiffedResult(a) * equal.getDiffedDiffedResult(b) >= 0;

  }

  execute(a: number, b: number, E: number, equal: Equation): number[][]{
    this.outTable = [];
    this.nowN = 0;
    // @ts-ignore
    this.outTable.push(['№', 'Xn', 'f(Xn)', 'f\'(Xn)', 'Xn+1', '|Xn+1 - Xn|']);

    let x: number;

    x = this.findInitialApprox(a, b, equal);

    let xPrev: number;
    let h: number;


    do {

      h = this.makeH(x, equal);
      console.log(h + ' h');

      xPrev = x;

      x = x - h;



      this.makeRow(xPrev, x, equal);

    } while (!(Math.abs(x - xPrev) <= E || Math.abs(this.makeH(x, equal)) <= E || Math.abs(equal.getResult(x)) <= E));

    h = this.makeH(x, equal);

    this.makeRow(x, x - h, equal);

    return this.outTable;
  }
}
