// ==== MOBILE MENU TOGGLE ====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("nav ul");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector("main");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  sidebar.classList.toggle("active");
  main.classList.toggle("shifted");
});

// ==== FORM VALIDATION ====
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    if (!name.value || !email.value || !message.value) {
      e.preventDefault();
      alert("Please fill in all fields before submitting.");
    }
  });
}

// ==== FETCH AND DISPLAY EVENTS ====
const fetchEvents = async () => {
  try {
    const response = await fetch("event.json"); // use "../event.json" if your page is in a subfolder
    if (!response.ok) throw new Error("Failed to load event.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading events:", error);
    return null;
  }
};

const displayEvents = (events) => {
  const eventList = document.getElementById("event-list");
  if (!eventList) return;

  eventList.innerHTML = ""; // Clear previous events

  events.events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");
    eventCard.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.description}</p>
    `;
    eventList.appendChild(eventCard);
  });
};

// Load events on page load
document.addEventListener("DOMContentLoaded", async () => {
  const events = await fetchEvents();
  if (events) {
    displayEvents(events);
  } else {
    const eventList = document.getElementById("event-list");
    if (eventList) eventList.innerHTML = "<p>Oops! Can't load events, try again later.</p>";
  }
});

// Fetch the JSON file
const fetchEventData = async () => {
  const response = await fetch('event.json');
  const data = await response.json();
  return data.events;
}
document.addEventListener("DOMContentLoaded", function () {
  // Initialize FullCalendar
  const calendarEl = document.getElementById("calendar");
  if (calendarEl) {
    fetch("event.json")
      .then((response) => response.json())
      .then((data) => {
        // Convert your event.json events to FullCalendar format
        const events = data.events.map((event) => ({
          title: event.title,
          start: event.date, // Make sure your date is in YYYY-MM-DD format
          description: event.description,
        }));

        const calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: "dayGridMonth",
          events: events,
          eventClick: function (info) {
            // Show event details on click
            alert(info.event.title + "\n\n" + info.event.extendedProps.description);
          },
        });
        calendar.render();
      })
      .catch((error) => {
        calendarEl.innerHTML = "<p>Unable to load calendar events.</p>";
      });
  }

  // (Optional) Also show events as cards in #event-list
  const eventList = document.getElementById("event-list");
  if (eventList) {
    fetch("event.json")
      .then((response) => response.json())
      .then((data) => {
        eventList.innerHTML = "";
        data.events.forEach((event) => {
          const eventCard = document.createElement("div");
          eventCard.classList.add("event-card");
          eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
          `;
          eventList.appendChild(eventCard);
        });
      });
  }
});
// FADE-IN ON SCROLL
const fadeSections = document.querySelectorAll(".fade-in-section");

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // Optional: stop observing after visible
    }
  });
}, { threshold: 0.2 });

fadeSections.forEach(section => {
  appearOnScroll.observe(section);
});
const calendarEvents = eventData.events
    .filter(ev => /^\d{4}-\d{2}-\d{2}$/.test(ev.date)) // only use exact dates
    .map(ev => ({
        title: ev.title,
        start: ev.date
    }));

var calendarEl = document.getElementById('calendar');
var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: calendarEvents
});

calendar.render();
const eventListEl = document.getElementById('event-list');
eventData.events.forEach(ev => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${ev.title}</strong> (${ev.date})<br>
                     ${ev.time} | ${ev.location}<br>
                     ${ev.description}`;
    div.style.marginBottom = '10px';
    eventListEl.appendChild(div);
});
