import { InputTime } from "./InputTime";

interface LabelInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function LabelInput({
  label,
  value,
  onChange,
  disabled = false,
}: LabelInputProps) {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor="" className="pl-1 text-sm">
        {label}
      </label>
      <InputTime
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
