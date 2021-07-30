import {Injectable} from '@angular/core';


@Injectable()
export class MatrixMathService{

  static getDeterminant(matrix: number[][]): number{

    let plus = 0;
    let minus = 0;
    let plusLine = 1;
    let minusLine = 1;

    for (let i = 0; i < matrix[0].length; i++){

      for (let j = 0; j < matrix[0].length; j++){
        plusLine *= matrix[j][(i + j) % matrix[0].length];
      }

      for (let j = matrix[0].length - 1; j >= 0; j--){
        minusLine *= matrix[j][(i - j + matrix[0].length - 1) % matrix[0].length];
      }

      plus += plusLine;
      minus += minusLine;

      plusLine = 1;
      minusLine = 1;
    }

    return plus - minus;
  }
}
