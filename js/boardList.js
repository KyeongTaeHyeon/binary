// boardList.js

document.addEventListener("DOMContentLoaded", function () {
    const currentPageFileName = window.location.pathname.split("/").pop();

    // 전역 변수 선언
    let filterLinks;
    let postListContainer;
    let writingButton;
    let contentNavSection; // 페이징 및 글쓰기 버튼 컨테이너 (boardList.html에만 존재)

    // boardList2.html (상세/작성 페이지) 관련 요소들
    let detailViewTitleH1; // boardList2.html의 제목 (h1)
    let detailContentView; // 게시글 내용 (input/textarea 등)
    let detailButtons; // 목록, 수정, 삭제 버튼
    let detailCommentSection; // 댓글 입력 영역
    let detailCommentList; // 댓글 목록 영역

    // --- 페이지별 초기화 및 요소 참조 ---
    if (
        currentPageFileName === "boardList.html" ||
        currentPageFileName === ""
    ) {
        // boardList.html (모든 게시판 목록)
        filterLinks = document.querySelectorAll(".filter a");
        postListContainer = document.getElementById("postNumber");
        contentNavSection = document.getElementById("contentNav"); // boardList.html에만 존재
        writingButton = document.querySelector("#contentNav .writing"); // boardList.html의 글쓰기 버튼

        // '글쓰기' 버튼 클릭 시 boardList2.html (새 글 작성 모드)로 이동
        if (writingButton) {
            writingButton.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = "boardList2.html?mode=write";
            });
        }

        // 초기 로드 시 '전체' 게시글을 표시
        // (필터에 active 클래스가 있다면 해당 카테고리를 로드)
        const initialActiveLinkSpan = document.querySelector(
            ".filter a.active span"
        );
        if (initialActiveLinkSpan) {
            updatePostList(initialActiveLinkSpan.textContent.trim());
        } else {
            updatePostList("전체"); // 기본으로 '전체' 게시글 로드
        }
    } else if (currentPageFileName === "boardList2.html") {
        // boardList2.html (게시글 상세 보기 또는 작성 페이지)
        // 이 페이지에는 필터나 게시글 목록이 직접 표시되지 않습니다.
        detailViewTitleH1 = document.querySelector(
            "#boardcreat .creatPost .title h1"
        );
        detailContentView = document.querySelector(
            "#boardcreat .contentPost input"
        );
        detailButtons = document.querySelector("#boardcreat #bTn");
        detailCommentSection = document.querySelector("#boardcreat .comment");
        detailCommentList = document.querySelector("#boardcreat .commentList");

        // URL 파라미터를 확인하여 모드 결정
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get("mode");
        const postId = urlParams.get("post_id");

        if (mode === "write") {
            // 새 글 작성 모드
            if (detailViewTitleH1) detailViewTitleH1.textContent = "새 글 작성";
            if (detailContentView)
                detailContentView.placeholder =
                    "새 글 내용을 입력해주세요.....";
            // '수정' 및 '삭제' 버튼 숨기기 (또는 비활성화)
            if (detailButtons) {
                const editButton = detailButtons.querySelector(
                    "button:nth-child(2)"
                );
                const deleteButton = detailButtons.querySelector(
                    "button:nth-child(3)"
                );
                if (editButton) editButton.style.display = "none";
                if (deleteButton) deleteButton.style.display = "none";
            }
            if (detailCommentSection)
                detailCommentSection.style.display = "none"; // 새 글 작성 시 댓글 숨김
            if (detailCommentList) detailCommentList.style.display = "none";
        } else if (postId) {
            // 게시글 상세 보기 모드
            // TODO: postId를 사용하여 실제 게시글 내용을 서버에서 로드하여 표시
            if (detailViewTitleH1)
                detailViewTitleH1.textContent = `게시글 ID: ${postId}`; // 실제 제목으로 변경
            if (detailContentView)
                detailContentView.value = `이곳은 게시글 ID ${postId}의 상세 내용입니다.`; // 실제 내용으로 변경
            // 댓글 섹션 보이기 (기본값)
        } else {
            // 모드나 ID가 없으면 기본값 (에러 처리 또는 목록으로 리다이렉트)
            console.warn(
                "boardList2.html에 모드나 게시글 ID가 지정되지 않았습니다. 목록으로 돌아갑니다."
            );
            window.location.href = "boardList.html"; // 잘못된 접근 시 목록 페이지로 리다이렉트
        }

        // '목록' 버튼 클릭 시 boardList.html로 돌아가기
        const listButton = detailButtons
            ? detailButtons.querySelector("button:nth-child(1)")
            : null;
        if (listButton) {
            listButton.addEventListener("click", function () {
                window.location.href = "boardList.html";
            });
        }
    } else if (currentPageFileName === "boardList3.html") {
        // boardList3.html (식당 신청 페이지)
        filterLinks = document.querySelectorAll(".filter a");
        // '식당신청' 필터를 활성화
        if (filterLinks) {
            filterLinks.forEach((link) => {
                if (
                    link.querySelector("span").textContent.trim() === "식당신청"
                ) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }
    }

    // --- 공통 필터 링크 이벤트 리스너 (boardList.html과 boardList3.html에만 해당) ---
    if (
        filterLinks &&
        (currentPageFileName === "boardList.html" ||
            currentPageFileName === "" ||
            currentPageFileName === "boardList3.html")
    ) {
        filterLinks.forEach((link) => {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // 기본 링크 동작 방지

                const linkText = this.querySelector("span").textContent.trim();

                if (
                    currentPageFileName === "boardList.html" ||
                    currentPageFileName === ""
                ) {
                    // boardList.html에서 필터 클릭 시:
                    // '식당신청'만 boardList3.html로 이동, 나머지는 현재 페이지 내에서 목록만 업데이트
                    if (linkText === "식당신청") {
                        window.location.href = "boardList3.html";
                    } else {
                        // 다른 필터 (전체, 자유게시판, 식당인증)는 현재 페이지에서 목록만 변경
                        filterLinks.forEach((item) =>
                            item.classList.remove("active")
                        );
                        this.classList.add("active");
                        updatePostList(linkText); // 해당 카테고리의 게시글 목록만 업데이트
                    }
                } else if (currentPageFileName === "boardList3.html") {
                    // boardList3.html에서 필터 클릭 시:
                    // 항상 해당 페이지로 이동 (식당신청은 현재 페이지이므로 새로고침 효과)
                    if (
                        linkText === "전체" ||
                        linkText === "자유게시판" ||
                        linkText === "식당인증"
                    ) {
                        window.location.href = "boardList.html"; // boardList.html로 이동하여 해당 목록 표시
                    } else if (linkText === "식당신청") {
                        // 이미 식당신청 페이지이므로 새로고침
                        window.location.href = "boardList3.html";
                    }
                }
            });
        });
    }

    /**
     * 게시글 목록을 업데이트하는 함수 (boardList.html 전용)
     * @param {string} category - 표시할 게시글의 카테고리 (예: '전체', '자유게시판', '식당인증')
     */
    function updatePostList(category) {
        if (!postListContainer) {
            console.warn(
                "경고: 게시글을 표시할 #postNumber 요소를 찾을 수 없습니다 (boardList.html이 아닙니다)."
            );
            return;
        }

        postListContainer.innerHTML = ""; // 기존 게시글 모두 비우기

        let postsToShow = [];
        // 카테고리에 따른 샘플 게시글 데이터 정의
        if (category === "전체") {
            postsToShow = [
                {
                    tag: "자유게시판",
                    title: "전체 게시글 (자유 1)",
                    user: "사용자A",
                    time: "2025-07-10 10:00",
                    id: "all1",
                },
                {
                    tag: "식당인증",
                    title: "전체 게시글 (인증 1)",
                    user: "사용자B",
                    time: "2025-07-10 11:00",
                    id: "all2",
                },
                {
                    tag: "식당신청",
                    title: "전체 게시글 (신청 1)",
                    user: "사용자C",
                    time: "2025-07-10 12:00",
                    id: "all3",
                },
            ];
        } else if (category === "자유게시판") {
            postsToShow = [
                {
                    tag: "자유게시판",
                    title: "자유게시판 게시글 1",
                    user: "자유인A",
                    time: "2025-07-10 13:00",
                    id: "free1",
                },
                {
                    tag: "자유게시판",
                    title: "자유게시판 게시글 2",
                    user: "자유인B",
                    time: "2025-07-10 14:00",
                    id: "free2",
                },
            ];
        } else if (category === "식당인증") {
            postsToShow = [
                {
                    tag: "식당인증",
                    title: "맛있는 라면 맛집 인증글",
                    user: "인증맛집1",
                    time: "2025-07-10 16:00",
                    id: "cert1",
                },
                {
                    tag: "식당인증",
                    title: "줄 서서 먹는 라멘집 후기",
                    user: "인증맛집2",
                    time: "2025-07-10 17:00",
                    id: "cert2",
                },
                {
                    tag: "식당인증",
                    title: "숨겨진 보석같은 식당 발견",
                    user: "인증맛집3",
                    time: "2025-07-10 18:00",
                    id: "cert3",
                },
            ];
        }

        // 게시글 데이터를 기반으로 HTML 요소 생성 및 추가
        postsToShow.forEach((post) => {
            const article = document.createElement("article");
            article.classList.add("post");
            article.setAttribute("data-post-id", post.id); // 게시글 ID를 data 속성으로 추가
            article.innerHTML = `
                <div class="name">
                    <a href="#">
                        <span class="${
                            post.tag === "자유게시판" ? "tageone" : "tage"
                        }">${post.tag}</span>
                        ${post.title}
                    </a>
                </div>
                <div class="user">${post.user}</div>
                <div class="userTime">${post.time}</div>
            `;
            postListContainer.appendChild(article);

            // 게시글 클릭 시 boardList2.html (상세 보기 모드)로 이동
            article.addEventListener("click", function (event) {
                event.preventDefault(); // 기본 링크 동작 방지
                window.location.href = `boardList2.html?post_id=${post.id}`; // 게시글 ID를 파라미터로 전달
            });
        });
    }

    // boardList2.html 전용 함수들은 이 로직에서는 더 이상 필요 없습니다.
    // showListViewForBoard2, showDetailViewForBoard2 함수는 삭제됩니다.
});
