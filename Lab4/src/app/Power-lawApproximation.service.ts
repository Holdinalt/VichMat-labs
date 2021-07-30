import {Injectable} from '@angular/core';
import {LinearApproximationService} from './LinearApproximation.service';


@Injectable()
export class PowerLawApproximationService{

  Name = 'Степенная аппроксимация';
  func = 'fi = a * x^b';

  public execute(data: number[][],
                 linearApproximationService: LinearApproximationService): number[][]{

    const dataCopy: number[][] = [];
    data.forEach(val => dataCopy.push(Object.assign([], val)));

    const dataLin: number[][] = [];
    data.forEach(val => dataLin.push(Object.assign([], val)));

    for (let i = 0; i < data[0].length; i++){
      dataLin[1][i] = Math.log(dataLin[1][i]);
      dataLin[0][i] = Math.log(dataLin[0][i]);
    }

    const lin = linearApproximationService.execute(dataLin);

    const A = Math.exp(lin[5][1]);
    const B = lin[5][0];

    const result: number[] = [];
    const E: number[] = [];
    let S = 0;

    // console.log( A + ' * x ^ ' + B );

    for (let i = 0; i < data[0].length; i++){ // [x][y]
      result.push( A * Math.pow(data[0][i], B));
      E.push(result[i] - data[1][i]);
      S += Math.pow(E[i], 2);
    }

    dataCopy.push(result);
    dataCopy.push(E);

    // @ts-ignore
    dataCopy.push([S, 'S']);
    // @ts-ignore
    dataCopy.push([A, B, 'A', 'B']);

    return dataCopy;

  }

}
