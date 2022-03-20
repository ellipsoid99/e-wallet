import {
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Input,
    Label,
    Table,
} from "reactstrap";
const rolesData = require("@/data/roles");
const Roles = () => {
    console.log("rolesData", rolesData);
    console.log("rolesData.rows", rolesData.rows);
    return (
        <div>
            <Form>
                <FormGroup>
                    <Label for="roleName">Name</Label>
                    <Input id="roleName" name="role" type="text" bsSize="sm" />
                </FormGroup>
            </Form>
            {rolesData && (
                <>
                    <Table>
                        {rolesData.headers && (
                            <thead>
                                <tr>
                                    {rolesData.headers.map(
                                        (header: string, index: number) => {
                                            return (
                                                <td key={index}>{header}</td>
                                            );
                                        }
                                    )}
                                </tr>
                            </thead>
                        )}
                        {rolesData.rows && (
                            <tbody>
                                {rolesData.rows.map((row: any) => {
                                    console.log("row", row);
                                    return (
                                        <>
                                            <tr key={row.id}>
                                                <td>{row.heading}</td>
                                                <td>
                                                    {row.access.read && (
                                                        <FormGroup check>
                                                            <Input
                                                                type="checkbox"
                                                                checked={
                                                                    row.access
                                                                        .read
                                                                }
                                                            />
                                                        </FormGroup>
                                                    )}
                                                </td>
                                                <td>
                                                    {row.access
                                                        .readAndWrite && (
                                                        <FormGroup check>
                                                            <Input
                                                                type="checkbox"
                                                                checked={
                                                                    row?.access
                                                                        ?.readAndWrite
                                                                }
                                                            />
                                                        </FormGroup>
                                                    )}
                                                </td>
                                                <td>
                                                    {row.access.export && (
                                                        <FormGroup check>
                                                            <Input
                                                                type="checkbox"
                                                                checked={
                                                                    row.access
                                                                        .export
                                                                }
                                                            />
                                                        </FormGroup>
                                                    )}
                                                </td>
                                                <td>
                                                    {row.access.full && (
                                                        <FormGroup check>
                                                            <Label check>
                                                                Full Access
                                                            </Label>

                                                            <Input
                                                                type="checkbox"
                                                                checked={
                                                                    row.access
                                                                        .full
                                                                }
                                                            />
                                                        </FormGroup>
                                                    )}
                                                </td>
                                            </tr>
                                            {row.rows.map((innerRow: any) => {
                                                return (
                                                    <tr key={innerRow.id}>
                                                        <td>
                                                            {innerRow.heading}
                                                        </td>
                                                        <td>
                                                            {innerRow.access
                                                                .read && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Input
                                                                        type="checkbox"
                                                                        checked={
                                                                            innerRow
                                                                                .access
                                                                                .read
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {innerRow.access
                                                                .readAndWrite && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Input
                                                                        type="checkbox"
                                                                        checked={
                                                                            innerRow
                                                                                ?.access
                                                                                ?.readAndWrite
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {innerRow.access
                                                                .export && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Input
                                                                        type="checkbox"
                                                                        checked={
                                                                            innerRow
                                                                                .access
                                                                                .export
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {innerRow.access
                                                                .full && (
                                                                <FormGroup
                                                                    check
                                                                >
                                                                    <Label
                                                                        check
                                                                    >
                                                                        Full
                                                                        Access
                                                                    </Label>
                                                                    <Input
                                                                        type="checkbox"
                                                                        checked={
                                                                            innerRow
                                                                                .access
                                                                                .full
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </>
                                    );
                                })}
                            </tbody>
                        )}
                    </Table>
                    <Button>Create Role</Button>
                </>
            )}
        </div>
    );
};

export default Roles;
