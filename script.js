const API_KEY = "24875c6d82af41f39bc28596d25e147b" ;
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
};

function bindData(articles){ 
     const cardsContainer = document.getElementById("cards-container");
     const newsCardTemplate = document.getElementById('template-news-card');

     cardsContainer.innerHTML = '';
     articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
     });

}
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.PubllishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
}


let curSlectedNav = null ;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSlectedNav?.classList.remove('active');
    curSlectedNav = navItem;
    curSlectedNav.classList.add('active');
}


const searchBtn = document.getElementById('search-btn');
const searchText = document.getElementById('seach-text');

searchBtn.addEventListener('click',()=>{
  const query = searchText.value;
  if(!query) return;
  fetchNews(query);
  curSlectedNav?.classList.remove("active");
  curSlectedNav = null ;
});