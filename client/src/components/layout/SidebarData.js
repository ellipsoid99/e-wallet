import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoneyBillTransfer,
    faLandmark,
} from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
    {
        title: "Home",
        path: "/dashboard",
        icon: <FontAwesomeIcon icon={faLandmark} />,
    },
    {
        title: "Payments",
        path: "/payments",
        icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />,
    },
];
