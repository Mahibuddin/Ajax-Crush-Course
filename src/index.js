

const BASE_URL = 'http://localhost:3000/users'

window.onload = function(){

    let tbody = document.querySelector('#tbody')

        // Get data from server and fill the table when page loded
    axios.get(BASE_URL)
    .then(res => {
        res.data.forEach(users => {
            createTDElement(users, tbody)
        })
    })
    .catch()

        // Add EventListener to save contact Button
    let saveContactBtn = document.querySelector('#saveContact')
    saveContactBtn.addEventListener('click', function(){
        createNewContact()
    })
}

// Create new Contact function for post request

function createNewContact(){
    let nameField = document.querySelector('#nameField')
    let phoneField = document.querySelector('#phoneField')
    let emailField = document.querySelector('#emailField')

    let users = {
        name: nameField.value,
        phone: phoneField.value,
        email: emailField.value
    }
    axios.post(BASE_URL, users)
        .then(res => {
            let tbody = document.querySelector('#tbody')
            createTDElement(res.data, tbody)

            nameField.value = ''
            phoneField.value = ''
            emailField.value = ''
        })
        .catch(err => console.log(err))

}

//Creating a TR Element and Appending to it's parent Element

function createTDElement (users, parentElement){  // this function for get request
    const TR = document.createElement('tr')

    const tdName = document.createElement('td')
    tdName.innerHTML = users.name
    TR.appendChild(tdName)

    const tdPhone = document.createElement('td')
    tdPhone.innerHTML = users.phone ? users.phone:'N/A'
    TR.appendChild(tdPhone)

    const tdEmail = document.createElement('td')
    tdEmail.innerHTML = users.email ? users.email: 'N/A'
    TR.appendChild(tdEmail)

    const tdActions = document.createElement('td')

    const tdEditBtn = document.createElement('button')
    tdEditBtn.className = 'btn btn-warning'
    tdEditBtn.innerHTML = 'Edit'
    tdEditBtn.addEventListener('click', function(){
        console.log('I am Edit Button');
        
    })
    tdActions.appendChild(tdEditBtn)

    const tdDeleteBtn = document.createElement('button')
    tdDeleteBtn.className = 'btn btn-danger mx-2'
    tdDeleteBtn.innerHTML = 'Delete'
    tdDeleteBtn.addEventListener('click', function(){
        console.log('I am Edit Button');
    })
    tdActions.appendChild(tdDeleteBtn)

    TR.appendChild(tdActions)

    parentElement.appendChild(TR)

}