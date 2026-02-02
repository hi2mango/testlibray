<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="downloadPopup" style="display: none">
    <div class="popup-container container">
        <!-- 왼쪽 패널 -->
        <div class="left-panel">
            <!-- 페이지 옵션 섹션 -->
            <section class="option-section">
                <h3 class="section-title">
                    <span class="bullet"></span>
                    페이지 옵션
                </h3>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="page-option" value="all" />
                        <span class="radio-text">전체 페이지</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="page-option" value="current" />
                        <span class="radio-text">현재 페이지</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="page-option" value="selected" checked />
                        <span class="radio-text">선택 페이지</span>
                        <span class="radio-description">이미지 목록에서 체크하세요</span>
                    </label>
                </div>
            </section>

            <!-- 다운로드 옵션 섹션 -->
            <section class="option-section">
                <h3 class="section-title">
                    <span class="bullet"></span>
                    다운로드 옵션
                </h3>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="download-option" value="pdf" />
                        <span class="radio-text">PDF</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="download-option" value="tiff" />
                        <span class="radio-text">TIFF</span>
                        <span class="radio-description">묶음 이미지로 저장</span>
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="download-option" value="jpeg" checked />
                        <span class="radio-text">JPEG</span>
                        <span class="radio-description">개별 이미지로 저장</span>
                    </label>
                </div>
            </section>

            <!-- 추가 옵션 섹션 -->
            <section class="option-section">
                <h3 class="section-title">
                    <span class="bullet"></span>
                    추가 옵션
                </h3>
                <div class="checkbox-group">
                    <label class="checkbox-label">
                        <input type="checkbox" name="additional-option" value="stamp" />
                        <span class="checkbox-text">주석포함</span>
                    </label>
                </div>
                <button class="action-button secondary" type="button">마스킹 추가</button>
            </section>
        </div>

        <!-- 오른쪽 패널 (이미지 뷰어) -->

        <!-- 이미지 목록 섹션 -->
        <div style="display: flex">
            <section class="image-list-section">
                <h3 class="section-title">
                    <span class="bullet"></span>
                    이미지 목록
                </h3>
                <div class="list-header">
                    <input type="checkbox" id="select-all" class="list-checkbox" />
                    <span class="list-no">No</span>
                    <span class="list-name">문서명</span>
                </div>
                <div class="list-items" id="imageList">
                    <!-- 동적으로 생성될 목록 아이템들 -->
                </div>

                <div class="pagination">
                    <button class="pagination-btn" id="firstPage" type="button">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" />
                            <path d="M6 4V12" stroke="currentColor" stroke-width="2" />
                        </svg>
                    </button>
                    <button class="pagination-btn" id="prevPage" type="button">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" />
                        </svg>
                    </button>
                    <button class="pagination-btn" id="nextPage" type="button">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" />
                        </svg>
                    </button>
                    <button class="pagination-btn" id="lastPage" type="button">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" />
                            <path d="M10 4V12" stroke="currentColor" stroke-width="2" />
                        </svg>
                    </button>
                </div>
            </section>
            <section class="right-panel">
                <h3 class="section-title">
                    <span class="bullet"></span>
                    이미지 목록
                </h3>
                <div class="viewer-container"></div>
            </section>
        </div>
        <!-- ✅ dialog 내부 하단 액션 버튼(너 디자인 유지) -->
        <div class="action-bar">
            <button class="action-button primary" id="btnDownload" type="button">다운로드</button>
            <button class="action-button primary" id="btnPrint" type="button">인쇄</button>
            <button class="action-button dark" id="btnClose" type="button">닫기</button>
        </div>
    </div>
</div>
