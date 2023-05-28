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

export {isPhoneNumber, isPersonName, randomNumber};
