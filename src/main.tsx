import "@logseq/libs";
import "virtual:windi.css";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

import { logseq as PL } from "../package.json";
import { handleContext } from "./utils";
import { updateDiscourceCSS } from "./discourceCSS";
import Popup, { showDiscoursePopup } from "./Popup";


const css = (t, ...args) => String.raw(t, ...args);

const pluginId = PL.id;

function main() {
  // console.info(`#${pluginId}: MAIN`);
  // console.log("JHKJHjk")
  const root = ReactDOM.createRoot(document.getElementById("app")!);
  // // insertTemplateOnPage("Hello", "randomTemplate") // the code to insert a template named randomTemplate onto a page called hello
  
  // root.render(
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // );

  function createModel() {
    return {
      show() {
        // logseq.showMainUI();
        // insertTemplateOnPage("Hello", "randomTemplate")
        handleContext();
      },
      
    };
  }

  // logseq.provideModel(createModel());
  // logseq.setMainUIInlineStyle({
  //   zIndex: 11,
  // });

  const openIconName = "template-plugin-open";

  logseq.provideStyle(css`
  .${openIconName} {
    opacity: 0.55;
    font-size: 20px;
    margin-top: 4px;
  }

  .${openIconName}:hover {
    opacity: 0.9;
  }
  :is(.lsdsc_question, .lsdsc_claim, .lsdsc_evidence) {
    /* background-color: pink !important; */
    background: var(--ls-primary-background-color);
    background-size: 100%;
    color: var(--ls-primary-text-color);
    padding: 2px 5px 2px 5px;
    font-size: 13px;
    line-height: 1em;
    font-weight: 500;
    border-radius: 5px 5px 5px 5px;
    border-style: solid;
    border-color: var(--ls-link-ref-text-color);
    border-width: thin;
    position:relative;
    box-shadow: 0px 1px 3px -1px var(--ls-secondary-text-color), 0px -1px 5px  var(--ls-secondary-background-color);
  }
  :is(.lsdsc_question, .lsdsc_claim, .lsdsc_evidence) .bracket  {
    display: none;
  }
  :is(.lsdsc_question, .lsdsc_claim, .lsdsc_evidence)::before {
      width: 1em;
      display: inline-block;
      margin-right: 0.3em;
  }
  
  .lsdsc_question {
      background-color: rgb(248, 184, 35) !important;
  }
  .lsdsc_question::before {
      content: '❓';
  }
  
  .lsdsc_evidence {
      background-color: rgb(187, 207, 207) !important;
  }
  .lsdsc_evidence::before {
      content: '🔎';
  }
  
  .lsdsc_claim {
      background-color: rgb(236, 245, 217) !important;
  }
  .lsdsc_claim::before {
      content: '📢';
  }
`);

  logseq.App.registerUIItem("toolbar", {
    key: openIconName,
    template: `
      <div data-on-click="show" class="${openIconName}">⚙️</div>
    `,
  });
  // logseq.App.onRouteChanged((e) => {
  //   setTimeout(() => {
  //     handleContext()
  //   }, 1000)
  // });
  logseq.App.onRouteChanged((e) => {
    console.log('route changed', e)
    handleContext()    
    updateDiscourceCSS()
  });

  // const registerShowDiscourseContext = () => logseq.App.registerCommandPalette(
  //   {
  //     key: `discourse_showDiscoursePopup`,
  //     label: `Set Discourse Context`,
  //     keybinding: {
  //       mode: 'global',
  //       binding: 'mod+shift+d'
  //     },
  //   },
  //   async () => { showDiscoursePopup() });
  // registerShowDiscourseContext()

  logseq.DB.onChanged((e) => {updateDiscourceCSS()})
  const registerSetDiscourseContext = () => logseq.App.registerCommandPalette(
    {
      key: `discourse_setDiscourseContext`,
      label: `Set Discourse Context`,
      keybinding: {
        mode: 'global',
        binding: 'mod+shift+l'
      },
    },
    async () => {
      const isEditing = await logseq.Editor.checkEditing();
      if (!isEditing) {
        logseq.UI.showMsg("Please edit (not just select) a block first.");
        return;
      }
      logseq.showMainUI();
      await logseq.Editor.exitEditingMode(true)
      const currBlock = await logseq.Editor.getCurrentBlock();
      console.log("DB currBlock", currBlock)
      const blockLocation = await logseq.Editor.queryElementRect(`div[blockid="${currBlock?.uuid}"]`)
      console.log("DB blockLocation", blockLocation)
          root.render(
        <React.StrictMode>
          {/* @ts-ignore */}
        <Popup currBlockInfo={[currBlock, blockLocation]} />
        </React.StrictMode>
      );
    });
    registerSetDiscourseContext()

  const registerupdateDiscourceCSS = () => logseq.App.registerCommandPalette(
    {
      key: `discoursse_updateDiscourceCSS`,
      label: `Update Discource CSS`,
      keybinding: {
        mode: 'global',
        binding: 'mod+shift+;'
      },
    },
    async () => { updateDiscourceCSS() });
  registerupdateDiscourceCSS()
}

logseq.ready(main).catch(console.error);
