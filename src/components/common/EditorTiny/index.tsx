import { Editor, IAllProps } from "@tinymce/tinymce-react";
import classNames from "classnames";
import { FC } from "react";
import { config } from "./editorConfig";

interface IEditorProps extends IAllProps {
  label: string;
  field: string;
  error?: string | undefined;
  touched?: boolean | undefined;
}

const EditorTiny: FC<IEditorProps> = ({
  label,
  field,
  error,
  touched,
  ...props
}) => {
  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };

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
          init={config}
          onEditorChange={handleEditorChange}
          // outputFormat="html"
          // toolbar="code"
          {...props}
        />
      </div>
      {touched && error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default EditorTiny;
