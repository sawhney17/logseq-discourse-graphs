import '@logseq/libs';
import { BlockEntity, PageEntity, } from '@logseq/libs/dist/LSPlugin';

export async function updateDiscourceCSS(e?:any) {
  console.log("updateDiscourceCSS in progress", e)
  const collection:any = parent.document.querySelectorAll("span.page-reference[data-ref]")
  console.log("DB collection", collection)
  for (let i = 0; i < collection.length; i++) {
  //   // console.log("i:",collection[i])
    const pageName = collection[i]["dataset"]["ref"]
    const page = await logseq.Editor.getPage(pageName);
    console.log("DB page 2x:", pageName, page)
    if (page) {
      const type = await returnDiscourseType(page)
      if (type) {
        updateDiscourseCSSclassList(collection[i], type)
      }
    }
  }
}

function updateDiscourseCSSclassList(cssQuery:any, cssClass:string) {
  // console.log("DB cssQuery.classList 1", cssQuery.classList)
  cssQuery.classList.remove("lsdsc_*")
  cssQuery.classList.add(`lsdsc_${cssClass}`)
  console.log("DB cssQuery.classList", cssQuery.classList)
  // console.log("DB cssQuery.classList 2", cssQuery.classList)
}

async function returnDiscourseType(page:any): Promise<string|undefined> {
  // console.log("DB page", page)

  // FIXME Bug workaround:
  //       it seems page properties only get applied after 
  //       editing them by hand?!?!
  const properties = page["properties"]
  return properties?.discourseType

  // pagetype is defined in the first block on the page
  // const blocks:BlockEntity[] = await logseq.Editor.getPageBlocksTree(page.name);
  // if (!blocks) return
  // const re:RegExp = /discourse_type:: *(.*)/
  // if (blocks[0] && re.test(blocks[0].content)) { 
  //   const retval = re.exec(blocks[0].content) 
  //   return retval ? retval[0] : ""
  // }
}

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