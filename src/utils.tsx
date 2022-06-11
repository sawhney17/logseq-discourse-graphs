import { IHookEvent, PageEntity } from "@logseq/libs/dist/LSPlugin.user";
import React, { useState } from "react";
import * as ReactDOM from "react-dom/client";
import { useMountedState } from "react-use";
import DiscourseContext from "./discourseContext";


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

export const handleContext = () => {
  const originalVal = top?.document.getElementsByClassName("references")[0]
  const newDiv = top?.document.createElement("div");
  newDiv?.setAttribute("id", "references23");
  originalVal?.parentNode?.insertBefore(newDiv!, originalVal)

  const root = ReactDOM.createRoot(top?.document.getElementById("references23")!);
  // insertTemplateOnPage("Hello", "randomTemplate") // the code to insert a template named randomTemplate onto a page called hello
  
  root.render(
    <React.StrictMode>
      <DiscourseContext />
    </React.StrictMode>
  )
}

export const returnQueries = async() => {
  const queries: LabeledValue[] = [];
  const returnedValue: returnedQuery[] = [];
  queries.forEach(async query => {
    const results = await logseq.DB.datascriptQuery(query.query)
    if (results.length > 0) {
      returnedValue.push({connection: query.connection, value: results})
    }
  })
  //Returns an array
  return returnedValue
}

interface LabeledValue {
  connection: string;
  query: string;
}

interface returnedQuery {
  connection: string;
  value: PageEntity[]
}