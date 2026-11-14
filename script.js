// Store students in array
let students = [];

// Load students from localStorage on page load
window.onload = function() {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
        students = JSON.parse(savedStudents);
        displayStudents();
    }
};

// Add Student Function
document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const course = document.getElementById('course').value;
    
    // Check if ID already exists
    if (students.find(s => s.id === id)) {
        alert('Student with this ID already exists!');
        return;
    }
    
    const student = {
        id,
        name,
        email,
        course
    };
    
    students.push(student);
    saveStudents();
    displayStudents();
    clearForm();
    alert('Student added successfully!');
});

// Display Students Function
function displayStudents() {
    const tbody = document.getElementById('studentList');
    tbody.innerHTML = '';
    
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No students found. Add a student to get started!</td></tr>';
        return;
    }
    
    students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td class="action-btns">
                <button class="edit-btn" onclick="editStudent('${student.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Delete Student Function
function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        saveStudents();
        displayStudents();
    }
}

// Search Function
function searchStudent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) || 
        student.id.toLowerCase().includes(searchTerm)
    );
    
    // Temporarily replace students array for display
    const originalLength = students.length;
    const tempStudents = [...students];
    students = filteredStudents;
    displayStudents();
    
    // Restore original array after search
    setTimeout(() => {
        students = tempStudents;
    }, 100);
}

// Edit Student Function
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('course').value = student.course;
        
        // Show edit message
        alert(`Editing: ${student.name}`);
    }
}

// Save to localStorage
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

// Clear Form
function clearForm() {
    document.getElementById('addStudentForm').reset();
}

// Add enter key support for search
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchStudent();
    }
});