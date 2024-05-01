let title = document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;



/* ===================================================================================
   ================================== get total ======================================
   ===================================================================================
*/
function getTotal(){
  if(price.value != '' ){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value; 
    total.innerHTML = result;
    total.style.background = 'green'; 
  } else{
    total.innerHTML = '';
    total.style.background = '#ff2212'; 
  }
}




/* ==================================================================================
   ================================== create product ================================
   ==================================================================================
*/
let dataProduct ;
if(localStorage.product != null){
  dataProduct = JSON.parse(localStorage.product);
} else{
  dataProduct = [];
}
submit.onclick =function(){
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value.toLowerCase(),
    taxes: taxes.value.toLowerCase(),
    ads: ads.value.toLowerCase(),
    discount: discount.value.toLowerCase() ,
    total: total.innerHTML.toLowerCase() ,
    count: count.value.toLowerCase() ,
    category: category.value.toLowerCase() ,
      
  }
  if(title.value !='' && price.value !='' && category.value!='' && count.value <=100 ){
    if(mood === 'create'){
      if(newProduct.count > 1){
        for(let i=0; i<newProduct.count; i++){
          dataProduct.push(newProduct);
        }
      } else{
        dataProduct.push(newProduct);
      }
    } else{
      dataProduct[tmp] = newProduct;
      mood = 'create';
      submit.innerHTML = 'create';
      count.style.display = 'block';
    }
    clearData();
  }

  localStorage.setItem('product', JSON.stringify(dataProduct));
  
  showData();
}




/* ===============================================================================
   ================================ clear inputs =================================
   ===============================================================================
*/
function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}





/* ===============================================================================
   =================================== showData  =================================
   ===============================================================================
*/
function showData(){
  getTotal();
  let table = '';
  for(let i=0; i<dataProduct.length; i++){
     table +=`
     <tr>
     <td>${i+1}</td>
     <td>${dataProduct[i].title}</td>
     <td>${dataProduct[i].price}</td>
     <td>${dataProduct[i].taxes}</td>
     <td>${dataProduct[i].ads}</td>
     <td>${dataProduct[i].discount}</td>
     <td>${dataProduct[i].total}</td>
     <td>${dataProduct[i].category}</td>
     <td><button onclick="updataData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
     `
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
  if(dataProduct.length>0){
    btnDelete.innerHTML=`
    <button onclick="deleteAllData()">deleteAll (${dataProduct.length})</button>
    `
  } else{
    btnDelete.innerHTML='';
  }
}
showData();




/* ==================================================================================
   ===================================== delete  ====================================
   ==================================================================================
*/
function deleteData(i){
  dataProduct.splice(i,1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}




/* ==================================================================================
   ================================== delete all  ===================================
   ==================================================================================
*/
function deleteAllData(){
  dataProduct.splice(0);
  localStorage.clear();
  showData();
}





/* ==================================================================================
   ===================================== updata  ====================================
   ==================================================================================
*/
function updataData(i){
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataProduct[i].category;
  submit.innerHTML = 'update';
  mood = 'update';
  tmp=i;
  scroll({
    top:0,
    behavior:'smooth',
  })
}








/* ==================================================================================
   ===================================== search  =====================================
   ==================================================================================
*/
let searchMood = 'title';

function getSearchMood(id){

  let search = document.getElementById('search');

  if(id == 'searchTitle'){
  searchMood = 'title';
  search.placeholder = 'Search By Title';
  } else{
    searchMood = 'caregory';
    search.placeholder = 'Search By Categroy';
  }
   search.focus();
   search.value = '';
   showData();
}


function searchData(value){
  let table = '';
  if(searchMood == 'title'){
    for(let i=0; i<dataProduct.length; i++){
      if(dataProduct[i].title.includes(value.toLowerCase())){
        table +=`
     <tr>
     <td>${i+1}</td>
     <td>${dataProduct[i].title}</td>
     <td>${dataProduct[i].price}</td>
     <td>${dataProduct[i].taxes}</td>
     <td>${dataProduct[i].ads}</td>
     <td>${dataProduct[i].discount}</td>
     <td>${dataProduct[i].total}</td>
     <td>${dataProduct[i].category}</td>
     <td><button onclick="updataData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
     `
      }
    }
  } else{
    for(let i=0; i<dataProduct.length; i++){
      if(dataProduct[i].category.includes(value.toLowerCase())){
        table +=`
     <tr>
     <td>${i+1}</td>
     <td>${dataProduct[i].title}</td>
     <td>${dataProduct[i].price}</td>
     <td>${dataProduct[i].taxes}</td>
     <td>${dataProduct[i].ads}</td>
     <td>${dataProduct[i].discount}</td>
     <td>${dataProduct[i].total}</td>
     <td>${dataProduct[i].category}</td>
     <td><button onclick="updataData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
     `
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}