document.addEventListener("DOMContentLoaded", function () {
  // Smooth Scroll Effect for Navigation
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = e.target.getAttribute('href');
          if (target.startsWith('#')) {
              document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
          } else {
              window.location.href = target;
          }
      });
  });

  // Navigate Programmatically
  function navigateTo(url) {
      window.location.href = url;
  }

  // SIGNUP FUNCTIONALITY
  const signupForm = document.querySelector(".signup-form");
  if (signupForm) {
      signupForm.addEventListener("submit", function (event) {
          event.preventDefault();

          console.log("Signup function running!"); // Debugging

          const name = document.getElementById("name").value.trim();
          const email = document.getElementById("email").value.trim().toLowerCase();
          const password = document.getElementById("password").value;
          const confirmPassword = document.getElementById("confirm-password").value;

          if (!name || !email || !password || !confirmPassword) {
              alert("All fields are required.");
              return;
          }
          if (password !== confirmPassword) {
              alert("Passwords do not match.");
              return;
          }

          let users = JSON.parse(localStorage.getItem("users")) || [];

          if (users.some(user => user.email === email)) {
              alert("An account with this email already exists.");
              return;
          }

          users.push({ name, email, password });
          localStorage.setItem("users", JSON.stringify(users));

          console.log("User stored:", localStorage.getItem("users")); // Debugging

          alert("Signup successful! You can now log in.");
          window.location.href = "login.html";
      });
  }

  // LOGIN FUNCTIONALITY
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
          event.preventDefault();

          console.log("Login function running!"); // Debugging

          const email = document.getElementById("email").value.trim().toLowerCase();
          const password = document.getElementById("password").value;

          if (!email || !password) {
              alert("Please enter both email and password.");
              return;
          }

          let users = JSON.parse(localStorage.getItem("users")) || [];
          console.log("Users from storage:", users); // Debugging

          const user = users.find(user => user.email === email);

          if (!user) {
              alert("No account found with this email.");
              return;
          }

          if (user.password === password) {
              alert("Login successful! Redirecting...");
              window.location.href = "dashboard.html"; // Change to the actual dashboard/home page
          } else {
              alert("Incorrect password.");
          }
      });
  }

  // EMI Calculator (Loans Page)
  if (document.title === "Loans - Banking Application") {
      document.querySelector('#calculate-emi').addEventListener('click', () => {
          const principal = parseFloat(document.querySelector('#principal').value);
          const rate = parseFloat(document.querySelector('#rate').value) / 12 / 100;
          const months = parseInt(document.querySelector('#months').value);

          if (principal && rate && months) {
              const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
              document.querySelector('#emi-result').textContent = `EMI: ₹${emi.toFixed(2)}`;
          } else {
              document.querySelector('#emi-result').textContent = "Please fill all fields.";
          }
      });
  }
});
