package com.example.Vibefy.Controller;

import com.example.Vibefy.Dto.SongMusicDto;
import com.example.Vibefy.Enums.Enums;
import com.example.Vibefy.Service.SongService;
import com.example.Vibefy.Service.UserService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.util.ObjectUtils.isEmpty;

@RestController
public class PlaySong {
    private final SongService songService;
    private final UserService userService;

    public PlaySong(SongService songService, UserService userService) {
        this.songService = songService;
        this.userService = userService;
    }
    @GetMapping("/api/playSong/{songId}")
    public ResponseEntity<?> getSongbyId( @CookieValue(name = "vibe_session", defaultValue = "") String email,  @PathVariable Long songId){
        System.out.println("billi billi");
        if(email.isEmpty()) {
           return  ResponseEntity.status(401).body(Enums.USER_NOT_LOGGED_IN);
        }
        if (isEmpty(songId)) {
            return ResponseEntity.status(500).body(Enums.SOMETHING_WENT_WRONG);
        }
        else {
            SongMusicDto res = songService.getSong(songId);
            if(!isEmpty(res)){
                return ResponseEntity.ok().
                        contentType(MediaType.parseMediaType("audio/mpeg")).body(res.getAudioData());
            }
            else {
              return  ResponseEntity.status(500).body(Enums.DATABASE_ERROR);
            }
        }
    }
}
