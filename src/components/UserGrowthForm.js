import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import {
    DatePicker,
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Upload,
    message
} from 'antd';
import GrowthTable from "./GrowthTable";


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class GrowthForm extends React.Component {
    
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        fileList: [],
        data: []
    };
    componentDidMount() {
        axios.get(`http://localhost:6543/api/users/${this.props.match.params.id}/growths`)
          .then(res => {
            const growths = res.data.data;
            console.log("()()()()");
            console.log(growths);
            console.log("()()()()");
            const new_data = [];
            growths.map((row, index) => {
                new_data.push(
                    {
                        Actions: <div>
                            <Link to={`/user/${row.id}/growth?id=${row.id}`} ><Icon type="eye" style={{ color: 'green' }}/></Link>
                        </div>,
                        key: "'"+row.id+"'",
                        id: row.id, 
                        height: row.height,
                        weight: row.weight,
                        date: row.date,
                    }
                )
                
                this.setState({ data: new_data });
            });
            console.log(new_data);
            console.log("in growths map");
            console.log(this.state);
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(`http://localhost:6543/api/users/${this.props.match.params.id}/growths`, values)
                .then(function (response) {
                    message.success('Growth Data Added Successfully');
                })
                .catch(function (error) {
                    message.error('Oops Something Went Wrong');
                });
            };
        });
    };

    handleSelectChange = value => {
        this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };
  
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult, fileList } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
    
        return (
            <div className="container">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item
                        label={
                            <span>
                                Height&nbsp;
                            </span>
                        }
                        >
                        {
                            getFieldDecorator('height', {
                                rules: [{ required: true, message: 'Please input user height!', whitespace: true }],
                            })(<Input />)
                        }
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                Weight&nbsp;
                            </span>
                        }
                        >
                            {
                                getFieldDecorator('weight', {
                                    rules: [{ required: true, message: 'Please input user weight!', whitespace: true }],
                                })(<Input />)
                            }
                    </Form.Item>
                    <Form.Item label="Date">
                        {getFieldDecorator('date', {
                            rules: [{ required: true, message: 'Please select recorded Date!' }],
                        })
                        (<DatePicker />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <GrowthTable growths={this.state.data} state={this.state} />
            </div>
        );
    }
}

const WrappedGrowthForm = Form.create({ name: 'register' })(GrowthForm);
export default WrappedGrowthForm;