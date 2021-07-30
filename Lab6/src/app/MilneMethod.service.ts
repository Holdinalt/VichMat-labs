import {Injectable} from "@angular/core";
import {Equal} from "./Equal";
import {EulerMethodService} from "./EulerMethod.service";


@Injectable()
export class MilneMethodService {

  execute(y0: any, h: any, a: any, b: any, equal: Equal): number[][]{

    //y0: any, h: any, a: any, b: any, equal: Equal
    let eulerMethod: EulerMethodService = new EulerMethodService();

    let Yn = Number.parseFloat(y0);
    let Hn = Number.parseFloat(h);
    let An  = Number.parseFloat(a);
    let Bn  = Number.parseFloat(b);

    let out = eulerMethod.execute(Yn, Hn, An, An + Hn * 3, equal);
    let n = Math.round((Bn - An) / Hn);

    for (let i = 4; i < n+1; i++){
      out[1].push(i);
      let Xn = An + Hn * i;

      let yPredict = out[3][i - 4]
        + (4* Hn / 3)
        * (2 * equal.getResult(out[2][i - 3], out[3][i - 3])
          - equal.getResult(out[2][i - 2], out[3][i - 2])
          + 2 * equal.getResult(out[2][i - 1], out[3][i - 1]));

      let yCorrection = out[3][i - 2]
        + (Hn / 3)
        * (equal.getResult(out[2][i - 2], out[3][i - 2])
          + 4 * equal.getResult(out[2][i - 1], out[3][i - 1])
          + 2 * equal.getResult(Xn, yPredict));

      out[2].push(Xn);
      out[3].push(yCorrection);
    }

    return out;

  }

}
