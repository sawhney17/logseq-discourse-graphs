import "@logseq/libs";
import {
  IBatchBlock,
  SettingSchemaDesc,
} from "@logseq/libs/dist/LSPlugin.user";
import Sherlock from "sherlockjs";
import {
  getDateForPage,
  getDateForPageWithoutBrackets,
} from "logseq-dateutils";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { insertProperlyTemplatedBlock } from "./insertTemplatedBlock";
import { handleClosePopup } from "./handleClosePopup";
/*
 * main entry
 */

export function renderApp() {
  handleClosePopup();
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("app")
  );
}

export var valueCount = 0;
export var valueArray: valueArrayExample[] = [];
export var currentValueCount = 0;
export var currentValueArray = [];

export function editValueArray(value: valueArrayExample[]) {
  valueArray = value;
}
export function valueZero() {
  valueArray = [];
}
// async function main() {
  // updateTemplates();

  export async function insertTemplatedBlock(
    blockUuid: any,
    template: string,
    sibling: boolean,
    location: string
  ) {
    // const { blockUuid, template, sibling, location } = e.dataset;
    let blockUuid2 = blockUuid;
    console.log(location);
    if (location == "" || location == "undefined") {
      blockUuid2 = blockUuid;
    } else if (
      (await logseq.Editor.getBlock(location)) != undefined ||
      (await logseq.Editor.getPage(location)) != undefined
    ) {
      blockUuid2 = location;
      console.log(location);
    } else {
      const parsedBlock = await Sherlock.parse(location);
      const { startDate } = parsedBlock;
      blockUuid2 = getDateForPageWithoutBrackets(
        startDate,
        (await logseq.App.getUserConfigs()).preferredDateFormat
      );
    }
    console.log(blockUuid2);
    insertProperlyTemplatedBlock(blockUuid2, template, sibling);
  }

  // logseq.provideStyle(`
  //   .templater-btn {
  //      border: 1px solid var(--ls-border-color); 
  //      white-space: initial; 
  //      padding: 2px 4px; 
  //      border-radius: 4px; 
  //      user-select: none;
  //      cursor: default;
  //      display: flex;
  //      align-content: center;
  //   }
    
  //   .templater-btn:hover {
  //       background-color: #defcf0;
  //       border-color: #9ddbc7;
  //       color: #0F9960;
  //   }
  // `);
  // logseq.Editor.registerSlashCommand("Create Inline  SmartBlock", async () => {
  //   await logseq.Editor.insertAtEditingCursor(
  //     `{{renderer :smartblockInline, }} `
  //   );
  //   // templaterBlock = await logseq.Editor.getCurrentBlock();
  // });
  // logseq.Editor.registerSlashCommand("Insert Smartblock", async (e) => {
  //   updateTemplates();
  //   handleClosePopup()
  //   ReactDOM.render(
  //     <React.StrictMode>
  //       <SearchBar blockID={e.uuid} />
  //     </React.StrictMode>,
  //     document.getElementById("app")
  //   );
  //   logseq.showMainUI();
  //   console.log("Insert Smartblock");
  //   // templaterBlock = await logseq.Editor.getCurrentBlock();
  // });
  // logseq.Editor.registerSlashCommand(
  //   "Create Inline SmartBlock(guided)",
  //   async () => {
  //     await logseq.Editor.insertAtEditingCursor(
  //       `{{renderer :smartblockInline, template name, sibling?}} `
  //     );
  //     // templaterBlock = await logseq.Editor.getCurrentBlock();
  //   }
  // );
  // logseq.App.registerCommandPalette({
  //   key: 'Toggle Smartblock Inserter',
  //   label: 'Select and insert Smartblock',
  //   keybinding: {
  //     binding: logseq.settings["Keyboard-Shortcut"],
  //     mode: 'global',
  //   }
  // }, async (e) => {
  //   if (e.uuid != null){
  //     handleClosePopup()
  //     ReactDOM.render(
  //       <React.StrictMode>
  //         <SearchBar blockID={e.uuid} />
  //       </React.StrictMode>,
  //       document.getElementById("app")
  //     )
  //     logseq.showMainUI()
  //   }
  // });

  // logseq.Editor.registerSlashCommand("Create SmartBlock Button", async (e) => {
  //   updateTemplates();
  //   ReactDOM.render(
  //     <React.StrictMode>
  //       <InsertionUI blockUUID = {e.uuid}/>
  //     </React.StrictMode>,
  //     document.getElementById("app")
  //   )
  //   logseq.showMainUI()
  //    handleClosePopup()
  //   // templaterBlock = await logseq.Editor.getCurrentBlock();
  // });

  // logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
  //   updateTemplates();
  //   var [type, template, title, sibling, location] = payload.arguments;
  //   if (title == undefined) {
  //     title = "New Template";
  //   }
  //   let realSiblings;
  //   if (sibling == "true") {
  //     realSiblings = true;
  //   } else {
  //     realSiblings = false;
  //   }
  //   if (type == ":smartblock") {
  //     logseq.provideUI({
  //       key: `${slot}`,
  //       reset: true,
  //       slot,
  //       template: `
  //           <button class="templater-btn" data-block-uuid="${payload.uuid}" data-sibling = ${sibling} data-template="${template}" data-title="${title}" data-location = "${location}"
  //           data-on-click="insertTemplatedBlock">${title}</button>
  //          `,
  //     });
  //   }
  //   if (type == ":smartblockInline") {
  //     if (!(await checkTemplate(payload.uuid))) {
  //       logseq.Editor.updateBlock(payload.uuid, "");
  //       await insertProperlyTemplatedBlock(payload.uuid, template, title).then(
  //         function (result) {
  //           logseq.Editor.updateBlock(payload.uuid, "");
  //         }
  //       );
  //     } else {
  //       logseq.provideUI({
  //         key: "SmartBlocksInline for Logseq",
  //         reset: true,
  //         slot,
  //         template: `
  //             <label class="templater-btn">Template: ${template}</label>
  //            `,
  //       });
  //     }
  //   }
  // });
// }

// logseq.ready(main).catch(console.error);
