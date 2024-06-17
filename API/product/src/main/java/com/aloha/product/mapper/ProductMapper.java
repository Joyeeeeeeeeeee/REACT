package com.aloha.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.aloha.product.dto.Product;

@Mapper
public interface ProductMapper {
    public List<Product> list();
    
    public Product select(String id);

    public int insert(Product product);

    public int update(Product product);

    public int delete(String id);
}
