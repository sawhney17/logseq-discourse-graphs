import '@logseq/libs';
import { BlockEntity, PageEntity, } from '@logseq/libs/dist/LSPlugin';

interface DiscoursePage extends PageEntity {
    properties: any;
  }

export async function colorpage () {
    console.log("coloring in progress")
    let pageName
    const collection:any = parent.document.querySelectorAll(".page-ref[data-ref]")
    for (let i = 0; i < collection.length; i++) {
      pageName = collection[i]["dataset"].ref
      console.log("DB", pageName)
      //FIXME type?
      const page:any = await logseq.Editor.getPage(pageName);
  
      console.log("DB type", page?.properties?.type)
      let type = page?.properties?.type
      if (type) {
        const elements:any = parent.document.querySelector(`[data-ref="${page?.name}"]`)
        console.log("DB", elements)
        elements.classList.add(type)
        console.log("DB added", type)
        }
      }
  
  
  }