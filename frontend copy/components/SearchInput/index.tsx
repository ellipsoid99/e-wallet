import { Button, Input } from "reactstrap";
import styles from "./SearchInput.module.scss";
const CustomSearchInput = () => {
    return (
        <div className={styles.inputHolder}>
            <Input type="search" placeholder="Search" />
            <Button className={styles.iconButton}>
                <span className="icon icon-Search"></span>
            </Button>
        </div>
    );
};

export default CustomSearchInput;
