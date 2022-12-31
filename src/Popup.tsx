import React, { useRef, useState } from "react";
import "@logseq/libs";
import {
  BlockEntity,
  BlockPageName,
  BlockUUID,
  ILSPluginUser,
  PageEntity,
} from "@logseq/libs/dist/LSPlugin";
// import { createPageIfNotExists } from "./utils";
// import { getDiscourseProperties } from "./DiscourseUtils"
import { stringify } from "querystring";
import { updateDiscourceCSS } from "./discourceCSS";
import { handleClosePopup } from "./smartblocks/handleClosePopup";

const relationData = [
  { txt: "❓ Question - (Q)", abbr: "QUE", type: "question" },
  { txt: "📢 Claim - (C)", abbr: "CLM", type: "claim" },
  { txt: "🔎 Evidence - (E)", abbr: "EVD", type: "evidence" },
  // { txt: "Excerpt - (Ex)", abbr: "EXC", type: "excerpt" },
  // { txt: "Author - (A)", abbr: "AUT", type: "author" },
  // { txt: "Source - (S)", abbr: "SRC", type: "source" },
];
 
export async function showDiscoursePopup() {
  console.log("DB showDiscoursePopup");
}

function Popup(props: any) {
  // FIXME use blocklocation to put popup

  console.log("Wha'ts up ");
  console.log("DB props", props);
  const block = props["currBlockInfo"][0];
  const location = props["currBlockInfo"][1];
  const reLink: RegExp = /\[\[(.*?)\]\]/gim;
  const link = reLink.exec(block.content);

  if (!link) {
    logseq.UI.showMsg("Error: Current block is not a link", "warning");
    logseq.hideMainUI();
    return;
  } else {
    console.log("Found link:", link);
    // console.log("xy",location)
    // const xloc = `left-${2 * Math.floor(location.x / 20)}`;
    // const yloc = `top-${2 * Math.floor(location.y / 20)}`;

    // console.log(`x: ${xloc} y: ${yloc}`)

    const xloc = `${location.x+40}px`;
    const yloc = `${location.y + 40}px`;
    handleClosePopup();

    // FIXME This does not work, why?
    // const className = `component absolute ${yloc} ${x loc}  w-40`
    const className = `component absolute provided-location left-20 top-20  w-40`;
    logseq.provideStyle(
      // {
      // style:  
      `.provided-location {
        left: ${xloc};
        top: ${yloc};
    }
    `
    // ,
      // key: "location",
    // }
    );
    return (
      <div className="relative discourse-popup w-40">
        <div className={className} style={{left: xloc, top: yloc}}>
          <div className="px-1 pb-5 shadow-lg rounded-lg bg-gray-100 text-center relative">
            {relationData.map(function (rel) {
              return (
                <div className="mt-1 hover:bg-blue-300 py-2 px-0">
                  <a href="#" onClick={() => setDiscourseContext(link[1], rel)}>
                    {rel.txt}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return;
}

export default Popup;

async function setDiscourseContext(pageName: string, relation: any) {
  logseq.hideMainUI();
  console.log("DB setDiscourseContext", pageName, relation);
  let page = await logseq.Editor.getPage(pageName);
  if (!page) {
    console.log("DB new page", relation.type);
    page = await logseq.Editor.createPage(
      pageName,
      { discourse_type: relation.type },
      { createFirstBlock: true, redirect: false }
    );
    // FIXME add template
    // insertTemplateOnPage("Hello", "randomTemplate") // the code to insert a template named randomTemplate onto a page called hello
  } else {
    console.log("DB found page", pageName);
    const blocks: BlockEntity[] = await logseq.Editor.getPageBlocksTree(
      pageName
    );
    if (blocks.length == 0) {
      console.log("DB adding first block");
      const newContent: string = `discourse_type:: ${relation.type}\n`;
      await logseq.Editor.appendBlockInPage(pageName, newContent);
    } else {
      console.log("DB blocks", blocks);

      const block = blocks[0];
      console.log("DB block", block);

      const re: RegExp = /discourse_type:: *(.*)/gm;
      if (block.content.match(re)) {
        //replace
        console.log("DB replace");
        const newContent: string = block.content.replace(
          re,
          `discourse_type:: ${relation.type}\n`
        );
        await logseq.Editor.updateBlock(block.uuid, newContent);
      } else {
        console.log("DB prepend");
        //prepend
        const newContent: string =
          `discourse_type:: ${relation.type}\n` + block.content;
        await logseq.Editor.updateBlock(block.uuid, newContent);
        // FIXME Still needed?
        // workaround to force preBlock? - see https://github.com/logseq/logseq/issues/5298
        const content = (await logseq.Editor.getBlock(block.uuid))!.content;
        await logseq.Editor.updateBlock(block.uuid, "");
        await logseq.Editor.updateBlock(block.uuid, content);
      }
    }
  }
  //FIXME Should we do this every time?
  //FIXME why does this work?
  logseq.hideMainUI({ restoreEditingCursor: true });
  //FIXME is this broken?
  await logseq.Editor.exitEditingMode(true);
  //FIXME for speed only update the changed CSS?
  console.log("DB okokok");
  updateDiscourceCSS();
}
