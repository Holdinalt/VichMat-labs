import {Injectable} from '@angular/core';
import {ArgsRow} from './models/argsRow';
import {IterationRow} from './models/IterationRow';

@Injectable()
export class MathService{ // Недоделано

  // normaliseRowsToNewLen(argsLen: number): void{
  //   console.log(argsLen);
  //   for (let i = 0; i < this.args.length; i++){
  //     this.args[i].normaliseTo(this.argsLen);
  //   }
  // }

  normaliseRowsToNewAmount(rowsLen: number, argsLen: number): ArgsRow[]{
    const outArgs: ArgsRow[] = [];
    const normaliseKoef = rowsLen - outArgs.length;
    if (normaliseKoef < 0){
      outArgs.splice(outArgs.length - 1, Math.abs(normaliseKoef));
    }else{
      for (let i = 0; i < normaliseKoef; i++){
        outArgs.push(new ArgsRow(argsLen));
      }
    }
    return outArgs;
  }

  getIndexesSortedValues(args: ArgsRow[]): number[][]{
    let out = [];
    for (const arg of args){
      if (out.length === 0){
        out = [arg.getIndexesOfDecreasingValues()];
      }else{
        out.push(arg.getIndexesOfDecreasingValues());
      }
    }
    console.log(out);
    return out;
  }

  rearrangeRows(args: ArgsRow[]): ArgsRow[]{
    let newRow = [];
    const queue = this.findBestPositionsOfRows(args);
    for (const index of queue){
      if (newRow.length === 0){
        newRow = [args[index]];
      }else{
        newRow.push(args[index]);
      }
    }
    return newRow;
  }

  findArrayWithBestIndexByTry(tryNumber: number, key: number, sortedIndexes: number[][]): number{
    for (let i = 0; i < sortedIndexes.length; i++){
      if (sortedIndexes[i][tryNumber] === key){
        return i;
      }
    }
    return -1;
  }

  findBestRowByIndex(index: number, sortedArraysIndexes: number[][]): number{
    let temp = -1;
    let tryNumber = 0;
    while (temp === -1){
      temp = this.findArrayWithBestIndexByTry(tryNumber, index, sortedArraysIndexes);
      tryNumber += 1;
    }
    return temp;
  }

  findBestPositionsOfRows(args: ArgsRow[]): number[]{
    const indexesSortedValues = this.getIndexesSortedValues(args);
    let temp;
    let out = [];
    for (let i = 0; i < args.length; i++){
      temp = this.findBestRowByIndex(i, indexesSortedValues);
      for (let j = 0; j < indexesSortedValues[temp].length; j++){
        indexesSortedValues[temp][j] = -1;
      }
      if (out.length === 0){
        out = [temp];
      }else{
        out.push(temp);
      }
    }
    return out;
  }

  findAbsoluteDeviation(prevArray: number[], mainArray: number[]): number{
    let tempDeviation;
    let deviation = -1000000;
    for (let i = 0; i < mainArray.length; i++){
      tempDeviation = Math.abs(mainArray[i] - prevArray[i]);
      if (tempDeviation > deviation){
        deviation = tempDeviation;
      }
    }
    return deviation;
  }

  makeIterationRow(normalRow: ArgsRow[]): IterationRow[]{
    let outIterationRows = [];
    let tempIterationXs = [];
    for (let i = 0; i < normalRow.length; i++){ // вычисляем все иксы
      if (outIterationRows.length === 0){ // если запись первая - иксы нулевые
        if (tempIterationXs.length === 0){
          tempIterationXs = [normalRow[i].expressFirstXOfIteration(i)];
        }else{
          tempIterationXs.push(normalRow[i].expressFirstXOfIteration(i));
        }
      }else{ // если запись не первая, вычисляем иксы
        if (tempIterationXs.length === 0){
          tempIterationXs = [normalRow[i].expressX(i, outIterationRows[outIterationRows.length - 1].XArray)];
        }else{
          tempIterationXs.push(normalRow[i].expressX(i, outIterationRows[outIterationRows.length - 1].XArray));
        }
      }
    }
    if (outIterationRows.length === 0){ // закидываем итерационные записи
      outIterationRows = [new IterationRow(tempIterationXs, 0)]; // закидываем первую итерационую запись
    }else{
      // закидываем в массив записей, вычисляя погрешность
      outIterationRows.push(new IterationRow(tempIterationXs, this.findAbsoluteDeviation(
        outIterationRows[outIterationRows.length - 1].XArray, tempIterationXs)));
    }
    return outIterationRows;
  }

}
