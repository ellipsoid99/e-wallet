import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import styles from "./Dropdown.module.scss";

const CustomDropdown = (props) => {
  console.log("custom dropdown props", props);
  const { menuItems, CustomLabel, isOpenFn, toggleFn } = props;
  console.log("menuList", menuItems);
  return (
    <div>
      <Dropdown isOpen={isOpenFn} toggle={toggleFn}>
        <DropdownToggle className={"customButton"}>
          {CustomLabel}
        </DropdownToggle>
        {/* <CustomLabel /> */}
        <DropdownMenu>
          {menuItems.map((menu) => {
            return (
              <DropdownItem
                key={menu.id}
                onClick={() => menu.fnCallback()}
                disabled={menu.disabled}
              >
                {menu.label}
              </DropdownItem>
            );
          })}
          {/* <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                    <DropdownItem disabled>Action (disabled)</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;
