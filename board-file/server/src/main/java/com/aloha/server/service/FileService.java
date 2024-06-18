package com.aloha.server.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.Files;

import jakarta.servlet.http.HttpServletResponse;

public interface FileService {

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

    // 파일 업로드
    public Files upload(Files file) throws Exception;
    // 다중 파일 업로드
    public List<Files> uploadFiles(Files file, List<MultipartFile> fileList) throws Exception;
    
    // 파일 목록 - 부모 기준
    public List<Files> listByParent(Files file) throws Exception;

    // 파일 다운로드
    public int download(int no, HttpServletResponse response) throws Exception;
    
  }
