package com.aloha.server.service;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.aloha.server.dto.Files;
import com.aloha.server.mapper.FileMapper;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FileServiceImpl implements FileService {

    @Autowired
    private FileMapper fileMapper;

    @Value("${upload.path}")
    private String uploadPath;  //업로드 경로

    @Override
    public List<Files> list() throws Exception {
        return fileMapper.list();
    }

    @Override
    public Files select(int no) throws Exception {
        return fileMapper.select(no);
    }

    @Override
    public int insert(Files file) throws Exception {
        return fileMapper.insert(file);
    }

    @Override
    public int update(Files file) throws Exception {
        return fileMapper.update(file);
    }

    @Override
    public int delete(int no) throws Exception {
        return fileMapper.delete(no);
    }

    // 파일 업로드 로직
    public Files uploadFile(Files fileInfo, MultipartFile file) throws Exception {
        int result = 0;
        if(file.isEmpty()) return null;

        // 파일 원본명, 사이즈, 데이터
        String originName = file.getOriginalFilename();
        long fileSize = file.getSize();
        byte[] fileData = file.getBytes();

        // 파일명 중복 방지
        String fileName = UUID.randomUUID().toString() + "_" + originName;
        String filePath = uploadPath + "/" + fileName;

        // 파일 시스템에 복사(업로드)
        File uploadFile = new File(uploadPath, fileName);
        FileCopyUtils.copy(fileData, uploadFile);

        // DB에 파일 정보 등록
        Files uploadedFile = new Files();
        uploadedFile.setParentTable(fileInfo.getParentTable());
        uploadedFile.setParentNo(fileInfo.getParentNo());
        uploadedFile.setFileName(fileName);
        uploadedFile.setFilePath(filePath);
        uploadedFile.setFileSize(fileSize);
        uploadedFile.setOriginName(originName);
        uploadedFile.setFileCode(fileInfo.getFileCode());

        result = fileMapper.insert(uploadedFile);
        log.info("result : " + result);
        return null;

    }

    @Override
    public Files upload(Files file) throws Exception {
        Files uploadedFile = uploadFile(file, file.getFile());
        if(uploadedFile != null) {
            log.info("파일 업로드 성공!");
        }
        return uploadedFile;
    }

    @Override
    public List<Files> uploadFiles(Files fileInfo, List<MultipartFile> fileList) throws Exception {
        List<Files> uploadedFileList = new ArrayList<Files>();
        for (MultipartFile file : fileList) {
            Files uplodedFile = uploadFile(fileInfo, file);
            uploadedFileList.add(uplodedFile);
            log.info("업로드된 파일 : " + uplodedFile);
        }

        return uploadedFileList;
    }

    @Override
    public List<Files> listByParent(Files file) throws Exception {
        List<Files> fileList = fileMapper.listByParent(file);
        return fileList;
    }

    @Override
    public int download(int no, HttpServletResponse response) throws Exception {
        Files file = fileMapper.select(no);
        if(file == null) {
            // BAD_REQUEST : 400, 클라이언트의 요청이 잘못되었음
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return 0;
        }

        String filePath = file.getFilePath(); // 파일 경로
        String fileName = file.getFileName();

        // 파일 다운로드를 위한 헤더 세팅
        // Content-Type : application/octect-stream
        // Content-Dsposition : attachment, filename="파일명.확장자"
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Dsposition", "attachment; filemane=\"" + fileName + "\"");

        // 파일 다운로드
        // - 파일 입력
        File downloadFile = new File(filePath);
        FileInputStream fis = new FileInputStream(downloadFile);

        // - 파일 출력
        ServletOutputStream sos = response.getOutputStream();

        // -다운로드
        FileCopyUtils.copy(fis,sos);

        // byte[] buffer = new byte[1024];     // 1024bytes : 1KB
        // int data;
        // while((data = fis.read(buffer)) != -1) { // 1KB 입력
        //     sos.write(buffer, 0, data);      // 1KB 출력 (전송)
        // }
        fis.close();
        sos.close();
        return 1;

    }
}
