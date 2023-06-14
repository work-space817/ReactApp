import { Editor, IAllProps } from "@tinymce/tinymce-react";
import classNames from "classnames";
import { env } from "process";
import { ChangeEvent, FC } from "react";
import { APP_ENV } from "../../../env";
import http from "../../../http_common";
import { config } from "./editorConfig";

//Властивості, які приймає компонент
interface IEditorProps extends IAllProps {
  //тут міститься метод onEditorChange - який відслідковує зміни в едіторі
  label: string; //Назва самого інпута
  field: string; //ідентифікатор інпута
  error?: string | undefined;
  touched?: boolean | undefined;
}

const EditorTiny: FC<IEditorProps> = ({
  label,
  field,
  error,
  touched,
  ...props //Усі інши параметри, наприклад onEditorChange
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <div
        className={classNames(
          "form-control",
          { "is-invalid border border-4 border-danger": touched && error },
          { "is-valid border border-4 border-success": touched && !error }
        )}
      >
        <Editor
          apiKey="vxipzwpxcycu8xgp0i2mttz5bjf4rx1sgepa48esl7clwgue"
          // initialValue="<p>This is the initial content of the editor</p>"
          init={{
            height: 500, //висота самого інтупа
            language: "uk", //мова панелі
            menubar: true, //показувать меню
            images_file_types: "jpg,jpeg", //формати файлі, які можна обирать - фото
            block_unsupported_drop: false,
            menu: {
              file: {
                title: "File",
                items: "newdocument restoredraft | preview | print ",
              },
              edit: {
                title: "Edit",
                items: "undo redo | cut copy paste | selectall | searchreplace",
              },
              view: {
                title: "View",
                items:
                  "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen",
              },
              insert: {
                title: "Insert",
                items:
                  "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
              },
              format: {
                title: "Format",
                items:
                  "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
              },
              tools: {
                title: "Tools",
                items: "spellchecker spellcheckerlanguage | code wordcount",
              },
              table: {
                title: "Table",
                items: "inserttable | cell row column | tableprops deletetable",
              },
              help: { title: "Help", items: "help" },
            },
            plugins: [
              "image",
              "advlist autolink lists link image imagetools charmap print preview anchor",
              "searchreplace visualblocks code fullscreen textcolor ",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor",
            content_langs: [
              { title: "English", code: "en" },
              { title: "Українська", code: "ua" },
            ],
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            //Дає можливість завантажувать фото на серве
            //Зявляється кнопка обрати фото
            file_picker_callback: (cb, value, meta) => {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.addEventListener("change", (e: any) => {
                const files = e.target.files;
                //Перевіряємо, чи ми обрали файли
                if (files) {
                  const file = files[0]; //Обирати можна декільа файлів, але ми беремо 1 файл
                  //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
                  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                  if (!allowedTypes.includes(file.type)) {
                    alert("Не допустимий тип файлу");
                    return;
                  }
                  //FileReader = дозволяє прочитати файл на клієнті у Base64 - формат
                  const reader = new FileReader();
                  reader.readAsDataURL(file); // у FileReader - передаємо наш файл
                  reader.onload = function () {
                    //Очікуємо події, коли файл завантажиться у Reader
                    const base64 = reader.result as string; //Отримуємо base64 даного айлу
                    http
                      .post("api/products/upload", { image: base64 }) //посилаємо запит на сервер для збереження файлу
                      .then((resp) => {
                        //Якщо результат був усешіний
                        const fileName =
                          APP_ENV.BASE_URL + "images/600_" + resp.data.name; //Формуємо шлях до файлу із розміром файлу 600
                        cb(fileName); //відображаємо даний шлях у нашому вікні самого editora
                      });
                  };
                }
                e.target.value = ""; //скидаємо значення із інпута- щоб він мав пусте значення
              });

              input.click(); //клікаємо по інтупу, щоб обрати файл на вашому ПК.
            },
          }}
          //outputFormat="html"
          //toolbar="code"
          {...props} //до Eдітора додаємо усі властивості в вказіник onEditorChange
        />
      </div>
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default EditorTiny;
