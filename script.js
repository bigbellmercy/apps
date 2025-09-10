// 버튼 요소 가져오기
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

// 오디오 파일 경로 정의
const soundPaths = {
    sound1: 'sound1.mp3', // 이 파일은 index.html과 같은 폴더에 있어야 합니다.
    sound2: 'sound2.mp3',
    sound3: 'sound3.mp3'
};

// 각 사운드를 위한 Audio 객체 생성 (미리 로드하여 재생 지연을 줄임)
// Audio 객체는 한 번 생성되면 재사용할 수 있습니다.
const audioElements = {
    sound1: new Audio(soundPaths.sound1),
    sound2: new Audio(soundPaths.sound2),
    sound3: new Audio(soundPaths.sound3)
};

// 사운드 재생 함수
function playSound(soundId) {
    const audio = audioElements[soundId];
    if (audio) {
        // 현재 재생 중인 경우 정지하고 처음부터 다시 재생
        audio.pause();
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.error(`Error playing sound ${soundId}:`, error);
            // 아이폰에서 자동 재생 정책으로 인해 초기 재생이 안 될 수 있습니다.
            // 사용자 상호작용(클릭) 후에만 Audio.play()가 허용될 수 있습니다.
            alert(`사운드 ${soundId} 재생에 실패했습니다. 브라우저 정책을 확인해주세요.`);
        });
    } else {
        console.error(`Sound file for ${soundId} not found or not loaded.`);
        alert(`사운드 ${soundId} 파일을 로드할 수 없습니다.`);
    }
}

// 각 버튼에 클릭 이벤트 리스너 추가
button1.addEventListener('click', () => playSound('sound1'));
button2.addEventListener('click', () => playSound('sound2'));
button3.addEventListener('click', () => playSound('sound3'));

// 추가: 오디오 로드 실패 시 콘솔에 경고 표시
for (const key in audioElements) {
    audioElements[key].addEventListener('error', (e) => {
        console.error(`Failed to load audio for ${key}:`, e);
        alert(`오디오 파일 ${soundPaths[key]}을(를) 로드하는 데 실패했습니다.`);
    });
}