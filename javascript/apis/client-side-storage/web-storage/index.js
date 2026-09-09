// create needed constants
const rememberDiv = document.querySelector('.remember');
const forgetDiv = document.querySelector('.forget');
const form = document.querySelector('form');
const nameInput = document.querySelector('#entername');
const submitBtn = document.querySelector('#submitname');
const forgetBtn = document.querySelector('#forgetname');

const h1 = document.querySelector('h1');
const personalGreeting = document.querySelector('.personal-greeting');

// Stop the form from submitting when a button is pressed
form.addEventListener('submit', e => e.preventDefault());

// run function when the '打招呼' button is clicked
submitBtn.addEventListener('click', () => {
  // store the entered name in web storage
  localStorage.setItem('name', nameInput.value);
  // run nameDisplayCheck() to sort out displaying the personalized greetings and updating the form display
  nameDisplayCheck();
});

// run function when the '忘记' button is clicked
forgetBtn.addEventListener('click', () => {
  // Remove the stored name from web storage
  localStorage.removeItem('name');
  // run nameDisplayCheck() to sort out displaying the generic greeting again and updating the form display
  nameDisplayCheck();
});

// define the nameDisplayCheck() function
function nameDisplayCheck() {
  // check whether the 'name' data item is stored in web Storage
  if(localStorage.getItem('name')) {
    // If it is, display personalized greeting
    const name = localStorage.getItem('name');
    h1.textContent = `欢迎，${name}`;
    personalGreeting.textContent = `欢迎来到我们的网站，${name}！希望你在这里玩得开心。`;
    // hide the 'remember' part of the form and show the 'forget' part
    forgetDiv.style.display = 'block';
    rememberDiv.style.display = 'none';
  } else {
    // if not, display generic greeting
    h1.textContent = '欢迎来到我们的网站 ';
    personalGreeting.textContent = '欢迎来到我们的网站。希望你在这里玩得开心。';
    // hide the 'forget' part of the form and show the 'remember' part
    forgetDiv.style.display = 'none';
    rememberDiv.style.display = 'block';
  }
}

// run nameDisplayCheck() when the page first loads to check wether a personal name was previously
// set, and if so display the personalized greeting. If not, show the generic greeting
nameDisplayCheck();
