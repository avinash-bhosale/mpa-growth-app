import React from 'react';
import { Table, Icon, Form } from 'antd';

const TableBody = props => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Height',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Actions',
            dataIndex: 'Actions',
            key: 'Actions',
        },
    ];
    return <Table dataSource={props.growths} columns={columns} />;
  }

class GrowthTable extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const { growths } = this.props.growths
        return (
            <div className="container">
                <div className="container table-responsive-lg">
                    <h3>
                        User Growth Data
                    </h3>
                    <TableBody growths={growths} index={this.props.index} />
                </div>
            </div>
        )
    }
}

export default GrowthTable;
