import React, {Fragment} from 'react'
import FormSection from "../FormSection";
import Header from "../Header/Header"
import ContentItem from "../Content/ContentItem/ContentItem";
import Content from "../Content/Content";
import Label from "../../Fields/Label/Label";
import Field from "../../Fields/Field/Field";
import Input from "../../Fields/Input/Input";
import ErrorMessage from "../../FormError/ErrorMessage/ErrorMessage";
import TextArea from "../../Fields/TextArea/TextArea";
import Info from "../../Fields/Info/Info";
import Select from "../../Fields/Select/Select";
import RadioWithLabel from "../../Fields/RadioWithLabel/RadioWithLabel";
import ShortInput from "../../Fields/Input/ShortInput/ShortInput";
import SubLabel from "../../Fields/SubLabel/SubLabel";

const AboutSection = ({
                          getInput,
                          getTextArea,
                          getNumberInput,
                          values,
                          getErrors,
                          categories
                      }) => {
    return (
        <FormSection>
            <Header headerName="About"/>
            <Content>
                <ContentItem>
                    <Label
                        errors={[getErrors(values.title)]}
                        required
                        name='title'>
                        TITLE
                    </Label>
                    <Field>
                        <Input
                            error={getErrors(values.title)}
                            required
                            name='title'
                            onChange={getInput}
                            currentValue={values.title.value}
                            type="text"
                            placeholder={"Make it short and clear "}/>
                    </Field>
                    <ErrorMessage
                        error={getErrors(values.title)}
                        name='title'/>
                </ContentItem>
                <ContentItem>
                    <Label top
                           required
                           errors={[getErrors(values.description)]}
                           name='description'>DESCRIPTION
                    </Label>
                    <Field>
                        <TextArea
                            onChange={getTextArea}
                            placeholder={"Write about your event, be creative"}
                            error={getErrors(values.description)}
                            required
                            name='description'/>
                        <Info name='description'
                              informationList={['Max length 140 characters',
                                  `${values.description.value.length}/140`]}/>
                    </Field>
                    <ErrorMessage
                        error={getErrors(values.description)}
                        name='description'
                    />
                </ContentItem>
                <ContentItem>
                    <Label descr
                           name='categories'>
                        CATEGORY
                    </Label>
                    <Field>
                        <Select options={categories}
                                value={values.categories.value}
                                name='categories'
                                placeholder={'Select category (skills, interests, locations)'}
                                onChange={getInput}/>
                        <Info name='categories'
                              informationList={['Describes topic and people who should be interested in event']}/>
                    </Field>
                </ContentItem>
                <ContentItem>
                    <Label name={'payment'}>
                        PAYMENT
                    </Label>
                    <Field>
                        <RadioWithLabel labelText={"Free Event"}
                                        id={'free'}
                                        name={'payment'}
                                        onChange={getInput}
                                        checked={values.payment.value === "free"}/>
                        <RadioWithLabel labelText={"Paid Event"}
                                        id={'paid'}
                                        onChange={getInput}
                                        name={'payment'}
                                        checked={values.payment.value === "paid"}/>
                        {values.payment.value === "paid" ?
                            <Fragment>
                                <ShortInput
                                    type="text"
                                    placeholder={'Number'}
                                    name={'event_fee'}
                                    value={values.event_fee.value}
                                    onChange={getNumberInput}/>
                                <SubLabel>
                                    $
                                </SubLabel>
                            </Fragment> : null
                        }
                    </Field>
                </ContentItem>
                <ContentItem>
                        <Label name='reward'>
                            REWARD
                        </Label>
                        <Field>
                            <ShortInput
                                name='reward'
                                type="text"
                                placeholder={'Number'}
                                value={values.reward.value}
                                onChange={getNumberInput}/>
                            <SubLabel>
                                reward points for attendance
                            </SubLabel>
                        </Field>
                </ContentItem>
            </Content>
        </FormSection>
    );
};


export default AboutSection;