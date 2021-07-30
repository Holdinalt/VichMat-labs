import {Injectable} from '@angular/core';
import {ArgsRow} from './models/argsRow';
import {IterationRow} from './models/IterationRow';

@Injectable()

export class ParseService {

  parseFromFile(files: FileList): ArgsRow[]{
    let out = null;
    const file = files.item(0);
    const reader = new FileReader();

    reader.onload = () => {
      out = this.parseFromText(reader.result.toString());
    };

    reader.readAsText(file);

    return out;
  }

  parseToBlob(args: ArgsRow[], rows: IterationRow[]): Blob{
    return new Blob([this.parseToText(args, rows)]);
  }

  parseFromText(info: string): ArgsRow[]{
    let temp: ArgsRow;
    let args: number[] = [];
    let out: ArgsRow[] = [];
    const lines = info.split('\n');
    for (const line of lines){
      args = line.split(' ').map(Number);
      const d = args.pop();
      temp = new ArgsRow(args.length);
      temp.xArgs = args;
      temp.dArg = d;
      if (out.length === 0){
        out = [temp];
      }else{
        out.push(temp);
      }
    }
    return out;
  }

  parseToText(args: ArgsRow[], rows: IterationRow[]): string{
    let out = '';
    out += this.parseToTextArgsRow(args);
    out += this.parseToTextIterationRows(rows);
    return out;
  }

  parseToTextArgsRow(args: ArgsRow[]): string{
    let out = '';
    out += 'Матрица\n';
    for (const arg of args){
      for (const x of arg.xArgs){
        out += x + ' ';
      }
      out += ' ' + arg.dArg + '\n';
    }
    return out;
  }

  parseToTextIterationRows(rows: IterationRow[]): string{
    let out = '';
    out += '\nВычисления\n';
    for (const row of rows){
      for (const x of row.XArray){
        out += x + ' ';
      }
      out += ' ' + row.e + '\n';
    }
    return out;
  }
}
