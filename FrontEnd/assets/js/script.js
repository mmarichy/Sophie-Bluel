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

adminH()
function adminH (){
    document.querySelectorAll(".admin__mod").forEach(a => {
        if (token === null){
            return;
        }
        else {
            a.removeAttribute('aria-hidden')
            a.removeAttribute('style')
            LogOut.innerHTML = "deconnexion";
        }
    })
}