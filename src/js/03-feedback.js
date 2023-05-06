import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const user = {};
const STORAGE_KEY = "feedback-form-state";

form.addEventListener("submit", handleSubmit);
form.addEventListener("input", throttle(onInput, 500));

AskToStorage();
function onInput(event) {
    user.email = form.elements.email.value;
    user.message = form.elements.message.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function handleSubmit(event) {
    event.preventDefault();
    onInput();
    if (user.message === "" || user.email === "") {
        alert("ВАЖЛИВО!!! Усі поля повинні бути заповнені.")
        AskToStorage();
    }
    else { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        console.log(user);
        localStorage.removeItem(STORAGE_KEY);
        event.currentTarget.reset();
    };
}
function AskToStorage() {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage !== null) { 
    const parsedSettings = JSON.parse(storage);
    form.elements.email.value = parsedSettings.email;
    form.elements.message.value = parsedSettings.message; }
  }
