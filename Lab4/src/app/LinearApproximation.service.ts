import {Injectable} from '@angular/core';


@Injectable()
export class LinearApproximationService{

  Name = 'Линейная аппроксимация';
  func = 'fi = a*x + b';

  public execute(data: number[][]): number[][]{

    const dataCopy: number[][] = [];
    data.forEach(val => dataCopy.push(Object.assign([], val)));

    let SX = 0;
    let SXX = 0;
    let SY = 0;
    let SXY = 0;

    for (let i = 0; i < data[0].length; i++){ // [x][y]
      SX += data[0][i];
      SXX += Math.pow(data[0][i], 2);
      SY += data[1][i];
      SXY += data[0][i] * data[1][i];
    }

    const D = SXX * data[0].length - SX * SX;
    const D1 = SXY * data[0].length - SX * SY;
    const D2 = SXX * SY - SX * SXY;

    console.log([SX, SXX, SY, SXY]);
    console.log([D, D1, D2]);

    const a = D1 / D;
    const b = D2 / D;



    const result: number[] = [];
    const E: number[] = [];

    let S = 0;

    let r: number;
    const meanX = SX / data[0].length; // r
    const meanY = SY / data[0].length;
    let RXY = 0;
    let RX = 0;
    let RY = 0;

    for (let i = 0; i < data[0].length; i++){ // [x][y]
      result.push(data[0][i] * a + b);
      E.push(result[i] - data[1][i]);
      S += Math.pow(E[i], 2);

      RXY += (data[0][i] - meanX) * (data[1][i] - meanY); // r
      RX += Math.pow(data[0][i] - meanX, 2);
      RY += Math.pow(data[1][i] - meanY, 2);
    }

    r = RXY / Math.sqrt(RX * RY);

    dataCopy.push(result);
    dataCopy.push(E);

    // @ts-ignore
    dataCopy.push([S, 'S']);
    // @ts-ignore
    dataCopy.push([a, b, 'A', 'B']);
    // @ts-ignore
    dataCopy.push(['Коэффициент корреляции Пирсона = ' + r]);


    return  dataCopy;
  }

}
