"use client"

import React, { useState } from 'react'
import CustomTextField from './InputField';
import { EventFormData, EventFormDataErrorTypes, InitialEventFormDataErrorTypes, InitialEventFormDataValues, Ticket } from './helper';
import { CATOGORIES_ITEMS, INITIAL_TICKETS_TYPES } from '@/utils/constant';
import CustomSelectField from './SelectField';
import GoogleAutoComplete from './GoogleMapAutoComplete';
import CustomDateTimePicker from './DateTimePicker';
import { PencilSquareIcon , TrashIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/outline"

function CreateEventpage() {

  const [formValues, setFormValues] = useState<EventFormData>(InitialEventFormDataValues)
  const [formValuesError, setFormValuesError] = useState<EventFormDataErrorTypes>(InitialEventFormDataErrorTypes)

  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS_TYPES);
  const [addRowVisible, setAddRowVisible] = useState(false)

  const [newTicket, setNewTicket] = useState<Omit<Ticket, "id">>({
    type: "",
    price: "",
    maxQty: 0,
    description: "",
  });

  const [editCache, setEditCache] = useState<{ [key: string]: Partial<Ticket> }>({});

  const handleAdd = () => {
    if (!newTicket.type || newTicket.maxQty <= 0) return;
    const newItem: Ticket = {
      ...newTicket,
      id: Date.now().toString(),
    };
    setTickets([...tickets, newItem]);
    setNewTicket({ type: "", price: "", maxQty: 0, description: "" });
    setAddRowVisible(false)
  };

  const handleEdit = (id: string) => {
    const ticket = tickets.find((t) => t.id === id);
    if (!ticket) return;
    setEditCache((prev) => ({
      ...prev,
      [id]: { ...ticket },
    }));
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isEditing: true } : t))
    );
  };

  const handleSave = (id: string) => {
    const updated = editCache[id];
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updated, isEditing: false } : t
      )
    );
    const newCache = { ...editCache };
    delete newCache[id];
    setEditCache(newCache);
  };

  const handleCancel = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isEditing: false } : t
      )
    );
    const newCache = { ...editCache };
    delete newCache[id];
    setEditCache(newCache);
  };

  // const handleEdit = (id: string) => {
  //   setTickets((prev) =>
  //     prev.map((t) => (t.id === id ? { ...t, isEditing: true } : t))
  //   );
  // };

  // const handleCancel = (id: string) => {
  //   setTickets((prev) =>
  //     prev.map((t) => (t.id === id ? { ...t, isEditing: false } : t))
  //   );
  // };

  const handleUpdate = (id: string, key: keyof Ticket, value: string | number) => {
    setEditCache((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  }
  // const handleUpdate = (id: string, updated: Partial<Ticket>) => {
  //   setTickets((prev) =>
  //     prev.map((t) =>
  //       t.id === id ? { ...t, ...updated} : t
  //     )
  //   );
  // };

  const handleDelete = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if(value.trim() === "") {
        setFormValuesError((prevState) => ({
            ...prevState,
            [name]: true,
          }));
    } else {
        setFormValuesError((prevState) => ({
            ...prevState,
            [name]: false,
          }));
    }

    setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  }

    return (
      <div className="my-5 lg:mx-40 md:mx-20 mx-5">
        <div className="rounded-[12px] bg-white p-5">
          <p className="text-2xl font-bold mb-10 text-center">Create Event</p>

          <CustomTextField
            label="Title"
            name={"title"}
            value={formValues.title}
            type="text"
            onChange={handleChange}
            placeholder="Enter event title"
            errorKey={formValuesError.title}
            errorMsg="Enter valid event title"
            required
          />

          <CustomTextField
            label="Description"
            name={"description"}
            value={formValues.description}
            onChange={handleChange}
            placeholder="Describe your event"
            errorKey={formValuesError.description}
            errorMsg="Enter valid event description"
            required
          />

          <GoogleAutoComplete
            getLocationData={(location) => console.log("first", location)}
            label="Location"
            name={"location"}
            placeholder="Enter event location"
            errorKey={formValuesError.location}
            errorMsg="Enter valid event location"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-3 gap-0">
            <div className="md:col-span-6 col-span-12">
              <CustomDateTimePicker
                label="Event Starts"
                name={"title"}
                value={new Date()}
                onChange={(val) => console.log("first", val)}
                placeholder="Select start date/time"
                errorKey={formValuesError.title}
                errorMsg="Enter valid event start time"
                required
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <CustomDateTimePicker
                value={new Date()}
                onChange={(val) => console.log("first", val)}
                placeholder="Select start date/time"
                label="Event Ends"
                name={"title"}
                errorKey={formValuesError.title}
                errorMsg="Enter valid event end time"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-3 gap-0">
            <div className="md:col-span-6 col-span-12">
              <CustomTextField
                label="Durtion"
                name={"duration"}
                value={formValues.duration}
                onChange={handleChange}
                placeholder="Event duration"
                errorKey={formValuesError.title}
                errorMsg="Enter valid event duration"
                readOnly
                disabled
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <div className="mb-4">
                <CustomSelectField
                  label="Catogory"
                  name={"category"}
                  value={null}
                  onChange={(option) => console.log("first", option)}
                  placeholder="Select category"
                  options={CATOGORIES_ITEMS}
                  errorKey={formValuesError.category}
                  errorMsg="Enter valid event category"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor={"Ticket types"}
              className="block text-sm font-bold text-gray-700 mb-1"
            >
              Ticket types <span className="text-red-500">*</span>
            </label>

            <div className="w-full">
              <table className="min-w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-4 py-2 font-semibold">
                      Ticket Type
                    </th>
                    <th className="border px-4 py-2">Price ($/₹)</th>
                    <th className="border px-4 py-2">Max Qty</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) =>
                    ticket.isEditing ? (
                      <tr key={ticket.id}>
                        <td className="border px-2 py-1">
                          <input
                            value={editCache[ticket.id]?.type || ""}
                            onChange={(e) =>
                              handleUpdate(ticket.id, "type", e.target.value)
                            }
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={editCache[ticket.id]?.price || ""}
                            onChange={(e) =>
                              handleUpdate(ticket.id, "price", e.target.value)
                            }
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            type="number"
                            value={editCache[ticket.id]?.maxQty || 0}
                            onChange={(e) =>
                              handleUpdate(ticket.id, "maxQty", +e.target.value)
                            }
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <input
                            value={editCache[ticket.id]?.description || ""}
                            onChange={(e) => handleUpdate(ticket.id, "description", e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="border px-2 py-1 space-x-2">
                          <button
                            onClick={() => handleSave(ticket.id)}
                            className="bg-green-600 p-1 text-white rounded-full hover:bg-green-700"
                          >
                            <CheckIcon className="h-5 w-5 cursor-pointer font-bold" />
                          </button>
                          <button
                            onClick={() => handleCancel(ticket.id)}
                            className="bg-gray-600 p-1 text-white rounded-full hover:bg-gray-700"
                          >
                            <XMarkIcon className="h-5 w-5 cursor-pointer font-bold" />
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={ticket.id}>
                        <td className="border px-4 py-2">{ticket.type}</td>
                        <td className="border px-4 py-2">{ticket.price}</td>
                        <td className="border px-4 py-2">{ticket.maxQty}</td>
                        <td className="border px-4 py-2">
                          {ticket.description}
                        </td>
                        <td className="border px-4 py-2 space-x-2">
                          <button
                            className="bg-blue-600 p-1 text-white rounded-full cursor-pointer hover:bg-blue-700"
                            onClick={() => handleEdit(ticket.id)}
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="bg-red-600 p-1 text-white rounded-full hover:bg-red-700"
                            onClick={() => handleDelete(ticket.id)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    )
                  )}

                  {/* Add New Row */}
                  {addRowVisible && (
                    <tr className="bg-white">
                      <td className="border px-2 py-1">
                        <input
                          className="w-full border rounded px-2 py-1"
                          placeholder="Type"
                          value={newTicket.type}
                          onChange={(e) =>
                            setNewTicket({ ...newTicket, type: e.target.value })
                          }
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          className="w-full border rounded px-2 py-1"
                          placeholder="Price"
                          value={newTicket.price}
                          onChange={(e) =>
                            setNewTicket({
                              ...newTicket,
                              price: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="number"
                          className="w-full border rounded px-2 py-1"
                          placeholder="Qty"
                          value={newTicket.maxQty}
                          onChange={(e) =>
                            setNewTicket({
                              ...newTicket,
                              maxQty: +e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          className="w-full border rounded px-2 py-1"
                          placeholder="Description"
                          value={newTicket.description}
                          onChange={(e) =>
                            setNewTicket({
                              ...newTicket,
                              description: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <button
                          onClick={handleAdd}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {!addRowVisible && (
                <div
                  onClick={() => setAddRowVisible(true)}
                  className="px-2 cursor-pointer py-1"
                >
                  <p className="font-semibold underline text-blue-500">
                    Add More Ticket
                  </p>
                </div>
              )}
            </div>
          </div>

          <CustomTextField
            label="Images"
            name={"images"}
            value={formValues.images}
            type="file"
            multiple
            onChange={handleChange}
            placeholder="Upload Files"
            errorKey={formValuesError.images}
            errorMsg="upload files"
            required
          />

          <div className="text-end">
            full
            <button className="bg-primary hover:bg-primary-foreground text-white font-medium sm:w-max w-full py-3 px-6 rounded-[12px] hover:opacity-90 transition cursor-pointer">
              Create Event
            </button>
          </div>
        </div>
      </div>
    );
}

export default CreateEventpage