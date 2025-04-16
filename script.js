document.addEventListener("DOMContentLoaded", function () {
  let data = [
    { id: 1, name: "Apple", date: "2025-04-01", category: "Fruit" },
    { id: 2, name: "Carrot", date: "2025-04-05", category: "Vegetable" },
  ];

  const tableBody = document.getElementById("tableBody");

  function renderTable(filter = "") {
    tableBody.innerHTML = ""; // Clear existing rows
    data
      .filter(item => item.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach(item => {
        const row = document.createElement("tr");

        ["id", "name", "date", "category"].forEach(key => {
          const cell = document.createElement("td");
          cell.textContent = item[key];
          row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        actionCell.className = "actions";

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.onclick = () => alert(`Edit ${item.name}`);

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.onclick = () => {
          data = data.filter(d => d.id !== item.id);
          renderTable();
        };

        actionCell.appendChild(btnEdit);
        actionCell.appendChild(btnDelete);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
      });
  }

  document.getElementById("btnSearch").onclick = () => {
    const filterText = document.getElementById("filterName").value;
    renderTable(filterText);
  };

  document.getElementById("btnAdd").onclick = () => {
    const newId = data.length + 1;
    data.push({
      id: newId,
      name: "New Item " + newId,
      date: new Date().toISOString().split("T")[0],
      category: "Unknown"
    });
    renderTable();
  };

  // Initial render
  renderTable();
});