"use client"


import React, { useEffect } from 'react'
import ReactGooglePlacesAutocomplete ,{ geocodeByAddress,   getLatLng } from 'react-google-places-autocomplete';

interface LocationField {
    latitide : number,
    longitude: number,
    location : string
}
interface Props {
    getLocationData: (locationData : LocationField) => void
    label: string,
    name: string,
    required: boolean
    placeholder?: string;
    errorMsg?: string;
    errorKey?: boolean
}

const GoogleAutoComplete : React.FC<Props>= ({ getLocationData, label, name, required, errorKey, errorMsg, placeholder = "Enter event location" }) => {

    const apiKey = process.env.GOOGLE_MAP_API_KEY as string;

    const loadScript = (url: string) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      };

    // useEffect(() => {
    //     const googleMapsScriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    //     loadScript(googleMapsScriptUrl);
    //   }, []);
    return (
      <div className='mb-4'>
        <label
          htmlFor={name}
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <ReactGooglePlacesAutocomplete
          apiKey={apiKey}
          debounce={100}
          selectProps={{
            isClearable: false,
            classNamePrefix: "locationField",
            placeholder: placeholder,
            noOptionsMessage: () => null,
            styles: {
              input: (provided: any) => ({
                ...provided,
                fontSize: "18px",
                fontWeight: "400",
                color: "#667085",
                fontFamily: "Plus Jakarta Sans",
              }),
              control: (provided: any) => ({
                ...provided,
                background: "white",
                borderRadius: "6px",
                margin: "5px 0",
                height: "48px",
              }),
              menu: (provided: any) => ({
                ...provided,
                backgroundColor: "#fff",
                border: "1px solid #CBD5E1",
              }),
              option: (provided: any, state: { isFocused: boolean }) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#ddd" : "#fff",
                color: "#23395D",
                padding: "10px",
                fontSize: "18px",
                fontWeight: "500",
                fontFamily: "Plus Jakarta Sans",
              }),
            },
            onChange: async (event: any) => {
              const location = event?.value?.description ?? "";
              geocodeByAddress(location)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                  const locationData = {
                    latitide: lat,
                    longitude: lng,
                    location: location,
                  };
                  getLocationData(locationData);
                });
            },
          }}
        />

       {errorKey && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
      </div>
    );
}

// const Wrapper = styled(Box)({
//     "& .locationField" : {
//         background: "white",
//         height: "45px",
//         borderRadius: "12px",
//         margin: "5px 0"
//       }
// })

export default GoogleAutoComplete