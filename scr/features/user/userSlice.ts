import firestore from '@react-native-firebase/firestore';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {action} from 'mobx';

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
}

const initialState: userState = {
  user: undefined,
  status: 'idle',
  error: null,
  listGift: [],
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (phoneNumber: string) => {
    try {
      console.log('Phone number ' + phoneNumber);
      const userDocument = await firestore()
        .collection('Users')
        .where('Phone', '==', phoneNumber)
        .get();
      console.log('User ' + userDocument.docs[0].data()); // Log ID của tài liệu đầu tiên

      if (userDocument.empty) {
        return null;
      }
      const user = userDocument.docs[0].data() as User;
      console.log(JSON.stringify(user));
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

// export const setNumberNoodle = createAsyncThunk(
//   'user/setNumberNoodle',
//   async ({message, numberNoodle}: {message: string; numberNoodle: number}) => {
//     await firestore()
//       .collection('users')
//       .doc(message)
//       .update({
//         numberNoodle: numberNoodle,
//       })
//       .then(() => {
//         console.log('User updated!');
//       });
//   },
// );

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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
        console.log('pending');
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        console.log('fulfilled');
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
        console.log('rejected');
      });
  },
});
export const {setUser, decrementFreeRoundCount, decrementRoundCount} =
  userSlice.actions;
export default userSlice.reducer;
