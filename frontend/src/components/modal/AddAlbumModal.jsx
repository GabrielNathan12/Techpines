import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const AddAlbumModal = ({ open, handleClose, handleAddAlbum }) => {
    const [name, setName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddAlbum(name, releaseDate);
        setName("");
        setReleaseDate("");
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="add-album-modal-title" aria-describedby="add-album-modal-description">
            <Box sx={{ ...modalStyle }}>
                <Typography id="add-album-modal-title" variant="h6" component="h2">
                    Adicionar Novo Álbum
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Nome do Álbum" variant="outlined"fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required />
                    <TextField label="Data de Lançamento" variant="outlined" fullWidth margin="normal" type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    
                    <Button type="submit" variant="contained" color="primary">
                        Adicionar Álbum
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
