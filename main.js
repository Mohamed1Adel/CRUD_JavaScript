let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('Total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let itemIndex;

let searchMood = "title";

// console.log(tital,price,taxes,ads,discount,total,count,category,submit)

// get total

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value

         total.innerHTML = result;
         total.style.background = 'yellow'
    }else{
        total.innerHTML = '';
        total.style.background = 'red';

    }
}









// create product


 let dataPro;

 if(localStorage.product != null){
     dataPro = JSON.parse(localStorage.product)
 }else{
    dataPro = [];
 }

submit.onclick = function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    };

    if(mood === 'create'){
        if(newPro.count > 1){
        for(let i = 0 ; i < newPro.count ; i++){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
    }
    else{
        dataPro[itemIndex] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    
    
    localStorage.setItem('product' , JSON.stringify(dataPro));
    console.log(dataPro)
    clearInputs();
    showData();
}


// save localStorage




// clear inputs

function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



// read

function showData(){
    let table = '';
    for(let i = 0 ; i< dataPro.length ; i++){
        table += `
            <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updateItem(${i})" type="submit" id="update">Update</button></td>
             <td><button onclick="daleteData(${i})" type="submit" id="delete">Delete</button></td>
             </tr>
           
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let delAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        delAll.innerHTML = `
        <button onclick="deleteAll()">Delete All Items (${dataPro.length})</button>
        `;
    }else{
        delAll.innerHTML = '';
    }
    getTotal()

}
showData();


// delete

// to delete one item
function daleteData(i){
    dataPro.splice(i,1); //to delete one element
    localStorage.product = JSON.stringify(dataPro);
    showData();

}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0) ; //to delete all indexes 
    showData();
}


//count 


// update

function updateItem(i){
    // console.log(i);
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';

    mood = 'update';
    itemIndex = i;
    scrollTo({
        top:0,behavior:"smooth"
    })
}




// search

function getSearchMood (id){
    let search = document.getElementById('search');
    if(id === 'serch-title'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';

    }
    search.focus();
    search.value = '';
    showData();
}


function searchData(value){
    let table ='';
    if(searchMood == 'title'){

        for(let i =0; i < dataPro.length ; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
            <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updateItem(${i})" type="submit" id="update">Update</button></td>
             <td><button onclick="daleteData(${i})" type="submit" id="delete">Delete</button></td>
             </tr>
           
        `;
            }
        }

    }else{
        for(let i =0; i < dataPro.length ; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
            <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updateItem(${i})" type="submit" id="update">Update</button></td>
             <td><button onclick="daleteData(${i})" type="submit" id="delete">Delete</button></td>
             </tr>
           
        `;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;


}



















// clear data