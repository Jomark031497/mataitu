import { forwardRef, type InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formError?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, formError, ...rest }, ref) => (
  <>
    <label className="mb-2 block text-sm font-bold text-gray-700">{label}</label>
    <input
      {...rest}
      ref={ref}
      className="w-full appearance-none rounded border-2 py-2 px-3 leading-tight text-gray-700 shadow outline-none transition-all focus:border-primary-main"
    />
    {formError && <p className="mt-1 text-sm text-red-500">{formError.message}</p>}
  </>
));

Input.displayName = "Input";

export default Input;
