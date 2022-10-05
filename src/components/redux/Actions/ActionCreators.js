import * as ACTIONTYPES from './ActionTypes';

export const addingImages = (file) => {
    console.log("the action dispatched:",file);
    return {
        type: ACTIONTYPES.MENUIMAGES,
        data:file,
    };
};

export const viewMenu =(items) =>{
    console.log("the menu items dispatched:",items)
    return{
        type: ACTIONTYPES.MENUITEMS,
        data:items
    }
}