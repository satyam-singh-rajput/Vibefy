package com.example.Vibefy.Controller;

import com.example.Vibefy.Repository.SongRepository;
import com.example.Vibefy.Service.SongService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class UploadSong {
    private final SongService songService;

    UploadSong(SongService songService){
        this.songService = songService;
    }
    @PostMapping("/api/upload")
    public ResponseEntity<String> uploadSong(
            @RequestParam("file") MultipartFile file,
            @CookieValue(name = "vibe_session", defaultValue = "") String email) {

        if (email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
        try {
            songService.uploadSong(file, email);
            return ResponseEntity.ok("Song uploaded and metadata extracted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }
}

