package com.aloha.server.controller;

import java.io.File;
import java.io.FileInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.server.dto.Files;
import com.aloha.server.service.FileService;
import com.aloha.server.util.MediaUtil;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * 📁 파일 
 * ⭐ 파일 업로드
 * ⭐ 파일 다운로드
 * ⭐ 이미지 썸네일
 * ⭐ 파일 삭제
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/files")
public class FileController {
    @Autowired
    private FileService fileService;

    // 프로젝트 내의 자원을 접근하는 객체
    @Autowired
    private ResourceLoader resourceLoader;

    /**
     * 파일 업로드
     * 
     * @param file
     * @return
     */
    @PostMapping("/upload")
    public ResponseEntity<?> create(Files file) {
        try {
            int newFileNo = fileService.upload(file);
            return new ResponseEntity<>(newFileNo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 파일 다운로드
     * 
     * @param no
     * @param response
     * @throws Exception
     */
    @GetMapping("/{no}")
    public void fileDownload(@PathVariable("no") int no, HttpServletResponse response) throws Exception {
        fileService.download(no, response);
    }

    /**
     * 이미지 썸네일
     * 
     * @param no
     * @return
     * @throws Exception
     */
    @GetMapping("/img/{no}")
    public void thumbnail(@PathVariable("no") Integer no, HttpServletResponse response) throws Exception {
        if (no == null) {
            return;
        }

        // 1. 파일 번호로 파일 정보 조회
        Files file = fileService.select(no);
        // if(file == null ){
        // log.info("조회된 파일 정보가 없음");
        // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        // }

        // 2. 파일 정보에서 파일 경로 추출
        String filePath = (file != null) ? file.getFilePath() : null;
        Resource resource = resourceLoader.getResource("classpath:static/img/no-img.png");
        // if(filePath == null || filePath.equals("")){
        // log.info("파일 경로가 없음");
        // return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        // }

        // 3. 파일 시스템에서 이미지 파일 입력
        File imgFile = null;
        // Resource resource = resourceLoader.getResource(filePath);
        // imgFile = resource.getFile();

        // * 이미지가 없을 때 -> no-image.jpg로 지정
        // boolean existFile = new File(filePath).exists(); // 파일 존재유무 확인
        // 이미지 파일이 없을 때
        // if (file == null || !existFile) {
        //     // 기본 이미지 : no-img.png
        //     filePath = "classpath:static/img/no-img.png";
        //     resource = resourceLoader.getResource(filePath);
        //     imgFile = resource.getFile();
        // }
        // // 이미지 파일이 있을 때
        // else {
        //     imgFile = new File(filePath);
        // }

        // 파일이 존재하지 않거나 파일 경로가 null인 경우
        if(filePath == null || !(imgFile = new File(filePath)).exists()){
            imgFile = resource.getFile();
        }


        // 4. 이미지의 확장자를 확인해서 Content-Type 응답 헤더 지정
        // - 확장자 확인
        String ext = filePath.substring(filePath.lastIndexOf(".") + 1); // png, jpg ...
        // MediaType : Content-Type 중, image, audio, video 등
        MediaType mediaType = MediaUtil.getMediaType(ext);
        // - Content-Type 지정
        // 이미지 미디어 타입이 아닌 경우 -> no-img 처리
        if (mediaType == null) {
            mediaType = MediaType.IMAGE_PNG;
            // filePath = "classpath:static/img/no-img.png";
            // resource = resourceLoader.getResource(filePath);
            imgFile = resource.getFile();
        } else {
            // 이미지 타입일 경우
            response.setContentType(mediaType.toString());

        }

        // 5. 이미지 파일 응답
        FileInputStream fis = new FileInputStream(imgFile);
        ServletOutputStream sos = response.getOutputStream();
        FileCopyUtils.copy(fis, sos);
    }

    /**
     * 파일 삭제
     * 
     * @param no
     * @return
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<?> deleteFile(@PathVariable("no") Integer no) throws Exception {
        log.info("파일 삭제");
        log.info("fileNo : " + no);
        if (no == null)
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        try {
            int result = fileService.delete(no);
            if(result>0){
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("FAIL", HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     /**
     * 파일 선택 삭제
     * @param no
     * @return
     */
    @DeleteMapping("")
    public ResponseEntity<?> deleteFiles(@RequestParam("no") String no) throws Exception {
        log.info("파일 선택 삭제");
        log.info("fileNos : " + no);
        if (no == null)
            return new ResponseEntity<>("FAIL", HttpStatus.BAD_REQUEST);
        try {
            int result = fileService.deleteFiles(no);
            if(result>0){
                return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("FAIL", HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
