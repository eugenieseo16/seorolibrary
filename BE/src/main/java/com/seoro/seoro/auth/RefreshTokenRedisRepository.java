package com.seoro.seoro.auth;

import org.springframework.data.repository.CrudRepository;

import com.seoro.seoro.auth.RefreshToken;

public interface RefreshTokenRedisRepository extends CrudRepository<RefreshToken, String> {
}
