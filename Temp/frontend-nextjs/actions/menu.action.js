import { MenuConstants } from "../constants";
export const menuActions = {
  menuItem,
};
function menuItem(item) {
  return (dispatch) => {
    dispatch(request(item));
  };
  function request(menuItem) {
    return {
      type: MenuConstants.MENU_ITEM,
      menuItem,
    };
  }
}
