fetch('http://localhost:5678/api/works').then((res) => {
    res.json().then((data) => {

        const gallery = document.querySelector('.gallery')
        // console.log(data)
        
        data.forEach((work) => {

                const figure = document?.createElement('figure')
                figure.dataset.id = work.id

                const imgWork = document?.createElement('img')
                imgWork.src=work.imageUrl

                const titleLeg = document.createElement('figcaption')
                titleLeg.textContent = work.title

                figure.appendChild(imgWork)
                gallery.appendChild(figure)
                figure.appendChild(titleLeg)
                // console.log(work)
        });
    })
})

fetch ('http://localhost:5678/api/categories').then((res) =>{
    res.json().then((data) => {

        const filtre = document.querySelector('.filters')
        // console.log(data)
        data.forEach((categorie) => {
            let catFiltre = document.createElement('button')
            catFiltre.dataset.id = categorie.id

            let tButton = document.createTextNode(categorie.name)

            catFiltre.appendChild(tButton)
            filtre.appendChild(catFiltre)
            console.log(categorie)
        });
    })
})