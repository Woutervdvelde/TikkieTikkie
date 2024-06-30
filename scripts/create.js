const sections = Array.from(document.querySelectorAll(".section"));
let currentSection = -1;

const setButtonsEnabled = (buttons, value) => {
    buttons.forEach(button => button.disabled = !value);
}

const nextSection = () => {
    if (currentSection < sections.length - 1) {
        let current = sections[currentSection];
        if (current) current.classList.remove("active");
        currentSection++;
        sections[currentSection].classList.add("active");
        initInputCounter();
        initAmountListener();
        selectInput();
    }
}

const selectInput = () => {
    // Wait for CSS animation to finish
    setTimeout(() => {
        const input = sections[currentSection].querySelector("input");
        if (input) input.focus();
        else {
            const textarea = sections[currentSection].querySelector("textarea");
            if (textarea) textarea.focus();
        }
    }, 300);
}

// Used to handle input from textarea
const initInputCounter = () => {
    const counter = sections[currentSection].querySelector(".max");
    const input = sections[currentSection].querySelector("textarea");
    const buttons = sections[currentSection].querySelectorAll("button");
    if (!counter || !input) return;

    const max = input.getAttribute("maxlength");
    counter.textContent = max;

    input.addEventListener("input", () => {
        counter.textContent = max - input.value.length;
        setButtonsEnabled(buttons, input.value.length > 0);
    });
}

// Used to handle input from decimal input
const initAmountListener = () => {
    const section = sections[currentSection];
    const input = section.querySelector("input");
    const custom = section.querySelector("input[type=checkbox]");
    const nextButton = section.querySelector(".next");
    if (!input || input.inputMode != "decimal") return;

    input.addEventListener("input", () => {
        // Replace all non-numeric characters with empty string and replace all dots with commas
        input.value = input.value.replace(/[^0-9,.]/g, "").replace(/\./g, ",");
        // If the first character is a comma, add a 0 before it
        if (input.value[0] == ",") input.value = `0${input.value}`
        // If there are more than one comma remove all but the first one and round on two decimals
        const parts = input.value.split(",");
        if (parts.length > 1) {
            input.value = `${parts[0]},${parts[1].slice(0, 2)}`
        } else {
            input.value = parts[0];
        }

        nextButton.disabled = !input.value > 0;
    });

    custom.addEventListener("change", () => {
        if (custom.checked) {
            input.setAttribute("readonly", true);
            input.value = "Open amount";
            nextButton.disabled = false;
            section.querySelector(".amount-input h2").style.display = "none";
        } else {
            input.removeAttribute("readonly");
            input.setAttribute("inputmode", "decimal");
            input.value = "";
            input.focus();
            nextButton.disabled = true;
            section.querySelector(".amount-input h2").style.display = "unset";
        }
    });
}

const generateTikkieTikkie = (type = TikkieTikkieType.COPY) => {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const amountValue = amount == "Open amount" ? null : parseFloat(amount.replace(",", "."));

    const tikkietikkie = new TikkieTikkie(name, description, amountValue);
    switch (type) {
        case TikkieTikkieType.COPY:
            coppyTikkieTikkie(tikkietikkie);
            break;
        case TikkieTikkieType.SHARE:
            if (navigator.canShare()) navigator.share(tikkietikkie.getShareMessage());
            else coppyTikkieTikkie(tikkietikkie);
            break;
        case TikkieTikkieType.QR:
            showQrModal(tikkietikkie.generateUrl());
            break;
    }
}

const coppyTikkieTikkie = (tikkietikkie) => {
    if (!tikkietikkie) return;

    navigator.clipboard.writeText(tikkietikkie.getShareMessage());
    showToast("Link has been coppied!");
};

const showQrModal = (link) => {
    const modal = document.querySelector(".qrcode-modal");
    var qrcode = new QRCode("qrcode", {
        text: link,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    modal.classList.add("active");
}

const hideQrModal = () => {
    const modal = document.querySelector(".qrcode-modal");
    modal.classList.remove("active");

    // Wait for CSS animation to finish
    setTimeout(() => {
        modal.querySelector("#qrcode").innerHTML = "";
    }, 300);
}

const showToast = (message) => {
    const toast = document.querySelector(".toast");
    toast.innerHTML = message;
    toast.classList.add("active");

    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);
}

nextSection();