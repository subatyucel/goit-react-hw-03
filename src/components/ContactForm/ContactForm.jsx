import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import "./ContactForm.module.css";

// Validation schema
const addContactSchema = Yup.object().shape({
  name: Yup.string()
    .typeError("Must be a text")
    .min(3, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),

  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Invalid phone number")
    .required("Required"),
});

function handleNumChange(e, setFieldValue) {
  const { value } = e.target;

  const formattedValue = value
    .replace(/(\d{3})(\d{2})(\d{2})?/, "$1-$2-$3")
    .trim();

  setFieldValue("number", formattedValue);
}

const initialValues = {
  name: "",
  number: "",
};

export default function ContactForm({ onAddContact }) {
  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    onAddContact(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={addContactSchema}
    >
      {({ setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="span" />
          </div>

          <div>
            <label htmlFor="number">Number</label>
            <Field
              type="text"
              name="number"
              id="number"
              onChange={(event) => handleNumChange(event, setFieldValue)}
            />
            <ErrorMessage name="number" component="span" />
          </div>

          <button type="submit">Add Contact</button>
        </Form>
      )}
    </Formik>
  );
}
