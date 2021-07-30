import {Injectable} from '@angular/core';
import {LinearApproximationService} from './LinearApproximation.service';


@Injectable()
export class ExponentialApproximationService{

  Name = 'Экспоненциальная аппроксимация';
  func = 'fi = a * e^(b * x)';

  public execute(data: number[][],
                 linearApproximationService: LinearApproximationService): number[][]{

    const dataCopy: number[][] = [];
    data.forEach(val => dataCopy.push(Object.assign([], val)));

    const dataLin: number[][] = [];
    data.forEach(val => dataLin.push(Object.assign([], val)));



    for (let i = 0; i < data[1].length; i++){
      dataLin[1][i] = Math.log1p(dataLin[1][i]);
    }

    const lin = linearApproximationService.execute(dataLin);

    const A = Math.exp(lin[5][1]);
    const B = lin[5][0];


    const result: number[] = [];
    const E: number[] = [];
    let S = 0;


    for (let i = 0; i < data[0].length; i++){ // [x][y]
      result.push(A * Math.exp(B * data[0][i]) );
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
