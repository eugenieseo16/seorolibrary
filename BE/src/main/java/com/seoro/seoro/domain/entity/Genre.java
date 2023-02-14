package com.seoro.seoro.domain.entity;

import javax.persistence.*;

import java.io.Serializable;

public enum Genre implements Serializable {
    GJ("0", "경제"),
    JGGB("1", "자기계발"),
    S("2", "시/에세이"),
    IM("3", "인문"),
    JG("4", "종교"),
    SS("5", "소설"),
    KO("6", "국어/외국어"),
    JC("7", "정치/사회"),
    YS("8", "역사/문화"),
    GH("9", "과학/공학"),
    IT("10", "IT/프로그래밍"),
    GG("11", "건강/의학"),
    SH("12", "가정/생활/요리"),
    YH("13", "여행/취미"),
    DJ("14", "예술/대중문화"),
    YA("15", "유아");

    private final String idx;
    private final String symbol;

    Genre(String idx, String symbol) {
        this.idx = idx;
        this.symbol = symbol;
    }

    public String getIdx() {
        return idx;
    }

    public String getSymbol() {
        return symbol;
    }
}
