// mettre dans une fonction
function updateWork() {
    fetch('http://localhost:5678/api/works').then((res) => {
        res.json().then((data) => {

            const gallery = document.querySelector('.gallery')            
            data.forEach((work) => {
                    const figure = document?.createElement('figure');
                    figure.dataset.id = work.id;
                    figure.dataset.cat = work.categoryId;
                    figure.classList.add('work');
                    const imgWork = document?.createElement('img');
                    imgWork.src = work.imageUrl;

                    const titleLeg = document.createElement('figcaption');
                    titleLeg.textContent = work.title;

                    figure.appendChild(imgWork);
                    figure.appendChild(titleLeg);
                    gallery.appendChild(figure);

            });
        })
    })
}
function updateCategories() {
    fetch ('http://localhost:5678/api/categories').then((res) =>{
        res.json().then((data) => {

            const filtre = document.querySelector('.filters');

            data.forEach((categorie) => {
                let catFiltre = document.createElement('button');
                catFiltre.dataset.id = categorie.id;
                catFiltre.classList.add('filter__btn');
                catFiltre.addEventListener("click", function(){

                    document.querySelectorAll(".filter__btn").forEach(btn => {
                        btn.classList.remove("filter__btn--active");
                    })
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
            });
        })
    })
}
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
let modal1 = null;
let modal2 = null;

function openModal(modal){
    event.preventDefault();
    modal = document.querySelector(event.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');

    modal.querySelector('.js-modal-close').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
    modal.addEventListener('click', () => closeModal(modal));

    if (modal.id === "modal2"){
        modal1 = document.getElementById('modal1')
        modal1.setAttribute('aria-hidden', true);
        modal1.removeAttribute('aria-modal');
        modal1.removeEventListener('click', () => closeModal(modal1));
        modal1.style.display = "none";
    }
}

function closeModal(modal){

    modal.setAttribute('aria-hidden', true);
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', () => closeModal(modal));
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);

    const hideModal = function(){
        if (modal.id === "modal2"){
            let modal2ToUnDisplay = document.querySelector('#modal1')
            modal2ToUnDisplay.style.display = "none";
            modal2ToUnDisplay.removeEventListener('animationend', hideModal);
        }
        modal.style.display = "none";
        modal.removeEventListener('animationend', hideModal);
        modal = null;
    }
    modal.addEventListener('animationend', hideModal)
}

document.querySelector('.js-modal').addEventListener('click', () => openModal(modal1))
document.querySelector('.js-button-ajouter').addEventListener('click', () => openModal(modal2));


const stopPropagation = function (e){
    e.stopPropagation();
}

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
        modal1 = document.getElementById('modal1')
        modal1.style.display = "none"
        modal2 = document.getElementById('modal2')
        modal2.style.display = "none"
    }
})

let back = document.querySelector('.js-modal-back').addEventListener('click', function (){
    modal2 = document.getElementById('modal2')
    modal1.removeAttribute('aria-hidden')
    modal1.style.display = "flex"
    modal2.style.display = "none"
})


// Categories ajout work

let categorieModal = document.querySelector('.js-categoryid')
fetch ('http://localhost:5678/api/categories').then((res) =>{
        res.json().then((data) => {
            const categorieModal = document.getElementById('categorie')
            // console.log(data)

            data.forEach((cat) => {
                let catModal = document.createElement('option');
                catModal.dataset.id = cat.id;
                let catName = document.createTextNode(cat.name);

                catModal.appendChild(catName)
                categorieModal.appendChild(catModal)
            })
        })
})

// ajouter projet

const btnAddProjet = document.querySelector(".js-button-valider");
btnAddProjet.addEventListener("click", addProjet);

async function addProjet(event) {
    event.preventDefault();

    const title = document.querySelector('.js-titre').value;
    const categorieID = document.querySelector('.js-categorieid').value;
    const image = document.querySelector('.js-image').value;
    console.log(title)
    console.log(categorieID)
    console.log(image)

    if (title === "" || categorieID === "" || image === undefined) {
        alert("Merci de remplir tous les champs");
        return;
    } else if (categorieID !== "Objets" && categorieID !== "Appartements" && categorieID !== "Hotels & restaurants") {
        alert("Merci de choisir une catégorie valide");
        return;
    } else {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("categorie", categorieID);
            formData.append("image", image);

            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ${token}',
                },
                body: formData,
            })


            if (response.status === 201) {
                alert('Projet ajouter');
                closeModal();
                updateWork()
            }else if (response.status === 400) {
                alert("Merci de remplir tous les champs");
            } else if (response.status === 500) {
                alert("Erreur serveur");
            } else if (response.status === 401) {
                alert("Vous n'êtes pas autorisé à ajouter un projet");
                // window.location.href = "index.html";
        }}    
        
        catch (error) {
            console.log(error);
        }
    }
}

function previewImage() {
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    const imagePreviewContainer = document.getElementById('previewImageContainer');
    
    if(file.type.match('image.*')){
      const reader = new FileReader();
      
      reader.addEventListener('load', function (event) {
        const imageUrl = event.target.result;
        const image = new Image();
        
        image.addEventListener('load', function() {
            const labelPreview = document.querySelector('.js-label-input');
            labelPreview.style.display = "none";
            const iPreview = document.querySelector('.js-i-input');
            iPreview.style.display = "none";
            const inputPreview = document.querySelector('.js-image');
            inputPreview.style.display = "none";
            const spanPreview = document.querySelector('.js-span-input')
            spanPreview.style.display = "none";

            imagePreviewContainer.appendChild(image);
        });
        
        image.src = imageUrl;
        image.style.width = '129px';
        image.style.height = '170px';
      });
      
      reader.readAsDataURL(file);
    }
  }

console.log(token)

updateWork()
updateCategories()