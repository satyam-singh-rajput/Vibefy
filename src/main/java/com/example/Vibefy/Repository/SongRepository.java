package com.example.Vibefy.Repository;

import com.example.Vibefy.Dto.SongDto;
import com.example.Vibefy.Dto.SongMusicDto;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Vibefy.Entity.Song;
import com.example.Vibefy.Entity.User;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    List<SongDto> findByUser(User user);
    SongMusicDto getSongById(Long songId);
}