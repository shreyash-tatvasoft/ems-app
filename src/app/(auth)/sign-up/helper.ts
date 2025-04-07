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
    FORM_SUBTITLE: "Simplify Event Planning!"
}

export const style = {
    signupImgStyle: {
        objectFit: "cover",
        height: "100%",
    } as React.CSSProperties
}