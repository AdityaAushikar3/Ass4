// Employee Registration System - Clean & Simple JS

// Array to store registered employees
let employees = [];
let nextEmpId = 101;

// Get form and input references
const employeeForm = document.getElementById("employeeForm");
const empName = document.getElementById("empName");
const empEmail = document.getElementById("empEmail");
const empPassword = document.getElementById("empPassword");
const empPhone = document.getElementById("empPhone");
const empDept = document.getElementById("empDept");

// Get error element references
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const phoneError = document.getElementById("phoneError");
const deptError = document.getElementById("deptError");

// Function to clear all error messages
function clearErrors() {
  nameError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";
  phoneError.innerText = "";
  deptError.innerText = "";

  empName.classList.remove("input-error");
  empEmail.classList.remove("input-error");
  empPassword.classList.remove("input-error");
  empPhone.classList.remove("input-error");
  empDept.classList.remove("input-error");
}

// Function to validate all fields
function validateForm() {
  clearErrors();
  let isValid = true;

  // 1. Validate Name (only letters and spaces, min 3 characters)
  let nameValue = empName.value.trim();
  let nameRegex = /^[a-zA-Z\s]+$/;

  if (nameValue === "") {
    nameError.innerText = "Full name is required.";
    empName.classList.add("input-error");
    isValid = false;
  } else if (!nameRegex.test(nameValue)) {
    nameError.innerText = "Name can only contain alphabets and spaces.";
    empName.classList.add("input-error");
    isValid = false;
  } else if (nameValue.length < 3) {
    nameError.innerText = "Name must be at least 3 characters long.";
    empName.classList.add("input-error");
    isValid = false;
  }

  // 2. Validate Email
  let emailValue = empEmail.value.trim();
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === "") {
    emailError.innerText = "Email address is required.";
    empEmail.classList.add("input-error");
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    emailError.innerText = "Please enter a valid email address.";
    empEmail.classList.add("input-error");
    isValid = false;
  }

  // 3. Validate Password (min 6 characters)
  let passValue = empPassword.value;

  if (passValue === "") {
    passwordError.innerText = "Password is required.";
    empPassword.classList.add("input-error");
    isValid = false;
  } else if (passValue.length < 6) {
    passwordError.innerText = "Password must be at least 6 characters long.";
    empPassword.classList.add("input-error");
    isValid = false;
  }

  // 4. Validate Phone Number (10 digits)
  let phoneValue = empPhone.value.trim();
  let phoneRegex = /^[0-9]{10}$/;

  if (phoneValue === "") {
    phoneError.innerText = "Phone number is required.";
    empPhone.classList.add("input-error");
    isValid = false;
  } else if (!phoneRegex.test(phoneValue)) {
    phoneError.innerText = "Phone number must be exactly 10 digits.";
    empPhone.classList.add("input-error");
    isValid = false;
  }

  // 5. Validate Department
  let deptValue = empDept.value;

  if (deptValue === "") {
    deptError.innerText = "Please select a department.";
    empDept.classList.add("input-error");
    isValid = false;
  }

  return isValid;
}

// Function to update the table
function updateTable() {
  const tableBody = document.getElementById("employeeTableBody");
  const totalCount = document.getElementById("totalCount");

  tableBody.innerHTML = "";
  totalCount.innerText = employees.length;

  if (employees.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='6'>No employees registered yet.</td></tr>";
    return;
  }

  for (let i = 0; i < employees.length; i++) {
    let emp = employees[i];
    let row = document.createElement("tr");

    row.innerHTML =
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.name + "</td>" +
      "<td>" + emp.email + "</td>" +
      "<td>" + emp.phone + "</td>" +
      "<td>" + emp.dept + "</td>" +
      "<td><button type='button' class='delete-btn' onclick='deleteEmployee(" + i + ")'>Delete</button></td>";

    tableBody.appendChild(row);
  }
}

// Global delete function
window.deleteEmployee = function (index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    updateTable();
  }
};

// Form submit event
employeeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Create new employee object
  let newEmployee = {
    id: "EMP-" + nextEmpId++,
    name: empName.value.trim(),
    email: empEmail.value.trim(),
    phone: empPhone.value.trim(),
    dept: empDept.value
  };

  // Add to array
  employees.push(newEmployee);

  // Update table
  updateTable();

  // Reset form & errors
  employeeForm.reset();
  clearErrors();
  empName.focus();
});

// Clear errors on form reset button click
employeeForm.addEventListener("reset", function () {
  clearErrors();
});

// Initial table render
updateTable();
