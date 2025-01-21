function renderWeatherInfo(githubProfileInfo){
    // firstly,we have to fetch the element 

    // Select elements for showing the user data on the UI
    const profileImage = document.querySelector('[data-profileImage]');
    const userName = document.querySelector('[data-name]');
    const dateJoined = document.querySelector('[data-datejoined]');
    const description = document.querySelector('[data-decription]');

    // Select elements for user popularity information
    const reposCount = document.querySelector('.repos-count');
    const followersCount = document.querySelector('.follwers-count'); 
    const followingCount = document.querySelector('.following-count');
    const location = document.querySelector("[data-location]");

    profileImage.src = githubProfileInfo?.avatar_url; 
    userName.textContent = githubProfileInfo?.name || data?.login; 
    dateJoined.textContent = `Joined: ${new Date(githubProfileInfo?.created_at).toDateString()}`; 
    description.textContent = githubProfileInfo?.bio || "No bio available";
    reposCount.textContent = githubProfileInfo?.public_repos;
    followersCount.textContent = githubProfileInfo?.followers;
    followingCount.textContent = githubProfileInfo?.following;
    if(githubProfileInfo.location){
        location.classList.add("active");
        location.textContent = githubProfileInfo?.location;
    }
    
}


const searchForm = document.querySelector("[data-searchForm]");
const searchInput = document.querySelector("[ data-searchInput]");
const userInfoContainr = document.querySelector(".user-info-container");
const loadingForm = document.querySelector(".loading-container");
userInfoContainr.classList.remove("active");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let userName = searchInput.value.trim();    ;
    if(userName == ""){
        return;
    }
    fetchSearchWeatherInfo(userName);
})

async function fetchSearchWeatherInfo(userName){
        loadingForm.classList.add("active");
    try{
        const response = await fetch(`https://api.github.com/users/${userName}`);
        const data = await response.json();

        console.log(data);
        loadingForm.classList.remove("active");
        userInfoContainr.classList.add("active");
        renderWeatherInfo(data);
    }catch(error){
        console.log(error);
    }
}

