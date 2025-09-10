const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const recordTarget = document.getElementById('recordTarget');
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const playback = document.getElementById('playback');

let audioContext;
let mediaRecorder;
let recordedChunks = [];
let soundFiles = {
    sound1: null,
    sound2: null,
    sound3: null
};

// 미리 녹음된 음성 (예시 - 실제 앱에서는 사용자가 녹음하거나 초기 음성을 제공할 수 있습니다)
// 실제로는 오디오 파일을 서버에 저장하거나 IndexedDB 같은 클라이언트 측 저장소를 사용해야 합니다.
// 여기서는 간단한 예시를 위해 null로 초기화합니다.
// soundFiles.sound1 = new Audio('path/to/your/default/sound1.mp3');
// soundFiles.sound2 = new Audio('path/to/your/default/sound2.mp3');
// soundFiles.sound3 = new Audio('path/to/your/default/sound3.mp3');


// 사운드 재생 함수
function playSound(soundId) {
    if (soundFiles[soundId]) {
        if (soundFiles[soundId].src) { // Audio 객체 또는 Blob URL이 있는 경우
            const audio = new Audio(soundFiles[soundId].src);
            audio.play();
        } else if (soundFiles[soundId] instanceof Audio) { // 미리 생성된 Audio 객체인 경우
            soundFiles[soundId].currentTime = 0; // 처음부터 재생
            soundFiles[soundId].play();
        }
    } else {
        alert('이 버튼에 녹음된 사운드가 없습니다!');
    }
}

button1.addEventListener('click', () => playSound('sound1'));
button2.addEventListener('click', () => playSound('sound2'));
button3.addEventListener('click', () => playSound('sound3'));

// 녹음 시작
recordButton.addEventListener('click', async () => {
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        recordedChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(blob);
            const targetSound = recordTarget.value;

            // 해당 버튼에 녹음된 사운드 할당
            soundFiles[targetSound] = new Audio(audioUrl);
            alert(`${targetSound}에 사운드가 성공적으로 녹음되었습니다!`);

            // 스트림 정지
            stream.getTracks().forEach(track => track.stop());

            // 녹음 후 재생할 수 있도록 설정 (선택 사항)
            playback.src = audioUrl;
            playback.style.display = 'block';

            recordButton.disabled = false;
            stopButton.disabled = true;
        };

        mediaRecorder.start();
        recordButton.disabled = true;
        stopButton.disabled = false;
        alert('녹음 시작! 음성을 말하세요...');

    } catch (err) {
        console.error('녹음 접근 중 오류 발생:', err);
        alert('마이크 접근을 허용해야 녹음할 수 있습니다.');
    }
});

// 녹음 중지
stopButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
});

// 아이폰에서 웹 앱처럼 보이게 하기 위한 메타 태그 (선택 사항)
// <meta name="apple-mobile-web-app-capable" content="yes">
// <meta name="apple-mobile-web-app-status-bar-style" content="black">
// <link rel="apple-touch-icon" href="icon.png"> (아이콘 파일 추가)