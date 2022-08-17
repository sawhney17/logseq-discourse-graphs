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
  const originalVal = top?.document.getElementsByClassName("references")[0];
  const newDiv = top?.document.createElement("div");
  newDiv?.setAttribute("id", "references23");
  originalVal?.parentNode?.insertBefore(newDiv!, originalVal);

  const root = ReactDOM.createRoot(
    top?.document.getElementById("references23")!
  );
  // insertTemplateOnPage("Hello", "randomTemplate") // the code to insert a template named randomTemplate onto a page called hello

  root.render(
    <React.StrictMode>
      <DiscourseContext />
    </React.StrictMode>
  );
};

export const returnQueries = async () => {
  const queries: LabeledValue[] = [
    {
      connection: "Informed by",
      requisiteType: "question",
      query: `[:find (pull ?ref [*])
      :where
           [?block :block/path-refs ?ref]
     [page-property ?ref :discourse_type "evidence"]
      [?block :block/path-refs ?qref]
        [?qref :block/name <%currentpage%>]
         ]`,
    },
    {
      connection: "Opposed by",
      requisiteType: "claim",
      query: `[:find (pull ?evidencepage [*])
      :where
         [?block :block/path-refs ?evidencepage]
     [page-property ?evidencepage :discourse-type "evidence"]
      [?block :block/path-refs ?qref]
      [?qref :block/name "<%currentPage%>"]
      [?block :block/path-refs ?stanceref]
      [?stanceref :block/name "opposed by"]	    
       ]`,
    },
    {
      connection: "Supported by",
      requisiteType: "claim",
      query: `[:find (pull ?evidencepage [*])
      :where
         [?block :block/path-refs ?evidencepage]
     [page-property ?evidencepage :discourse-type "evidence"]
      [?block :block/path-refs ?qref]
      [?qref :block/name "<%currentPage%>"]
      [?block :block/path-refs ?stanceref]
      [?stanceref :block/name "supported by"]	    
       ]`,
    },
    {
      connection: "Supports",
      requisiteType: "evidence",
      query: ` [:find (pull ?ref [*])
      :where
           [?block :block/path-refs ?ref]
     [page-property ?ref :discourse-type "claim"]
      [?block :block/path-refs ?qref]
        [?qref :block/name <%currentpage%>]
      [?block :block/path-refs ?parentref]
        [?parentref :block/name "supported by"]	    
         ]`,
    },
    {
      connection: "Opposes",
      requisiteType: "evidence",
      query: ` [:find (pull ?ref [*])
      :where
           [?block :block/path-refs ?ref]
     [page-property ?ref :discourse-type "claim"]
      [?block :block/path-refs ?qref]
        [?qref :block/name <%currentpage%>]
      [?block :block/path-refs ?parentref]
        [?parentref :block/name "opposed by"]	    
         ]`,
    },
    {
      connection: "Opposes",
      requisiteType: "evidence",
      query: ` [:find (pull ?ref [*])
      :where
           [?block :block/path-refs ?ref]
     [page-property ?ref :discourse-type "claim"]
      [?block :block/path-refs ?qref]
        [?qref :block/name <%currentpage%>]
      [?block :block/path-refs ?parentref]
        [?parentref :block/name "opposed by"]	    
         ]`,
    },
    {
      connection: "Informs",
      requisiteType: "evidence",
      query: ` [:find (pull ?ref [*])
      :where
           [?block :block/path-refs ?ref]
     [page-property ?ref :discourse_type "question"]
      [?block :block/path-refs ?qref]
        [?qref :block/name <%currentpage%>]
         ]
         `
    }
  ];
  let returnedValue: returnedQuery[] = [];

  const currentPage = await logseq.App.getCurrentPage();
  for (let element in queries) {
    let query = queries[element];
    if (currentPage.properties.discourseType?.toLowerCase() === query.requisiteType.toLowerCase()) {
      //@ts-ignore-error
    const results = await logseq.DB.custom_query(
      query.query.replace(
        "<%currentPage%>",
        currentPage.name
      )
    );
    returnedValue.push({
      connection: queries[element].connection,
      value: results,
    });}
    // queries.forEach(async (query) => {

    //   // console.log(results)
    //   if (results.length > 0) {
    //     returnedValue.push({ connection: query.connection, value: results[0] });
    //   }
    // });
  }
  //Returns an array
  // return [{ connection: "informed by", value: [{name: "hello"}, {name: "bye"}, {name: "what's up"}] }, { connection: "connected to", value: [{name: "hello"}, {name: "bye"}, {name: "what's up"}] }]

  console.log(returnedValue);
  console.log("returnedValue");
  return returnedValue;
};

interface LabeledValue {
  connection: string;
  query: string;
  requisiteType: string;
}

export interface returnedQuery {
  connection: string;
  value: PageEntity[];
}
