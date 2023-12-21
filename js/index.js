var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var bookmarks = [];

function bookmarkList() {
      if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
        siteName: capitalize(siteName.value),
        siteURL: siteURL.value,
      };
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
      displayBookmark(bookmarks.length - 1);
    clearInput();
      siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } 
  else {
    document.getElementById("box-info").classList.remove("d-none");
  }
}
if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var i = 0; i < bookmarks.length; i++) {
    displayBookmark(i);
  }
}
function displayBookmark(index) {
  var userURL = bookmarks[index].siteURL;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");  } 
      else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
var newBookmark = `
    <tr>
        <td>${index+1}</td>
        <td>${bookmarks[index].siteName}</td>              
        <td>
        <button class="btn btn-visit" onclick='visitWebsite(${index})'>
            <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
        </td>
        <td>
        <button class="btn btn-delete pe-2" onclick='deleteWebsite(${index})'>
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button>
        </td>
    </tr>`;
    document.getElementById("tableContent").innerHTML += newBookmark;
}
function deleteWebsite(index) {
    document.getElementById("tableContent").innerHTML = "";
    bookmarks.splice(index, 1);
    for (var i= 0; i < bookmarks.length; i++) {
        displayBookmark(i);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}
function visitWebsite(index) {
  var websiteIndex = index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
  }
}
function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}
function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}
var nameRegex = /^\w{3,}(\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
// var nameRegex = /^\w{3,}(\s+\w+)*$/;
function validSiteName() {
  validate(siteName, nameRegex);
}
function validSiteURL() {
  validate(siteURL, urlRegex);
}
function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
function closeModal() {
 document.getElementById("box-info").classList.add("d-none");
}

