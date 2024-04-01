
import { forwardRef } from "react";
 const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <div className="text" href=""
        ref={ref}
        onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }}
    >
      {children}
    </div>
  ));
  export default CustomToggle;