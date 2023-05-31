import {makeObservable, observable, action} from 'mobx';

class DrinkStore {
  roundCount = 5;
  freeRoundCount = 1;
  pepsiCount = 0;
  sevenUpCount = 0;
  mirindaCount = 0;
  coins = 700;
  constructor() {
    makeObservable(this, {
      roundCount: observable,
      freeRoundCount: observable,
      pepsiCount: observable,
      sevenUpCount: observable,
      mirindaCount: observable,
      coins: observable,
      setRoundCount: action,
      setFreeRoundCount: action,
      setPepsiCount: action,
      setSevenUpCount: action,
      setMirindaCount: action,
      decrementRoundCount: action,
      decrementFreeRoundCount: action,
      AddCoins: action,
      exchangeCombo: action,
    });
  }
  AddCoins(amount: number) {
    this.coins += amount;
  }
  setPepsiCount(count: number) {
    this.pepsiCount = count;
  }

  setSevenUpCount(count: number) {
    this.sevenUpCount = count;
  }

  setMirindaCount(count: number) {
    this.mirindaCount = count;
  }

  setRoundCount(count: number) {
    this.roundCount = count;
  }

  setFreeRoundCount(count: number) {
    this.freeRoundCount = count;
  }

  decrementRoundCount() {
    this.roundCount = Math.max(this.roundCount - 1, 0);
  }

  decrementFreeRoundCount() {
    this.freeRoundCount = Math.max(this.freeRoundCount - 1, 0);
  }
  exchangeCombo() {
    this.sevenUpCount -= 1;
    this.pepsiCount -= 1;
    this.mirindaCount -= 1;
    if (this.pepsiCount <= 0) {
      this.pepsiCount = 0;
    }
    if (this.mirindaCount <= 0) {
      this.mirindaCount = 0;
    }
    if (this.sevenUpCount <= 0) {
      this.sevenUpCount = 0;
    }
  }
  checkcombo(giftCount: number): any {
    if (
      giftCount <= this.sevenUpCount ||
      giftCount <= this.pepsiCount ||
      giftCount <= this.mirindaCount
    ) {
      return true;
    }
    return false;
  }
}

const drinkStore = new DrinkStore();

export default drinkStore;
