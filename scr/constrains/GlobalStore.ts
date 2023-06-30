import {makeObservable, observable, action} from 'mobx';
interface Gift {
  name: string;
  qty: number;
  image: string;
  price: number;
  status: boolean;
}
interface Collection {
  name: string;
  qty: number;
  image: string;
  price: number;
  status: boolean;
}

class DrinkStore {
  roundCount = 5;
  freeRoundCount = 3;
  pepsiCount = 0;
  sevenUpCount = 0;
  mirindaCount = 0;
  coins = 500;
  numberphone = '';
  listGift: Gift[] = [
    {
      name: 'Pepsi Bucket Hat',
      qty: 600,
      image:
        'https://raw.githubusercontent.com/thekids1002/PepsiGame/main/scr/assets/imgs/pepsi_hat.png',
      price: 80,
      status: true,
    },
    {
      name: 'Pepsi Jacket',
      qty: 10,
      image:
        'https://raw.githubusercontent.com/thekids1002/PepsiGame/main/scr/assets/imgs/pepsi_jacket.png',
      price: 300,
      status: true,
    },
    {
      name: 'Pepsi Tote Bag',
      qty: 800,
      image:
        'https://raw.githubusercontent.com/thekids1002/PepsiGame/main/scr/assets/imgs/pepsi_bag.png',
      price: 80,
      status: true,
    },
    {
      name: 'Pepsi Tumbler',
      qty: 500,
      image:
        'https://raw.githubusercontent.com/thekids1002/PepsiGame/main/scr/assets/imgs/pepsi_tumbler.png',
      price: 300,
      status: true,
    },
    {
      name: 'Airpod case (Black Pink)',
      qty: 20,
      image:
        'https://raw.githubusercontent.com/thekids1002/PepsiGame/main/scr/assets/imgs/airpod.png',
      price: 150,
      status: true,
    },
    {
      name: 'Electronic lunch bo',
      qty: 5,
      image:
        'https://raw.githubusercontent.com/thekids1002/PepsiGame/main/scr/assets/imgs/electronic_lun_bo.png',
      price: 800,
      status: true,
    },
    {
      name: 'Portable Speaker',
      qty: 3,
      image:
        'https://raw.githubusercontent.com/thekids1002/PepsiGame/main/scr/assets/imgs/portable_speaker.png',
      price: 1000,
      status: true,
    },
  ];

  listCollection: Collection[] = [];

  constructor() {
    makeObservable(this, {
      roundCount: observable,
      freeRoundCount: observable,
      pepsiCount: observable,
      sevenUpCount: observable,
      mirindaCount: observable,
      coins: observable,
      numberphone: observable,
      listGift: observable,
      listCollection: observable,
      setRoundCount: action,
      setFreeRoundCount: action,
      setPepsiCount: action,
      setSevenUpCount: action,
      setMirindaCount: action,
      decrementRoundCount: action,
      decrementFreeRoundCount: action,
      AddCoins: action,
      exchangeCombo: action,
      addGiftToStore: action,
      updateOrAddCollection: action,
      findAndDecreaseGiftQuantity: action,
      setnumberPhone: action,
    });
  }
  AddCoins(amount: number) {
    this.coins += amount;
  }
  setPepsiCount(count: number) {
    this.pepsiCount = count;
  }
  setnumberPhone(number: string) {
    this.numberphone = number;
  }

  setSevenUpCount(count: number) {
    this.sevenUpCount = count;
  }

  setMirindaCount(count: number) {
    this.mirindaCount = count;
  }

  setRoundCount = async (count: number) => {
    this.roundCount = count;
  };

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
      giftCount < this.sevenUpCount &&
      giftCount < this.pepsiCount &&
      giftCount < this.mirindaCount
    ) {
      return true;
    }
    return false;
  }
  // đổi quà
  findAndDecreaseGiftQuantity(giftName: string): void {
    const gift = this.listGift.find(item => item.name === giftName);
    if (gift) {
      gift.qty -= 1;
      if (gift.qty <= 0) {
        gift.qty = 0;
      }
      this.coins -= gift.price;
      if (this.coins < 0) {
        this.coins = 0;
      }
    }
  }

  // Quà của tôi
  addGiftToStore(gift: Collection) {
    this.listCollection.push(gift);
  }

  updateGiftInStore(index: number, updatedGift: Collection) {
    this.listCollection[index] = updatedGift;
  }

  removeGiftFromStore(index: number) {
    this.listCollection.splice(index, 1);
  }

  updateOrAddCollection(collection: Collection): void {
    const index = this.listCollection.findIndex(
      (item: Collection) => item.name === collection.name,
    );

    if (index !== -1) {
      // Đối tượng Collection đã tồn tại trong listCollection, cập nhật số lượng, cập nhật random status ;v
      this.listCollection[index].qty += collection.qty;
      this.listCollection[index].status = collection.status;
    } else {
      // Đối tượng Collection chưa tồn tại trong listCollection, thêm mới vào
      this.listCollection.push(collection);
    }
  }
}

const drinkStore = new DrinkStore();

export default drinkStore;
