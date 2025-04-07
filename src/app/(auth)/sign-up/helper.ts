export interface ISignupFormValues {
    name: string
    email: string
    password: string
}

export const InitialSignupValues = {
    name: "",
    email: "",
    password: ""
}

export const TITLE = {
    FORM_TITLE: "Create an account",
    FORM_SUBTITLE: "Create an account and take control of your events today!"
}

export const style = {
    signupImgStyle: {
        objectFit: "cover",
        height: "100%",
    } as React.CSSProperties
}