import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactDatePickerComponent = ({
  value,
  onChange,
  placeholder = "Date of Birth",
}) => {
  const handleChange = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange("");
    }
  };

  const parseValue = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <div className="relative">
      <DatePicker
        selected={parseValue(value)}
        onChange={handleChange}
        placeholderText={placeholder}
        dateFormat="dd MMMM yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        maxDate={new Date()}
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        calendarClassName="custom-datepicker"
        popperClassName="custom-datepicker-popper"
        wrapperClassName="w-full"
        autoComplete="bday"
        name="dob"
        id="dob"
        inputProps={{
          autoComplete: "bday",
          "data-lpignore": "true",
          "data-1p-ignore": "true",
          "data-bwignore": "true",
          "data-form-type": "date",
          type: "text",
        }}
      />

      <style jsx global>{`
        .custom-datepicker {
          font-family: inherit;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .custom-datepicker .react-datepicker__header {
          background-color: #f59e0b;
          border-bottom: 1px solid #d1d5db;
          border-radius: 0.5rem 0.5rem 0 0;
        }

        .custom-datepicker .react-datepicker__current-month {
          color: #000000;
          font-weight: 600;
        }

        .custom-datepicker .react-datepicker__day-name {
          color: #000000;
          font-weight: 500;
        }

        .custom-datepicker .react-datepicker__day:hover {
          background-color: #fef3c7;
          color: #000000;
        }

        .custom-datepicker .react-datepicker__day--selected {
          background-color: #f59e0b;
          color: #000000;
        }

        .custom-datepicker .react-datepicker__day--selected:hover {
          background-color: #d97706;
        }

        .custom-datepicker .react-datepicker__navigation--previous,
        .custom-datepicker .react-datepicker__navigation--next {
          top: 13px;
        }

        .custom-datepicker .react-datepicker__navigation--previous:hover,
        .custom-datepicker .react-datepicker__navigation--next:hover {
          background-color: #d97706;
          border-radius: 0.25rem;
        }

        .custom-datepicker-popper {
          z-index: 9999;
        }

        .react-datepicker__triangle {
          border-bottom-color: #f59e0b !important;
        }

        .react-datepicker__triangle::before {
          border-bottom-color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
};

export default ReactDatePickerComponent;
