/* SCROLL STORY */
const stories=document.querySelectorAll(".story");
const obs=new IntersectionObserver(e=>{
  e.forEach(x=>x.target.classList.toggle("active",x.isIntersecting))
},{threshold:.3});
stories.forEach(s=>obs.observe(s));

/* NIGHT */
document.getElementById("night").onclick=()=>{
  document.body.classList.toggle("night");
};

/* DRAG & DROP IMAGE */
document.querySelectorAll(".drop-img").forEach(img=>{
  img.addEventListener("dragover",e=>e.preventDefault());
  img.addEventListener("drop",e=>{
    const f=e.dataTransfer.files[0];
    if(!f)return;
    const r=new FileReader();
    r.onload=()=>img.src=r.result;
    r.readAsDataURL(f);
  });
});

/* BOOK ADMIN */
const bookList=document.getElementById("bookList");
let books=JSON.parse(localStorage.getItem("books"))||[];
function renderBooks(){
  bookList.innerHTML="";
  books.forEach(b=>{
    bookList.innerHTML+=`
      <div class="book">
        <img class="drop-img">
        <div>${b}</div>
      </div>`;
  });
}
renderBooks();

function addBook(){
  const n=document.getElementById("bookName").value;
  if(!n)return;
  books.push(n);
  localStorage.setItem("books",JSON.stringify(books));
  renderBooks();
}

/* REVIEWS */
let reviews=JSON.parse(localStorage.getItem("reviews"))||[];
function addReview(){
  const n=rName.value,t=rText.value,f=rImg.files[0];
  if(!n||!t)return;
  const r={n,t};
  if(f){
    const rd=new FileReader();
    rd.onload=()=>{r.img=rd.result;save(r)};
    rd.readAsDataURL(f);
  }else save(r);
}
function save(r){
  reviews.push(r);
  localStorage.setItem("reviews",JSON.stringify(reviews));
  location.reload();
}
reviews.forEach(r=>{
  reviewList.innerHTML+=`
    <div class="review">
      <strong>${r.n}</strong>
      <p>${r.t}</p>
      ${r.img?`<img src="${r.img}" style="width:100%">`:""}
    </div>`;
});
