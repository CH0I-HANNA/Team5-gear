package com.team5.gear.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;
    private String password;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    private LocalDateTime createdAt = LocalDateTime.now();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wishlist> wishlist = new ArrayList<>();

  //  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<RecentlyViewed> recentlyViewed = new ArrayList<>();


    public User(String username, String email, String password, String name, String profileImageUrl, LocalDateTime createdAt, List<Wishlist> wishlist) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.profileImageUrl = profileImageUrl;
        this.createdAt = createdAt;
        this.wishlist = wishlist;
    }
}
