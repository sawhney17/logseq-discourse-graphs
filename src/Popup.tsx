import React, { useRef } from "react";
import { useAppVisible } from "./utils";
import { BlockEntity } from "@logseq/libs/dist/LSPlugin";

const relationData=[
  { txt: "Question - (Q)", abbr: "QUE"},
  { txt: "Claim - (C)", abbr: "CLM"},
  { txt: "Evidence - (E)", abbr: "EVD"},
  { txt: "Excerpt - (E)", abbr: "EXC"},
  { txt: "Author - (A)", abbr: "AUT"},
  { txt: "Source - (S)", abbr: "SRC"}
]

function Popup(props: any) {
  // FIXME use blocklocation to put popup next  to block
  //FIXME study props
  console.log("DB props", props)
  // console.log("DB props", props["currBlockInfo"])
  // console.log("DB props", props["currBlockInfo"][0])
  // console.log("DB props", props["currBlockInfo"][1])
  const block = props["currBlockInfo"][0]
  const reLink:RegExp  = /\[\[(.*?)\]\]/gmi
  const link = reLink.exec(block.content)

  //We need a link to do something with
  if (link) {
    console.log("Found link:", link)
    return (
      <div className="toggle-bg m-9">
      <div className="component flex max-w-sm pt-12">
        <div className="px-1 pb-5 shadow-lg rounded-lg bg-gray-100 text-center relative">
          { relationData.map(function(rel){
            return <div className="mt-1 hover:bg-blue-300 py-2 px-0"><a href="#" onClick={() => replaceBlock(link[1], rel.abbr)} >{rel.txt}</a></div>
            }) 
          }
        </div>
      </div>
      </div>
    )
  } else return
}

export default Popup;

async function replaceBlock(props: any, relation:string) {
  logseq.hideMainUI()
  console.log("DB replaceBlock", props, relation)
  // const reLink:RegExp  = /\[\[(.*?)\]\]/gmi
  // const link = reLink.exec(props.content)
  // console.log("DB content", props.content)
  // console.log("Found:", link)

  // logseq.UI.showMsg("Function has been run")

  // const UUID = props.currBlock.uuid

  // console.log("DB props", props)
  // let currContent = (await logseq.Editor.getEditingBlockContent()) 
  //     ? await logseq.Editor.getEditingBlockContent()
  //     : props.currBlock.content
  
  // //remove previous relationship
  // let re
  // for (const rel of relationData){
  //   re = new RegExp(`\\[\\[ *\\[\\[${rel.abbr}\\]\\] *`,"g")
  //   currContent=currContent.replace(re, '')
  // }

  // //cleanup link
  // currContent = currContent.replace(/^\[\[/,"").replace(/\]\] *$/,"")
  // const msg = `[[[[${relation}]] ${currContent}]]`
  // await logseq.Editor.updateBlock(UUID, msg )
}

