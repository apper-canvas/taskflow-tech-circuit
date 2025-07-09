import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Checkbox = forwardRef(({
  className,
  label,
  checked,
  onChange,
  ...props
}, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <motion.input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn("checkbox-custom", className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      />
      {label && (
        <label 
          className="text-sm font-medium text-gray-700 cursor-pointer select-none"
          onClick={() => onChange?.({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;