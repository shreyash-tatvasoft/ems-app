export interface IFaqsPage {
    params: Promise<{ faqId: string }>;
}

export interface IFaqsFormProps {
    faqId: string
}

export interface IFAQsItem {
    question: string;
    answer: string;
}

export interface IFAQsFormValues {
    faqs: IFAQsItem[];
}