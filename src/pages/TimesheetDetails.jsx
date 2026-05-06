import { useState } from "react";
import { MoreVertical } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const data = [
  {
    date: "Jan 21",
    tasks: ["Homepage Development", "Homepage Development"],
  },
  {
    date: "Jan 22",
    tasks: [
      "Homepage Development",
      "Homepage Development",
      "Homepage Development",
    ],
  },
  {
    date: "Jan 23",
    tasks: ["Homepage Development", "Homepage Development"],
  },
  {
    date: "Jan 24",
    tasks: ["Homepage Development", "Homepage Development"],
  },
  {
    date: "Jan 25",
    tasks: [],
  },
];

export default function TimesheetDetails() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hours, setHours] = useState(12);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8]">
      <Navbar />

      <div className="flex-1 px-4 py-6 md:px-8">
        <div className="max-w-[960px] mx-auto bg-white border rounded-lg shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-[15px] font-semibold">
                This week’s timesheet
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                21 - 26 January, 2024
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">20/40 hrs</p>
              <div className="w-28 h-1.5 bg-gray-200 rounded">
                <div className="w-1/2 h-full bg-orange-400 rounded"></div>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">100%</p>
            </div>
          </div>

          <div className="space-y-4">
            {data.map((day, i) => (
              <div key={i}>
                <p className="text-xs font-medium text-gray-600 mb-2">
                  {day.date}
                </p>
                <div className="space-y-2">
                  {day.tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border rounded-md px-3 py-2 text-sm bg-white"
                    >
                      <span>{task}</span>

                      <div className="flex items-center gap-3 relative">
                        <span className="text-xs text-gray-500">4 hrs</span>

                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-[2px] rounded">
                          Project Name
                        </span>

                        <button
                          onClick={() =>
                            setActiveMenu(
                              activeMenu === `${i}-${index}`
                                ? null
                                : `${i}-${index}`,
                            )
                          }
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500" />
                        </button>

                        {activeMenu === `${i}-${index}` && (
                          <div className="absolute right-0 top-8 bg-white border rounded shadow text-xs z-10">
                            <button className="block px-3 py-1 hover:bg-gray-100 w-full text-left"
                             onClick={() => {
                                setEditModal(true);
                                setActiveMenu(null);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setDeleteModal(true);
                                setActiveMenu(null);
                              }}
                              className="block px-3 py-1 hover:bg-gray-100 w-full text-left text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div
                    onClick={() => setOpenModal(true)}
                    className="border border-dashed rounded-md py-2 text-center text-xs text-blue-600 cursor-pointer hover:bg-gray-50"
                  >
                    + Add new task
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-sm font-semibold text-gray-800">
                Add New Entry
              </h2>
              <button onClick={() => setOpenModal(false)}>✕</button>
            </div>

            <div className="px-5 py-4 space-y-4 text-sm">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Select Project *
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Project Name</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Type of Work *
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Bug fixes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Task description *
                </label>
                <textarea
                  rows="4"
                  placeholder="Write text here ..."
                  className="w-full border rounded-md px-3 py-2 resize-none"
                ></textarea>
                <p className="text-[11px] text-gray-400 mt-1">
                  A note for extra info
                </p>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Hours *
                </label>

                <div className="flex items-center border rounded-md w-fit">
                  <button
                    onClick={() => setHours((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1 text-gray-600"
                  >
                    −
                  </button>

                  <span className="px-4 text-sm">{hours}</span>

                  <button
                    onClick={() => setHours((prev) => prev + 1)}
                    className="px-3 py-1 text-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-5 py-4 border-t">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700">
                Add entry
              </button>

              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 border py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


        {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-sm font-semibold text-gray-800">
                Edit New Entry
              </h2>
              <button onClick={() => setEditModal(false)}>✕</button>
            </div>

            <div className="px-5 py-4 space-y-4 text-sm">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Select Project *
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Project Name</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Type of Work *
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Bug fixes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Task description *
                </label>
                <textarea
                  rows="4"
                  placeholder="Write text here ..."
                  className="w-full border rounded-md px-3 py-2 resize-none"
                ></textarea>
                <p className="text-[11px] text-gray-400 mt-1">
                  A note for extra info
                </p>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Hours *
                </label>

                <div className="flex items-center border rounded-md w-fit">
                  <button
                    onClick={() => setHours((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1 text-gray-600"
                  >
                    −
                  </button>

                  <span className="px-4 text-sm">{hours}</span>

                  <button
                    onClick={() => setHours((prev) => prev + 1)}
                    className="px-3 py-1 text-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-5 py-4 border-t">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700">
                Add entry
              </button>

              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 border py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-center relative">
            <button
              onClick={() => setDeleteModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <div className="text-gray-400 text-4xl mb-4">⚠️</div>

            <h3 className="mb-6 text-gray-700">
              Are you sure you want to delete this task?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  console.log("Deleted");
                  setDeleteModal(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes, I'm sure
              </button>

              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
