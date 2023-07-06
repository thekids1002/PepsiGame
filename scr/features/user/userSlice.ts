import firestore from '@react-native-firebase/firestore';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

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
interface ListCollection {
  id: any;
  name: any;
  coins: any;
  image: any;
}
interface User {
  Phone: any;
  Name: any;
  roundCount: any;
  freeRoundCount: any;
  pepsiCount: any;
  sevenUpCount: any;
  mirindaCount: any;
  coins: any;
  collections: Collection[];
}

interface userState {
  user: User | undefined | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  listGift: Gift[];
  listCollection: ListCollection[];
}

const initialState: userState = {
  user: undefined,
  status: 'idle',
  error: null,
  listGift: [],
  listCollection: [],
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (phoneNumber: string) => {
    try {
      const userDocument = await firestore()
        .collection('Users')
        .where('Phone', '==', phoneNumber)
        .limit(1)
        .get();
      if (userDocument.empty) {
        return null;
      }
      const user = userDocument.docs[0].data() as User;
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({phoneNumber, fullName}: {phoneNumber: string; fullName: any}) => {
    try {
      firestore()
        .collection('Users')
        .add({
          Phone: phoneNumber + '',
          Name: fullName + '',
          roundCount: 0,
          freeRoundCount: 5,
          pepsiCount: 0,
          sevenUpCount: 0,
          mirindaCount: 0,
          coins: 0,
          collections: [],
        })
        .then(() => {
          console.log('User added!');
        });
    } catch (error) {
      console.log(error);
    }
  },
);

// lấy danh sách các phần quà ( lon pepsi, mirinda, seven up ) sẽ nhận được sau khi chơi game/
export const fecthGiftsPlayGame = createAsyncThunk(
  'user/fecthGiftsPlayGame',
  async () => {
    try {
      const data = await firestore()
        .collection('Host')
        .doc('listGiftPlayGame')
        .get();
      if (data.exists) {
        const listData = data.data();
        if (listData) {
          return listData.list as ListCollection[];
        }
      }
      return [];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

// danh sách các phần quà sẽ nhận được khi đổi combo pepsi mirinda 7up
export const fecthGifts = createAsyncThunk('user/fecthGifts', async () => {
  try {
    const data = await firestore().collection('Host').doc('Gift').get();
    if (data.exists) {
      const listData = data.data();
      if (listData) {
        return listData.List as Gift[];
      }
    }
    return [];
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// update lại số lượng lượt chơi miễn phi
export const updateFreeRoundCount = createAsyncThunk(
  'user/updateFreeRoundCount',
  async ({userPhone, uvalue}: {userPhone: string; uvalue: any}) => {
    await firestore()
      .collection('Users')
      .where('Phone', '==', userPhone)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          await firestore().collection('Users').doc(doc.id).update({
            freeRoundCount: uvalue,
          });
        });
      });
  },
);

// update lại số lượng lượt chơi quy đổi
export const updateRoundCount = createAsyncThunk(
  'user/updateRoundCount',
  async ({userPhone, userValue}: {userPhone: string; userValue: any}) => {
    await firestore()
      .collection('Users')
      .where('Phone', '==', userPhone)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          await firestore().collection('Users').doc(doc.id).update({
            roundCount: userValue,
          });
        });
      });
  },
);

// update số lượng pepsi mirinda 7up nhận được khi chơi game
export const updatePepsi_Mirinda_7Up = createAsyncThunk(
  'user/updatePepsi_Mirinda_7Up',
  async ({
    userPhone,
    type,
    userValue,
  }: {
    userPhone: any;
    type: 1 | 2 | 3;
    userValue: any;
  }) => {
    const querySnapshot = await firestore()
      .collection('Users')
      .where('Phone', '==', userPhone)
      .get();

    const updates = querySnapshot.docs.map(doc => {
      const updateValue: {[key: string]: any} = {};
      if (type === 1) {
        updateValue.pepsiCount = userValue;
      } else if (type === 2) {
        updateValue.sevenUpCount = userValue;
      } else if (type === 3) {
        updateValue.mirindaCount = userValue;
      }
      return firestore().collection('Users').doc(doc.id).update(updateValue);
    });

    await Promise.all(updates);
  },
);

// update user

// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async ({userPhone, userValue}: {userPhone: string; userValue: any}) => {
//     const infoUser = JSON.parse(userValue);
//     await firestore()
//       .collection('Users')
//       .where('Phone', '==', userPhone)
//       .get()
//       .then(querySnapshot => {
//         querySnapshot.forEach(async doc => {
//           await firestore().collection('Users').doc(doc.id).update({
//             Name: infoUser.Name,
//             coins: infoUser.coins,
//             collections: infoUser.collections,
//             freeRoundCount: infoUser.freeRoundCount,
//             mirindaCount: infoUser.mirindaCount,
//             pepsiCount: infoUser.pepsiCount,
//             roundCount: infoUser.roundCount,
//             sevenUpCount: infoUser.sevenUpCount,
//           });
//         });
//       });
//   },
// );

// update hết tất cả thông tin của user lên firebase
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({userPhone, userValue}: {userPhone: string; userValue: string}) => {
    const userInfo = JSON.parse(userValue);
    const userDocs = await firestore()
      .collection('Users')
      .where('Phone', '==', userPhone)
      .get();

    const updates = userDocs.docs.map(doc => {
      return firestore()
        .collection('Users')
        .doc(doc.id)
        .update({
          ...userInfo,
        });
    });

    await Promise.all(updates);
  },
);

// update trừ số lượng quà của chương trình sau khi người chơi đổi quà
export const updateQuantityGift = createAsyncThunk(
  'user/updateQuantityGift',
  async ({giftName, updateQuantity}: {giftName: any; updateQuantity: any}) => {
    try {
      await firestore()
        .collection('Host')
        .where('name', '==', giftName)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(async doc => {
            console.log(doc.data());
            await firestore()
              .collection('Host')
              .doc(doc.id)
              .update({
                List: firestore.FieldValue.arrayUnion({qty: updateQuantity}),
              });
          });
        });
    } catch (error) {
      console.log(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {},
    decrementFreeRoundCount: state => {
      if (state.user) {
        state.user.freeRoundCount -= 1;
      }
    },
    decrementRoundCount: state => {
      if (state.user) {
        state.user.roundCount -= 1;
      }
    },
    incrementCoint(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user.coins += action.payload;
      }
    },
    decrementCoint(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user.coins -= action.payload;
      }
    },
    updateOrAddCollection(state, action: PayloadAction<Collection>): void {
      if (state.user) {
        const existingCollectionIndex = state.user.collections.findIndex(
          collection => collection.name === action.payload.name,
        );
        if (existingCollectionIndex !== -1) {
          // Collection đã tồn tại, tăng qty lên 1
          state.user.collections[existingCollectionIndex].qty += 1;
        } else {
          // Collection chưa tồn tại, thêm mới vào danh sách
          state.user.collections.push(action.payload);
        }
      }
    },
    incrementPepsiCount: state => {
      if (state.user) {
        state.user.pepsiCount += 1;
      }
    },
    incrementMirindaCount: state => {
      if (state.user) {
        state.user.mirindaCount += 1;
      }
    },
    incrementSevenUpCount: state => {
      if (state.user) {
        state.user.sevenUpCount += 1;
      }
    },
    decrementCombo: state => {
      if (state.user) {
        state.user.pepsiCount -= 1;
        state.user.mirindaCount -= 1;
        state.user.sevenUpCount -= 1;
      }
    },
  },
  extraReducers: builder => {
    builder
      // register user

      .addCase(registerUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      // fecth user
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      // update free Round Count
      .addCase(updateFreeRoundCount.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateFreeRoundCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateFreeRoundCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      // update round count

      .addCase(updateRoundCount.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateRoundCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateRoundCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })

      .addCase(updatePepsi_Mirinda_7Up.pending, state => {
        state.status = 'loading';
      })
      .addCase(updatePepsi_Mirinda_7Up.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updatePepsi_Mirinda_7Up.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      .addCase(fecthGiftsPlayGame.pending, state => {
        state.status = 'loading';
      })
      .addCase(fecthGiftsPlayGame.fulfilled, (state, action) => {
        state.listCollection = action.payload;
      })
      .addCase(fecthGiftsPlayGame.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      .addCase(fecthGifts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fecthGifts.fulfilled, (state, action) => {
        state.listGift = action.payload;
      })
      .addCase(fecthGifts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      });
  },
});
export const {
  setUser,
  decrementFreeRoundCount,
  decrementRoundCount,
  incrementCoint,
  updateOrAddCollection,
  incrementPepsiCount,
  incrementMirindaCount,
  incrementSevenUpCount,
  decrementCombo,
  decrementCoint,
} = userSlice.actions;
export default userSlice.reducer;
