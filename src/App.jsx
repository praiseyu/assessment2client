import AddEventForm from "./components/AddEventForm/AddEventForm";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EditEventForm from "./components/EditEventForm/EditEventForm";
import EventDetailsPage from "./pages/EventDetailsPage/EventDetailsPage";
import AddAttendeeForm from "./pages/AttendeeManagement/AddAttendeeForm";
import LandingPage from "./pages/LandingPage/EventCalendar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/attendees/add" element={<AddAttendeeForm />} />
          <Route path="/addevent" element={<AddEventForm />} />
          <Route path="/events/edit/:eventId" element={<EditEventForm />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
