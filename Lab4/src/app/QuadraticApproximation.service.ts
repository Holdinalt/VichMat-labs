import {Injectable} from '@angular/core';
import {MatrixMathService} from './MatrixMath.service';

@Injectable()
export class QuadraticApproximationService{

  Name = 'Квадратичная аппроксимация';
  func = 'fi = a * x^2 + b * x + c';

  public execute(data: number[][]): number[][]{

    const dataCopy: number[][] = [];
    data.forEach(val => dataCopy.push(Object.assign([], val)));

    const N = data[0].length;

    let SX = 0;
    let SXX = 0;
    let SXXX = 0;
    let SXXXX = 0;
    let SY = 0;
    let SXY = 0;
    let SXXY = 0;

    for (let i = 0; i < data[0].length; i++){
      SX += data[0][i];
      SXX += Math.pow(data[0][i], 2);
      SXXX += Math.pow(data[0][i], 3);
      SXXXX += Math.pow(data[0][i], 4);
      SY += data[1][i];
      SXY += data[0][i] * data[1][i];
      SXXY += Math.pow(data[0][i], 2) * data[1][i];
    }

    // console.log([
    //   [N, SX, SXX, SY],
    //   [SX, SXX, SXXX, SXY],
    //   [SXX, SXXX, SXXXX, SXXY]
    // ]);

    const D = MatrixMathService.getDeterminant([
      [N, SX, SXX],
      [SX, SXX, SXXX],
      [SXX, SXXX, SXXXX]
    ]);

    const D1 = MatrixMathService.getDeterminant([
      [SY, SX, SXX],
      [SXY, SXX, SXXX],
      [SXXY, SXXX, SXXXX]
    ]);

    const D2 = MatrixMathService.getDeterminant([
      [N, SY, SXX],
      [SX, SXY, SXXX],
      [SXX, SXXY, SXXXX]
    ]);

    const D3 = MatrixMathService.getDeterminant([
      [N, SX, SY],
      [SX, SXX, SXY],
      [SXX, SXXX, SXXY]
    ]);

    const C = D1 / D;
    const B = D2 / D;
    const A = D3 / D;

    // console.log(C, B, A);

    const result: number[] = [];
    const E: number[] = [];

    let S = 0;


    for (let i = 0; i < data[0].length; i++){ // [x][y]
      result.push(Math.pow(data[0][i], 2) * A + data[0][i] * B + C);
      E.push(result[i] - data[1][i]);
      S += Math.pow(E[i], 2);
    }

    dataCopy.push(result);
    dataCopy.push(E);

    // @ts-ignore
    dataCopy.push([S, 'S']);
    // @ts-ignore
    dataCopy.push([A, B, C, 'A', 'B', 'C']);

    return dataCopy;


  }
}
