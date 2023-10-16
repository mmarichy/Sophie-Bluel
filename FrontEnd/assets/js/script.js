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
let modal2 = null



function openModal(modal){
    event.preventDefault();
    modal = document.querySelector(event.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal2);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal2);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    console.log(modal)
}
function closeModal(modal){
    modal.setAttribute('aria-hidden', true);
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    const hideModal = function(){
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal);
        modal = null;
    }
    modal.addEventListener('animationend', hideModal)

}


const openModal1 = function (e) {
    e.preventDefault();
    openModal(modal1);
};
const closeModal1 = function (e) {
    if (modal1 === null) return;
    e.preventDefault();
    closeModal(modal1);
}

const openModal2 = function (e) {
    openModal(modal2)

    // modal1 = document.getElementById('modal1')
    // modal1.setAttribute('aria-hidden', true);
    // modal1.removeAttribute('aria-modal');
    // modal1.removeEventListener('click', closeModal1);
    // modal1.style.display = "none";
}
const closeModal2 = function(e) {
    if (modal2 === null) return;
    e.preventDefault();
    closeModal(modal2)
    console.log(modal2)
}




document.querySelector('.js-button-ajouter').addEventListener('click', openModal2);

const stopPropagation = function (e){
    e.stopPropagation();
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal1);
});

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
    closeModal1(e);
    }
})

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
    closeModal2(e);
    }
})

