import React, { useRef } from "react";
// import SunEditor from "suneditor-react";

import SunEditorCore from "suneditor/src/lib/core";

import { buttonList } from "./options";
import tw from "twin.macro";

import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

interface EditorProps extends React.PropsWithChildren {
  onContentChange: (c: string) => void;
}

const Editor = (props: EditorProps) => {
  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const changeHandler = (c: string) => {
    // const changeFn = props.onContentChange;
    props.onContentChange(c);
    // console.log(props.onContentChange);
    // changeFn(c);
  };

  const getEditorCurrent = () => {
    return editor.current;
  };

  return (
    <SunEditor
      setOptions={{
        buttonList,
        width: "100%",
        height: "100%",
        minHeight: "600px",
        imageUploadUrl: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admin/posting/upload/image`,
      }}
      autoFocus={true}
      setAllPlugins={true}
      lang="ko"
      //   height="100%"
      width="100%"
      placeholder="본문을 입력해주세요"
      getSunEditorInstance={getSunEditorInstance}
      //   onChange={(content) => {
      //     console.log(content);
      //   }}
      onChange={changeHandler}
    />
  );
};

export default Editor;
