"use strict";
(function(){    
    document.addEventListener("DOMContentLoaded",function(){        
        var psFileUpload = document.getElementById("ps-fileUpload");

        const initAttachment = function($event){            
            const attachFile = $event.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = function(){
                //debugger;
                 const typedarray = new Uint8Array(this.result);
                 //debugger;
                 const container = document.createElement("div");
                 container.style.backgroundColor = "#ccc";
                 container.style.textAlign = "center";
                 
                  PDFJS.getDocument(typedarray)
                  .then(function(pdf) {                      
                      //loop
                      for (let i = 1; i <= pdf.numPages; i++) {
                          pdf.getPage(i).then(function(page) {
                            const scale = 1.5;
                            const viewport = page.getViewport(scale);
                            const div = document.createElement("div");

                            // Set id attribute with page-#{pdf_page_number} format
                            div.setAttribute("id", "page-" + (page.pageIndex + 1));

                            // This will keep positions of child elements as per our needs
                            div.setAttribute("style", "position: relative");

                            // Append div within div#container
                            container.appendChild(div);
                            
                            const canvas = document.createElement("canvas");

                            div.appendChild(canvas);

                            const context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                            
                            const renderContext = {
                                canvasContext: context,
                                viewport: viewport
                            };
                            // Render PDF page
                            page.render(renderContext);                                                     
                          })
                      }//end for                      
                      return;                    
                }).then(function(response){                  
                    setTimeout(function(){
                        OpenNewWindowToVisualize(container);
                    },1000);
                })
            }
            fileReader.readAsArrayBuffer(attachFile);            
        }

        const OpenNewWindowToVisualize = function(_container){
            debugger;
            const _window =  window.open("");

            if(_window){
                _window.document.body.style.margin = "0px";
                _window.document.body.appendChild(_container);
            }
            else {
                alert("desabilitar o bloqueador de pop-ups para poder visualizar o arquivo pdf selecionado.");
            }
            
        }

        psFileUpload.addEventListener("change", initAttachment, false);
    })
}())