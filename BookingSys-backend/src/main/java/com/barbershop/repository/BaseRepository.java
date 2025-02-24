package com.barbershop.repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

@Repository
public abstract class BaseRepository<T> {
    private static final AtomicLong GLOBAL_ID_COUNTER = new AtomicLong();
    protected final ConcurrentHashMap<Long, T> items = new ConcurrentHashMap<>();

    protected Long generateUniqueId() {
        return GLOBAL_ID_COUNTER.incrementAndGet();
    }

    public abstract List<T> findAll();
    public abstract Optional<T> findById(Long id);
    public abstract T save(T entity);
    public abstract void deleteById(Long id);
} 