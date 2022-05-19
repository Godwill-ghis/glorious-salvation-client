import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { usersRoute } from "../utils/apiRoutes";
import { setusers, usersData } from "../app/UsersSlice";
import { userData } from "../app/userSlice";
import Axios from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Typography } from "@mui/material";
import { setleaders } from "../app/leadersSlice";
import { Helmet } from "react-helmet-async";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Users() {
  const users = useSelector(usersData);
  const dispatch = useDispatch();
  const user = useSelector(userData);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const roles = [user?.roles?.user, user?.roles?.admin];

  useEffect(() => {
    const fetchUsers = async () => {
      const usersBody = { roles };
      try {
        await Axios.patch(usersRoute, usersBody)
          .then(({ data }) => {
            dispatch(setusers(data));
            localStorage.setItem("users", JSON.stringify(data));
            toast.success("Users fetched successful", toastOptions);
          })
          .catch((err) => {
            toast.error(err?.response?.data.message, toastOptions);
          });
      } catch (error) {
        toast.error("an error occured", toastOptions);
      }
    };
    fetchUsers();
  }, []);

  const handleSetAdmin = async (userId) => {
    const usersBody = { roles, userId };
    try {
      await Axios.patch(`${usersRoute}/setadmin`, usersBody)
        .then(({ data }) => {
          dispatch(setusers(data));
          localStorage.setItem("users", JSON.stringify(data));
          toast.success("user set to admin successful", toastOptions);
        })
        .catch((err) => {
          toast.error(err?.response?.data.message, toastOptions);
        });
    } catch (error) {
      toast.error("an error occured", toastOptions);
    }
  };
  const handleSetleader = async (userId) => {
    const usersBody = { roles, userId };
    try {
      await Axios.patch(`${usersRoute}/setleader`, usersBody)
        .then(({ data }) => {
          dispatch(setusers(data));
          localStorage.setItem("users", JSON.stringify(data));
          toast.success("user set to leader successful", toastOptions);
          const leader = data.filter((user) => user.leader === true);
          dispatch(setleaders(leader));
          localStorage.setItem("leaders", JSON.stringify(leader));
        })
        .catch((err) => {
          toast.error(err?.response?.data.message, toastOptions);
        });
    } catch (error) {
      toast.error("an error occured", toastOptions);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Typography
        variant='h5'
        component='h4'
      >{`${users.length} users`}</Typography>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell align='right'>Email</StyledTableCell>
            <StyledTableCell align='right'>Roles</StyledTableCell>
            <StyledTableCell align='right'>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell component='th' scope='row'>
                {`${user.firstName} ${user.lastName}`}
              </StyledTableCell>
              <StyledTableCell align='right'>{user.email}</StyledTableCell>
              <StyledTableCell align='right'>
                {user.roles.admin === 1000 ? (
                  <Button disabled>Admin</Button>
                ) : (
                  <Button onClick={() => handleSetAdmin(user._id)}>User</Button>
                )}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {user.leader ? (
                  <Button disabled>Leader</Button>
                ) : (
                  <Button onClick={() => handleSetleader(user._id)}>
                    Member
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </TableContainer>
  );
}
