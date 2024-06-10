// import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

type formData = {
  phone: string;
};
const Form: React.FC = () => {
  // const [enable, setEnable]=useState(false)
  const callHandler = async(values: formData) => {
    const options = {
      headers: {
        authorization:
          "sk-j10gm5rikkgq661jkxh9k56s53vxqbm305u0oc87oanjqe5iiif0gpmjr3aygl8l69",
        "Content-Type": "application/json",
      },
    };

    const data = {
      phone_number: `+91${values.phone}`,
      pathway_id: "274b62bf-1de8-4aa8-80e6-e97f0567a858",
    };
    const response= await axios.post("https://api.bland.ai/v1/calls", data, options)
    // .then(response=>console.log("response",response))
    console.log("response",response?.data)
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // setEnable(true)
      callHandler(values);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <div className="flex items-center">
            <span className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l">
              +91
            </span>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`shadow appearance-none border rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Enter your phone number"
              required
            />
          </div>
          {formik.touched.phone && formik.errors.phone ? (
            <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            // disabled={enable}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Call
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
