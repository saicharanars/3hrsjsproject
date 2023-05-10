var api = "https://crudcrud.com/api/381b1154c91d49e7aa77c02ac54bc0ab";
function expense(event) {
  event.preventDefault();
  const amount = document.getElementById("amount").value;
  const etype = document.getElementById("etype").value;
  const cat = document.getElementById("cat").value;
  const obj = {
    amount,
    etype,
    cat,
  };

  axios
    .post(`${api}/expense`, obj)
    .then((res) => {
      showexpenseonscreen(res.data);
    })
    .catch((err) => console.error(err));
  // try {
  //   const res = await axios.post(`${api}/expense`, obj);
  //   showexpenseonscreen(res.data);
  // } catch (error) {
  //   console.log(error);
  // }
}
window.addEventListener("DOMContentLoaded", () => {
  

  axios.get(`${api}/expense`).then((res) => {
    for (var i = 0; i < res.data.length; i++) {
      showexpenseonscreen(res.data[i]);
      console.log(res.data[i].cat);
    }
  });
});
function showexpenseonscreen(obj) {
  
  const parentele = document.getElementById("listofitems");
  const grocery = document.getElementById("grocery");
  const maintenance = document.getElementById("maintenance");
  const entertainment = document.getElementById("entertainment");
  const childele = document.createElement("li");
  childele.className ="list-group-item"
  childele.textContent = obj.amount + "   " + obj.cat + "   " + obj.etype;
  
  const deletebtn = document.createElement("input");
  deletebtn.type = "button";
  deletebtn.value = "Delete";
  deletebtn.className="btn btn-outline-danger float-end"
  deletebtn.onclick = () => {
    
    axios.delete(`${api}/expense/${obj._id}`
    ).then(() =>{
      if (obj.cat === "grocery") {
        grocery.removeChild(childele);
      } else if (obj.cat === "entertainment") {
        entertainment.removeChild(childele);
      } else {
        maintenance.removeChild(childele);
      }
    }).catch((err)=>console.log(err));
    
    //localStorage.removeItem(obj.etype);
    //parentele.removeChild(childele);
  };

  childele.appendChild(deletebtn);
  //childele.appendChild(editbtn);
  //grocery.appendChild(childele);
  //parentele.appendChild(childele);

  if (obj.cat === "grocery") {
    grocery.appendChild(childele);
  } else if (obj.cat === "entertainment") {
    entertainment.appendChild(childele);
  } else {
    maintenance.appendChild(childele);
  }
}
