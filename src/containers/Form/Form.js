import React, {Component} from 'react'
import AboutSection from "../../components/FormSection/AboutSection/AboutSection";
import SubmitButton from "../../components/FormSection/SubmitButton/SubmitButton";
import ValidatorService from '../../validators.service'
import CoordinatorSection from "../../components/FormSection/CoordinatorSection/CoordinatorSection";
import Employees from "../../data/employes"
import Categories from "../../data/categories"
import utils from '../../utils'
import WhenSection from "../../components/FormSection/WhenSection/WhenSection";

const createInitialState = (fields) => {
    return fields.reduce((acc, {name, required, initial_value}) => {
        return {
            ...acc,
            [name]: {
                value: initial_value ? initial_value : '',
                touched: false,
                valid: !required,
                errors: []
            }
        }
    }, {})
};

class Form extends Component {

    state = {
        ...createInitialState(this.props.fields),
    };

    checkedIfError = (field) => {
        return field.touched && !field.valid;
    };

    requiredMessages = (fieldName, fieldValue, required) => {
        let requiredMessage = [];
        if (required) {
            requiredMessage = ValidatorService.required(fieldValue, fieldName);
        }
        return requiredMessage;
    };

    validatorsMessages = (validatorsList, fieldValue) => {
        let msgs = [];
        if (validatorsList) {
            msgs = validatorsList.reduce((messages, validator) => {
                return messages.concat(validator(fieldValue) || []);
            }, []);
        }
        return msgs;
    };

    isFieldValid = (requiredMsg, errors) =>
        (requiredMsg === undefined || requiredMsg.length === 0) && errors.length === 0;

    handleTextArea = ({
                          event: {target: {value, name}},
                          limit,
                          required,
                          validators
                      }) => {
        const val = value.length <= limit ? value : value.slice(0, limit);
        const requiredMsg = this.requiredMessages(name, val, required);
        const errors = this.validatorsMessages(validators, value);
        this.handleChangeValue({
            value: val,
            name,
            valid: this.isFieldValid(requiredMsg, errors),
            errors
        })
    };

    handleNumberInput = ({event: {target: {value, name}}}) => {

        const numRegExp = /^\d+\.?\d*$/g;
        const val = numRegExp.test(value) ? value : "";
        this.handleChangeValue({
            value: val,
            name,
            valid: true
        })
    };

    handleDateInput = ({event: {target: {value, name}}}) => {
        const today = new Date();
        const inputToDate = new Date(value);
        const input = [inputToDate.getFullYear(),
            (inputToDate.getMonth() + 1).toString().padStart(2, "0"),
            inputToDate.getDate().toString().padStart(2, "0")].join('-');
        const val = inputToDate > today ? input : "";
        //MOMENT SOLUTION
        // const today = moment();
        // const inputDate = moment(value);
        // const val = inputDate.isBefore(today) ? "" : inputDate.format('YYYY-MM-DD');

        this.handleChangeValue({
            value: val,
            name,
            valid: true
        })
    };

    handleInput = ({
                       event: {target: {value, name}},
                       required,
                       validators
                   }
    ) => {
        const requiredMsg = this.requiredMessages(name, value, required);
        const errors = validators ? this.validatorsMessages(validators, value) : [];
        this.handleChangeValue({
            name,
            value,
            valid: this.isFieldValid(requiredMsg, errors),
            errors
        })
    };

    handleChangeValue = ({
                             name,
                             value,
                             valid,
                            errors,
                         }) => {
        this.setState(
            {
                [name]: {
                    ...this.state[name],
                    valid,
                    value,
                    errors
                }
            },
        );
    };

    isFormValid = (state) =>
        this.props.fields.reduce((isValid, {name}) => {
            return state[name].valid && isValid
        }, true);

    changeTouchedValueAfterSubmit = () => {
        const state = this.state;
        const fieldsInfo = this.props.fields.reduce((fieldInfo, {name}) => {
            return {
                ...fieldInfo,
                [name]: {
                    ...state[name],
                    touched: true
                }
            }
        }, {});
        this.setState({
            ...fieldsInfo
        })
    };
    collectToObject = (fields) => fields.reduce((accFields, field) => ({
        ...accFields,
        [field.name]: {
            ...field
        }

    }),{});

    createDataFormatAfterSubmit = () => {
        const state = this.state;
        const { fields } = this.props;
        const fieldsObj = this.collectToObject(fields);
        return {
            title: state.title.value,
            description: state.description.value,
            category_id: state.categories.value && parseInt(state.categories.value, 10),
            paid_event: state.payment.value !== "free",
            event_fee: state.event_fee.value ? parseFloat(state.event_fee.value) : fieldsObj.event_fee.initial_value,
            reward: state.reward.value ? parseFloat(state.reward.value) : fieldsObj.reward.initial_value,
            date: `${state.date.value}T${utils.dateToHHFormat(state.time.value, state.period.value)}`,
            duration: state.duration.value ? parseFloat(state.duration.value) * 3600 : fieldsObj.duration.initial_value,
            coordinator: {
                email: state.email.value,
                id: state.coordinator_id.value
            }
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const state = this.state;

        if (this.isFormValid(state)) {
            console.log(this.createDataFormatAfterSubmit());
            this.props.validForm()
        }
        else {
           console.log("Something went wrong!")
        }
        this.changeTouchedValueAfterSubmit();
    };

    render() {
        const listOfEmployees = utils.adjustEmployeesData(Employees)
        return (
            <form onSubmit={this.handleSubmit}>
                <AboutSection
                    getInput={this.handleInput}
                    getTextArea={this.handleTextArea}
                    getNumberInput={this.handleNumberInput}
                    values={this.state}
                    getErrors={this.checkedIfError}
                    categories={Categories}
                />
                <CoordinatorSection
                    getInput={this.handleInput}
                    getErrors={this.checkedIfError}
                    values={this.state}
                    employees={listOfEmployees}/>
                <WhenSection
                    getNumberInput={this.handleNumberInput}
                    getDateInput={this.handleDateInput}
                    getInput={this.handleInput}
                    values={this.state}
                    getErrors={this.checkedIfError}/>
                <SubmitButton/>
            </form>
        );
    }
}

export default Form;