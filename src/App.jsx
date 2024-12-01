import AddEventForm from "./components/AddEventForm/AddEventForm";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import EditEventForm from "./components/EditEventForm/EditEventForm";
import EventDetailsPage from "./pages/EventDetailsPage/EventDetailsPage";
import AddAttendeeForm from "./pages/AddAttendeeForm/AddAttendeeForm";
import LandingPage from "./pages/LandingPage/LandingPage";
import EmailFormPage from "./pages/EmailFormPage/EmailFormPage";
import AttendeeManagementPage from "./pages/AttendeeManagement/AttendeeManagementPage";
import AttendeePage from "./pages/AttendeePage/AttendeePage";
import EventPage from "./pages/EventPage/EventPage";
import AllAttendeesPage from "./pages/AllAttendeesPage/AllAttendeesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/attendees" element={<AllAttendeesPage />} />
          <Route path="/attendees/add" element={<AttendeePage />} />
          <Route path="attendees/:attendeeId/edit" element={<AttendeePage />} />
          <Route path="/addevent" element={<AddEventForm />} />
          <Route path="/events/edit/:eventId" element={<EditEventForm />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route
            path="/events/:eventId/email-attendees"
            element={<EmailFormPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
