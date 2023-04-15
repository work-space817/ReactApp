import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";

interface InputFileGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  field: string;
  onSelectFile: (file: File) => void;
}

const InputFileGroup: FC<InputFileGroupProps> = ({ field, onSelectFile }) => {
  const [selectImage, setSelectImage] = useState<File | null>(null);

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      //console.log("Ви обрали файл", file);
      setSelectImage(file);
      onSelectFile(file); //видаю батькіському компоненту через callBack
    }
    e.target.value = "";
  };

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {selectImage == null ? (
          <img
            src="https://i.insider.com/63fb81d984099d001960d513?width=1136&format=jpeg"
            style={{ cursor: "pointer" }}
            width="200"
          />
        ) : (
          <img
            src={URL.createObjectURL(selectImage)}
            style={{ cursor: "pointer" }}
            width="200"
          />
        )}
      </label>

      <input
        type="file"
        className="d-none"
        id={field}
        onChange={onChangeFileHandler}
      />
    </div>
  );
};

export default InputFileGroup;
