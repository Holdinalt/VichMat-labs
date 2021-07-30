import {Injectable} from "@angular/core";
import {Equal} from "./Equal";


@Injectable()
export class EulerMethodService {

    execute(y0: any, h: any, a: any, b: any, equal: Equal): number[][]{

      let Yn = Number.parseFloat(y0);
      let Hn = Number.parseFloat(h);
      let An  = Number.parseFloat(a);
      let Bn  = Number.parseFloat(b);

      let out: number[][] = [];
      let n = Math.round((Bn - An) / Hn);

      let Is: number[] = [0];
      let Xi: number[] = [An];
      let Yi: number[] = [Yn];
      let Xn = An;

      for (let i = 0; i < n; i++){
        Is.push(i);
        Yn = Yn + h * equal.getResult(Xn, Yn);
        Yi.push(Math.round(Yn * 1000) / 1000);
        Xn = Xn + h;
        Xi.push(Math.round(Xn * 1000) / 1000);
      }

      // @ts-ignore
      out.push(['i', 'x', 'y']);
      out.push(Is);
      out.push(Xi);
      out.push(Yi);

      return out;

    }

}
