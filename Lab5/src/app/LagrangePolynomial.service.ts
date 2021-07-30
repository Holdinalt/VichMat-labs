import {Injectable} from "@angular/core";
import {ExecutableInterface} from "./Executable.interface";


@Injectable()
export class LagrangePolynomialService implements ExecutableInterface{

  execute(data: number[][], x: number): number[][]{

    let result = [[0]];
    let dots: number[] = [];
    let names: string[] = []

    for (let i = 0; i < data[0].length; i++){

      let c1 = 1;
      let c2 = 1;

      for (let j = 0; j < data[0].length; j++){
        if (i != j){

          c1 *= x - data[0][j];
          c2 *= data[0][i] - data[0][j];



        }
      }
      result[0][0] += data[1][i] * c1 / c2;
      dots.push(data[1][i] * c1 / c2);
      names.push('L' + i);

    }

    result.push(dots);
    // @ts-ignore
    result.push(names);
    return result

  }
}
