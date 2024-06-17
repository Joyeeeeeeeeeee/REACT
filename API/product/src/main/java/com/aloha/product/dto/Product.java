package com.aloha.product.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Product {
    public int no;
    public String id;
    public String name;
    public int price;
    public String img;
    public Date createdAt;
    public Date updatedAt;
}
