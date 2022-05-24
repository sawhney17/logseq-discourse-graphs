import { IHookEvent } from "@logseq/libs/dist/LSPlugin.user";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useMountedState } from "react-use";
import DiscourseContext from "./discourseContext";

import "@logseq/libs";
import {
  BlockEntity,
  BlockPageName,
  BlockUUID,
  ILSPluginUser,
  PageEntity,
} from "@logseq/libs/dist/LSPlugin";

export const useAppVisible = () => {
  const [visible, setVisible] = useState(logseq.isMainUIVisible);
  const isMounted = useMountedState();
  React.useEffect(() => {
    const eventName = "ui:visible:changed";
    const handler = async ({ visible }: any) => {
      if (isMounted()) {
        setVisible(visible);
      }
    };
    logseq.on(eventName, handler);
    return () => {
      logseq.off(eventName, handler);
    };
  }, []);
  return visible;
};

export const useSidebarVisible = () => {
  const [visible, setVisible] = useState(false);
  const isMounted = useMountedState();
  React.useEffect(() => {
    logseq.App.onSidebarVisibleChanged(({ visible }) => {
      if (isMounted()) {
        setVisible(visible);
      }
    });
  }, []);
  return visible;
};

export const handleContext = (e: IHookEvent) => {
  const originalVal = top?.document.getElementsByClassName("references")[0]
  const newDiv = top?.document.createElement("div");
  newDiv?.setAttribute("id", "references23");
  originalVal?.parentNode?.insertBefore(newDiv!, originalVal)
  setTimeout(() => {ReactDOM.render(
    <React.StrictMode>
      <DiscourseContext/>
    </React.StrictMode>,
    top?.document.getElementById("references23")!
  )}, 500)
  
}

//Source: https://github.com/vipzhicheng/logseq-plugin-vim-shortcuts/blob/master/src/common/funcs.ts
//FIXME null needed?
export async function createPageIfNotExists(pageName:string): Promise<PageEntity|null> {
  let page = await logseq.Editor.getPage(pageName);
  if (!page) {
    page = await logseq.Editor.createPage(
      pageName,
      {},
      {
        createFirstBlock: true,
        redirect: false,
      }
    );
  }

  return page;
}