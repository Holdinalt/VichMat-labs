


export class Equal{

  private funcId = 0;

  setFunc(x: any){
    this.funcId = Number.parseInt(x);
  }

  getResult(x: any, y: any): number{

    let Xn = Number.parseFloat(x);
    let Yn = Number.parseFloat(y);

    switch (this.funcId){

      case 0: {

        return Yn + (1 + Xn) * Math.pow(Yn, 2);

      }

      case 1: {

        return Math.pow(Xn, 2) - 2 * Yn;

      }

      default: {
        return 0;
      }

    }

  }

  getAnswerResult(x: any): number{

    let Xn = Number.parseFloat(x);

    switch (this.funcId){

      case 0: {

        return -1 / Xn;

      }

      case 1: {

        return 0.75 * Math.exp(-2 * Xn) + 0.5 * Math.pow(Xn, 2) - 0.5 * Xn + 0.25;

      }

      default: {
        return 0;
      }

    }
  }

}
