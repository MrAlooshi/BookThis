package com.barbershop.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.barbershop.model.User;

@Repository
public class UserRepository extends BaseRepository<User> {
    @Override
    public List<User> findAll() {
        return new ArrayList<>(items.values());
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(items.get(id));
    }

    @Override
    public User save(User user) {
        if (user.getId() == null) {
            user.setId(generateUniqueId());
        }
        items.put(user.getId(), user);
        return user;
    }

    @Override
    public void deleteById(Long id) {
        items.remove(id);
    }

    public User findByEmail(String email) {
        return items.values().stream()
            .filter(u -> u.getEmail().equals(email))
            .findFirst()
            .orElse(null);
    }
} 