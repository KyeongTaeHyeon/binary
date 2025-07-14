let contentsList = [];

// --- JSON 데이터 로드 함수 ---
async function loadBoardData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('게시글 데이터를 로드하는 데 실패했습니다:', error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}
