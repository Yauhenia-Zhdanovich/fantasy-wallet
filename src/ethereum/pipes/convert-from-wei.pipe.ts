import { Pipe, PipeTransform } from '@angular/core';
import { ethers } from 'ethers';

@Pipe({
  name: 'fromWei',
  standalone: true,
})
export class ConvertFromWeiPipe implements PipeTransform {
  transform(value: string | null, display: string): string {
    if (value !== null) {
      const bigIntValue = BigInt(value);
      return bigIntValue
        ? `${Number(ethers.formatEther(bigIntValue)).toFixed(8)} ${display}`
        : `0 ${display}`;
    }

    return '';
  }
}
