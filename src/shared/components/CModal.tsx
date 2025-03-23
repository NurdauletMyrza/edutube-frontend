import React from "react";
import {
  Modal,
  Paper,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/system";
import { useLoading } from "@/config/providers/LoadingProvider/LoadingProvider";

const StyledPaper = styled(Paper)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  borderRadius: "20px",
}));

const ModalFooter = styled(Box)({
  display: "flex",
  gap: "8px",
  padding: "8px 16px",
  borderTop: "1px solid rgba(0, 0, 0, 0.08)",
});

const ModalHeader = styled(Box)({
  padding: "8px 50px",
  position: "relative",
  minHeight: "50px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
});

interface CModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  confirmButtonName?: string;
  closeButtonName?: string;
  width?: string | number;
  children?: React.ReactNode;
}

const CModal: React.FC<CModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmButtonName,
  closeButtonName,
  width,
  children,
}) => {
  const { isLoading } = useLoading();
  return (
    <Modal open={open} onClose={onClose}>
      <StyledPaper sx={{ width }}>
        <ModalHeader>
          {title && (
            <Typography textAlign="center" variant="h6">
              {title}
            </Typography>
          )}
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: "50%",
              right: "25px",
              transform: "translate(50%, -50%)",
            }}
          >
            <Close />
          </IconButton>
        </ModalHeader>
        <Box padding={2}>{children}</Box>
        <ModalFooter>
          <Button
            variant="outlined"
            sx={{ flexGrow: 1, borderRadius: 2 }}
            onClick={onClose}
          >
            {closeButtonName ?? "Close"}
          </Button>
          <Button
            variant="contained"
            sx={{ flexGrow: 1, borderRadius: 2 }}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {confirmButtonName ?? "Confirm"}
          </Button>
        </ModalFooter>
      </StyledPaper>
    </Modal>
  );
};

export default CModal;
