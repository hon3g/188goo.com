import { ArgsActionTypes } from "./args.types"

const INIT_STATE = {
    id: ['id', null],
    region: ['city__state__region', null],
    state: ['city__state__name', null],
    city: ['city__name', null],
    type: ['category__type', null],
    category: ['category__name', null],
    slug: ['slug', null],
    page: ['page', null],
}

// const argsReducer = (state=INIT_STATE, action) => {
//     switch (action.type) {
//         case ArgsActionTypes.SET_ID:
//             return {
//                 ...state,
//                 id[1] = action.payload
//             };
    
//         default:
//             break;
//     }
// }