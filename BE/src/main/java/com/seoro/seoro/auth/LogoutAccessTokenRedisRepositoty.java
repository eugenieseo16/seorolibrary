package com.seoro.seoro.auth;

import org.springframework.data.repository.CrudRepository;

import com.seoro.seoro.auth.LogoutAcessToken;

public interface LogoutAccessTokenRedisRepositoty extends CrudRepository<LogoutAcessToken, String> {
}
