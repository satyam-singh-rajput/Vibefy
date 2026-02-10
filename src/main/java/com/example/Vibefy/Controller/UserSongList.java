package com.example.Vibefy.Controller;

import com.example.Vibefy.Dto.SongDto;
import com.example.Vibefy.Enums.Enums;
import com.example.Vibefy.Service.SongService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserSongList {

    private final SongService songService;

    public UserSongList(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/api/getUserSongList")
    public ResponseEntity<?> getUserSongList(
            @CookieValue(name = "vibe_session", defaultValue = "") String email) {

        if (email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Enums.INCORRECT_EMAIL);
        }

        try {
            List<SongDto> res = songService.getUserList(email);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
