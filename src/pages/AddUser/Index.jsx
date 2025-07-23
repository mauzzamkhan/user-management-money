import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const stateOptions = [
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
];

const AddUser = ({ addUser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Full name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        break;
      case "contactNumber":
        if (!value.trim()) return "Contact number is required";
        if (!/^\d{10}$/.test(value))
          return "Contact number must be exactly 10 digits";
        break;
      case "addressLine":
        if (!value.trim()) return "Address line is required";
        break;
      case "city":
        if (!value.trim()) return "City is required";
        break;
      case "state":
        if (!value) return "Please select a state";
        break;
      case "pincode":
        if (!value.trim()) return "Pincode is required";
        if (!/^\d{6}$/.test(value)) return "Pincode must be exactly 6 digits";
        break;
      default:
        return "";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    addUser(formData);
    navigate("/users");
  };

  const handleBack = () => {
    navigate("/users");
  };
  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "grey.50",
          pt: 1,
          pb: 2,
          px: 2,
        }}
      >
        <Container sx={{ p: 0 }}>
          <Box
            mb={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: "primary.main",
                  borderRadius: 2,
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PersonAddIcon sx={{ color: "#fff", fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                  Add New User
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  Fill in the details to add a new user
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{
                minWidth: "fit-content",
                textTransform: "none",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 0.5,
              }}
            >
              <ArrowBackIcon
                fontSize="small"
                sx={{ display: { xs: "none", md: "block" } }}
              />
              Back to Users
            </Button>
          </Box>
        </Container>
        <Box maxWidth="sm" mx="auto">
          <Box sx={{ p: { xs: 2, md: 3 }, borderRadius: 1, bgcolor: "white" }}>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2.5}>
                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name *"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0.4,
                      },
                    }}
                    size="small"
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0.4,
                      },
                    }}
                    size="small"
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Contact Number *"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 10 }}
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0.4,
                      },
                    }}
                    size="small"
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Address Line *"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    error={!!errors.addressLine}
                    helperText={errors.addressLine}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0.4,
                      },
                    }}
                    size="small"
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="City *"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0.4,
                      },
                    }}
                    size="small"
                  />
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="State *"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0.4,
                      },
                    }}
                    size="small"
                  >
                    <MenuItem value="">Select a state</MenuItem>
                    {stateOptions.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Pincode *"
                    name="pincode"
                    type="text"
                    inputProps={{ maxLength: 6 }}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    error={!!errors.pincode}
                    helperText={errors.pincode}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0.4,
                      },
                    }}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Box display="flex" gap={2} mt={5}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={handleBack}
                  sx={{
                    fontWeight: 500,
                    textTransform: "none",
                    borderRadius: 0.5,
                  }}
                >
                  Cancel
                </Button>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  size="medium"
                  sx={{
                    fontWeight: 500,
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: 0.5,
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    <CheckIcon sx={{ fontSize: 20 }} />
                  )}
                  <Box ml={1}>
                    {isSubmitting ? "Adding User..." : "Add User"}
                  </Box>
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddUser;
