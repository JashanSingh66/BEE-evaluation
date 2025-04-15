// Toggle Tabs
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authContainer = document.getElementById("authContainer");
const mainContent = document.getElementById("mainContent");

// Switch Tabs
loginTab.onclick = () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active-form");
  signupForm.classList.remove("active-form");
};

signupTab.onclick = () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active-form");
  loginForm.classList.remove("active-form");
};

// Fake Login & Redirect
loginForm.onsubmit = (e) => {
  e.preventDefault();
  authContainer.style.display = "none";
  mainContent.style.display = "block";
};

signupForm.onsubmit = (e) => {
  e.preventDefault();
  authContainer.style.display = "none";
  mainContent.style.display = "block";
};

// Page Navigation
const navLinks = document.querySelectorAll(".navbar a");
const pages = document.querySelectorAll(".page");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-page");
    pages.forEach((page) => {
      page.classList.remove("active");
    });
    document.getElementById(target).classList.add("active");
  });
});
