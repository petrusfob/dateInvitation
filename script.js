const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const texts = [
    "Tem certeza?",
    "Muita certeza?",
    "Pensa melhor...",
    "Olha o SIM 👉",
    "🥺",
    "Não faz isso comigo",
    "Resposta incorreta",
    "Ainda dá tempo...",
    "Por favor 😭",
    "Clique no SIM ❤️"
];

let yesScale = 1;

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function startQuestion() {
    showScreen("question");
}

function accepted() {

    for(let i = 0; i < 20; i++) {

        setTimeout(() => {
            createHeart();
        }, i * 100);
    }

    showScreen("surprise");
}

function continueStory() {
    showScreen("schedule");
}

function createHeart() {
    const heart = document.createElement("div");

    heart.innerHTML = "❤️";
    heart.classList.add("heart");

    heart.style.left =
        Math.random() * window.innerWidth + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 100);
}

function moveButton() {

    const area = document.getElementById("buttonArea");

    const areaWidth = area.clientWidth;
    const areaHeight = area.clientHeight;

    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const currentX = noBtn.offsetLeft;
    const currentY = noBtn.offsetTop;

    let newX;
    let newY;

    do {

        newX =
            Math.random() * (areaWidth - buttonWidth);

        newY =
            Math.random() * (areaHeight - buttonHeight);

    } while (

        Math.hypot(
            newX - currentX,
            newY - currentY
        ) < 250

    );

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;

    const randomText =
        texts[Math.floor(Math.random() * texts.length)];

    noBtn.textContent = randomText;

    yesScale += 0.05;

    yesBtn.style.transform =
        `scale(${yesScale})`;
}

noBtn.addEventListener("mouseenter", () => {

    moveButton();

});

function sendConfirmation() {

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const obs = document.getElementById("obs").value;

    if (!date || !time) {

        alert("Por favor, escolha uma data e um horário ❤️");
        return;
    }

    const formattedDate =
        date.split("-").reverse().join("/");

    const heart = String.fromCodePoint(0x2764, 0xFE0F);
    const smile = String.fromCodePoint(0x1F60A);
    const rose = String.fromCodePoint(0x1F339);
    const letter = String.fromCodePoint(0x1F48C);

    const message = `Oi, Pedro ${heart}

Tenho uma notícia para você...

Eu aceitei sair com você ${smile}

${rose} Data: ${formattedDate}
${rose} Horário: ${time}

${letter} Observação:
${obs || "Nenhuma"}

Estou ansiosa para o nosso encontro ${heart}`;

    const url = new URL(
        "https://api.whatsapp.com/send"
    );

    url.searchParams.set(
        "phone",
        "5575981773634"
    );

    url.searchParams.set(
        "text",
        message
    );

    window.location.href = url.toString();
}
