package com.seoro.seoro.domain.entity.User;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class User implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userEmail;
    private String userName;
    private String userPassword;
    private String userProfile;
    private String userAddress;
    private LoginType loginType;
    @Temporal(TemporalType.DATE)
    private Date withdrawalDate;
    private Integer userScore;


}
