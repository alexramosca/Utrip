import React from 'react';

export const Modal = React.forwardRef((props, ref) => {
  
  return (
    <dialog ref={ref}>
      {props.children}
    </dialog>

  );
});
