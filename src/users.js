import React from "react";
import axios from 'axios';
import {Icon, Table} from "antd";
import {Link} from "react-router-dom";

const TableBody = props => {
    const columns = [
      {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
      },
      {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: 'Date',
          dataIndex: 'dob',
          key: 'dob',
      },
      {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
      },
      {
          title: 'Actions',
          dataIndex: 'Actions',
          key: 'Actions',
      },
  ];
  
  return <Table dataSource={props.data} columns={columns} />;
  }

class Users extends React.Component {
    state = {
        data: []
    }
    componentDidMount() {
        axios.get(`http://localhost:6543/api/users`)
          .then(res => {
            const persons = res.data.data;
            const data = [];
            persons.map((row, index) => {
                data.push(
                    {
                        Actions: <div>
                            <Link to={`/user/${row.id}/growth?id=${row.id}`} ><Icon type="eye" style={{ color: 'green' }}/></Link>
                        </div>,
                        key: "'"+row.id+"'",
                        id: row.id, 
                        name: row.name,
                        dob: row.dob,
                        gender: row.gender,
                    }
                )
                this.setState({ data: data });
            });
        });
    }
    render() {
        return (
            <div>
                <h1>Users</h1>
                <TableBody data={this.state.data}/>
            </div>
        );
    }
}

export default Users;
