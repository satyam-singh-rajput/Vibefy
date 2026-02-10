package com.example.Vibefy.Service;

import com.example.Vibefy.Dto.UserDto;
import com.example.Vibefy.Entity.User;
import com.example.Vibefy.Enums.Enums;
import com.example.Vibefy.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public SignUpService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public String signUp(UserDto user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            return Enums.Email_ALREADY_USED.getMessage();
        }
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(newUser);
        return Enums.WELCOME.getMessage();
    }
}
