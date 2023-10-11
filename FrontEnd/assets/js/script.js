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
            portfolioEdition.style.display ="block"

        }
    }
// Ajout d'un EventListener pour se déconnecter et retourner sur la pag
LogOut.addEventListener('click', function() {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
    else {
        window.location.href = "login.html"
    }
})
