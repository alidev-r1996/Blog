type InputTextProps = {
    id?: number | string;
    name: string;
    placeholder: string;
    label: string;
    value?:string;
}


const InputText: React.FC<InputTextProps> = ({name, placeholder, label, value}) => {
  return (
    <label htmlFor="name">
      <p className="p-1 text-slate-500 capitalize">{label}</p>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        className="w-full placeholder:text-xs p-2 border border-slate-200 rounded-lg peer"
      />
    </label>
  );
};

export default InputText;
