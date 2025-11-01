package com.team5.gear.service;

import com.team5.gear.entity.Equipment;
import com.team5.gear.entity.User;
import com.team5.gear.entity.Wishlist;
import com.team5.gear.repository.ArticleRepository;
import com.team5.gear.repository.EquipmentRepository;
import com.team5.gear.repository.UserRepository;
import com.team5.gear.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {

    @Autowired
    private ArticleRepository articleRepository;  // 인스턴스로 주입


    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;


    public void addProductToWishlist(Long userId, Long equipmentId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Equipment equipment = equipmentRepository.findById(equipmentId).orElseThrow(() -> new RuntimeException("Product not found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setEquipment(equipment);

        wishlistRepository.save(wishlist);
    }

    public List<Wishlist> getWishlistByUserId(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }
}
