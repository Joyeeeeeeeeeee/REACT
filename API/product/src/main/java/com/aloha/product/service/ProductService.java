package com.aloha.product.service;

import java.util.List;

import com.aloha.product.dto.Product;

public interface ProductService {

        public List<Product> list();
    
    public Product select(String id);

    public int insert(Product product);

    public int update(Product product);

    public int delete(String id);
} 