import {object, string, ref} from "yup"

// Register user
export interface registerUserBody {
    email: string,
    password: string
}
export const registerUserSchema = object().shape({
    body: object({
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
        password: string()
            .required("Password is required")
            .min(8, "Password too short - should be 8 chars minimum.")
    })
});

// Create user session
export interface createUserSessionBody {
    email: string,
    password: string
}
export const createUserSessionSchema = object().shape({
    body: object({
        email: string()
            .email("Must be a valid email")
            .required("Email is required"),
        password: string()
            .required("Password is required")
    })
});
