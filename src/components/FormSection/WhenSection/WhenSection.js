import React from 'react'
import FormSection from "../FormSection";
import Header from "../Header/Header";
import Content from "../Content/Content";
import ContentItem from "../Content/ContentItem/ContentItem";
import Label from "../../Fields/Label/Label";
import Field from "../../Fields/Field/Field";
import ShortInput from "../../Fields/Input/ShortInput/ShortInput";
import SubLabel from "../../Fields/SubLabel/SubLabel";
import Date from "../../Fields/Date/Date";
import ErrorMessage from "../../FormError/ErrorMessage/ErrorMessage";
import Time from "../../Fields/Time/Time";
import RadioWithLabel from "../../Fields/RadioWithLabel/RadioWithLabel";

const WhenSection = ({
                         getNumberInput,
                         getInput,
                         getDateInput,
                         values,
                         getErrors
                     }) => {

    const startsOnErrorMessage = () => {
        return getErrors(values.date) && getErrors(values.time) ?
            <ErrorMessage error={getErrors(values.date)} name='Starts on'/>
            : getErrors(values.date) ?
                <ErrorMessage error={getErrors(values.date)} name='date'/> :
                <ErrorMessage error={getErrors(values.time)} name='time'/>
    };

    return (
        <FormSection>
            <Header headerName="When"/>
            <Content>
                <ContentItem>
                    <Label required
                           errors={[getErrors(values.date), getErrors(values.time)]}>
                        STARTS ON
                    </Label>
                    <Field>
                        <Date type="date"
                              dateName='date'
                              value={values.date.value}
                              onChange={getDateInput}
                              required
                              error={getErrors(values.date)}
                        />
                        <SubLabel>at</SubLabel>
                        <Time type="time"
                              name='time'
                              required
                              onChange={getInput}
                              error={getErrors(values.time)}/>
                        <RadioWithLabel
                            labelText={"AM"}
                            name={'period'}
                            id={'am'}
                            onChange={getInput}
                            checked={values.period.value === "am"}/>
                        <RadioWithLabel
                            labelText={"PM"}
                            name={'period'}
                            id={'pm'}
                            onChange={getInput}
                            checked={values.period.value === "pm"}/>
                    </Field>
                    {startsOnErrorMessage()}
                    {/*<ErrorMessage/>*/}
                </ContentItem>
                <ContentItem>
                    <Label name='duration'>
                        DURATION
                    </Label>
                    <Field>
                        <ShortInput
                            name='duration'
                            type="text"
                            placeholder={'Number'}
                            value={values.duration.value}
                            onChange={getNumberInput}
                        />
                        <SubLabel>
                            hour
                        </SubLabel>
                    </Field>
                </ContentItem>
            </Content>
        </FormSection>
    )
}


export default WhenSection;