const accessKey="QNSvF0NqFLMHa1AqCC2-MJbG31pqVBcpiSYVmYNRMG0";

const formEl=document.querySelector('form')
const inputEl=document.getElementById('search-input');
const searchResults=document.querySelector('.search-results');
const showMore=document.getElementById("show-more-button");

let inputData=""
let page=1;

async function searchImages(){
    inputData=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const responce=await fetch(url);
    const data= await responce.json();
    const results=data.results;

    if(page==1){
         searchResults.innerHTML=""
    }


    results.map((result)=>{
        const imageWrappper=document.createElement('div');
        imageWrappper.classList.add('search-result');
        const image=document.createElement('img')
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a")
        imageLink.href=result.links.html;
        imageLink.target='_blank';
        imageLink.textContent=result.alt_description;


        imageWrappper.appendChild(image);
        imageWrappper.appendChild(imageLink)
        searchResults .appendChild(imageWrappper)
        
    });
    page++
    if(page>1){
        showMore.style.display='block';
    }

}


formEl.addEventListener('submit',(event)=>{
    event.preventDefault();
    page=1 ;
    searchImages()
})

showMore.addEventListener('click',()=>{
    searchImages()
})