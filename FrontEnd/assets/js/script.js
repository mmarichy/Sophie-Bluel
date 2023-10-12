// mettre dans une fonction
fetch('http://localhost:5678/api/works').then((res) => {
    res.json().then((data) => {

        const gallery = document.querySelector('.gallery')
        // console.log(data)
        
        data.forEach((work) => {

                const figure = document?.createElement('figure');
                figure.dataset.id = work.id;
                figure.dataset.cat = work.categoryId;
                figure.classList.add('work');
                const imgWork = document?.createElement('img');
                imgWork.src=work.imageUrl;

                const titleLeg = document.createElement('figcaption');
                titleLeg.textContent = work.title;

                

                figure.appendChild(imgWork);
                gallery.appendChild(figure);
                figure.appendChild(titleLeg);
                // console.log(work);
        });
    })
})

fetch ('http://localhost:5678/api/categories').then((res) =>{
    res.json().then((data) => {

        const filtre = document.querySelector('.filters');
        // console.log(data)
        data.forEach((categorie) => {
            let catFiltre = document.createElement('button');
            catFiltre.dataset.id = categorie.id;
            catFiltre.classList.add('filter__btn');
            catFiltre.addEventListener("click", function(){
                document.querySelectorAll(".filter__btn").forEach(btn => {
                    btn.classList.remove("filter__btn--active");})
                catFiltre.classList.add('filter__btn--active');
                const works = document.querySelectorAll('.work');
                works.forEach(work => {
                    work.style.display = 'block';
                    if (work.dataset.cat != categorie.id){
                        work.style.display = 'none';
                    }
                })
                
            })

            let tButton = document.createTextNode(categorie.name);

            catFiltre.appendChild(tButton);
            filtre.appendChild(catFiltre);
            // console.log(categorie);
        });
    })
})

let allWork = document.querySelector('.allWork');
allWork.addEventListener('click', function(){
    document.querySelectorAll(".filter__btn").forEach(btn => {
        btn.classList.remove("filter__btn--active");})
    allWork.classList.add('filter__btn--active');
    const works = document.querySelectorAll('.work');
    works.forEach(work =>{
        work.style.display ='block';
    })
})

const token = localStorage.getItem('token');
const LogOut = document.querySelector('.log-out')
const portfolioEdition = document.querySelector('.portfolio__edition')

adminH()
function adminH (){
    const admin = document.querySelector(".admin__mod");
    const filtersNone = document.querySelector('.filters');
        if (token === null){
            return;
        }
        else {
            admin.removeAttribute('aria-hidden');
            admin.removeAttribute('style');
            LogOut.innerHTML = "deconnexion";

            filtersNone.style.display = "none";
            portfolioEdition.style.display = "flex"
        }
    }
// Ajout d'un EventListener pour se déconnecter et rester sur la page //
LogOut.addEventListener('click', function() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
    else {
        window.location.href = "login.html"
    }
})


// modale //
let modal1 = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let prevFocusedElement = null

const openModal1 = function (e) {
    e.preventDefault();
    modal1 = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal1.querySelectorAll(focusableSelector));
    prevFocusedElement = document.querySelector(':focus');
    modal1.style.display = null;
    focusables[0].focus();
    modal1.removeAttribute('aria-hidden');
    modal1.setAttribute('aria-modal', 'true');
    modal1.addEventListener('click', closeModal1);
    modal1.querySelector('.js-modal-close').addEventListener('click', closeModal1);
    modal1.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const closeModal1 = function (e) {
    if (modal1 === null) return;
    if (prevFocusedElement !== null) prevFocusedElement.focus();
    e.preventDefault()
    modal1.setAttribute('aria-hidden', true);
    modal1.removeAttribute('aria-modal');
    modal1.removeEventListener('click', closeModal1);
    modal1.querySelector('.js-modal-close').removeEventListener('click', closeModal1);
    modal1.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    const hideModal = function(){
        modal1.style.display = "none";
        modal1.removeEventListener('animationend', hideModal)
        modal1 = null;
    }
    modal1.addEventListener('animationend', hideModal)
}

const stopPropagation = function (e){
    e.stopPropagation();
}

const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal1.querySelector(':focus'))
    if (e.shiftKey === true){
        index--;
    } else {
    index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }    
    if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal1);
});

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
    closeModal1(e);
    }
    if (e.key === "Tab" && modal1 !== null) {
        focusInModal(e);
    }
})