import "@logseq/libs";
import {
  BlockEntity,
  BlockPageName,
  BlockUUID,
  PageEntity,
} from "@logseq/libs/dist/LSPlugin";


export async function getDiscourseProperties(page:PageEntity) {
    const workPage = await logseq.Editor.getPage(page.uuid);
    // const properties = page
    console.log("getDiscourseProperties", page)
    // const properties = page["properties"]
    // return properties
}