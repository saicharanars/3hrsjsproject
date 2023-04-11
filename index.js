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
  localStorage.setItem(obj.etype, JSON.stringify(obj));
  showexpenseonscreen(obj);
}
function showexpenseonscreen(obj) {
  const parentele = document.getElementById("listofitems");
  const childele = document.createElement("li");
  childele.textContent = obj.amount + "-" + obj.cat + "-" + obj.etype;
  const deletebtn = document.createElement("input");
  deletebtn.type = "button";
  deletebtn.value = "Delete";
  deletebtn.onclick = () => {
    localStorage.removeItem(obj.etype);
    parentele.removeChild(childele);
  };
  const editbtn = document.createElement("input");
  editbtn.type = "button";
  editbtn.value = "Edit";
  editbtn.onclick = () => {
    localStorage.removeItem(obj.email);
    parentele.removeChild(childele);
    document.getElementById("amount").value = obj.amount;
    document.getElementById("etype").value = obj.etype;
  };

  childele.appendChild(deletebtn);
  childele.appendChild(editbtn);
  parentele.appendChild(childele);
}
