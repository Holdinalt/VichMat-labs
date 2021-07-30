import {Component, OnInit} from '@angular/core';
import {ArgsRow} from './models/argsRow';
import {IterationRow} from './models/IterationRow';
import {ParseService} from './parse.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  title = 'lab1-VichMat';

  argsLen = 3;
  epsilonInput = 0.001;

  args: ArgsRow[] = [];
  Error = false;

  iterationRows: IterationRow[] = [];
  normalRow: ArgsRow[] = [];

  constructor(private parseService: ParseService) {
  }

  load(files: FileList): void{
    // this.args = this.parseService.parseFromFile(files);
    console.log(this.args);
    this.clear();
    const file = files.item(0);
    const reader = new FileReader();

    reader.onload = () => {
      this.args = this.parseService.parseFromText(reader.result.toString());
      this.argsLen = this.args[0].xArgs.length;
    };

    reader.readAsText(file);
  }

  save(type: string): void{
    const blob = this.parseService.parseToBlob(this.normalRow, this.iterationRows);
    saveAs(blob, 'расчеты.' + type);
  }

  clear(): void{
    this.Error = false;
    this.normalRow = [];
    this.iterationRows = [];
  }

  ngOnInit(): void {
    for (let i = 0; i < this.argsLen; i++){
      if (this.args.length === 0){
        this.args = [new ArgsRow(this.argsLen)];
      }
      else{
        this.args.push(new ArgsRow(this.argsLen));
      }
    }
  }

  submit(): void{
    this.iterationRows = [];
    for (let i = 0; i < this.args.length; i++){
      console.log(this.args[i].expressFirstXOfIteration(i));
    }
    this.normalRow = this.rearrangeRows(this.args);
    console.log(this.normalRow);
    if (!this.checkForConvergence(this.normalRow)){
      this.normalRow = [];
      this.Error = true;
      return;
    }else {
      this.Error = false;
    }
    while (this.iterationRows.length < 2 || this.iterationRows[this.iterationRows.length - 1].e > this.epsilonInput ){
      this.makeIterationRow(this.normalRow);

    }
    console.log(this.iterationRows);
  }

  normaliseRowsToNewLen(): void{
    console.log(this.argsLen);
    for (let i = 0; i < this.args.length; i++){
      this.args[i].normaliseTo(this.argsLen);
    }
    this.normaliseRowsToNewAmount();
  }

  normaliseRowsToNewAmount(): void{
    const normaliseKoef = this.argsLen - this.args.length;
    if (normaliseKoef < 0){
      this.args.splice(this.args.length - 1, Math.abs(normaliseKoef));
    }else{
      for (let i = 0; i < normaliseKoef; i++){
        this.args.push(new ArgsRow(this.argsLen));
      }
    }
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

  makeIterationRow(normalRow: ArgsRow[]): void{
    let tempIterationXs = [];
    for (let i = 0; i < normalRow.length; i++){ // вычисляем все иксы
      if (this.iterationRows.length === 0){ // если запись первая - иксы нулевые
        if (tempIterationXs.length === 0){
          tempIterationXs = [normalRow[i].expressFirstXOfIteration(i)];
        }else{
          tempIterationXs.push(normalRow[i].expressFirstXOfIteration(i));
        }
      }else{ // если запись не первая, вычисляем иксы
        if (tempIterationXs.length === 0){
          tempIterationXs = [normalRow[i].expressX(i, this.iterationRows[this.iterationRows.length - 1].XArray)];
        }else{
          tempIterationXs.push(normalRow[i].expressX(i, this.iterationRows[this.iterationRows.length - 1].XArray));
        }
      }
    }
    if (this.iterationRows.length === 0){ // закидываем итерационные записи
      this.iterationRows = [new IterationRow(tempIterationXs, 0)]; // закидываем первую итерационую запись
    }else{
      // закидываем в массив записей, вычисляя погрешность
      this.iterationRows.push(new IterationRow(tempIterationXs, this.findAbsoluteDeviation(
        this.iterationRows[this.iterationRows.length - 1].XArray, tempIterationXs)));
    }
  }

  checkForConvergence(normalRow: ArgsRow[]): boolean{
    let flag = true;
    for (let i = 0; i < normalRow.length; i++){
      if (!normalRow[i].checkForConvergence(i)){
        flag = false;
      }
    }
    return flag;
  }
}
