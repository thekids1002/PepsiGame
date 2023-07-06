const isPhoneNumber = (phoneNumber: string): boolean => {
  const regex: RegExp = /^([0])+([0-9]{9})\b$/;
  return regex.test(phoneNumber);
};
const isPersonName = (name: string): boolean => {
  const regex: RegExp =
    /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]){2,}/;
  return regex.test(name);
};

const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const imageMapping = {
  'pepsi_hat.png': require('../assets/imgs/pepsi_hat.png'),
  'pepsi_jacket.png': require('../assets/imgs/pepsi_jacket.png'),
  'pepsi_bag.png': require('../assets/imgs/pepsi_bag.png'),
  'pepsi_tumbler.png': require('../assets/imgs/pepsi_tumbler.png'),
  'airpod.png': require('../assets/imgs/airpod.png'),
  'electronic_lun_bo.png': require('../assets/imgs/electronic_lun_bo.png'),
  'portable_speaker.png': require('../assets/imgs/portable_speaker.png'),
};

export {isPhoneNumber, isPersonName, randomNumber, imageMapping};
