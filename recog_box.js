$(function () {
    const rows = [
        {
            id: 1,
            title: "1. 개인(신용 정보)의 수집 이용에 관한…",
            statusText: "",
            statusType: "normal",
            _open: true,
            children: [
                { id: "1-1", label: "미동의", agreed: false },
                { id: "1-2", label: "동의", agreed: true },
            ],
        },
        {
            id: 2,
            title: "2. 개인(신용)정보의 제공에 관한 사항",
            statusText: "",
            statusType: "normal",
            _open: false,
            children: [
                { id: "2-1", label: "미동의", agreed: false },
                { id: "2-2", label: "동의", agreed: false },
            ],
        },
        {
            id: 3,
            title: "3. 계약자 - 성명/서명",
            statusText: "누락",
            statusType: "missing",
            _open: true,
            children: [
                { id: "3-1", label: "계약자 성명", agreed: false },
                { id: "3-2", label: "계약자 서명", agreed: false },
            ],
        },
    ];

    function nextFrame(fn) {
        requestAnimationFrame(() => requestAnimationFrame(fn));
    }

    function isAllChecked(parentData) {
        return parentData.children.every((x) => x.agreed);
    }

    function ensureHolder(row) {
        const $el = $(row.getElement());
        let $holder = $el.find("> .detail-holder");
        if ($holder.length === 0) {
            $holder = $('<div class="detail-holder"></div>');
            $el.append($holder);
        }
        row._detailHolder = $holder[0];
        return $holder;
    }
    function renderChild(holderEl, parentRow) {
        const parentData = parentRow.getData();
        const $holder = $(holderEl);
        $holder.empty();

        const allChecked = isAllChecked(parentData);
        const $wrap = $('<div class="child-table"></div>');
        const $grid = $('<div class="child-grid"></div>');

        // 공통 row 생성 함수
        function makeRow(label, checked, role, id) {
            const $label = $('<div class="child-cell"></div>').append($('<div class="cell-pad"></div>').text(label));

            const $check = $('<div class="child-cell center"></div>').append(
                $('<input type="checkbox">')
                    .attr("data-role", role)
                    .attr("data-id", id || "")
                    .prop("checked", checked),
            );

            // 첫 컬럼(구분용 빈칸)
            const $blank = $('<div class="child-cell"></div>');
            return [$blank, $label, $check];
        }

        // ALL
        $grid.append(...makeRow("ALL", allChecked, "all"));

        // children
        parentData.children.forEach((c) => {
            $grid.append(...makeRow(c.label, c.agreed, "item", c.id));
        });

        $wrap.append($grid);
        $holder.append($wrap);

        // 이벤트
        $holder
            .off("change.child")
            .on("change.child", 'input[data-role="all"]', function () {
                parentData.children.forEach((x) => (x.agreed = this.checked));
                renderChild(holderEl, parentRow);
            })
            .on("change.child", 'input[data-role="item"]', function () {
                const id = $(this).data("id");
                const item = parentData.children.find((x) => x.id === id);
                if (item) item.agreed = this.checked;
                renderChild(holderEl, parentRow);
            });
    }

    const grid = new Tabulator("#recogGrid", {
        data: rows,
        layout: "fitColumns",
        height: 420,
        selectable: false,
        columnDefaults: { resizable: false, headerSort: false },
        columns: [
            {
                title: "필드명",
                field: "title",
                formatter: (cell) => {
                    const d = cell.getRow().getData();
                    return `
                <div class="parent-title ${d._open ? "is-open" : ""}">
                  <span class="chev" aria-hidden="true"></span>
                  <span class="ellipsis">${d.title}</span>
                </div>
              `;
                },

                // ✅ 여기서 진짜 토글(열기/닫기)
                cellClick: (e, cell) => {
                    const row = cell.getRow();
                    const d = row.getData();
                    const nextOpen = !d._open;

                    row.update({ _open: nextOpen });

                    nextFrame(() => {
                        const $holder = ensureHolder(row);

                        $holder.css("display", nextOpen ? "block" : "none");
                        if (nextOpen) {
                            renderChild($holder[0], row);
                        }

                        row.normalizeHeight();
                        row.reformat();
                    });
                },
            },
            {
                title: "검증결과",
                field: "statusText",
                width: 110,
                hozAlign: "center",
                formatter: (cell) => {
                    const d = cell.getRow().getData();
                    return d.statusType === "missing" ? `<span class="missing-text">${d.statusText}</span>` : "";
                },
            },
        ],

        rowFormatter: (row) => {
            const d = row.getData();
            const $el = $(row.getElement());

            $el.addClass("row-parent");
            if (d.statusType === "missing") $el.addClass("missing");

            const $holder = ensureHolder(row);

            $holder.css("display", d._open ? "block" : "none");
            if (d._open) {
                renderChild($holder[0], row);
            }
        },

        tableBuilt: function () {
            const table = this;
            nextFrame(() => {
                table.getRows().forEach((row) => {
                    row.normalizeHeight();
                    row.reformat();
                });
            });
        },
    });
});
