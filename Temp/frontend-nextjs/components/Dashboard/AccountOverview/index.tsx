import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import styles from "./AccountOverview.module.scss";
const AccountInfo = (props: any) => {
    const { UserDetails } = props;
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <div className={styles.grayContainer}>
                            <h3>Profile</h3>
                            <Button className={styles.editButton}>
                                <span className={`icon icon-Edit `}></span>
                            </Button>

                            {/* <Container> */}
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>User Image</Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="exampleEmail">
                                                        NAME
                                                    </Label>
                                                    <Input
                                                        id="exampleEmail"
                                                        name="email"
                                                        type="email"
                                                        bsSize="sm"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleEmail">
                                                        EMAIL
                                                    </Label>
                                                    <Input
                                                        id="exampleEmail"
                                                        name="email"
                                                        type="email"
                                                        bsSize="sm"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleEmail">
                                                        CONTACT
                                                    </Label>
                                                    <Input
                                                        id="exampleEmail"
                                                        name="email"
                                                        type="email"
                                                        bsSize="sm"
                                                    />
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button>Change Password</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* </Container> */}
                        </div>
                    </Col>
                    <Col>
                        <div className={styles.grayContainer}></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AccountInfo;
