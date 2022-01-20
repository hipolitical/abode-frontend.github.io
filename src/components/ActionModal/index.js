import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function ActionModal({
  isOpenModal,
  modalTitle,
  questionMessage,
  successMessage,
  handleDispatch,
  onCloseModal,
}) {
  const [processStatus, setProcessStatus] = useState(0);
  const UNDO_LIMIT = 5;

  const handleDoAction = () => {
    setProcessStatus(processStatus + 1);
    if (processStatus === 1) {
      handleDispatch();
    }
  }

  const handleCloseModal = () => {
    onCloseModal();
    setProcessStatus(0);
  };

  const handleUndoAction = () => {
    setProcessStatus(0);
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too late...</div>;
    }
  
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  return (
    <Dialog open={isOpenModal} onClose={handleCloseModal} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent dividers>
        {processStatus === 0 &&
          <div
            dangerouslySetInnerHTML={{ __html: questionMessage }}
            style={{ lineHeight: '1.5rem' }}
          />
        }
        {processStatus === 1 &&
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CountdownCircleTimer
              size={60}
              strokeWidth={6}
              isPlaying={processStatus === 1}
              duration={UNDO_LIMIT}
              colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
              onComplete={handleDoAction}
            >
              {renderTime}
            </CountdownCircleTimer>
            <Typography variant="body" sx={{ ml: 3 }}>
              You can undo this request in the remaining time.
            </Typography>
          </Box>
        }
        {processStatus === 2 &&
          <div
            dangerouslySetInnerHTML={{ __html: successMessage }}
            style={{ lineHeight: '1.5rem' }}
          />
        }
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          type="submit"
          onClick={handleDoAction}
          disabled={processStatus === 2}
        >
          {processStatus === 1 ? 'Proceed' : 'Ok'}
        </Button>
        {processStatus === 1 && (
          <Button
            variant="contained"
            type="submit"
            onClick={handleUndoAction}
            disabled={processStatus !== 1}
          >
            Cancel
          </Button>
        )}
        <Button onClick={handleCloseModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActionModal;
