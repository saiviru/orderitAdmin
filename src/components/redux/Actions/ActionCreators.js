import * as ACTIONTYPES from './ActionTypes';

export const addingImages = (file) => {
    return {
        type: ACTIONTYPES.MENUIMAGES,
        data:file,
    };
};

export const viewMenu =(items) =>{
    return{
        type: ACTIONTYPES.MENUITEMS,
        data:items
    }
}