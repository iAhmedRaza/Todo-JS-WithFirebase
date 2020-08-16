var db = firebase.database().ref('todos')

db.on('child_added',function(data){
   
//Text
var itemList = document.getElementById('itemList')
var li = document.createElement('li')
var inp =  document.createElement('input')
inp.setAttribute("type",'text')
inp.setAttribute('id', data.val().key)
inp.value = data.val().value
inp.disabled = true
li.appendChild(inp)
itemList.appendChild(li)


//Edit button
var EditBtn = document.createElement('button')
EditBtn.innerHTML = 'Edit'
EditBtn.setAttribute('onclick','editFn(this)')
li.appendChild(EditBtn)

//Update butoon
var UpdateBtn = document.createElement('button')
UpdateBtn.innerHTML = 'Update'
UpdateBtn.setAttribute('onclick','updateBtnFn(this)')
UpdateBtn.style.display = "none"
li.appendChild(UpdateBtn)

//Delete button
var detBtn = document.createElement('button')
detBtn.innerHTML = "Delete"
detBtn.setAttribute('onclick','deleteBtn(this)')
li.appendChild(detBtn)

//Clear Input 
document.getElementById("addItemInput").value=''

})



function addItem(){
    var inpt = document.getElementById("addItemInput").value
   
    if(inpt != ''){
    var inptt = document.getElementById("addItemInput").value
    var db = firebase.database().ref('todos')
    var key = db.push().key
    var todo = {
        key: key,
        value: inptt
    }
    db.child(key).set(todo)

    }else{
        alert('Empty cant be added')
    }

}

function deleteBtn(a){
   var id =  a.parentNode.firstChild.id
   firebase.database().ref('todos').child(id).remove()
   a.parentNode.remove()
   
}

function editFn(a){
   var inputEdit = a.parentNode.firstChild
   inputEdit.disabled = false
   a.parentNode.childNodes[2].style.display = 'inline'
   a.style.display = 'none'
   inputEdit.focus()
    
}
function updateBtnFn(a){
    var l = a.parentNode
    l.childNodes[1].style.display = 'inline'
    a.style.display ='none'
    l.firstChild.disabled = true
    //Database
    var id =  a.parentNode.firstChild.id
    var value = a.parentNode.firstChild.value
    var edittodos = {
        key : id,
        value : value
    }
    firebase.database().ref("todos").child(id).set(edittodos)

}
function dltAll(){
    firebase.database().ref('todos').remove()
 document.getElementById('itemList').innerHTML = ''
}
