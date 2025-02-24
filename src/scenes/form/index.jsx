import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material";
import Header from "../../components/Header";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
};

const phoneRegExp = /^[0-9]{10}$/;

const userSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup
    .string()
    .required("Contact is required")
    .matches(phoneRegExp, "Invalid phone number"),
    address1: Yup.string().required("Address is required"),
    address2: Yup.string().required("Address is required"),
})


const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    }
    
    return <Box m = "20px">
        <Header title = "CREATE USER" subtitle = "Create a new user" />

        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        >
            {({values, errors, touched, handleblur, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Box 
                    display = "grid" 
                    gap = "30px" 
                    gridTemplateColumns = "repeat(4, minmax(0, 1fr))"
                    sx = {{
                        "& > div": { gridColumn: isNonMobile ?  undefined : "span 4" },
                    }}
                    >
                     <TextField
                        fullWidth
                        variant = "filled"
                        type = "text"
                        label = "First Name"
                        onBlur = {handleBlur} 
                        onChange = {handleChange}
                        value = {values.firstName}
                        name = "firstName"
                        error = {!!touched.firstName && !!errors.firstName}
                        helperText = {touched.firstName && errors.firstName}
                        sx = {{ gridColumn: "span 2" }}
                     />
                      <TextField
                        fullWidth
                        variant = "filled"
                        type = "text"
                        label = "Last Name"
                        onBlur = {handleBlur} 
                        onChange = {handleChange}
                        value = {values.lastName}
                        name = "lastName"
                        error = {!!touched.LastName && !!errors.lastName}
                        helperText = {touched.lastName && errors.lastName}
                        sx = {{ gridColumn: "span 2" }}
                     />
                      <TextField
                        fullWidth
                        variant = "filled"
                        type = "text"
                        label = "Email"
                        onBlur = {handleBlur} 
                        onChange = {handleChange}
                        value = {values.email}
                        name = "email"
                        error = {!!touched.email && !!errors.email}
                        helperText = {touched.email && errors.email}
                        sx = {{ gridColumn: "span 4" }}
                     />
                      <TextField
                        fullWidth
                        variant = "filled"
                        type = "text"
                        label = "Contact Number"
                        onBlur = {handleBlur} 
                        onChange = {handleChange}
                        value = {values.contact}
                        name = "Contact"
                        error = {!!touched.contact && !!errors.contact}
                        helperText = {touched.contact && errors.contact}
                        sx = {{ gridColumn: "span 4" }}
                     />
                      <TextField
                        fullWidth
                        variant = "filled"
                        type = "text"
                        label = "Address 1"
                        onBlur = {handleBlur} 
                        onChange = {handleChange}
                        value = {values.address1}
                        name = "firstName"
                        error = {!!touched.address1 && !!errors.address1}
                        helperText = {touched.address1 && errors.address1}
                        sx = {{ gridColumn: "span 4" }}
                     />
                      <TextField
                        fullWidth
                        variant = "filled"
                        type = "text"
                        label = "address 2"
                        onBlur = {handleBlur} 
                        onChange = {handleChange}
                        value = {values.address2}
                        name = "firstName"
                        error = {!!touched.address2 && !!errors.address2}
                        helperText = {touched.address2 && errors.address2}
                        sx = {{ gridColumn: "span 4" }}
                     />
                    </Box>
                    <Box display = "flex" justifyContent = "end" mt = "20px">
                        <Button type ="submit" color="secondary" variant = "contained">
                            Create New User
                        </Button>
                    </Box>
                </form>

            )}
        </Formik>
    </Box>
};

export default Form;    
