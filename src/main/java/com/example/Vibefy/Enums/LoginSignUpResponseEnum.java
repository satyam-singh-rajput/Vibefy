package com.example.Vibefy.Enums;

import lombok.Getter;

@Getter
public enum LoginSignUpResponseEnum {
    // Define your constants here
    LOGIN_SUCCESSFUL("Login Successful"),
    INCORRECT_PASSWORD("Incorrect Password, Please try Again"),
    INCORRECT_EMAIL("Incorrect Email, Please try Again"),
    USER_NOT_FOUND("User not found, Please Try again"),
    SIGNUP_SUCCESSFUL("User registered successfully"),
    INVALID_CREDENTIALS("Invalid email or password"),
    USER_ALREADY_EXISTS("A user with this email already exists"),
    DATABASE_ERROR("Something went wrong on our end. Please try again later.");

    private final String message;

    LoginSignUpResponseEnum(String message) {
        this.message = message;
    }
}