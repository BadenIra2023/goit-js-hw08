import throttle from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const user = {};
const STORAGE_KEY = "feedback-form-state";

form.addEventListener("submit", throttle(handleSubmit, 500));

AskToStorage();

function handleSubmit(event) {
    event.preventDefault();
    user.email = form.elements.email.value;
    user.message = form.elements.message.value;
    
    if (user.message === "" || user.email === "") {
        alert("ВАЖЛИВО!!! Усі поля повинні бути заповнені.")
    }
    else { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        console.log(user);
    };
    event.currentTarget.reset();
}
function AskToStorage() {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage !== null) { 
    const parsedSettings = JSON.parse(storage);
    form.elements.email.value = parsedSettings.email;
    form.elements.message.value = parsedSettings.message; }
  }

