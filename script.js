const canvas = document.getElementById("canvas");
canvas.width = 1080;
canvas.height = 1920;

const context = canvas.getContext("2d");

const textbox = document.getElementById("textbox");
const submit = document.getElementById("submit");

const fonts = ["Arial", "Verdana", "Georgia", "Comic Sans MS", "Times New Roman", "Courier New", "Impact", "Lucida Console", "Tahoma", "Trebuchet MS"];

submit.addEventListener("click", () => {
    const text = textbox.value.trim();
    if (text === "") return;

    const font = fonts[Math.floor(Math.random() * fonts.length)];
    const rotation = Math.floor(Math.random() * 61) - 30;

    context.font = `30px ${font}`;
    const textWidth = context.measureText(text).width;

    const x = Math.floor(Math.random() * (canvas.width - textWidth));
    const y = Math.floor(Math.random() * canvas.height);

    context.save();
    context.translate(x + textWidth / 2, y);
    context.rotate((Math.PI / 180) * rotation);
    context.fillStyle = "#000";
    context.fillText(text, -textWidth / 2, 0);
    context.restore();

    saveToFile(text);

    textbox.value = "";
});

function saveToFile(text) {
    const file = new Blob([text + "\n"], {type: "text/plain"});
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = "saved-text.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
