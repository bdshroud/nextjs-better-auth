"use client";

import { signUp } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async(e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            setErrorMsg("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const {data: resData, error} = await signUp.email({
            name: data.name,
            email: data.email, 
            password: data.password
        });

        setIsLoading(false);

        if (error) {
            setErrorMsg(error.message || "An error occurred during sign up");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div>
            <h2>Please Sign up</h2>
            {errorMsg && <div className="text-red-500 mb-4">{errorMsg}</div>}
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>

                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (!value || value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="Your Name" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="Your Email" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="confirmPassword"
                    type="password"
                >
                    <Label>Confirm Password</Label>
                    <Input placeholder="Confirm your password" />
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit" isLoading={isLoading}>
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary" onPress={() => setErrorMsg("")}>
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SignUpPage;