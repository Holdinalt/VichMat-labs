export class ArgsRow{

  xArgs: number[];

  dArg: number;

  constructor(argsLen: number) {
    this.xArgs = [0];
    for (let i = 1; i < argsLen; i++){
      this.xArgs.push(i);
    }
    this.dArg = 0;
  }

  checkForConvergence(index: number): boolean{
    let sum = 0;
    for (let i = 0; i < this.xArgs.length; i++){
      if (i !== index){
        sum += Math.abs(i);
      }
    }
    return Math.abs(this.xArgs[index]) > sum;
  }

  expressX(index: number, xArray: number[]): number{ // выразить х
    let Sum = 0;
    for (let i = 0; i < this.xArgs.length; i++){
      if (i !== index){
        Sum += this.xArgs[i] * xArray[i];
      }
    }
    const temp = this.dArg - Sum;
    console.log(this.xArgs[index]);
    return temp / this.xArgs[index];
  }

  expressFirstXOfIteration(index: number): number{ // х первой итеорации, все коефы по нулям, возвращаем просто d
    return this.dArg / this.xArgs[index];
  }

  normaliseTo(newArgsLen: number): void{
    const normaliseKoef = newArgsLen - this.xArgs.length;
    if (normaliseKoef < 0){
      this.xArgs.splice(this.xArgs.length - 1, Math.abs(normaliseKoef));
    }else{
      for (let i = 0; i < normaliseKoef; i++){
        this.xArgs.push(1);
      }
    }
  }

  getIndexesOfDecreasingValues(): number[]{
    const tempXArgs = this.xArgs.slice();
    let out = [];
    let temp = -1000000;
    let tempIndex = 0;
    for (const arg of this.xArgs){
      for (let j = 0; j < tempXArgs.length; j++){
        if (tempXArgs[j] > temp){
          temp = tempXArgs[j];
          tempIndex = j;
        }
      }
      if (out.length === 0){
        out = [tempIndex];
      }else{
        out.push(tempIndex);
      }
      tempXArgs[tempIndex] = -1000001;
      temp = -1000000;
    }
    return out;
  }
}
