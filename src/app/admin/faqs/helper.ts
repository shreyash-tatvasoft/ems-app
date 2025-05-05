// Formik helpers
import * as Yup from "yup";

// types
import { IFAQsFormValues } from "./types";


export const InitialFaqsValues: IFAQsFormValues = {
    faqs: [{ question: '', answer: '' }],
  };

export const FaqsValidationSchema = Yup.object({
    faqs: Yup.array().of(
        Yup.object().shape({
            question: Yup.string().trim().required('Question is required'),
            answer: Yup.string().trim().required('Answer is required'),
        })
    ),
})