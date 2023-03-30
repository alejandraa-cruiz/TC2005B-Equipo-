// const container = document.querySelector("#background");
const matches = document.querySelectorAll("#test > div");
console.log(matches);

// const element = document.querySelector('.data-te-datepicker-init');
// console.log(element);

document.getElementById("test").addEventListener("click", someFunction);
function someFunction(event) {
    // Function to get NodeList
    const matches = document.querySelectorAll("#test > div");
    // Get every div after clicking in selector
    matches[0].ownerDocument.body.childNodes.forEach((node, index) =>{
        if(index == 15){
            console.log(node);
        }
        if(index == 16){
            let childDivs = document.querySelectorAll("div");
            childDivs.forEach((node, index) =>{
                if(index == 14){
                    // Ok button
                    let okButton = node.childNodes[3].childNodes[5].childNodes[5];
                    console.log(okButton);
                    // okButton.remove();
                    okButton.onclick=function() {
                        alert('Yesss');
                        console.log(okButton.parentElement);
                    };
                    
                    // node.getRootNode
                }
            })
        }
        if(index == 17 ){
            node.remove();
        }
        if(index == 18 ){
            node.remove();
        }
    });
};
//     const element = document.querySelector('#data-te-datepicker-toggle-ref');
//     console.log(element);
//     Array.prototype.forEach.call(element, function (node) {
//         const okButton = document.querySelector('#data-te-datepicker-toggle-ref');
//         console.log(okButton);
//         console.log(node);
//         node.parentNode.removeChild(node);
//     });
    // const datepicker= new te.Datepicker(
    //     document.querySelector('#data-te-datepicker-init'),{
    //             okBtnText: "Ok",
    //             cancelBtnText: "Schließen",
    //     },
    //     document.querySelector('data-te-dropdown-backdrop-ref'),{
    //         okBtnText: "Ok",
    //         cancelBtnText: "Schließen",
    //     },
    //     document.querySelector('data-te-datepicker-modal-container-ref'),{
    //         okBtnText: "Ok",
    //         cancelBtnText: "Schließen",
    //     }
    // );
    // console.log(event.target.id);
    // console.log(backGround);
    // console.log(element);
    // console.log(mainDatePicker);
    // element.parentElement.removeChild(element);
    // Array.prototype.forEach.call(element, function (node) {
    //     const okButton = document.querySelector('#data-te-datepicker-ok-button-ref');
    //     console.log(okButton);
    //     console.log(node);  
    //     node.parentNode.removeChild(node);
// }
console.log("this is a client-side script");