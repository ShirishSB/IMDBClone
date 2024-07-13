//Query Selector for fav-item Class 

var movieDetail = document.querySelector('.fav-item');

// if movie is not null then add Event Listener on movieDetails 
// when you click on resulted movie then async function singleMovie is called for that movie
if(movieDetail){
    movieDetail.addEventListener('click',singleMovie);
}


//const key = '6a27ce71';

//to get the full details of movie
async function singleMovie(){

  var urlQueryParams = new URLSearchParams(window.location.search);
    var id1 = urlQueryParams.get('id');
    console.log(id1);
    const url = `https://www.omdbapi.com/?i=${id1}&apikey=6a27ce71`;
    const res = await fetch(`${url}`);
    const data = await res.json();
    // Making the output html by string interpolition
    var output = `

    <div class="main-movie-poster">
        <img src=${data.Poster} alt="Movie Poster">
    </div>
    <div class="full-movie-details">
        <div class="details-header">
            <div class="dh-ls">
                <h2>${data.Title}</h2>
            </div>
            <div class ="fa-heart-text" >
                 <i></i>
                </div>
                <div class="dh-rs">
            </div>
        </div>
        <span class="italics-text" style="font-size: 20px;font-weight: bold;"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                    style="font-size: 20px; font-weight: bold;">${data.imdbRating}</span>/10 </i></span>
        <ul class="details-ul">
            <li><strong>Actors: </strong>${data.Actors}</li>
            <li><strong>Director: </strong>${data.Director}</li>
            <li><strong>Writers: </strong>${data.Writer}</li>
        </ul>
        <ul class="details-ul-1">
            <li><strong>Genre: </strong>${data.Genre}</li>
            <li><strong>Box Office: </strong>${data.BoxOffice}</li>
            <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
        </ul>
        <p style="font-size: 14px;font-weight: bold; margin-top:10px;">${data.Plot}</p>
        <p style="font-size: 15px;font-weight: bold; font-style: italic; color: #222; margin-top: 10px;">
            <i class="fa-solid fa-award"></i>
            &thinsp; ${data.Awards}
        </p>
    </div> 
    `
    // Appending the output
    document.querySelector('.movie-details-container').innerHTML = output;

    
}
//async function to remove movie from favourite List
async function removefromFavList(id){
    for(i in localStorage){
        if(localStorage[i]==id){
            localStorage.removeItem(i);
            break;
        }
    }
    alert("item has been removed from favourite list");
    window.location.replace('favourite.html');

}

//async function to display Favourite movies List

async function displayFavouriteList(){
    var output ='';
    for(i in localStorage){
        var id = localStorage.getItem(i);
        if(id!=null){
            const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=6a27ce71`);
            const data = await res.json();
            console.log(data);



            var image = ''
            if (data.Poster) {
                image = data.Poster
            }
            else { image = data.Title }
            var Id = data.imdbID;
            //Adding all the movie html in the output using interpolition
            output += `

        <div class="fav-item">
            <div class="fav-poster">
                <a href="movie.html?id=${id}"><img src=${image} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name" style="font-size: 25px" font-weight: bold;>${data.Title} | ${data.Year}</p>
                        <p class="fav-movie-rating"><span
                                style="font-size: 25px; font-weight: bold;">${data.imdbRating}</span>/10</p>
                            <div style="color: maroon">
                        <i class="fa-solid fa-trash" style="cursor:pointer;" onClick=removefromFavList('${Id}')></i>
                    </div>
                        
                    </div>
                </div>
            </div>
        </div>

       `;
        }

    }
    //Appending the html to the movie-display class in favorites page 
    document.querySelector('.fav-details-container').innerHTML = output;
        }