import { MENUIMAGES } from './ActionTypes';


const INITIAL_STATE = {

    images: '',
};

const reducer = (state = INITIAL_STATE, action) => {
    console.log("this is in reducer:",action);
    switch (action.type) {

        case MENUIMAGES:

            return {

                ...state, images: action.data
            };
        default: return state;
    }

};

export default reducer;