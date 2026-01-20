package com.example.Vibefy.Service;

import com.example.Vibefy.Dto.UserDto;
import com.example.Vibefy.Entity.User;
import com.example.Vibefy.Repository.SignUpRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {
    private final SignUpRepository signUpRepo;
    private final PasswordEncoder passwordEncoder;

    public SignUpService(SignUpRepository signUpRepo, PasswordEncoder passwordEncoder) {
        this.signUpRepo = signUpRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public String signUp(UserDto user) {
        if (signUpRepo.existsByEmail(user.getEmail())) {
            return "Email Already Exist";
        }
        if (signUpRepo.existsByUsername(user.getUsername())) {
            return "UserName already Exist";
        }
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        signUpRepo.save(newUser);
        return "Welcome to Vibefy";
    }
}
