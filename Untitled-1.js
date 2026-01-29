// ===============================
// jsTree Custom Toggle Tree
// ===============================

// -------------------------------
// Tree Data
// -------------------------------
const treeData = [
    {
        id: "c1",
        text: "청약서발행번호(25120000496)",
        children: [
            {
                id: "c1-1",
                text: "보험차익 과세 확인서<span class='count'>(1)</span>",
                children: [
                    { id: "c1-1-1", text: "보험차익 과세 확인서" },
                    { id: "c1-1-2", text: "보험금 청구서<span class='count'>(12)</span>" },
                ],
            },
            {
                id: "c1-2",
                text: "보험계약 해지 신청서",
                children: [
                    {
                        id: "c1-2-1",
                        text: "보험료 납부 확인서<span class='count'>(2)</span>",
                        children: [
                            { id: "c1-2-1-1", text: "보험금 지급 명세서" },
                            { id: "c1-2-1-2", text: "보험금 지급 명세서" },
                        ],
                    },
                ],
            },
        ],
    },
];

// -------------------------------
// jsTree Init
// -------------------------------
const $tree = $("#tree");

$tree.jstree({
    core: {
        data: treeData,
        multiple: false,
        themes: { dots: false, icons: false },
        expand_selected_onload: false,
        animation: 150,
    },
    plugins: ["wholerow"],
    dblclick_toggle: false, // 더블클릭 토글 비활성화
});

// -------------------------------
// Depth 계산 함수
// -------------------------------
function getDepthFromLi(liEl) {
    let depth = 1;
    let p = liEl.parentElement;

    while (p && p.classList) {
        if (p.classList.contains("jstree-children")) depth++;
        if (p.classList.contains("jstree-container-ul")) break;
        p = p.parentElement;
    }
    return depth;
}

// -------------------------------
// Twist(화살표) 데코레이션
// -------------------------------
function decorateTwisty(node) {
    const li = $tree.jstree(true).get_node(node, true);
    if (!li || !li.length) return;

    const liEl = li[0];
    const anchor = liEl.querySelector("a.jstree-anchor");
    if (!anchor) return;

    // 중복 방지
    if (anchor.querySelector(".twisty")) return;

    const depth = getDepthFromLi(liEl);
    if (depth > 2) return; // 1~2 depth만 적용

    const hasChildren = node.children && node.children.length > 0;

    const twisty = document.createElement("span");
    twisty.className = "twisty";
    if (!hasChildren) twisty.classList.add("is-leaf");
    if (node.state && node.state.opened) twisty.classList.add("is-open");

    // 기존 텍스트 유지
    const label = document.createElement("span");
    label.className = "label";

    const textWrap = document.createElement("span");
    textWrap.className = "text";
    textWrap.innerHTML = anchor.innerHTML;

    label.appendChild(textWrap);

    // anchor 재구성
    anchor.innerHTML = "";
    anchor.appendChild(twisty);
    anchor.appendChild(label);

    // 화살표 클릭 시 토글만
    twisty.addEventListener("click", (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (hasChildren) $tree.jstree(true).toggle_node(node);
    });
}

// -------------------------------
// Tree Ready
// -------------------------------
$tree.on("ready.jstree", function () {
    const inst = $tree.jstree(true);
    inst.close_all();

    inst.get_json("#", { flat: true }).forEach((n) => {
        decorateTwisty(inst.get_node(n.id));
    });
});

// -------------------------------
// Open / Close 이벤트
// -------------------------------
$tree.on("open_node.jstree", function (e, data) {
    const li = $tree.jstree(true).get_node(data.node, true);
    if (!li || !li.length) return;

    const twisty = li[0].querySelector("a .twisty");
    if (twisty) twisty.classList.add("is-open");

    data.node.children.forEach((id) => {
        decorateTwisty($tree.jstree(true).get_node(id));
    });
});

$tree.on("close_node.jstree", function (e, data) {
    const li = $tree.jstree(true).get_node(data.node, true);
    if (!li || !li.length) return;

    const twisty = li[0].querySelector("a .twisty");
    if (twisty) twisty.classList.remove("is-open");
});

// -------------------------------
// 클릭 제어
// -------------------------------
$tree.on("click", ".jstree-anchor", function (ev) {
    const inst = $tree.jstree(true);
    const node = inst.get_node(this);

    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
        ev.preventDefault();
        inst.toggle_node(node);
    } else {
        inst.deselect_all(true);
        inst.select_node(node, true);
    }
});
