package com.seoro.seoro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		//Stomp 접속 주소 url => /ws-stomp
		registry.addEndpoint("/ws-stomp") //연결될 엔드포인트
				.withSockJS(); //sockJS 연결
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		//메시지를 구독하는 요청 url => 즉 메시지 받을 때
		registry.enableSimpleBroker("/sub");

		//메시지를 발행하는 요청 url => 즉 메시지 보낼 때
		registry.setApplicationDestinationPrefixes("/pub");
	}
}
