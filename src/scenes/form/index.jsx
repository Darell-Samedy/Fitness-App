import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Card, CardContent, Grid } from '@mui/material';
import Header from '../../components/Header';

const validationSchema = Yup.object({
  challenge: Yup.string().required('Required'),
  goal: Yup.string().required('Required'),
});

const FormsPage = () => {
  return (
    <Box m="20px">
      <Header title="Challenges & Goals" subtitle="Set Your Fitness Journey" />
      <Card elevation={3} sx={{ maxWidth: 600, margin: '20px auto', padding: '20px', borderRadius: '12px' }}>
        <CardContent>
          <Formik
            initialValues={{
              challenge: '',
              goal: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleBlur, errors, touched }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="challenge"
                      label="Your Challenge"
                      fullWidth
                      multiline
                      rows={4}
                      error={touched.challenge && Boolean(errors.challenge)}
                      helperText={touched.challenge && errors.challenge}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="goal"
                      label="Your Goal"
                      fullWidth
                      multiline
                      rows={4}
                      error={touched.goal && Boolean(errors.goal)}
                      helperText={touched.goal && errors.goal}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FormsPage;
