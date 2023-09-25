const URL_Prefix = 'http://localhost:3000/monsters'
let page = 1
function getMonsters(num) {
    console.log(page)
    fetch(URL_Prefix +`/?_limit=50&_page=${num}`)
    .then((resp) => resp.json())
        .then(monsterObj => {
            document.querySelector('#monster-container').innerHTML='';  
            for(let c=0;c<monsterObj.length;c++)
            createMonsterCard(monsterObj[c])
        })
}

function  createMonsterCard (monster) {
    let b=document.createElement('div'),
    c=document.createElement('h2'),
    d=document.createElement('h4'),
    e=document.createElement('p');
    c.innerHTML=`${monster.name}`,
    d.innerHTML=`Age: ${monster.age}`,
    e.innerHTML=`Bio: ${monster.description}`,
    b.appendChild(c),
    b.appendChild(d),
    b.appendChild(e),
    document.querySelector('#monster-container').appendChild(b)
}

document.addEventListener('DOMContentLoaded', ()=> {
    getMonsters(page) 
    document.getElementById('back').addEventListener('click', () => getMonsters(page--))
    document.getElementById('forward').addEventListener('click', () => getMonsters(page++))
    const form = document.createElement('form')
        form.id = 'monster-form'
        form.innerHTML = `
        <input id="name" placeholder="name...">
        <input id="age" placeholder="age...">
        <input id="description" placeholder="description...">
        <button>Create</button>`
    document.getElementById('create-monster').appendChild(form)
    document.querySelector('#monster-form').addEventListener('submit', e=>{
        e.preventDefault()
        let name=document.getElementById('name')
        let age=document.getElementById('age')
        let desc=document.getElementById('description')
        postNewMonster(name.value, age.value, desc.value)
        clearForm(name, age, desc)
    })
    postNewMonster=(a, b, c)=>{
        let monsterBody={
            name:a,
            age:b,
            description:c
        }
        let message={
            method:'POST',
            headers:{
                'Content-type':'application/json',
                Accept:'application/json'},
            body:JSON.stringify(monsterBody)
        }
        fetch(URL_Prefix, message)
        .then(res=>res.json())
        .then(d=> console.log('new monster added ',d))
    }
    clearForm=(a,b,c)=>{
        a.value=''
        b.value=''
        c.value=''
    }
})