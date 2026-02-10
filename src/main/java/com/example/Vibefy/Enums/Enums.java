package com.example.Vibefy.Enums;

import lombok.Getter;

@Getter
public enum Enums {
    // Define your constants here
    LOGIN_SUCCESSFUL("Login Successful"),
    INCORRECT_PASSWORD("Incorrect Password, Please try Again"),
    INCORRECT_EMAIL("Incorrect Email, Please try Again"),
    USER_NOT_FOUND("User not found, Please Try again"),
    USER_NOT_LOGGED_IN("Please login and Try again"),
    Email_ALREADY_USED("The email you are trying is already in Use, Please try with some other Email"),
    SIGNUP_SUCCESSFUL("User registered successfully"),
    INVALID_CREDENTIALS("Invalid email or password"),
    USER_ALREADY_EXISTS("A user with this email already exists"),
    DATABASE_ERROR("Something went wrong on our end. Please try again later."),
    WELCOME("Welcome to Vibefy"),
    SONG_UPLOADED_SUCCESSFULLY("Song Uploaded Successfully"),
    SOMETHING_WENT_WRONG("Sorry, there is some issue on our end please try again after sometime. ");
    private final String message;

    Enums(String message) {
        this.message = message;
    }
}