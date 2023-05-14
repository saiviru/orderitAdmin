import * as ActionTypes from '../ActionTypes';

export const getImages = (image) =>{
    return{
        type:ActionTypes.IMAGES,
        payload:image
    }
}

export const getMenuItems = (menu) => {
    return {
        type: ActionTypes.MENUIMAGES,
        payload:menu
    }
}