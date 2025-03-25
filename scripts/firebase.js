// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMk877CvCRy8mTKgX6XPnVXggLsjwRjNY",
  authDomain: "professional-portfolio-1a3c8.firebaseapp.com",
  projectId: "professional-portfolio-1a3c8",
  storageBucket: "professional-portfolio-1a3c8.firebasestorage.app",
  messagingSenderId: "129184140142",
  appId: "1:129184140142:web:ca6a7dcc9df71298f1cf7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to validate email format
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to validate phone number (allows `+` at start and 7-15 digits)
function isValidPhone(phone) {
    const phonePattern = /^\+\d{7,15}$/;  // Ensures `+` followed by 7-15 digits
    return phonePattern.test(phone);
}

// Restrict phone input to numbers and make `+` non-deletable
const phoneInput = document.getElementById('phonerequest');
if (phoneInput) {
    phoneInput.addEventListener('focus', function () {
        if (!this.value.startsWith('+')) {
            this.value = '+';
        }
    });
    
    phoneInput.addEventListener('input', function () {
        let inputValue = this.value;
    
        // Ensure `+` is always at the beginning
        if (!inputValue.startsWith('+')) {
            inputValue = '+' + inputValue.replace(/\+/g, '');
        }
    
        // Remove any non-numeric characters except `+`
        inputValue = inputValue.replace(/[^\d+]/g, '');
    
        this.value = inputValue;
    });
    
    // Prevent `+` from being deleted when pressing backspace
    phoneInput.addEventListener('keydown', function (e) {
        if (this.selectionStart === 1 && e.key === 'Backspace') {
            e.preventDefault(); // Prevent deletion of `+`
        }
    });
}
const phoneInputrequest = document.getElementById('phonerequest');
if (phoneInputrequest) {
    phoneInputrequest.addEventListener('focus', function () {
        if (!this.value.startsWith('+')) {
            this.value = '+';
        }
    });
    
    phoneInputrequest.addEventListener('input', function () {
        let inputValue = this.value;
    
        // Ensure `+` is always at the beginning
        if (!inputValue.startsWith('+')) {
            inputValue = '+' + inputValue.replace(/\+/g, '');
        }
    
        // Remove any non-numeric characters except `+`
        inputValue = inputValue.replace(/[^\d+]/g, '');
    
        this.value = inputValue;
    });
    
    // Prevent `+` from being deleted when pressing backspace
    phoneInputrequest.addEventListener('keydown', function (e) {
        if (this.selectionStart === 1 && e.key === 'Backspace') {
            e.preventDefault(); // Prevent deletion of `+`
        }
    });
}

const companyCheckbox = document.getElementById("individual");
const organizationCheckbox = document.getElementById("organization");
document.addEventListener("DOMContentLoaded", function () {

if(companyCheckbox){
    companyCheckbox.addEventListener("change", function () {
        if (this.checked) {
            organizationCheckbox.checked = false;
            console.log(getSelectedValue())
        }
    });

}
if(organizationCheckbox){
    organizationCheckbox.addEventListener("change", function () {
        if (this.checked) {
            companyCheckbox.checked = false;
            console.log(getSelectedValue())
        }

    });
}

});


function getSelectedValue() {
    const selected = document.querySelector('input[name="r"]:checked');
    return selected ? selected.value : null;
}
if (document.getElementById('submitButton')) {
    document.getElementById('submitButton').addEventListener('click', async function (e) {
        e.preventDefault(); // Prevent default form submission
    
        // Retrieve values from inputs
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
    
    
        // Validation
        if (!firstName || !lastName || !email || !phone  ) {
            alert("Please fill in all fields.");
            return;
        }
    
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (!isValidPhone(phone)) {
            alert("Please enter a valid phone number (7-15 digits, starts with +).");
            return;
        }
    
        // Add data to Firestore
        try {
            const docRef = await addDoc(collection(db, "contact"), {
                firstName,
                lastName,
                email,
                phone,
                message
            });
    
            // GSAP animation
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(() => tl.reverse(), 1000); // Delay before reversing
                }
            });
    
            tl.to(".line", { width: "100%", duration: 0.3, ease: "power4.out" })
              .to(".line", { height: "100%", duration: 0.3, ease: "power4.out", transformOrigin: "center center" })
              .to(".text-container", { opacity: 1, duration: 0.5, ease: "power2.out" })
              .to(".text-container span", {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.5,
                  ease: "power4.out",
                  stagger: 0.1
              });
    
            // Clear the form after submission
            document.getElementById('firstName').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '+';
            document.getElementById('message').value = '';
    
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to submit information.');
        }
    });
}

if (document.getElementById('submitButtonrequest')) {
    document.getElementById('submitButtonrequest').addEventListener('click', async function (e) {
        e.preventDefault(); // Prevent default form submission
    
        // Retrieve values from inputs
        const fullname = document.getElementById('fullname').value.trim();
        const emailrequest = document.getElementById('emailrequest').value.trim();
        const phonerequest = document.getElementById('phonerequest').value.trim();
        const projecttype = document.getElementById('projecttype').value.trim();
        const referance = document.getElementById('referance').value.trim();
        const messagerequest = document.getElementById('messagerequest').value.trim();
        const clienttype = getSelectedValue();
    
    
        // Validation
        if (!fullname || !emailrequest || !phonerequest || !projecttype || !referance || !clienttype  ) {
            alert("Please fill in all fields.");
            return;
        }
    
        if (!isValidEmail(emailrequest)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        if (!isValidPhone(phonerequest)) {
            alert("Please enter a valid phone number (7-15 digits, starts with +).");
            return;
        }
    
        // Add data to Firestore
        try {
            const docRef = await addDoc(collection(db, "requestproject"), {
                fullname,
                emailrequest,
                phonerequest,
                projecttype,
                referance,
                clienttype,
                messagerequest
            });
    
            // GSAP animation
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(() => tl.reverse(), 1000); // Delay before reversing
                }
            });
    
            tl.to(".line", { width: "100%", duration: 0.3, ease: "power4.out" })
              .to(".line", { height: "100%", duration: 0.3, ease: "power4.out", transformOrigin: "center center" })
              .to(".text-container", { opacity: 1, duration: 0.5, ease: "power2.out" })
              .to(".text-container span", {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.5,
                  ease: "power4.out",
                  stagger: 0.1
              });
    
            // Clear the form after submission
            document.getElementById('fullname').value = '';
            document.getElementById('emailrequest').value = '';
            document.getElementById('projecttype').value = '';
            document.getElementById('phonerequest').value = '+';
            document.getElementById('referance').value = '';
            document.getElementById('messagerequest').value = '';
    
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Failed to submit information.');
        }
    });
}
// Handle form submission

