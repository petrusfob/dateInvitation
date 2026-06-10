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
    showScreen("surprise");
}

function continueStory() {
    showScreen("schedule");
}

function moveButton() {

    const area = document.getElementById("buttonArea");

    const areaWidth = area.clientWidth;
    const areaHeight = area.clientHeight;

    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const randomX =
        Math.random() * (areaWidth - buttonWidth);

    const randomY =
        Math.random() * (areaHeight - buttonHeight);

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    const randomText =
        texts[Math.floor(Math.random() * texts.length)];

    noBtn.textContent = randomText;

    yesScale += 0.08;

    yesBtn.style.transform =
        `scale(${yesScale})`;
}

document.addEventListener("mousemove", (e) => {

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
        e.clientX - centerX,
        e.clientY - centerY
    );

    if (distance < 100) {
        moveButton();
    }
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