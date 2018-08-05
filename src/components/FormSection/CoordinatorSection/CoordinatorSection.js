import React from 'react'
import FormSection from "../FormSection";
import Header from "../Header/Header";
import Content from "../Content/Content";
import ContentItem from "../Content/ContentItem/ContentItem";
import Label from "../../Fields/Label/Label";
import Field from "../../Fields/Field/Field";
import ErrorMessage from "../../FormError/ErrorMessage/ErrorMessage";
import GroupedSelect from "../../Fields/Select/GroupedSelect/GroupedSelect";
import Input from "../../Fields/Input/Input";
import ValidatorServices from '../../../validators.service'

const CoordinatorSection = ({
                                getErrors,
                                values,
                                getInput,
                                employees
                            }) => {
    return (
        <FormSection>
            <Header headerName="Coordinator"/>
            <Content>
                <ContentItem>
                    <Label name='coordinator_id'>
                        RESPONSIBLE
                    </Label>
                    <Field>
                        <GroupedSelect options={employees}
                                       name='coordinator_id'
                                       value={values.categories.value}
                                       onChange={getInput}/>
                    </Field>
                </ContentItem>
                <ContentItem>
                    <Label name='email'
                           errors={[getErrors(values.email)]}>
                        EMAIL
                    </Label>
                    <Field>
                        <Input
                            name='email'
                            validators={[ValidatorServices.mailValidator]}
                            error={getErrors(values.email)}
                            onChange={getInput}
                            value={values.email.value}
                            type="text"
                            placeholder={"Email"}/>
                    </Field>
                    <ErrorMessage validators={values.email.errors}
                                  error={getErrors(values.email)}/>
                </ContentItem>
            </Content>
        </FormSection>
    );
};

export default CoordinatorSection;