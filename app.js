const content = document.querySelector('.content')

fetch('http://localhost:8082/api/avis-clients/?populate=*')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        data.data.forEach(element => {
            console.log(element);

            const clienName = element.attributes.nom;
            const clienReview = element.attributes.review;
            const idrev = element.id
            console.log(idrev);

            const div = document.createElement('div');
            const name = document.createElement('h5');
            const review = document.createElement('p');
            const btnDelete = document.createElement('button')
            btnDelete.classList.add('delete')
            const deleteForm = document.createElement('i');
            deleteForm.classList.add('fa-solid', 'fa-x')
            const btnEdit = document.createElement('button')
            btnEdit.classList.add('edit')
            const editForm = document.createElement('i');
            editForm.classList.add('fa-solid', 'fa-pen-to-square')

            btnDelete.append(deleteForm)
            btnEdit.append(editForm)
            name.append(clienName)
            review.append(clienReview)

            div.append(name, review, btnDelete, btnEdit)
            content.append(div)

            function showDelete(){
                if(btnDelete.style.display == 'block'){
                    btnDelete.style.display = 'none';
                }else{
                    btnDelete.style.display = 'block'
                }
            }
            btnEdit.addEventListener('click', showDelete)



            function deleteReview() {
                fetch(`http://localhost:8082/api/avis-clients/${idrev}`, {
                    method: "DELETE"
                })
                    .then(response => response.json())
                    .then(review => {

                        div.remove();

                        console.log('Avis retiré !')
                    })
                    
            }

            btnDelete.addEventListener('click', deleteReview)

        });
    })