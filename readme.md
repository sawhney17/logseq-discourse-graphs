# Logseq Discourse Graphs
Logseq discourse graphs is a comprehensive knowledge management system built on top of Logseq. 


## Installation
- The plugin is not currently in the marketplace
- Download the latest plugin release from releases as a zip file and unzip it 
- In logseq, go the plugins and select "load unpacked plugin"
- Navigate to the unzipped plugin folder and select it


## Usage Instructions
1. Create a page
2. For any created page, add a property discourse-type and delineate it as either Evidence, Claim or Question
3. Create discourse relationships, as described in the next step
4. On discourse pages, at the bottom of the screen you should see "Discourse Context" automatically populated on the basis of these changes 

## Discourse Relationships
- Informed by
    - Avilable on the questions page
    - Created by nesting a question underneath evidence
- Informs
    - Available on the evidence pages
    - Created by nesting a question underneath evidence
- Supports
    - - Available on the evidence page
    - Created by nesting evidence underneath a claim and adding a tag of #supports onto the reference to evidence
- Opposes
    - Available on the evidence page
    - Created by nesting evidence underneath a claim and adding a tag of #opposes onto the reference to evidence
- Opposed by
    - Available on the claims page
    - Created by nesting evidence underneath a claim and adding a tag of #opposes onto the reference to evidence
- Supported by
    - Available on the claims page
    - Created by nesting evidence underneath a claim and adding a tag of #supports onto the reference to evidence
- The ability to delineate custom relationships will be added in a subsequent update

## Credits
- Development of this plugin has been financially supported by the [Global Partnership Network]( https://www.uni-kassel.de/forschung/global-partnership-network/home) at the University of Kassel
- Credits to Dr. Joel Chan for the ideas at the core of the plugin