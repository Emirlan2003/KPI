let inp1 = $('.inp1')
let inp2 = $('.inp2')
let inp3 = $('.inp3')
let inp4 = $('.inp4')
let inp5 = $('.inp5')
let inp6 = $('.index')
let list = $('.list')
let btn = $('.btn1')
let btn2 = $('.btn2')
let img = $('img')
let add  = $('.addStudent')


btn.on('click', function(){
    let newTask = {
        name: inp1.val(),
        surname: inp2.val(),
        number: inp3.val(),
        KPI_of_week: inp4.val(),
        KPI_of_month: inp5.val()
    }
    postNewTask(newTask)
    clear()
    
})



function clear(){
    inp1.val('')
    inp2.val('')
    inp3.val('')
    inp4.val('')
    inp5.val('')
}


function postNewTask(newTask){
    if(!inp1.val().trim() || !inp2.val().trim() || !inp3.val() || !inp4.val().trim() || !inp5.val().trim()){
        alert('Заполните все поля')
        return;
    }
   
    fetch('http://localhost:8000/todos',{
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
    }).then(response => console.log(response))
}




function render(){
    fetch('http://localhost:8000/todos')
       .then(response => response.json())
       .then(data  => {
           $('tbody').html('')
           data.forEach(item => {
               $('tbody').append(`<tr>
                                     <td>${item.id}</td>
                                     <td>${item.name}</td>
                                    <td>${item.surname}</td>
                                     <td>${item.number}</td>
                                    <td>${item.KPI_of_week}</td>
                                     <td>${item.KPI_of_month}</td>
                                  <td><button class="clear" id="${item.id}">Delete</button></td>
                                  <td><button class='change' id="${item.id}">Edit</button></td>
                                 </tr>
                                  `)
           });
       })
    
}


$('body').on('click', '.clear', function(event){
    let id = event.target.id
    fetch(`http://localhost:8000/todos/${id}`, {
        method: 'DELETE'
    }).then(() => render())
})




$('.delete').on('click', function(e){
    
    fetch(`http://localhost:8000/todos/${inp6.val()}`, {
        method: 'DELETE'
    }).then((res) => {
       render()
    })     
        inp4.val('')
})

render()


$('body').on('click', '.change', function(e){
      $('.blockFon').css('display', 'block')
      $('.blockModal').css('display', 'block')
      let id = e.target.id
      $('.blockChange').attr('id',id)
      fetch(`http://localhost:8000/todos/${id}`)
          .then(res => res.json())
          .then(data => {
            $('.getName').val(data.name) 
            $('.getSurname').val(data.surname)
            $('.getNum').val(data.number)
            $('.getWeek').val(data.KPI_of_week)
            $('.getMonth').val(data.KPI_of_month)
          })
})

$('.blockBtn').on('click', function(){
    $('.blockFon').css('display', 'none')
      $('.blockModal').css('display', 'none')
})





$('.blockChange').on('click', function(e){
    $('.blockFon').css('display', 'none')
    $('.blockModal').css('display', 'none')
    let newName = $('.getName').val()
    let newSurname = $('.getSurname').val()
    let newNum = $('.getNum').val()
    let newWeek = $('.getWeek').val()
    let newMonth = $('.getMonth').val()
    let id = e.target.id
    fetch(`http://localhost:8000/todos/${id}`,{
    method: 'PATCH',
    headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
          name: newName,
          surname: newSurname,
          number: newNum,
          KPI_of_week: newWeek,
          KPI_of_month: newMonth
      })
    }).then(() => render())
})





//!button addStudent

add.on('click', function(){
    $('.container').css('display', 'block')
})




//!  button  delContainer

$('.delContainer').on('click',  function(){
    $('.container').css('display', 'none')
})




$('.searchInp').on('input', function(){
    if(!$('.searchInp').val()){
        $('.searchCont').html('')
    }
    fetch('http://localhost:8000/todos')
      .then((res) => res.json())
      .then((data) => {         
          data.forEach(item => {
              if(
                  item.name === $('.searchInp').val()||
                  item.surname === $('.searchInp').val()||
                  item.number === $('.searchInp').val()
              ){
                  $('.searchCont').append(
                      `<li>
                      <b>user:</b>${item.id}
                      <b>name:</b>${item.name}
                      <b>surname:</b>${item.surname}
                      <b>number:</b>${item.number}
                      <b>KPI of week:</b>${item.KPI_of_week}
                      <b>KPI of month:</b>${item.KPI_of_month}
                      <form><button class="clear" id="${item.id}">Delete</button></form>
                      <button class='change' id="${item.id}">Edit</button>
                      </li>`
                  )
              }
          })
      })
})