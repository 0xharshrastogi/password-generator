import { Component } from '@angular/core';

interface InputEvent extends Event {
  target: Event['target'] & { value: string };
}

enum PasswordCharMap {
  number,
  symbol,
  letter,
}

const generateNumberBetween = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  password?: string;
  passwordLength: number = 6;
  minPasswordLengthInclusive = 6;
  maxPasswordLengthExclusive = 20;
  canUseLetter = false;
  canUseNumber = false;
  canUseSymbol = false;

  onPasswordLengthChange(e: Event) {
    const length = +(<InputEvent>e).target.value;
    const isPasswordOfValidLength =
      length >= this.minPasswordLengthInclusive &&
      length <= this.maxPasswordLengthExclusive;

    if (isPasswordOfValidLength) this.passwordLength = length;
  }

  toogleUseLetter() {
    this.canUseLetter = !this.canUseLetter;
  }

  toogleUseSymbol() {
    this.canUseSymbol = !this.canUseSymbol;
  }

  toogleUseNumber() {
    this.canUseNumber = !this.canUseNumber;
  }

  generatePassword(): string {
    const chars: number[] = [];

    const generateChoice: () => PasswordCharMap = () =>
      Math.round(Math.random() * 3);

    while (chars.length < this.passwordLength) {
      const value = generateChoice();

      switch (value) {
        case PasswordCharMap.letter: {
          if (!this.canUseLetter) continue;
          chars.push(
            Math.random() <= 0.5
              ? generateNumberBetween(65, 90)
              : generateNumberBetween(97, 122)
          );
          break;
        }

        case PasswordCharMap.number: {
          if (!this.canUseNumber) break;
          chars.push(generateNumberBetween(48, 57));
          break;
        }

        case PasswordCharMap.symbol: {
          if (!this.canUseSymbol) break;
          chars.push(generateNumberBetween(35, 38));
          break;
        }
      }
    }

    return String.fromCharCode(...chars);
  }

  submit() {
    this.password = this.generatePassword();
  }
}
