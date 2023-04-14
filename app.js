const content = document.querySelector('.content');
// const formEdit = document.querySelector('#formEdit');
// const submitEdit = document.querySelector('#submitEdit');
// const nameEdit = document.querySelector('#nameEdit');
// const avisEdit = document.querySelector('#avisEdit');

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

            const editInputBtn = document.createElement('button')
            editInputBtn.classList.add('edit-input')
            editInputBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`

            const newEditForm = document.createElement('div');
            newEditForm.id = 'newEditForm'
            const newInput = document.createElement('input')
            newInput.id = 'newInput'
            const newInputAvis = document.createElement('input')
            newInput.id = 'newInputAvis'
            const newButton = document.createElement('button');
            newButton.id = 'newSubmit'
            


            
            btnDelete.append(deleteForm)
            btnEdit.append(editForm)
            name.innerHTML = clienName;
            review.innerHTML = clienReview;

            div.append(name, review, btnDelete, btnEdit, editInputBtn)
            content.append(div)

            function showDelete(){
                if(btnDelete.style.display == 'block'  && editInputBtn.style.display == 'block' ){
                    btnDelete.style.display = 'none';
                    editInputBtn.style.display = 'none'
                }else{
                    btnDelete.style.display = 'block'
                    editInputBtn.style.display = 'block'
                }
            }
            btnEdit.addEventListener('click', showDelete)
            
            function showInput(){
                if(formEdit.style.display == 'flex'){
                    formEdit.style.display = 'none';
                }else{
                    formEdit.style.display = 'flex'
                }
                
            }
            editInputBtn.addEventListener('click', showInput)


            function submitValue(){
                console.log(avisEdit.value);

                const valueEdit = {
                    "data":{
                        "nom": nameEdit.value,
                        "review": avisEdit.value,
                    }
                }

                fetch(`http://localhost:8082/api/avis-clients/${idrev}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(valueEdit)
                }).then(res => res.json())
                .then(data => {
                    
                    console.log(idrev);
                    console.log(data);
                    
                        const newReview = data.data.attributes.review
                        const newName = data.data.attributes.nom
                        name.innerHTML = newName
                        review.innerHTML = newReview

                })
            }
            submitEdit.addEventListener('click', submitValue)



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