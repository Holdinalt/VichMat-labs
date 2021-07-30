import {Injectable} from '@angular/core';

@Injectable()
export class Equation{
  // 0  3 * x^3 + 5 * x^2 + x + 5;
  // 1  x^2
  // 3  sin(x)
  // def x

  private currentEqual = '0';

  setEqual(equalNumber: string): void{
    this.currentEqual = equalNumber;
  }

  getResult(x: number): number{

    switch (this.currentEqual){
      case '0': {
        return 3 * Math.pow(x, 3) + 5 * Math.pow(x, 2) + 3 * x - 6;
      }
      case '1': {
        return Math.pow(x, 2);
      }
      case '2': {
        return Math.sin(x);
      }
      default: {
        return x;
      }
    }

  }
}
