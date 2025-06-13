const baseURL = 'http://localhost:4000/customers';
const items = [];

export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors' };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
      } 
    catch (error) {
      alert(error);
    }
  }
  fetchData(baseURL);
}

export function get(id) {
    let result = null;
    for( let item of items){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}

export async function deleteById(id, postopCallback) {
  const myInit = {
    method: 'DELETE',
    mode: 'cors' 
  };
  const deleteItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error deleting data: ${response.status}`);
      }
      await response.json();
      postopCallback();
    } 
    catch (error) {
      alert(error);
    }
  }
  deleteItem(baseURL + "/" + id);
}

export async function post(customer, postopCallback) {
  const myHeaders = new Headers({ "Content-Type": "application/json" });
  delete customer.id;
  const myInit = {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: myHeaders,
    mode: 'cors'
  };
  const postItem = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error posting data: ${response.status}`);
      }
      await response.json();
      postopCallback();
    } 
    catch (error) {
      alert(error);
    }
  }
  postItem(baseURL);
} 

export function put(customer, postopCallback) {
  const myHeaders = new Headers({ "Content-Type": "application/json" });
  const myInit = {
    method: 'PUT',
    body: JSON.stringify(customer),
    headers: myHeaders,
    mode: 'cors'
  };
  const putItem = async (url) => {
  try {
    const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error puting data: ${response.status}`);
    }
    await response.json();
    postopCallback();
    } 
    catch (error) {
      alert(error);
    }
  } 
  putItem(baseURL + "/" + customer.id);
}  

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}

function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}


