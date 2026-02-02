// 이미지 목록 데이터
const imageListData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "보험차익 과세 확인서",
    selected: i === 0,
}));

// 페이지 상태
let currentPage = 1;
const itemsPerPage = 10;

// DOM 요소
const imageListContainer = document.getElementById("imageList");
const selectAllCheckbox = document.getElementById("select-all");

// 이미지 목록 렌더링
function renderImageList() {
    imageListContainer.innerHTML = "";

    imageListData.forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.className = `list-item ${item.selected ? "selected" : ""}`;

        listItem.innerHTML = `
            <input type="checkbox" 
                   class="list-checkbox item-checkbox" 
                   ${item.selected ? "checked" : ""}
                   data-id="${item.id}">
            <span class="list-item-no">${item.id}</span>
            <span class="list-item-name">${item.name}</span>
        `;

        imageListContainer.appendChild(listItem);
    });

    // 체크박스 이벤트 리스너 추가
    const itemCheckboxes = document.querySelectorAll(".item-checkbox");
    itemCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", handleItemCheckboxChange);
    });

    updateSelectAllCheckbox();
}

// 개별 체크박스 변경 핸들러
function handleItemCheckboxChange(e) {
    const itemId = parseInt(e.target.dataset.id);
    const item = imageListData.find((item) => item.id === itemId);

    if (item) {
        item.selected = e.target.checked;
        e.target.closest(".list-item").classList.toggle("selected", e.target.checked);
    }

    updateSelectAllCheckbox();
}

// 전체 선택 체크박스 업데이트
function updateSelectAllCheckbox() {
    const allSelected = imageListData.every((item) => item.selected);
    const someSelected = imageListData.some((item) => item.selected);

    selectAllCheckbox.checked = allSelected;
    selectAllCheckbox.indeterminate = !allSelected && someSelected;
}

// 전체 선택 체크박스 이벤트
selectAllCheckbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;

    imageListData.forEach((item) => {
        item.selected = isChecked;
    });

    renderImageList();
});

// 페이지네이션 버튼 이벤트
document.getElementById("firstPage").addEventListener("click", () => {
    currentPage = 1;
    console.log("첫 페이지로 이동");
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        console.log("이전 페이지로 이동:", currentPage);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    console.log("다음 페이지로 이동:", currentPage);
});

document.getElementById("lastPage").addEventListener("click", () => {
    console.log("마지막 페이지로 이동");
});

// 액션 바 버튼 이벤트
document.querySelectorAll(".action-bar .action-button").forEach((button) => {
    button.addEventListener("click", function () {
        const buttonText = this.textContent.trim();

        switch (buttonText) {
            case "다운로드":
                handleDownload();
                break;
            case "인쇄":
                handlePrint();
                break;
            case "닫기":
                handleClose();
                break;
        }
    });
});

// 다운로드 핸들러
function handleDownload() {
    const selectedItems = imageListData.filter((item) => item.selected);
    const pageOption = document.querySelector('input[name="page-option"]:checked').value;
    const downloadOption = document.querySelector('input[name="download-option"]:checked').value;
    const includeStamp = document.querySelector('input[name="additional-option"][value="stamp"]').checked;

    console.log("다운로드 설정:", {
        pageOption,
        downloadOption,
        includeStamp,
        selectedCount: selectedItems.length,
    });

    alert(`다운로드를 시작합니다.\n형식: ${downloadOption.toUpperCase()}\n선택된 페이지: ${selectedItems.length}개`);
}

// 인쇄 핸들러
function handlePrint() {
    const selectedItems = imageListData.filter((item) => item.selected);

    console.log("인쇄 시작:", selectedItems.length + "개 페이지");
    alert(`${selectedItems.length}개 페이지를 인쇄합니다.`);

    // window.print();
}

// 닫기 핸들러
function handleClose() {
    if (confirm("창을 닫으시겠습니까?")) {
        window.close();
    }
}

// 마스킹 추가 버튼 이벤트
document.querySelector(".action-button.secondary").addEventListener("click", () => {
    console.log("마스킹 추가 기능");
    alert("마스킹 추가 기능이 실행됩니다.");
});

// 라디오 버튼 변경 이벤트
document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
        console.log("옵션 변경:", e.target.name, "=", e.target.value);
    });
});

// 초기화
document.addEventListener("DOMContentLoaded", () => {
    renderImageList();
    console.log("이미지 처리 프로그램 초기화 완료");
});

// 뷰어 아이템 클릭 이벤트
document.querySelectorAll(".viewer-item").forEach((item) => {
    item.addEventListener("click", () => {
        console.log("뷰어 이미지 클릭");
        // 이미지 확대 보기 등의 기능 추가 가능
    });
});
