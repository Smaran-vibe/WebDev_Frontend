console.log("JavaScript initializing....");


const outageData = [
    {
        area: "Baneshwar, Kathmandu",
        time: "10:30 AM – 12:00 PM",
        reason: "Line maintenance work",
        status: "scheduled",
        restoration: "12:00 PM"
    },
    {
        area: "Koteshwor, Kathmandu",
        time: "09:00 AM – 02:00 PM",
        reason: "Pole installation & reconductoring",
        status: "active",
        restoration: "2:00 PM"
    },
    {
        area: "Kirtipur, Kathmandu",
        time: "02:00 PM – 05:00 PM",
        reason: "Underground cable installation",
        status: "scheduled",
        restoration: "5:00 PM"
    },
    {
        area: "Patan, Lalitpur",
        time: "06:00 AM – 08:30 AM",
        reason: "Transformer upgrade work",
        status: "restored",
        restoration: "8:15 AM"
    }
];

function getStatusBadge(status) {
    if (status === "active") {
        return `<span class="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span class="blink inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span> Active
            </span>`;
    } else if (status === "scheduled") {
        return `<span class="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Scheduled</span>`;
    } else {
        return `<span class="bg-gray-200 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">Restored</span>`;
    }
}

function getFooter(status, restoration) {
    if (status === "active") {
        return `<p class="text-xs flex items-center gap-1 text-red-400 font-medium">⚠ Currently active — power is OFF</p>`;
    } else if (status === "restored") {
        return `<p class="text-xs flex gap-1 items-center text-green-500 font-medium">✔ Power restored at ${restoration}</p>`;
    } else {
        return `<p class="text-xs text-gray-400">Estimated restoration by ${restoration}</p>`;
    }
}

function renderCards(results) {
    const grid = document.getElementById("outage-grid");

    if (results.length === 0) {
        grid.innerHTML = `<div class="col-span-4 text-center py-10 text-gray-400">
                        No outages found for that area. Try a different ward name.
                      </div>`;
        return;
    }

    grid.innerHTML = results.map(outage => `
    <div class="bg-white rounded-xl border ${outage.status === 'active' ? 'border-red-200 ring-2 ring-red-100' : 'border-gray-100'} shadow-sm p-5 flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Area</span>
        ${getStatusBadge(outage.status)}
      </div>
      <h3 class="text-base font-bold text-gray-800">${outage.area}</h3>
      <p class="text-sm flex gap-1 text-gray-500"><svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" class="w-5 h-5 stroke-current" fill="none" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M12 7v5l3 3"></path>
                        </svg> ${outage.time}</p>
      <p class="text-sm text-gray-600"><span class="font-medium text-gray-700">Reason:</span> ${outage.reason}</p>
      <div class="mt-auto pt-3 border-t border-gray-100">
        ${getFooter(outage.status, outage.restoration)}
      </div>
    </div>
  `).join("");
}

function handleSearch() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();

    const results = query
        ? outageData.filter(o => o.area.toLowerCase().includes(query))
        : outageData;

    renderCards(results);


    document.getElementById("power-cuts").scrollIntoView({ behavior: "smooth" });
}


document.getElementById("search-btn").addEventListener("click", handleSearch);
document.getElementById("search-input").addEventListener("keydown", e => {
    if (e.key === "Enter") handleSearch();
});

const maintenanceData = [
    { date: "2026-06-28", area: "Baneshwar, KTM", work: "Line maintenance", time: "10:30 AM – 12:00 PM", status: "upcoming" },
    { date: "2026-06-30", area: "Koteshwor, KTM", work: "Pole installation", time: "09:00 AM – 02:00 PM", status: "active" },
    { date: "2026-07-01", area: "Sanepa, Lalitpur", work: "Underground cable", time: "02:00 PM – 05:00 PM", status: "upcoming" },
    { date: "2026-07-02", area: "Chabahil, KTM", work: "Transformer upgrade", time: "08:00 AM – 11:00 AM", status: "planned" },
    { date: "2026-07-08", area: "Bhaktapur Durbar", work: "Reconductoring", time: "10:00 AM – 03:00 PM", status: "planned" },
    { date: "2026-07-10", area: "Patan, Lalitpur", work: "Transformer upgrade", time: "06:00 AM – 08:30 AM", status: "completed" },
];

function getCalendarBadge(status) {
    const styles = {
        upcoming: "bg-green-100 text-green-700",
        active: "bg-red-100 text-red-700",
        planned: "bg-blue-100 text-blue-700",
        completed: "bg-gray-200 text-gray-500",
    };
    const labels = {
        upcoming: "Upcoming", active: "Active", planned: "Planned", completed: "Completed"
    };
    return `<span class="${styles[status]} text-xs font-bold px-2 py-0.5 rounded-full">${labels[status]}</span>`;
}

