async function getData() {
    const records = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    const data = await records.json();

    let tab = '';
    data.forEach(function (user, index) {
        tab += `<tr>
                    <td><input type="checkbox" checked="checked"></td>
                    <td id="name_${index}">${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <i class="far fa-pen-to-square" onclick="editName(${index})"></i>
                        <i class="fa-solid fa-trash" onclick="deleteUser(this)"></i>
                    </td>
                </tr>`;
    });

    document.getElementById('tbody').innerHTML = tab;

    const dataTable = $('#usertable').DataTable({
        "data": data,
        "columns": [
            { "data": 'name' },
            { "data": 'email' },
            { "data": 'role' },
            { "data": 'action' }
        ]
    });

    
}

function editName(index) {
    var newName = prompt("Enter new name:", "");
    if (newName !== null && newName !== "") {
        document.getElementById(`name_${index}`).textContent = newName;
    } else {
        alert("Please enter a valid name.");
    }
}

function deleteUser(icon) {
    if (confirm('Are you sure you want to delete?')) {
        let row = icon.closest('tr');
        row.remove();
    }
}

getData();



function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("usertable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Index changed to 1 for the "Name" column
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}




