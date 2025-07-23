import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Container,
  Pagination,
  CircularProgress,
} from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";
import theme from "../../theme/theme";
import { useNavigate } from "react-router-dom";

const UserList = ({ users, loading }) => {
  const navigate = useNavigate();
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAddUser = () => {
    navigate("/add-user");
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        pb: 4,
      }}
    >
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          py={1}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                p: 1,
                bgcolor: "primary.main",
                borderRadius: 2,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "none",
              }}
            >
              <GroupOutlinedIcon
                sx={{ color: "white", fontSize: 24, boxShadow: "none" }}
              />
            </Box>
            <Box sx={{ ml: { xs: "0px!important", md: "16px!important" } }}>
              <Typography variant="h5" fontWeight="bold" color="text.primary">
                User Management
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Manage and view all users
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            startIcon={<PersonAddAltOutlinedIcon sx={{ fontSize: 24 }} />}
            sx={{
              borderRadius: 0.5,
              fontWeight: 500,
              boxShadow: 2,
              textTransform: "none",
              "&:hover": {
                boxShadow: 4,
              },
            }}
          >
            Add User
          </Button>
        </Box>
        <Box
          sx={{
            borderRadius: 0.5,
            overflow: "hidden",
            backgroundColor: "white",
            boxShadow: "0px",
          }}
        >
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={6}
              minHeight="200px"
            >
              <CircularProgress color="primary" />
            </Box>
          ) : users?.length === 0 ? (
            <Box textAlign="center" p={6}>
              <GroupOutlinedIcon
                sx={{ fontSize: 64, color: theme.palette.grey[300], mb: 2 }}
              />
              <Typography
                variant="h6"
                fontWeight={600}
                color="text.primary"
                gutterBottom
              >
                No users found
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Get started by adding your first user
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Add Your First User
              </Button>
            </Box>
          ) : (
            <TableContainer sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead
                  sx={{ backgroundColor: theme.palette.primary.contrastText }}
                >
                  <TableRow>
                    {[
                      "Full Name",
                      "Email Address",
                      "Contact Number",
                      "Address",
                    ].map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          py: 2,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          fontSize: "0.875rem",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers?.map((user, index) => (
                    <TableRow
                      key={user.id}
                      onClick={() =>
                        setExpandedRowId((prev) =>
                          prev === user.id ? null : user.id
                        )
                      }
                      sx={{
                        backgroundColor: "white",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: theme.palette.background.default,
                        },
                      }}
                    >
                      <TableCell sx={{ py: 1 }}>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText,
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              mr: 2,
                            }}
                          >
                            {user.fullName.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography
                            fontWeight={500}
                            fontSize="0.9rem"
                            color="text.primary"
                          >
                            {user.fullName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <Typography fontSize="0.9rem" color="text.primary">
                          {user.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <Typography fontSize="0.9rem" color="text.primary">
                          {user.contactNumber}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: "120px", py: 1 }}>
                        <Typography
                          fontSize="0.9rem"
                          color="text.primary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp:
                              expandedRowId === user.id ? "none" : 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace:
                              expandedRowId === user.id ? "normal" : "initial",
                          }}
                        >
                          {`${user.addressLine}, ${user.city}, ${user.state}, ${user.pincode}`}
                        </Typography>
                        <Typography
                          sx={{ display: { xs: "block", md: "none" } }}
                        >
                          {expandedRowId === user.id ? "less" : "more"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {users.length > 0 && (
            <Box
              sx={{
                width: "100%",
                margin: "auto",
                my: 2,
                px: 2,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                count={Math.ceil(users.length / rowsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{}}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default UserList;