function renderCalendar(data) {
    const tbody = document.getElementById("calendar-body");
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-8 text-gray-400">No records found.</td></tr>`;
        return;
    }
    tbody.innerHTML = data.map((row, i) => `
    <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors">
      <td class="px-5 py-4 font-medium text-gray-700">${row.date}</td>
      <td class="px-5 py-4">${row.area}</td>
      <td class="px-5 py-4">${row.work}</td>
      <td class="px-5 py-4">${row.time}</td>
      <td class="px-5 py-4">${getCalendarBadge(row.status)}</td>
    </tr>
  `).join("");
}

// Filter by status
function filterCalendar() {
    const selected = document.getElementById("status-filter").value;
    const filtered = selected === "all"
        ? maintenanceData
        : maintenanceData.filter(r => r.status === selected);
    renderCalendar(filtered);
}

// Sort by date
function sortByDate() {
    const sorted = [...maintenanceData].sort((a, b) => new Date(a.date) - new Date(b.date));
    renderCalendar(sorted);
}

// Initial render
renderCalendar(maintenanceData);

document.getElementById("status-filter").addEventListener("change", filterCalendar);
document.getElementById("sort-date-btn").addEventListener("click", sortByDate);

// Save report to localStorage
function saveReport(report) {
    const existing = JSON.parse(localStorage.getItem("poweralert-reports") || "[]");
    existing.push(report);
    localStorage.setItem("poweralert-reports", JSON.stringify(existing));
}

// Validate and submit
function handleReportSubmit() {
    const name = document.getElementById("report-name").value.trim();
    const area = document.getElementById("report-area").value.trim();
    const issue = document.getElementById("report-issue").value;
    const details = document.getElementById("report-details").value.trim();

    // Validation
    if (!name) return showError("report-name-error", "Name is required.");
    if (!area) return showError("report-area-error", "Area is required.");
    if (!issue) return showError("report-issue-error", "Please select an issue type.");
    if (!details) return showError("report-details-error", "Please describe the issue.");

    clearErrors();

    const report = {
        id: Date.now(),
        name,
        area,
        issue,
        details,
        submittedAt: new Date().toLocaleString()
    };

    saveReport(report);
    showSuccessMessage();
    loadSubmittedReports();
    document.getElementById("report-name").value = "";
    document.getElementById("report-area").value = "";
    document.getElementById("report-issue").selectedIndex = 0;
    document.getElementById("report-details").value = "";
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    ["report-name-error", "report-area-error",
        "report-issue-error", "report-details-error"]
        .forEach(id => document.getElementById(id).textContent = "");
}

function showSuccessMessage() {
    const msg = document.getElementById("report-success");
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 4000);
}

// Load and display saved reports
function loadSubmittedReports() {
    const reports = JSON.parse(localStorage.getItem("poweralert-reports") || "[]");
    const container = document.getElementById("submitted-reports");

    if (reports.length === 0) {
        container.innerHTML = `<p class="text-sm text-gray-400 text-center">No reports submitted yet.</p>`;
        return;
    }

    container.innerHTML = reports.reverse().map(r => `
    <div class="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div class="flex justify-between items-start mb-1">
        <p class="font-semibold text-gray-800 text-sm">${r.name} — ${r.area}</p>
        <span class="text-xs text-gray-400">${r.submittedAt}</span>
      </div>
      <p class="text-xs text-blue-600 font-medium mb-1">${r.issue}</p>
      <p class="text-sm text-gray-600">${r.details}</p>
    </div>
  `).join("");
}

document.getElementById("submit-report-btn").addEventListener("click", handleReportSubmit);


loadSubmittedReports();

// localStorage.clear();

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleContactSubmit() {
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    clearContactErrors();

    let isValid = true;

    if (!name) {
        showContactError("contact-name-error", "Name is required.");
        isValid = false;
    }

    if (!email) {
        showContactError("contact-email-error", "Email is required.");
        isValid = false;
    } else if (!validateEmail(email)) {
        showContactError("contact-email-error", "Please enter a valid email address.");
        isValid = false;
    }

    if (!message) {
        showContactError("contact-message-error", "Message cannot be empty.");
        isValid = false;
    } else if (message.length < 10) {
        showContactError("contact-message-error", "Message must be at least 10 characters.");
        isValid = false;
    }

    if (!isValid) return;

    showContactSuccess();
    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-message").value = "";
}

function showContactError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearContactErrors() {
    ["contact-name-error", "contact-email-error", "contact-message-error"]
        .forEach(id => document.getElementById(id).textContent = "");
}

function showContactSuccess() {
    const msg = document.getElementById("contact-success");
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 4000);
}

document.getElementById("contact-submit-btn").addEventListener("click", handleContactSubmit);
