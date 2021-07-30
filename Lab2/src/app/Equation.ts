export class Equation{

  getResult(x: number): number{
    return 2 * Math.pow(x, 3) + 3.41 * Math.pow(x, 2) - 23.74 * x + 2.95;
  }

  getDiffedResult(x: number): number{
    return 6 * Math.pow(x, 2) + 6.82 * x - 23.74;
  }

  getDiffedDiffedResult(x: number): number{
    return 12 * x + 6.82;
  }

  // getResult(x: number): number{
  //   return Math.pow(x, 3) - x + 4;
  // }
  //
  // getDiffedResult(x: number): number{
  //   return 3 * Math.pow(x, 2) - 1;
  // }
  //
  // getDiffedDiffedResult(x: number): number{
  //   return 6 * x;
  // }

}
