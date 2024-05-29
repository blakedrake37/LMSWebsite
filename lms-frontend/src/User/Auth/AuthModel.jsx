import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import { CloseButton } from "@headlessui/react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    outline: "none",
    boxShadow: 24,
    p: 4,
  };
  

const AuthModel = ({handleClose, open}) => {
    const location = useLocation()
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
       
          {location.pathname==="/register" ? <RegisterForm/> : <LoginForm/>}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModel;
