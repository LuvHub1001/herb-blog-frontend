import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";

function PostEditor() {
  return (
    <div>
      <div className="title-container">
        <label>제목</label>
        <input type="text" className="border-1" />
      </div>

      <div className="content-container">
        <Editor
          initialValue=""
          initialEditType="wysiwyg"
          autofocus={false}
          hideModeSwitch
          height="500px"
        />
      </div>
    </div>
  );
}

export default PostEditor;
