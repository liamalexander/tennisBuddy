const root = document.getElementById("root");

const init = function () {
    const pageTitle = document.createElement("h1");
    pageTitle.id = "title";
    pageTitle.textContent = "Tennis Buddy";

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

    const intro = document.createElement("h3");
    intro.textContent = "Log in to find players in your area";
    intro.id = "intro";

    root.appendChild(pageTitle);
    root.appendChild(userInput);
    root.appendChild(userPassword);
    root.appendChild(enterBtn);
    root.appendChild(intro);

    const welcomeMsg = document.createElement("h2");
    const contactList = document.createElement("ul");
    const welcomeData = document.createElement("h5");

    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Incorrect details, try again";
    errorMsg.style.display = "none";
    root.appendChild(errorMsg);

    enterBtn.addEventListener("click", async function () {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            console.log(data);
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
                    errorMsg.style.display = "none";
                    intro.style.display = "none";
                    match = true;

                    data.forEach(function (person) {
                        contactList.innerHTML += `<li>${person.name} :- ${person.phone}`;
                        root.appendChild(contactList);
                    });
                } else if (!match) {
                    errorMsg.style.display = "grid";
                };
            }
            userInput.value = "";
            userPassword.value = "";
    })
}

init();

//to see if git is working