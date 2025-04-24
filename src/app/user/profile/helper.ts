import * as Yup from "yup";

export const TAB_OPTIONS = {
    PERSONAL : "personal",
    EMAIL : "email",
    PASSWORD : "password"
}

export const InitialChangePasswordFormValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};


export const ChangePasswordSchema = Yup.object({
    oldPassword: Yup.string()
        .required("Old Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be no more than 50 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),
    newPassword: Yup.string()
        .required("New Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be no more than 50 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
        .required("Confirm password is required"),
});