package com.aloha.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.aloha.server.dto.Files;

@Mapper
public interface FileMapper {
    // 게시글 목록
    public List<Files> list() throws Exception;
    // 게시글 조회
    public Files select(int no) throws Exception;
    // 게시글 등록
    public int insert(Files file) throws Exception;
    // 게시글 수정
    public int update(Files file) throws Exception;
    // 게시글 삭제
    public int delete(int no) throws Exception;
    // 파일 번호(기본키) 최댓값
    public int maxPk() throws Exception;

    // 파일 목록 - 부모 기준
    public List<Files> listByParent(Files file) throws Exception;

    // 파일 선택 삭제
    public int deleteFiles(String no) throws Exception;

    // 부모 테이블 기준 - 파일 목록 삭제
    public int deleteByParent(Files file) throws Exception;

}
