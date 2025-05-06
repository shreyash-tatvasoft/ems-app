"use client"

import React, { useEffect, useState, useRef } from 'react'

// Custom Compoents
import Loader from '@/components/common/Loader';
import CustomTextField from './InputField';
import QuilEditor from './QuilEditor';
import AddressAutocomplete from './AddressAutoComplete.web';
import CustomSelectField from './SelectField';
import CustomDateTimePicker from './DateTimePicker';

// types import
import { EventDataObjResponse, EventImage } from '@/utils/types';
import { IEventFormData, IEventFormDataErrorTypes, IEventFormProps, ILocationField, IOptionType, ITicket } from '../../app/admin/event/types';

// library support 
import moment from 'moment';
import { PencilSquareIcon , TrashIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/outline"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// constant import
import { ALLOWED_FILE_FORMATS, API_ROUTES, CATOGORIES_ITEMS, INITIAL_TICKETS_TYPES, MAX_FILE_SIZE_MB, ROUTES } from '@/utils/constant';

// helper functions
import { apiCall } from '@/utils/services/request';
import { InitialEventFormDataErrorTypes, InitialEventFormDataValues } from '../../app/admin/event/helper';

const EventForm : React.FC<IEventFormProps> = ( { eventType }) => {

  const router = useRouter();
  const isEditMode = eventType !== "create" ? true : false 

  const [formValues, setFormValues] = useState<IEventFormData>(InitialEventFormDataValues)
  const [formValuesError, setFormValuesError] = useState<IEventFormDataErrorTypes>(InitialEventFormDataErrorTypes)

  const [tickets, setTickets] = useState<ITicket[]>(INITIAL_TICKETS_TYPES);
  const [addRowVisible, setAddRowVisible] = useState(false)

  const [newTicket, setNewTicket] = useState<Omit<ITicket, "id">>({
    type: "",
    price: "",
    maxQty: 0,
    description: "",
    _id : "",
  });

  const [editCache, setEditCache] = useState<{ [key: string]: Partial<ITicket> }>({});

  const [images, setImages] = useState<File[]>([]);
  const [fileError, setFileError] = useState<null | string>(null)
  const [existingImages, setExistingImages] = useState<(EventImage | File)[]>([])
  const [loader, setLoder] = useState(false)

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleRefClick = () => {
    fileRef.current?.click();
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles: File[] = [];
    let hasInvalid = false;

    files.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const isValidExt = ext && ALLOWED_FILE_FORMATS.includes(ext);
      const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

      if (isValidExt && isValidSize) {
        validFiles.push(file);
      } else {
        hasInvalid = true;
      }
    });

    if (hasInvalid) {
      setFileError("Only JPG, JPEG, PNG, WEBP formats under 2MB are allowed.");
    } else {
      setFileError(null);
    }

    const newFiles = validFiles.slice(0, 3 - images.length);
    if (newFiles.length > 0) {
      setImages((prev) => [...prev, ...newFiles]);
      setFormValuesError((prevState) => ({
        ...prevState,
        "images": false,
      }));
    }

    e.target.value = "";
  };

  const handleExistingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles: File[] = [];
    let hasInvalid = false;

    files.forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const isValidExt = ext && ALLOWED_FILE_FORMATS.includes(ext);
      const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

      if (isValidExt && isValidSize) {
        validFiles.push(file);
      } else {
        hasInvalid = true;
      }
    });

    if (hasInvalid) {
      setFileError("Only JPG, JPEG, PNG, WEBP formats under 2MB are allowed.");
    } else {
      setFileError(null);
    }

    const slotsLeft = 3 - existingImages.length; 
    const newFiles = validFiles.slice(0,slotsLeft);
    if (newFiles.length > 0) {
      setExistingImages((prev) => [...prev, ...newFiles]);
      setFormValuesError((prevState) => ({
        ...prevState,
        "images": false,
      }));
    }

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    if (!newTicket.type || newTicket.maxQty <= 0) return;
    const newItem: ITicket = {
      ...newTicket,
      id: Date.now().toString(),
    };
    setTickets([...tickets, newItem]);
    setNewTicket({ type: "", price: "", maxQty: 0, description: "", _id: "" });
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

  const handleUpdate = (id: string, key: keyof ITicket, value: string | number) => {
    setEditCache((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  }
  
  const handleDelete = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };
  
  const handleTitleChange = (value : string) => {
    if(value.trim() === "" || value.length < 5 || value.length > 100) {
      setFormValuesError((prevState) => ({
          ...prevState,
          "title": true,
        }));
  } else {
      setFormValuesError((prevState) => ({
          ...prevState,
          "title": false,
        }));
  }

  setFormValues((prevState) => ({
      ...prevState,
      "title": value,
    }));
  }

  const handleDescriptionChange = (value : string) => {
    if(value.length !== 11 ) {
      setFormValuesError((prevState) => ({
          ...prevState,
          "description": true,
        }));
  } else {
      setFormValuesError((prevState) => ({
          ...prevState,
          "description": false,
        }));
  }

  setFormValues((prevState) => ({
      ...prevState,
      "description": value,
    }));
  }

  const handleLocationChange = (location: ILocationField) => {
    if (location.location.trim() === "") {
      setFormValuesError((prevState) => ({
        ...prevState,
        location: true,
      }));
    } else {
      setFormValuesError((prevState) => ({
        ...prevState,
        location: false,
      }));
    }

    setFormValues((prevState) => ({
      ...prevState,
      location: {
        address: location.location, // This should be a string
        lat: location.latitude, // number
        long: location.longitude, // number
      },
    }));
  };

  const handleStartTimeChange = (value : Date | null) => {
    if(value === null) {
      setFormValuesError((prevState) => ({
          ...prevState,
          "start_time": true,
        }));
  } else {
      setFormValuesError((prevState) => ({
          ...prevState,
          "start_time": false,
        }));
  }

  setFormValues((prevState) => ({
      ...prevState,
      "start_time": value,
    }));
  }

  const handleEndTimeChange = (value : Date | null) => {
    if(value === null) {
      setFormValuesError((prevState) => ({
          ...prevState,
          "end_time": true,
        }));
  } else {
      setFormValuesError((prevState) => ({
          ...prevState,
          "end_time": false,
        }));
  }

  setFormValues((prevState) => ({
      ...prevState,
      "end_time": value,
    }));
  }

  const handleDurationField = (value : string) => {
    if(value.trim() === "") {
      setFormValuesError((prevState) => ({
          ...prevState,
          "duration": true,
        }));
  } else {
      setFormValuesError((prevState) => ({
          ...prevState,
          "duration": false,
        }));
  }

  setFormValues((prevState) => ({
      ...prevState,
      "duration": value,
    }));
  }

  const handleCatogoryField = (value : IOptionType | null) => {
    if(value === null) {
      setFormValuesError((prevState) => ({
          ...prevState,
          "category": true,
        }));
  } else {
      setFormValuesError((prevState) => ({
          ...prevState,
          "category": false,
        }));
  }

  setFormValues((prevState) => ({
      ...prevState,
      "category": value,
    }));
  }

  const calculateDuration = () => {
    const startTime = formValues.start_time;
    const endTime = formValues.end_time;

    const startMoment = moment(startTime);
    const endMoment = moment(endTime);

    const duration = moment.duration(endMoment.diff(startMoment));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    // Optional: build a readable string
    let result = "";
    if (days > 0) result += `${days} day${days > 1 ? "s" : ""} `;
    if (hours > 0) result += `${hours} hr${hours > 1 ? "s" : ""} `;
    if (minutes > 0) result += `${minutes} min`;

    return result.trim();

  };

  const handleAllValidations = () => {

    let errorFields = {
      title: false,
      description: false,
      location: false,
      start_time: false,
      end_time: false,
      duration: false,
      category: false,
      ticket_type: false,
      images: false,
    };

    const { title, description, location, start_time, end_time, category, duration} = formValues
     
    if (title.trim() === "") {
      errorFields.title = true;
    }
    if (description.length === 11 || description.length < 20) {
      errorFields.description = true;
    }
    if (location.address.trim() === "") {
      errorFields.location = true;
    }
    if (start_time === null) {
      errorFields.start_time = true;
    }
    if (end_time === null) {
      errorFields.end_time = true;
    }
    if (duration.trim() === "") {
      errorFields.duration = true;
    }
    if (category === null) {
      errorFields.category = true;
    }
    if (tickets.length === 0) {
      errorFields.ticket_type = true;
    }
    if (!isEditMode && images.length === 0) {
      errorFields.images = true;
    }
    if (isEditMode && existingImages.length === 0) {
      errorFields.images = true;
    }

    setFormValuesError(errorFields)

    return  Object.values(errorFields).every((value) => value === false);
  }

  const handleSubmit = async () => {
    if(!handleAllValidations()) {
       return false
    }

   
    const existingImageIdsArray = existingImages
    .filter((item): item is EventImage => 'imageId' in item)
    .map((item) => item.imageId);

    const updatedImagesArray = existingImages.filter(
      (item): item is File => item instanceof File
    );

    setLoder(true)

    const formData = new FormData();

    formData.append("title", formValues.title);
    formData.append("description", formValues.description);
    
    formData.append("location[address]", formValues.location.address);
    formData.append("location[lat]", formValues.location.lat.toString());
    formData.append("location[lng]", formValues.location.long.toString());
    
    formValues.start_time && formData.append("startDateTime", formValues.start_time.toString());
    formValues.end_time && formData.append("endDateTime", formValues.end_time.toString());
    formData.append("duration", formValues.duration);
    formValues.category && formData.append("category", formValues.category.value);
    
    // Append ticket_type array items
    tickets.forEach((ticket, index) => {
      isEditMode && ticket._id === ticket.id && formData.append(`tickets[${index}][_id]`, ticket.id);
      formData.append(`tickets[${index}][type]`, ticket.type);
      formData.append(`tickets[${index}][price]`, ticket.price);
      formData.append(`tickets[${index}][totalSeats]`, `${ticket.maxQty}`);
      formData.append(`tickets[${index}][description]`, ticket.description);
    });
    
    // Append files
   {!isEditMode && images.forEach((file) => {
      formData.append("images", file); // assuming `file` is a File object
    })}


    // update exisitng iamges (edit mode)
    {isEditMode && existingImageIdsArray.length > 0 &&  formData.append("existingImages", JSON.stringify(existingImageIdsArray));}

    // update new images (edit mode)
   {isEditMode && updatedImagesArray.forEach((file) => {
    formData.append("images", file); // assuming `file` is a File object
  })}

    const result = await apiCall({
      endPoint : isEditMode ? API_ROUTES.ADMIN.UPDATE_EVENT(eventType) :  API_ROUTES.ADMIN.CREATE_EVENT,
      method: isEditMode ? "PUT" : "POST",
      body: formData,
      isFormData: true,
      headers:{}
    })
    
    if(result.success) {
      setLoder(false)
      router.push(ROUTES.ADMIN.EVENTS)
      toast.success(isEditMode ? "Event updated successfully." : "Event added successfully.")
      setFormValues(InitialEventFormDataValues)
    } else {
      toast.error("Some error has occured.")
      setLoder(false)
    }
  }

  useEffect(() => {
    if (formValues.start_time && formValues.end_time) {
       const duration = calculateDuration();
      handleDurationField(duration)
    }
  }, [formValues.start_time, formValues.end_time]);

   const fetchEventWithId = async () => {
    setLoder(true)

     const result = await apiCall({
       endPoint: API_ROUTES.ADMIN.SHOW_EVENT(eventType),
       method: "GET",
     });

     if (result && result.success && result.data) {
       const receivedObj : EventDataObjResponse = result.data;

       const ticketsArray = receivedObj.tickets.map(item => {
        return {
          id: item._id,
          type: item.type, 
          price: item.price.toString(), 
          maxQty: item.totalSeats - item.totalBookedSeats, 
          description: item.description,
          _id: item._id
        }
       })

       const catogoryValue = (catogoryVal: string) => {
         let optVal = null;
         const findItem = CATOGORIES_ITEMS.find(
           (item) => item.value === catogoryVal
         );
         if (findItem) {
           optVal = findItem;
         }

         return optVal;
       };

       const existingImagesArr = receivedObj.images.length > 0 ? receivedObj.images : []
       
       const modifiedObj = {
         title: receivedObj.title,
         description: receivedObj.description,
         location: {
           address: receivedObj.location.address,
           lat: receivedObj.location.lat,
           long: receivedObj.location.lng,
         },
         start_time: new Date(receivedObj.startDateTime),
         end_time: new Date(receivedObj.endDateTime),
         duration: receivedObj.duration,
         category: catogoryValue(receivedObj.category),
         ticket_type: [
           {
             type: "",
             price: "",
             max_qty: "",
             description: "",
           },
         ],
         images: [],
       };
       setFormValues(modifiedObj)
       setTickets(ticketsArray)
       setExistingImages(existingImagesArr)
      setLoder(false)
     } else {
      setLoder(false)
       
     }
   };

  useEffect(() => {
     if(eventType !== "create") {
        fetchEventWithId()
     }
  },[eventType])

    return (
      <div className="m-10">
        {loader && <Loader />}

        <div className="rounded-[12px] bg-white p-6 shadow-lg border-2 border-gray-200">
          <p className="text-2xl font-bold mb-10">
            {isEditMode ? "Update" : "Create"} Event
          </p>

          <CustomTextField
            label="Title"
            name={"title"}
            value={formValues.title}
            type="text"
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter event title"
            errorKey={formValuesError.title}
            errorMsg={
              formValues.title === ""
                ? "Enter valid event title"
                : "Event title must be between 5 and 100 characters"
            }
            required
          />

          <QuilEditor
            label="Description"
            name={"description"}
            value={formValues.description}
            onChange={(value) => handleDescriptionChange(value)}
            placeholder="Describe your event"
            errorKey={formValuesError.description}
            errorMsg={
              formValues.description.length < 11
                ? "Enter valid event description"
                : formValues.description.length < 20
                ? "Event description must be at least 20 characters long"
                : ""
            }
            required
          />

          <AddressAutocomplete
            getLocationData={(location) => handleLocationChange(location)}
            label="Location"
            name={"location"}
            defaultValue={formValues.location}
            placeholder="Enter event location"
            errorKey={formValuesError.location}
            errorMsg="Enter valid event location"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-3 gap-0">
            <div className="md:col-span-6 col-span-12">
              <CustomDateTimePicker
                label="Event Starts"
                name={"start_time"}
                value={formValues.start_time}
                onChange={(val) => handleStartTimeChange(val)}
                errorKey={formValuesError.start_time}
                errorMsg="Enter valid event start time"
                required
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <CustomDateTimePicker
                value={formValues.end_time}
                onChange={(val) => handleEndTimeChange(val)}
                label="Event Ends"
                name={"end_time"}
                minDate={
                  formValues.start_time === null
                    ? new Date()
                    : formValues.start_time
                }
                errorKey={formValuesError.end_time}
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
                onChange={() => {}}
                placeholder="Event duration"
                errorKey={formValuesError.duration}
                errorMsg="Enter valid event timings"
                readOnly
                disabled
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <div className="mb-4">
                <CustomSelectField
                  label="Catogory"
                  name={"category"}
                  value={formValues.category}
                  onChange={(option) => handleCatogoryField(option)}
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

            <div className="w-full overflow-x-auto sm:overflow-x-visible">
              <table className="min-w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-4 py-2 w-1/5 font-semibold">
                      Ticket Type
                    </th>
                    <th className="border px-4 py-2 w-1/5">Price ($/₹)</th>
                    <th className="border px-4 py-2 w-1/5">Max Qty</th>
                    <th className="border px-4 py-2 w-1/5">Description</th>
                    <th className="border px-4 py-2 w-1/5 text-center">
                      Actions
                    </th>
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
                            onChange={(e) =>
                              handleUpdate(
                                ticket.id,
                                "description",
                                e.target.value
                              )
                            }
                            className="w-full border px-2 py-1 rounded"
                          />
                        </td>
                        <td className="border text-center px-2 py-1 space-x-2">
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
                        <td className="border px-4 py-2 text-center md:space-x-2">
                          <button
                            className="text-blue-600 p-1 cursor-pointer font-bold"
                            onClick={() => handleEdit(ticket.id)}
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-800 p-1 cursor-pointer font-bold"
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
                      <td className="border px-2 py-1 text-center">
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

            {formValuesError.ticket_type && (
              <p className="text-red-500 text-sm mt-1">
                At least one ticket is required
              </p>
            )}
          </div>

          {/* file handleing code */}
          {isEditMode ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Images <span className="text-red-500">*</span>
                </label>

                <button
                  onClick={handleRefClick}
                  disabled={existingImages.length === 3}
                  className="flex items-center font-bold cursor-pointer underline text-blue-500 px-4 py-2 disabled:cursor-not-allowed disabled:text-gray-500 rounded-md"
                >
                  Upload images
                  <input
                    type="file"
                    ref={fileRef}
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    onChange={handleExistingFileChange}
                    className="hidden"
                  />
                </button>
              </div>

              {existingImages.length === 0 && (
                <div className="h-40 flex items-center justify-center mx-auto border-dashed rounded-[12px] border-gray-300 border-2">
                  <p className="block text-lg font-semibold text-gray-500">
                    Upload your images
                  </p>
                </div>
              )}

              {existingImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-3 border-dashed rounded-[12px] border-gray-300 border-2">
                  {existingImages.map((file, index) => {
                    const imageUrl =
                      "url" in file
                        ? file.url // EventImage
                        : URL.createObjectURL(file); // File
                    return (
                      <div
                        key={index}
                        className="relative w-full h-48 border rounded-lg overflow-hidden shadow col-span-1 md:col-span-4"
                      >
                        <img
                          src={imageUrl}
                          alt={`preview-${index}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(index)}
                          className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100 transition"
                        >
                          <TrashIcon className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {fileError && (
                <p className="text-red-500 text-sm mt-1">{fileError}</p>
              )}

              {formValuesError.images && (
                <p className="text-red-500 text-sm mt-1">
                  Atleast one image is required
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Images <span className="text-red-500">*</span>
                </label>

                <button
                  onClick={handleRefClick}
                  disabled={images.length === 3}
                  className="flex items-center font-bold cursor-pointer underline text-blue-500 px-4 py-2 disabled:cursor-not-allowed disabled:text-gray-500 rounded-md"
                >
                  Upload Images
                  <input
                    type="file"
                    ref={fileRef}
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </button>
              </div>
              {images.length === 0 && (
                <div className="h-40 flex items-center justify-center mx-auto border-dashed rounded-[12px] border-gray-300 border-2">
                  <p className="block text-lg font-semibold text-gray-500">
                    Upload your images
                  </p>
                </div>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-3 border-dashed rounded-[12px] border-gray-300 border-2">
                  {images.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div
                        key={index}
                        className="relative w-full h-48 border rounded-lg overflow-hidden shadow col-span-1 md:col-span-4"
                      >
                        <img
                          src={url}
                          alt={`preview-${index}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100 transition"
                        >
                          <TrashIcon className="h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {fileError && (
                <p className="text-red-500 text-sm mt-1">{fileError}</p>
              )}

              {formValuesError.images && (
                <p className="text-red-500 text-sm mt-1">
                  Atleast one image is required
                </p>
              )}
            </div>
          )}

          <div className="text-end my-6">
            <button
              onClick={handleSubmit}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white font-medium sm:w-max w-full py-3 px-6 rounded-[12px] hover:opacity-90 transition disabled:cursor-not-allowed cursor-pointer"
            >
              {isEditMode ? "Update" : "Create"} Event
            </button>
          </div>
        </div>
      </div>
    );
}

export default EventForm