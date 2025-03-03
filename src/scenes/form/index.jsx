import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Import Yup
import { Box, Button, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip: Yup.string().required('Required'),
});

const FormPage = () => {
  return (
    <Box m="20px">
      <Header title="FORM" subtitle="Create a New User Profile" />
      <Box mt="20px">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleBlur }) => (
            <Form>
              <Field
                as={TextField}
                name="firstName"
                label="First Name"
                onBlur={handleBlur}
              />
              <Field
                as={TextField}
                name="lastName"
                label="Last Name"
                onBlur={handleBlur}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                onBlur={handleBlur}
              />
              <Field
                as={TextField}
                name="phone"
                label="Phone"
                onBlur={handleBlur}
              />
              <Field
                as={TextField}
                name="address"
                label="Address"
                onBlur={handleBlur}
              />
              <Field
                as={TextField}
                name="city"
                label="City"
                onBlur={handleBlur}
              />
              <Field
                as={TextField}
                name="state"
                label="State"
                onBlur={handleBlur}
              />
              <Field
                as={TextField}
                name="zip"
                label="Zip"
                onBlur={handleBlur}
              />
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default FormPage;