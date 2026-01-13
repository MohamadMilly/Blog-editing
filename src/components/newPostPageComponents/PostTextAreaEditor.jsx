import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

export default function PostTextAreaEditor({ onWrite, content }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      onWrite(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey={TINYMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={log}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "codesample",
          ],
          directionality: "auto",
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | " +
            "code codesample",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;background-color:#0f172a;color:#e5e7eb;  }",
        }}
      />
    </>
  );
}
