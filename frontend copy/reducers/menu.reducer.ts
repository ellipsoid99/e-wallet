import { MenuConstants } from "../constants";

export function menuItem(state: {} = null || {}, action: any) {
    console.log("MenuConstants action >>>>> ", action);
    switch (action.type) {
        case MenuConstants.MENU_ITEM:
            return {
                action,
            };
        default:
            return state;
    }
}
