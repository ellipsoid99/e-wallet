import moment from "moment";
import DataTable from "react-data-table-component";
import styles from "../Dashboard.module.scss";

const customStyles = {
    table: {
        style: {
            maxHeight: "250px",
            margin: "24px",
            overflow: "auto",
            width: "95vw",
        },
    },
    headRow: {
        style: {
            background: `linear-gradient(
                90deg,
                rgba(250, 229, 150, 1) 30%,
                rgba(63, 176, 172, 1) 80%,
                rgba(23, 62, 67, 1) 100%
            )`,
        },
    },
    rows: {
        style: {
            maxHeight: "50px",
        },
    },
};
const columns = [
    {
        name: "#",
        cell: (row, index) => index + 1,
        grow: 0,
    },
    {
        id: "Timestamp",
        name: "Timestamp",
        selector: (row) => moment(row.date).format("MMMM Do YYYY, h:mm:ss a"),
        grow: 2,
        sortable:true,
    },
    {
        name: "To",
        selector: (row) => row.to,
        grow: 1,
    },
    {
        name: "From",
        selector: (row) => row.from,
        grow: 1,
    },
    {
        name: "Amount",
        selector: (row) => row.amount,
        grow: 2,
        center: true,
        sortable: true,
    },
    {
        name: "Direction",
        selector: (row) => (row.flag === false ? "Debit" : "Credit"),
        grow: 1,
        center: true,
    },
];
const PaymentOverview = (props) => {
    return (
        <div className={styles.tableWrapper}>
            <div className={styles.headerWrapper}>PAYMENT SUMMARY</div>
            <div className={styles.contentWrapper}>
                <DataTable
                    columns={columns}
                    data={props.data.transactions}
                    customStyles={customStyles}
                    highlightOnHover
                    fixedHeader
                    defaultSortFieldId="Timestamp"
                    defaultSortAsc={false}
                    // pagination
                />
            </div>
        </div>
    );
};
export default PaymentOverview;
