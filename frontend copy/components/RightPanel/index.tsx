import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

const CustomRightPanel = (props: any) => {
    const { showState, onHideFn, ChildComponent, heading } = props;
    return (
        <Offcanvas direction="end" isOpen={showState}>
            <OffcanvasHeader toggle={onHideFn}>{heading}</OffcanvasHeader>
            <OffcanvasBody>{ChildComponent}</OffcanvasBody>
        </Offcanvas>
    );
};

export default CustomRightPanel;
