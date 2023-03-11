// DATE FORMATTER FUNCTION
function getFormattedDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

// DOM ELEMENTS
let themeSwitch = document.querySelector("#theme-switch");
let themeText = document.getElementById("theme-text")
let iconSvg = document.querySelectorAll(".container .user-info .user-detail .user-social-info > div svg path")
let searchBtn = document.getElementById("search-btn");
let userName;
if (window.innerWidth > 768) {
    userName = document.getElementById("user-name");
} else {
    userName = document.getElementById("user-name-mobile");
}
let joinDate;
if (window.innerWidth > 768) {
    joinDate = document.getElementById("user-join-date")
} else {
    joinDate = document.getElementById("user-join-date-mobile")
}
let userImage;
if (window.innerWidth > 768) {
    userImage = document.getElementById("user-image");
} else {
    userImage = document.getElementById("user-image-mobile");
}
let userAccountName;
if (window.innerWidth > 768) {
    userAccountName = document.getElementById("user-account-name");
} else {
    userAccountName = document.getElementById("user-account-name-mobile");
}
let userBio = document.getElementById("user-bio")
let userRepoNumber = document.getElementById("user-repo-number");
let userFollower = document.getElementById("user-follower-number");
let userFollowing = document.getElementById("user-following-number");
let userLocation = document.getElementById("user-location");
let twitterUserName = document.getElementById("twitter-user-name");
let userWebsite = document.getElementById("user-website");
let userCompany = document.getElementById("user-company");
let userInfoContainer = document.getElementById("user-info");

// DARK - LIGHT MODE
themeSwitch.addEventListener("click", () => {

    themeText.innerHTML = "DARK"
    themeSwitch.classList.toggle("active");

    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeText.innerHTML = "LIGHT"
        themeText.style.color = "#fff"
        iconSvg.forEach((item) => {
            item.style.fill = "#fff"
        });
    } else {
        themeText.style.color = "#697C9A"
        iconSvg.forEach((item) => {
            item.style.fill = "#4B6A9B"
        });
    }
})

// FETCH DATA
searchBtn.addEventListener("click", () => {
    let user = document.getElementById("user").value;
    let URL = `https://api.github.com/users/${user}`;
    console.log(user);

    if (user.length == 0) {
        $("#user-info").children().css("display", "none");
        let error = document.createElement("h3");
        error.innerHTML = "The input filed cannot be empty"
        userInfoContainer.appendChild(error);
    } else {
        $("#user-info h3").remove();
        $("#user-info").children().css("display", "block");
        if (window.innerWidth < 768) {
            $("#user-info").children(".user-image").css("display", "none");
        }
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                userImage.src = data.avatar_url;
                userName.innerHTML = data.name;
                let date = new Date(data.created_at)
                joinDate.innerHTML = "Joined " + getFormattedDate(date);
                userAccountName.innerHTML = "@" + data.login;
                userBio.innerHTML = data.bio;
                userRepoNumber.innerHTML = data.public_repos;
                userFollower.innerHTML = data.followers;
                userFollowing.innerHTML = data.following;
                userLocation.innerHTML = data.location;
                if (data.twitter_username) {
                    twitterUserName.innerHTML = data.twitter_username;
                } else {
                    twitterUserName.innerHTML = "Not Available"
                }
                userWebsite.innerHTML = data.blog;
                userCompany.innerHTML = "@" + data.company;
            });
    }


})