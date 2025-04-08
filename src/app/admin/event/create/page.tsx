"use client"

import React, { useState } from 'react'
import CustomTextField from './InputField';
import { EventFormData, EventFormDataErrorTypes, InitialEventFormDataErrorTypes, InitialEventFormDataValues } from './helper';
import { CATOGORIES_ITEMS } from '@/utils/constant';
import CustomSelectField from './SelectField';
import GoogleAutoComplete from './GoogleMapAutoComplete';
import CustomDateTimePicker from './DateTimePicker';

function CreateEventpage() {

  const [formValues, setFormValues] = useState<EventFormData>(InitialEventFormDataValues)
  const [formValuesError, setFormValuesError] = useState<EventFormDataErrorTypes>(InitialEventFormDataErrorTypes)

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

          <CustomTextField
            label="Images"
            name={"images"}
            value={formValues.title}
            type="file"
            multiple
            onChange={handleChange}
            placeholder="Upload Files"
            errorKey={formValuesError.title}
            errorMsg="upload files"
            required
          />

          <div className="text-end">
            <button className="bg-primary hover:bg-primary-foreground text-white font-medium sm:w-max w-full py-3 px-6 rounded-[12px] hover:opacity-90 transition cursor-pointer">
              Create Event
            </button>
          </div>
        </div>
      </div>
    );
}

export default CreateEventpage