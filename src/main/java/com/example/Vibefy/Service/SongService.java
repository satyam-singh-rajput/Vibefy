package com.example.Vibefy.Service;

import com.example.Vibefy.Dto.SongDto;
import com.example.Vibefy.Dto.SongMusicDto;
import com.example.Vibefy.Entity.Song;
import com.example.Vibefy.Entity.User;
import com.example.Vibefy.Enums.Enums;
import com.example.Vibefy.Repository.SongRepository;
import com.example.Vibefy.Repository.UserRepository;
import com.mpatric.mp3agic.ID3v2;
import com.mpatric.mp3agic.Mp3File;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;


@Service
public class SongService {
    private final SongRepository songRepo;
    private final UserRepository userRepo;

    SongService(SongRepository songRepo, UserRepository userRepo) {
        this.songRepo = songRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public String uploadSong(MultipartFile file, String email) throws Exception {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(Enums.USER_NOT_FOUND.getMessage()));
        File tempFile = File.createTempFile("upload-", ".mp3");
        file.transferTo(tempFile);

        String title = "Unknown Title";
        String artist = "Unknown Artist";
        byte[] audioContent;

        try {
            Mp3File mp3file = new Mp3File(tempFile);
            if (mp3file.hasId3v2Tag()) {
                ID3v2 id3v2Tag = mp3file.getId3v2Tag();
                title = (id3v2Tag.getTitle() != null) ? id3v2Tag.getTitle() : file.getOriginalFilename();
                artist = (id3v2Tag.getArtist() != null) ? id3v2Tag.getArtist() : "Unknown Artist";
            }
            audioContent = java.nio.file.Files.readAllBytes(tempFile.toPath());

        } finally {
            tempFile.delete();
        }

        Song song = new Song();
        song.setTitle(title);
        song.setArtist(artist);
        song.setAudioData(audioContent);
        song.setContentType(file.getContentType());
        song.setUser(user);

        songRepo.saveAndFlush(song);
        return Enums.SONG_UPLOADED_SUCCESSFULLY.getMessage();
    }

    public List<SongDto> getUserList(String email){
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException(Enums.USER_NOT_FOUND.getMessage()));
        return songRepo.findByUser(user);
    }

    public SongMusicDto getSong(Long songId){
        SongMusicDto res = songRepo.getSongById(songId);
        return res;
    }
}