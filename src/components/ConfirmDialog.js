import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ConfirmationDailog({ message, onConfirm, onCancel }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsOpen(false);
    onCancel();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div>{message}</div>
      <button type="button" onClick={handleConfirm}>
        Confirm
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

ConfirmationDailog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationDailog;
