import React, { Component } from "react";
import { connect } from "react-redux";
import { Grow, Button, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { getCustomersAsAdmin } from '../../actions/customer-action'

export class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: "ID", field: "customer_id" },
                { title: "Tên người dùng", field: "fullname" },
                { title: "Email", field: "email" },
                { title: "Ngày sinh", field: "birthday" },
                { title: "Số điện thoại", field: "numberphone" },
                { title: "Trạng thái", field: "available" }
            ],
            data: [],
        };
    }

    componentWillMount() {
        this.setState({
            data: this.props.customers,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customers !== this.props.customers) {
            console.log('ye')
            this.setState({
                data: this.props.customers
            })
        }
    }

    render() {
        const { customers, isLoading } = this.props

        const table = (
            <Grow in={true}>
                <MaterialTable
                    title="DANH SÁCH NGƯỜI DÙNG"
                    columns={this.state.columns}
                    data={this.state.data}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            // Update: (e, rowData) => alert("You updated " + rowData.name),
                            // Delete: (e, rowData) => alert("You deleted " + rowData.name),
                            Delete: (_id) => {
                                // console.log(_id)
                                this.props.deleteGoods(_id)
                            },
                        }
                    ]}
                    components={{
                        Toolbar: props => (
                            <div style={{ backgroundColor: '#e8eaf5' }}>
                                <MTableToolbar {...props} />
                            </div>
                        ),
                        Action: props => (
                            <div></div>
                            // <div>
                            //     <UpdateGoodsModal customer_id={props.data.customer_id} />
                            //     {
                            //         props.data.available ?
                            //             <Button
                            //                 onClick={() => props.action.Delete(props.data.customer_id)}>
                            //                 {/* onClick={(e) => console.log('id ne` ',props.data.type_id)}> */}
                            //                 Xóa
                            //             </Button>
                            //             :
                            //             null
                            //     }
                            // </div>
                            // <Row>
                            //     <IconButton aria-label="edit" style={{ color: '#009FFF' }}
                            //         onClick={(event) => props.action.Update(event, props.data)}>
                            //         <EditIcon />
                            //     </IconButton>
                            //     <IconButton aria-label="delete" style={{ color: '#ec2F4B' }}
                            //         // onClick={(e) => { this.handleDelete(e, _id) }}
                            //         onClick={(event) => props.action.Update(event, props.data)}
                            //     >
                            //         <DeleteIcon />
                            //     </IconButton>
                            // </Row>
                        ),
                    }} />
            </Grow>
        )
        if (!isLoading) {
            return (
                <div>
                    { customers.length ? table : null }
                </div>
            );
        } else {
            return (
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <div style={{ float: "center" }}>
                            <MoonLoader
                                color="#33bbff"
                                size="60"
                                animation="border"
                                role="status"
                                style={{ height: "10vh", width: "10vh" }}
                            >
                                <span>
                                    <strong style={{ fontSize: "5vh" }}>Loading...</strong>
                                </span>
                            </MoonLoader>
                        </div>
                    </Grid>
                </Grid>
            )
        }
    }
}



const mapStateToProps = (state) => ({
    customers: state.customerReducer.customers,
    isLoading: state.loadReducer.isLoading
});

const mapDispatchToProps = {
    // getGoodsByWarehouse_id,
    // deleteGoods\

};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);
