export interface ILogInFormValues {
    email: string
    password: string
}

export const InitialLogInValues = {
    email: "",
    password: ""
}

export const TITLE = {
    FORM_TITLE: "Log In",
    FORM_SUBTITLE: "Let’s Get You Logged In!"
}

export const style = {
    loginImgStyle: {
        objectFit: "cover",
        height: "100%",
    } as React.CSSProperties
}