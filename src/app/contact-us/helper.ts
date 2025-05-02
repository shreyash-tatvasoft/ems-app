// Formik helpers
import * as Yup from "yup";

export const InitialContactFormValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

export const ContactFormSchema = Yup.object({
    name: Yup.string().required('Your name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
});