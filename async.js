const root = document.getElementById("root");

const logoutBtn = document.createElement("button");
logoutBtn.classList.add("logout-btn");
logoutBtn.textContent = "Log Out";

const pageTitle = document.createElement("h1");
pageTitle.id = "title";
pageTitle.textContent = "Tennis Buddy";

const intro = document.createElement("h3");
intro.textContent = "Log in to find players in your area";
intro.id = "intro";

const loginContainer = document.createElement("div");
loginContainer.classList.add("login-container");

const loginImg = document.createElement("img");
loginImg.src = "user-login-img.png";
loginImg.alt = "Login Avatar";
loginImg.classList.add("login-img");

const userInput = document.createElement("input");
userInput.type = "text";
userInput.placeholder = "username";
userInput.id = "Username";

const userPassword = document.createElement("input");
userPassword.type = "password";
userPassword.placeholder = "password";
userPassword.id = "password";

const enterBtn = document.createElement('button');
enterBtn.type = "submit";
enterBtn.formMethod = "get";
enterBtn.textContent = "Enter";
enterBtn.id = "btnEnter";

loginContainer.appendChild(loginImg);
loginContainer.appendChild(userInput);
loginContainer.appendChild(userPassword);
loginContainer.appendChild(enterBtn);

root.appendChild(pageTitle);
root.appendChild(intro);
root.appendChild(loginContainer);

const welcomeMsg = document.createElement("h2");
const contactsContainer = document.createElement("div");
contactsContainer.classList.add("contacts-div");
const contactList = document.createElement("ul");
const welcomeData = document.createElement("h5");

contactsContainer.appendChild(contactList);

const errorMsg = document.createElement("p");
errorMsg.textContent = "Incorrect details, try again";
errorMsg.style.display = "none";
loginContainer.appendChild(errorMsg);

const getData = async function () {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].username, data[i].id);
    }
};

getData();


enterBtn.addEventListener("click", async function () {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        welcomeMsg.textContent = "";
        contactList.textContent = "";
        welcomeData.textContent = "";
        let match = false;

        for (let i = 0; i < data.length; i++) {
            if (userInput.value === data[i].username && userPassword.value === data[i].id.toString()) {
                const firstName = data[i].name.split(" ");
                welcomeMsg.textContent = `Welcome, ${firstName[0]}!`;
                welcomeData.textContent = "Here are the players in your area:";
                root.appendChild(welcomeMsg);
                root.appendChild(welcomeData);
                root.appendChild(logoutBtn);
                errorMsg.style.display = "none";
                intro.style.display = "none";
                loginContainer.style.display = "none";
                welcomeMsg.style.display = "block";
                welcomeData.style.display = "block";
                logoutBtn.style.display = "block";
                contactsContainer.style.display = "flex";
                match = true;

                data.forEach(function (person) {
                    contactList.innerHTML += `<li>${person.name} :- 
                    ${person.phone.slice(0, 9).replace("-", "7").replace("(", "3").replace(")", "2")
                    .replace("-", "9").replace(".", "5")}`;
                    root.appendChild(contactsContainer);
                });
            } else if (!match) {
                errorMsg.style.display = "grid";
            };
        }
        userInput.value = "";
        userPassword.value = "";

})


logoutBtn.addEventListener("click", function () {
    welcomeMsg.style.display = "none";
    welcomeData.style.display = "none";
    contactsContainer.style.display = "none";
    logoutBtn.style.display = "none";
    intro.style.display = "block";
    loginContainer.style.display = "flex";
});