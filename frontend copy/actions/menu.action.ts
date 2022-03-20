import { MenuConstants } from "../constants";
export const menuActions = {
    menuItem,
};
function menuItem(item: any) {
    return (dispatch: any) => {
        dispatch(request(item));
    };
    function request(menuItem: any) {
        return {
            type: MenuConstants.MENU_ITEM,
            menuItem,
        };
    }
}
