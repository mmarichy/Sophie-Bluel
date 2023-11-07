/***** Message d'erreur *****/
const alreadyLoggedError = document.querySelector('.alredyLogged__error');
const loginEmailError = document.querySelector('.loginEmail__error');
const loginMdpError = document.querySelector('.loginMdp__error');

/***** Récuperation entrée utilisateur *****/
const email = document.getElementById('email');
const password = document.getElementById('password');
const submit=document.getElementById('submit');

alredyLogged();

// Si l'utilisateur est déjà connecté, on supprime le token
function alredyLogged() {
    if (localStorage.getItem("token")) {
        window.location.href = "index.html";
    }
}

// Au clic, on envoie les valeurs de connextion
submit.addEventListener("click", () => {
    event.preventDefault();
    let user = {
        email: email.value,
        password: password.value
    };
    login(user);
})

// Fonction de connexion
function login(id) {
    console.log(id);
    loginEmailError.innerHTML = "";
    loginMdpError.innerHTML = "";
    // véeification de l'email
    if (!id.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer une addresse mail valide";
        loginEmailError.appendChild(p);
        return;
    }
    // vérifcation du mot de passe
    if (id.password.length < 5 && !id.password.match(/^[a-zA-Z0-9]+$/g)) {
        const p = document.createElement("p");
        p.innerHTML = "Veuillez entrer un mot de passe valide";
        loginMdpError.appendChild(p);
        return;
    }

    else {
        // verification de l'email et du mot de passe
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(id)
        })
            .then((response) => {
                if (response.status === 401 || response.status === 404) {
                    const p = document.createElement("p");
                    p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";
                    loginMdpError.appendChild(p);
                    
                    // Si couple email/mdp correct
                } else if (response.status === 200) {
                    response.json()
                        .then((result) => {
                            console.log(result)
                            localStorage.setItem("token", result.token);
                            window.location.href = "index.html";
                        })
                }
            })

            // prevenir l'utilisateur en cas d'erreur

            .catch(error =>
                console.log(error));
                const p = document.createElement("p");
                p.innerHTML = "Une erreur est survenue! <br>Merci de réesayer ultérieurement.";
                loginMdpError.appendChild(p);
    }
    }