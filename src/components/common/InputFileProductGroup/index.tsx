import { ChangeEvent, FC, InputHTMLAttributes, useState } from "react";
import plusImage from "../../../assets/plus.png";
import { APP_ENV } from "../../../env";
import http from "../../../http_common";
import "./style.css";
import { IUploadImage, IUploadImageResult } from "./types";

interface InputFileProductGroupProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  field: string;
  onSelectFile: (id: number) => void;
  errors?: string[];
  error?: string[] |string | undefined;
  touched?: boolean | undefined;
}

const InputFileProductGroup: FC<InputFileProductGroupProps> = ({
  label = "Оберіть файл",
  field,
  onSelectFile,
  errors,
  error,
  touched,
}) => {
  //Набір фото, які обрав користувач
  const [images, setImages] = useState<string[]>([]);

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert("Не допустимий тип файлу");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const upload: IUploadImage = {
          image: reader.result as string,
        };
        try {
          const dataServer = await http.post<IUploadImageResult>(
            "api/products/upload",
            upload
          );
          const imageServer = dataServer.data;
          setImages([...images, imageServer.name]);
          onSelectFile(imageServer.id);
        } catch (problem) {
          console.log("Error upload image to server");
        }
        //onSelectFile(reader.result as string);
      };
      //onSelectFile(file); //видаю батькіському компоненту через callBack
    }
    e.target.value = "";
  };

  return (
    <div className="mb-3">
      <div className="row">

        <div className="col-md-4">
          <label htmlFor={field} className="form-label">
            <h6>{label}</h6>

            <img
              width="80%"
              className="img-fluid"
              src={plusImage}
              style={{ cursor: "pointer" }}
            />
          </label>

          <input
            type="file"
            className="d-none"
            accept="image/jpeg, image/png, image/gif"
            id={field}
            onChange={onChangeFileHandler}
          />
        </div>

        {images.map(item => (
          <div key={item} className="col-md-4 mt-5">
            <img
              width="80%"
              className="img-fluid"
              src={`${APP_ENV.BASE_URL}images/300_${item}`}
            />
          </div>
        ))}
      </div>


      {errors && (
        <div className="alert alert-danger">
          {errors.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
      {error && touched && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputFileProductGroup;
