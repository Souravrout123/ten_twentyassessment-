import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import TimesheetDetails from "../pages/TimesheetDetails"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timesheetDetails" element={<TimesheetDetails />} />

      </Routes>
    </BrowserRouter>
  )
}