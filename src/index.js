

// Axios bebohar kore Get Request & Post Request $(Put, Delete Request) koresi, & Server hishabe json server bebohar koresi, jeta localhost e 1 ta Api creat kore thake (Rest Api)

const BASE_URL = 'http://localhost:3000/users'

window.onload = function(){

    let tbody = document.querySelector('#tbody')

        // Get data from server and fill the table when page loded
    axios.get(BASE_URL)  // Get er khetre second parameter nei  [ei function call ta 1 ta promise return                            korbe... promise ta .then & .catch er maddhome resolve korbo...]
    .then(res => {
        res.data.forEach(users => {  // res.data holo by Deafult, [Axios bebohar korle ei property ta paoya                                 jai, server theke je data gulo ashbe, shegula ekhane thakbe...]
            createTDElement(users, tbody)  // protek ta TD er vitore indivisualy user jabe & parent element ta dhore pass kore dite hobe : tbody
        })
    })
    .catch(err => console.log(err))

    // Name, Phone, Email input niye save buttoner maddhome datagulo input hosse, & server e post hoye jasse[shete Axios.post er maddhome hosse... 41 no line e]  Axios.get, Axios.post, Axios.put, Axios.delete prottekeri 1 ta BASE_URL ase... Get er khetre 2nd parameter nei, but Post, Put & Delete er khetre 2nd parameter ase [2nd parameter = kon data server e Store korte jassi, Edit & Delete korte jassi]

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
    axios.post(BASE_URL, users) // // Post er khetre second parameter ase [object]
        .then(res => {
            let tbody = document.querySelector('#tbody')
            createTDElement(res.data, tbody)

            nameField.value = ''  // Data submit houyar por field gula empty korte...
            phoneField.value = ''
            emailField.value = ''
        })
        .catch(err => console.log(err))

}

//Creating a TR Element and Appending to it's parent Element

function createTDElement (users, parentElement){  
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
       let mainModal = $('#usersEditModal')
       mainModal.modal('toggle')

       let editName = document.querySelector('#edit-name')
       let editPhone = document.querySelector('#edit-phone')
       let editEmail = document.querySelector('#edit-email')

       editName.value = users.name
       editPhone.value = users.phone ? users.phone: ''
       editEmail.value = users.email ? users.email: ''

       let updateBtn = document.querySelector('#updateContact')

       updateBtn.addEventListener('click', function(){
           axios.put(`${BASE_URL}/${users.id}`, {  // Put er khetre second parameter ase
            name: editName.value,  // data gula pass korte ei object neya hoyese
            phone: editPhone.value,
            email: editEmail.value
           })
           .then(res => {
                tdName.innerHTML = res.data.name
                tdPhone.innerHTML = res.data.phone
                tdEmail.innerHTML = res.data.email

                mainModal.modal('hide')
           })
           .catch(err => console.log(err))
       })
        
    })
    tdActions.appendChild(tdEditBtn)

    const tdDeleteBtn = document.createElement('button')
    tdDeleteBtn.className = 'btn btn-danger mx-2'
    tdDeleteBtn.innerHTML = 'Delete'
    tdDeleteBtn.addEventListener('click', function(){
        axios.delete(`${BASE_URL}/${users.id}`) // Delete er khetre second parameter ase
            .then(res => {
                parentElement.removeChild(TR)
            })
            .catch(err => console.log(err))
    })
    tdActions.appendChild(tdDeleteBtn)

    TR.appendChild(tdActions)

    parentElement.appendChild(TR)

}



// 1st : function createTDElement e argument hishabe [baire theke access pabo Users er & er parent Element er o access pabo] & er vitore TR Element create korbo... then, 4 ta Field er jonno 4 ta Element Create korbo, like: [const tdName = document.createElement('td')]... then, tdName er vitor data pass korbo, like : [tdName.innerHTML = users.name]... then, ei td element ke TR er vitor implement kore dite hobe, like : [TR.appendChild(tdName)]... ekhn kono kono Field e data nao thakte pare, she jonno ternary operator use korbo, like : [tdPhone.innerHTML = users.phone ? users.phone:'N/A']  ** Edit Button er class ase, she jonno [tdEditBtn.className = 'btn btn-warning'] & action er jonno [addEventListener] add korbo...  ** Delete Button er jonno same vabe button element create korbo... ekhn tdActions TR er child element, she jonno [TR.appendChild(tdActions)]... ekhn puro TR ta ta parentElement er child, she jonno [parentElement.appendChild(TR)]


// 2nd : jokhoni browser load nibe, tokhon data gula server theke ashbe, she jonno [window.onload = function()] use korbo... & er vitore Get Request ghotbe... [12 no. line e]


// 3rd : Post Request er jonno : createNewContact name e function create korbo... er jonno kono argument er dorkar nai... ekhn new user create korte field er id gula dhorte hobe, then server e data gula store korte post method use korbo...[36 no. line] & users er 1ta object create korbo...[41 no.line ], ekhn stored houya data show korte TDElement dorkar, she jonno tbody dhorte hobe, then createTDElement(res.data, tbody) [43,44 no. line], ekhn submit houyar por field gula clear korte, field er valu gula empty dekhate hobe[line no. 46]
// new user create hobar pore server e store korte window.onload er vitor buttoner id dhorbo[23 no line theke], then addEventListener function er vitor  createNewContact() fuction dhoriye debo [25 no. line]


// 4th : Delete Buttone Action ghotate tdDeleteBtn.addEventListener er vitor axios.delete method use korbo :[113 no. line], shekhane Base_Url er shathe indivisual id tao dhoriye debo... & parentElement er TR take remove korte : [parentElement.removeChild(TR)] use korbo...



// 5th : Edit korar jonno 1st of all Bootstrap modal use korbo... ekhn modaler id ta dhorte tdEditBtn.addEventListener er vitor jQuery use korbo [line no. 77], ekhn je data edit korbo sheta dhorte modaler id gula ke dhorbo, then value gula ke dhorbo... ekhn update er jonno modaler button take dhorbo... shejonno addEventListener er vitor axios.put method use korbo, shekhane Base_Url er shathe indivisual id ta dhoriye debo & update houyar jonno data gula pass korte hobe, shejonno object nite hobe [92 no. line], update hole data gula change hobe : .then() er vitor like : tdName.innerHTML = res.data.name[97 no. line], ekhn modal hide korte : mainModal.modal('hide')  use korte hobe...