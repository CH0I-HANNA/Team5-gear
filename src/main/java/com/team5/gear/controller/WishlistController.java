package com.team5.gear.controller;

import com.team5.gear.entity.Wishlist;
import com.team5.gear.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/{userId}/{productId}")
    public void addEquipmentToWishlist(@PathVariable Long userId, @PathVariable Long equipmentId) {
        wishlistService.addProductToWishlist(userId, equipmentId);
    }

    @GetMapping("/{userId}")
    public List<Wishlist> getWishlistByUserId(@PathVariable Long userId) {
        return wishlistService.getWishlistByUserId(userId);
    }
}