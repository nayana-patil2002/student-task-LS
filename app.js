 
 let cl=console.log;
 
  const stdForm=document.getElementById("stdForm");
  const fnameControl=document.getElementById("fname");
  const lnameControl=document.getElementById("lname");
  const contactControl=document.getElementById("contact");
  const emailControl=document.getElementById("email");
 const stdConatiner=document.getElementById("stdConatiner");

 const stdUpdateBtn=document.getElementById("stdUpdateBtn");
 const stdAddBtn=document.getElementById("stdAddBtn");

   let stdArr=[];


     if(localStorage.getItem("stdArr")){
       stdArr=JSON.parse(localStorage.getItem("stdArr"))
     }


   const generateUuid=()=>{
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };



     const  onEdit=(ele)=>{
          let editID=ele.closest("tr").id;

          localStorage.setItem("editID", editID);

          //findObject

          let editObj= stdArr.find(std=>std.stdID===editID)
          cl(editObj)

          //patch data 
          fnameControl.value=editObj.fname;
          lnameControl.value=editObj.lname;
          contactControl.value=editObj.contact;
          emailControl.value=editObj.email;
 

          stdUpdateBtn.classList.remove("d-none");
          stdAddBtn.classList.add("d-none")


     }



     const onRemove = (ele) =>{
        let removeID=ele.closest("tr").id;
        cl(removeID);

         let getIndex=stdArr.findIndex(std=>std.stdID=== removeID)
         cl(getIndex);

         stdArr.splice(getIndex, 1)

         localStorage.setItem("stdArr", JSON.stringify(stdArr));

         ele.closest("tr").remove()

     }


       const createStd = (arr) =>{
            let result=""

              arr.forEach((ele, i)=>{
                 result+=`
                                     <tr id="${ele.stdID}">
                                       <td>${i+1}</td>
                                       <td>${ele.fname}</td>
                                       <td>${ele.lname}</td>
                                       <td>${ele.contact}</td>
                                       <td>${ele.email}</td>
                                       <td class="text-center"><i class="fa-solid fa-pen-to-square text-success" onClick="onEdit(this)"></i></td>
                                       <td class="text-center"><i class="fa-solid fa-trash-can text-danger" onClick="onRemove(this)"></i></td>
                                    </tr>
                 
                 `
              })

              stdConatiner.innerHTML=result;
       }

       createStd(stdArr)
  


   const onstdAdd = (eve) =>{

      eve.preventDefault();

      let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        contact:contactControl.value,
        email:emailControl.value,
        stdID:generateUuid(),
      }

      stdForm.reset()

      stdArr.push(stdObj)

        localStorage.setItem("stdArr", JSON.stringify(stdArr))
        


      //create table

      let tr= document.createElement("tr");
      tr.id=stdObj.stdID;
      tr.innerHTML=`
                                       <td>${stdArr.length}</td>
                                       <td>${stdObj.fname}</td>
                                       <td>${stdObj.lname}</td>
                                       <td>${stdObj.contact}</td>
                                       <td>${stdObj.email}</td>
                                       <td class="text-center"><i class="fa-solid fa-pen-to-square text-success" onClick="onEdit(this)"></i></td>
                                       <td class="text-center"><i class="fa-solid fa-trash-can text-danger" onClick="onRemove(this)"></i></td>
      
      
      
      
      `

      stdConatiner.append(tr)
        
   }



    const onupdateBtn = () =>{
       let updateID=localStorage.getItem("editID");

       let updateObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        contact:contactControl.value,
        email:emailControl.value,
        stdID:updateID,
       }

       stdForm.reset()


       stdUpdateBtn.classList.add("d-none");
       stdAddBtn.classList.remove("d-none");
         //replace and update in array

         let getIndex=stdArr.findIndex(std=>std.stdID===updateID)
          cl(getIndex)

          stdArr[getIndex]=updateObj;

          localStorage.setItem("stdArr", JSON.stringify(stdArr));


          

         
   

          //update in UI

          let tr=[...document.getElementById(updateID).children]

            tr[1].innerHTML= updateObj.fname;
            tr[2].innerHTML=updateObj.lname;
            tr[3].innerHTML=updateObj.contact;
            tr[4].innerHTML=updateObj.email;


    }



   stdUpdateBtn.addEventListener("click", onupdateBtn)
  stdForm.addEventListener("submit", onstdAdd)
