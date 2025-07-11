function handleCredentialResponse(response) {
    // response.credential에 구글 JWT 토큰이 담김
    alert('Google ID Token: ' + response.credential);
    console.log('Google ID Token:', response.credential);
    // 실제 서비스에서는 이 토큰을 서버로 보내 인증 처리
}
