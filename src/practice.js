

const URL = 'http://localhost:3000/users'

let btn = document.querySelector('#loadData')
let p = document.querySelector('#outPut')
 
    // xmlhttprequest  --e ajax kivabe kaj kore
// btn.addEventListener('click', function(){
//     const xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = () => {
//         p.innerHTML =  xhr.response  
//     }

//     xhr.open('GET', URL);
//     xhr.send();
// })


    // fetch api  --e ajax kivabe kaj kore
// btn.addEventListener('click', function(){
//     fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         data.forEach((user) => {
//             p.innerHTML = `${p.innerHTML} <br> Name: ${user.name}`
//         })
//     })
//     .catch(err => console.log(err))
// })


    // axios  --e ajax kivabe kaj kore
    
    btn.addEventListener('click', function(){
        axios.get(URL)
            .then(res => {
                res.data.forEach((user) => {
                    p.innerHTML = `${p.innerHTML} <br> Name: ${user.name}`
                })
            })
            .catch(err => console.log(err))
    })
    


