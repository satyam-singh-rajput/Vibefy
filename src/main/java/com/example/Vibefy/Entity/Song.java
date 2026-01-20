package com.example.Vibefy.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String artist;
    private String contentType; // audio/mpeg, audio/wav

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] audioData;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
