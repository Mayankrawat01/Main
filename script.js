const addUser = document.getElementById('add-task');
const newUser = document.getElementById('write');
const newRecord = document.getElementById('dataStore');
    let arr = [];
let editText = null;
    let obj = localStorage.getItem('Name');
    if (obj !== null) {
        try {
            arr = JSON.parse(obj);
            dispData();
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    }

    addUser.onclick = () => {
        const name = newUser.value;
        if(editText != null ){
            arr.splice(editText,1,{'name': name})
        }else{
            arr.push({ 'name': name });
        }
        
        savedData(arr);
        dispData();
        addUser.innerText ='Add Task'
    };

    function savedData(arr) {
        let string = JSON.stringify(arr);
        localStorage.setItem('Name', string);
        newUser.value = '';
    }

    function dispData() {
        let recordData = '<ul>';
        arr.forEach((user, i) => {
const isChecked = user.checked ? 'checked' : ''; 
 const lineThrough = user.checked ? 'line-through' : ''; 
            recordData += `
  <li class="row-1">
      <div id="part-one">
    <input type="checkbox" class="task-checkbox" 
         id="checkbox-${i}" ${isChecked}
         onclick="LineThrough(this, ${i})">
     <span style="text-decoration: ${lineThrough}">${i + 1}. ${user.name}</span>
</div>
    <div class="part-two">
    <i class="fas fa-pen" onclick='editData(${i})' id="edit"></i>
    <i class="fas fa-trash" onclick='deleteData(${i})' id="delete"></i>
                    </div>
                </li>
            `;
        });
        recordData += '</ul>';
        newRecord.innerHTML = recordData;
    }

function deleteData(id){
    const confirmDelete = confirm("Are you sure you want to delete?");
if(confirmDelete){
    arr.splice(id,1)
  savedData(arr)
  dispData();
}
}
function editData(id){

    editText = id;
    newUser.value = arr[id].name;
    addUser.innerText = 'Save Changes'
}
function LineThrough(checkbox, index) {
    arr[index].checked = checkbox.checked;
    savedData(arr);
    dispData();
}


