import {Injectable} from "@angular/core";
import {ExecutableInterface} from "./Executable.interface";


@Injectable()
export class NewtonPolynomialSeparatedDiffService1 implements ExecutableInterface{


  execute(data: number[][], x: number): number[][] {

    let out: number[][] = [];
    out.push([0]);
    let maxOrder = this.findOrder(data[0], x);
    let lastOrder = 0;
    let dots: number[] = [];
    let names: string[] = [];

    for (let i = 0; i < maxOrder + 1; i++){

      if (i == 0){
        out[0][0] += this.asNumber(data[1][0]);
        dots.push(data[1][0]);
        names.push("f(x0)")
        continue;
      }

      if (i == 1){
        lastOrder = this.findDividedDifferences(this.asNumber(data[1][0]), data[1][1], data[0][0], data[0][1]);
        out[0][0] += lastOrder * this.findMultipliers(data[0], 1, x);
        dots.push(out[0][0]);
        names.push(this.makeName(i));
        continue;
      }

      // 2

      let tempOrder = this.findDividedDifferences(data[1][i-1], data[1][i], data[0][i-1], data[0][i]);
      lastOrder = this.findDividedDifferences(lastOrder, tempOrder, data[0][0], data[0][i]);
      out[0][0] += lastOrder * this.findMultipliers(data[0], i, x);
      names.push(this.makeName(i));
      dots.push(out[0][0]);

    }

    out.push(dots);
    // @ts-ignore
    out.push(names);

    return out;

  }

  findOrder(data: number[], x: number): number{

    for (let i = 1; i < data.length; i++){

      if (x > this.asNumber(data[i-1]) && x < this.asNumber(data[i])){

        return i;

      }
    }

    return data.length - 1;
  }

  findDividedDifferences(y0: number, y1:number, x0: number, x1: number): number{

    // console.log(y1 + " - " + y0 + " / " + x1 + " - " + x0);

    return this.asNumber(y1 - y0) / this.asNumber(x1 - x0);

  }

  findMultipliers(dataX: number[], order: number, x: number): number{

    let out = 1;

    for (let i = 0; i < order; i++){
      out *= (this.asNumber(x) - this.asNumber(dataX[i]));
    }

    return out;
  }

  makeName(order: number): string{

    let out = 'f('

    for (let i = 0; i < order + 1; i++){

      if (i != order){
        out += 'x' + i + ',';
      }else {
        out += 'x' + i + ')';
      }


    }

    return out;
  }

  asNumber(x :number): number{
    // @ts-ignore
    return Number.parseFloat(x);
  }

}
