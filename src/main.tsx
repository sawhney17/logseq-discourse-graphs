import "@logseq/libs";
import "virtual:windi.css";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import Popup from "./Popup";

import { logseq as PL } from "../package.json";
import { handleContext } from "./utils";
import { colorpage } from "./cssutils"

import { insertTemplateOnPage } from "./smartblocks";

const css = (t, ...args) => String.raw(t, ...args);

const pluginId = PL.id;

function main() {
  console.info(`#${pluginId}: MAIN`);
  const root = ReactDOM.createRoot(document.getElementById("app")!);
  insertTemplateOnPage("Hello", "randomTemplate") // the code to insert a template named randomTemplate onto a page called hello
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  function createModel() {
    return {
      show() {
        logseq.showMainUI();
        insertTemplateOnPage("Hello", "randomTemplate")
      },
      
    };
  }

  logseq.provideModel(createModel());
  logseq.setMainUIInlineStyle({
    zIndex: 11,
  });

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
  `);

  logseq.App.registerUIItem("toolbar", {
    key: openIconName,
    template: `
      <div data-on-click="show" class="${openIconName}">⚙️</div>
    `,
  });
  logseq.App.onRouteChanged((e) => {
    handleContext(e);
  });
  //menu-popup
  const registerKeyHeading = () => logseq.App.registerCommandPalette(
    {
      key: `testing_z`,
      label: `Testing 1,2,3`,
      keybinding: {
        mode: 'global',
        binding: 'mod+shift+l'
      },
    },
    async () => {
      console.log("DB wooo")
      logseq.showMainUI();
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
    registerKeyHeading()
}

logseq.ready(main).catch(console.error);
