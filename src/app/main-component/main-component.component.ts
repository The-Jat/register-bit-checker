import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-component',
  standalone: true, // Ensure it's standalone
  imports: [CommonModule], // Import necessary modules
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'], // Fixed "styleUrl" to "styleUrls"
})
export class MainComponentComponent {
  inputNumber: string = '';
  bitLength: number = 32;
  endianFormat: string = 'big';
  binaryValue: string = '';

  // Update binary value based on input
  updateBinaryValue(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.inputNumber = input;
    this.convertToBinary();
  }

  // Change bit length
  changeBitLength(event: Event): void {
    this.bitLength = parseInt((event.target as HTMLSelectElement).value, 10);
    this.convertToBinary();
  }

  // Change endian format
  changeEndianFormat(event: Event): void {
    this.endianFormat = (event.target as HTMLSelectElement).value;
    this.convertToBinary();
  }

  // Convert input to binary
  convertToBinary(): void {
    let numberValue: number;

    // Check if input is hexadecimal
    if (this.inputNumber.startsWith('0x')) {
      numberValue = parseInt(this.inputNumber, 16);
    } else {
      numberValue = parseInt(this.inputNumber, 10);
    }

    // Handle NaN (invalid input)
    if (isNaN(numberValue)) {
      this.binaryValue = '';
      return;
    }

    // Convert to binary string
    let binaryString = (numberValue >>> 0).toString(2);

    // Pad with leading zeros based on bit length
    binaryString = binaryString.padStart(this.bitLength, '0');

    // Handle endianness
    if (this.endianFormat === 'little') {
      binaryString = this.swapEndianness(binaryString);
    }

    this.binaryValue = binaryString;
  }

  // Swap endianness
  swapEndianness(binaryString: string): string {
    const bytes = [];
    for (let i = 0; i < binaryString.length; i += 8) {
      bytes.unshift(binaryString.substr(i, 8));
    }
    return bytes.join('');
  }
}
