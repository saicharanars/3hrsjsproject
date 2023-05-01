function expense(event) {
  event.preventDefault();
  let api = "https://crudcrud.com/api/558a45ed74b04ad8b5dab7c6ebd44d66";
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
}
window.addEventListener("DOMContentLoaded", () => {
  let api = "https://crudcrud.com/api/558a45ed74b04ad8b5dab7c6ebd44d66";

  axios.get(`${api}/expense`).then((res) => {
    for (var i = 0; i < res.data.length; i++) {
      showexpenseonscreen(res.data[i]);
      console.log(res.data[i].cat);
    }
  });
});
function showexpenseonscreen(obj) {
  let api = "https://crudcrud.com/api/558a45ed74b04ad8b5dab7c6ebd44d66/expense";
  const parentele = document.getElementById("listofitems");
  const grocery = document.getElementById("grocery");
  const maintenance = document.getElementById("maintenance");
  const entertainment = document.getElementById("entertainment");
  const childele = document.createElement("li");
  childele.textContent = obj.amount + "-" + obj.cat + "-" + obj.etype;
  const deletebtn = document.createElement("input");
  deletebtn.type = "button";
  deletebtn.value = "Delete";
  deletebtn.onclick = () => {
    axios.delete(`${api}/${obj._id}`);
    if (obj.cat === "grocery") {
      grocery.removeChild(childele);
    } else if (obj.cat === "entertainment") {
      entertainment.removeChild(childele);
    } else {
      maintenance.removeChild(childele);
    }
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
