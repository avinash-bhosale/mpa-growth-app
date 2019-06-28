import React from 'react';
import { Redirect } from 'react-router-dom'
import 'antd/dist/antd.css';
import moment from 'moment';
import axios from 'axios';
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

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 1000)
    }
    
    componentWillUnmount() {
        clearTimeout(this.id)
    }
    
    default_data = {
        'name': '', 'gender': '', 'dob': '',
    };
    
    state = {
        autoCompleteResult: [],
        fileList: [],
        redirect: false
    };
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(this.props.userData){
                    values.index = this.props.index;
                    values.edit = true;
                }else{
                    values.edit = false;
                }
                axios.post('http://localhost:6543/api/users', values)
                  .then(function (response) {
                        message.success('User Added Successfully');
                  })
                  .catch(function (error) {
                        message.error('Oops Something Went Wrong');
                  });
            }
        });
    };
    
    render() {
        if(this.props.userData){
            this.default_data.name = this.props.userData.name;
            this.default_data.gender = this.props.userData.gender;
            //this.default_data.dob = this.props.userData.dob;
            this.default_data.dob = moment(this.props.userData.dob, 'YYYY-MM-DD');
        }
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
                                Name&nbsp;
                            </span>
                        }
                        >
                            {
                                getFieldDecorator('name', {
                                    initialValue: this.default_data.name,
                                    rules: [{ required: true, message: 'Please input user name!', whitespace: true }],
                                })(<Input />)
                            }
                    </Form.Item>
                    <Form.Item label="Gender">
                        {getFieldDecorator('gender', {
                            initialValue: this.default_data.gender,
                            rules: [{ required: true, message: 'Please select your gender!' }],
                        })(
                            <Select
                            placeholder="Select a option and change input text above"
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                </Select>,
                        )}
                    </Form.Item>
                    <Form.Item label="DOB">
                        {getFieldDecorator('dob', {
                            initialValue: this.default_data.dob,
                            rules: [{ required: true, message: 'Please select your DOB!' }],
                        })
                        (<DatePicker />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;
