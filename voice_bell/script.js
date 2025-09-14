// 버튼 요소 가져오기
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
// YouTube 재생 버튼 추가
const youtubePlayButton = document.getElementById('youtubePlayButton');

// 오디오 파일 경로 정의
const soundPaths = {
    sound1: 'sound1.mp3', // 이 파일은 index.html과 같은 폴더에 있어야 합니다.
    sound2: 'sound2.mp3',
    sound3: 'sound3.mp3'
};

// 각 사운드를 위한 Audio 객체 생성 (미리 로드하여 재생 지연을 줄임)
const audioElements = {
    sound1: new Audio(soundPaths.sound1),
    sound2: new Audio(soundPaths.sound2),
    sound3: new Audio(soundPaths.sound3)
};

// YouTube iframe 요소 가져오기
const youtubeIframe = document.getElementById('youtubeIframe');
const youtubeVideoContainer = document.getElementById('youtubeVideoContainer'); // 컨테이너도 가져옵니다.

let isYoutubePlayerVisible = false; // YouTube 플레이어 표시 여부 추적 변수

// YouTube 영상의 기본 URL (자동 재생 옵션 제외)
const youtubeVideoBaseURL = "https://www.youtube.com/embed/JsPF4ICMfWY?si=s-IH2oS9Wey6RniG";

// 사운드 재생 함수 (다른 사운드 재생 시 YouTube 숨김 로직 추가)
function playSound(soundId) {
    // YouTube 영상이 표시 중이면 숨김
    if (isYoutubePlayerVisible) {
        hideYoutubeVideo(); // YouTube 플레이어 숨김
    }

    const audio = audioElements[soundId];
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error(`Error playing sound ${soundId}:`, error);
            alert(`사운드 ${soundId} 재생에 실패했습니다.`);
        });
    } else {
        console.error(`Sound file for ${soundId} not found or not loaded.`);
        alert(`사운드 ${soundId} 파일을 로드할 수 없습니다.`);
    }
}

// YouTube 영상 표시/숨김 함수
function toggleYoutubeVideoVisibility() {
    if (!isYoutubePlayerVisible) {
        // YouTube 영상 표시
        youtubeIframe.src = youtubeVideoBaseURL; // 자동 재생 없이 로드
        youtubeVideoContainer.style.display = 'block'; // 컨테이너를 보이게 합니다.
        youtubePlayButton.textContent = 'YouTube 닫기';
        isYoutubePlayerVisible = true;
        console.log('YouTube 영상 표시');
    } else {
        // YouTube 영상 숨김
        hideYoutubeVideo();
    }
}

// YouTube 영상 숨김 로직 (재사용을 위해 분리)
function hideYoutubeVideo() {
    youtubeIframe.src = ""; // src를 비워서 iframe 내용 언로드 및 재생 중지
    youtubeVideoContainer.style.display = 'none'; // 컨테이너를 숨깁니다.
    youtubePlayButton.textContent = 'YouTube 켜기';
    isYoutubePlayerVisible = false;
    console.log('YouTube 영상 숨김');
}


// 각 버튼에 클릭 이벤트 리스너 추가
button1.addEventListener('click', () => playSound('sound1'));
button2.addEventListener('click', () => playSound('sound2'));
button3.addEventListener('click', () => playSound('sound3'));
youtubePlayButton.addEventListener('click', toggleYoutubeVideoVisibility); // YouTube 버튼 이벤트 리스너 추가

// 추가: 오디오 로드 실패 시 콘솔에 경고 표시
for (const key in audioElements) {
    audioElements[key].addEventListener('error', (e) => {
        console.error(`Failed to load audio for ${key}:`, e);
        alert(`오디오 파일 ${soundPaths[key]}을(를) 로드하는 데 실패했습니다.`);
    });
}