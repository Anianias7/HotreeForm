const MAIL_REGEXP = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

const required = (value, name) => value ? undefined : `${name} is required`;
const mailValidator = (value) => MAIL_REGEXP.test(value) ? undefined : "Invalid email";

export default {
    required,
    mailValidator
}