import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType } from '@lexical/selection';
const { ElementNode, createCommand, COMMAND_PRIORITY_LOW, $getSelection, $isRangeSelection, $createParagraphNode } = require('lexical');

export class CustomParagraph extends ElementNode {
  static getType(){
    return 'custom-paragraph';
  }

  static clone(node) {
    return new CustomParagraph(node.__key);
  }

  createDOM(config) {
    // Define the DOM element here
    const dom = document.createElement('p');
    dom.className = config.theme.banner
    return dom;
  }

  updateDOM(prevNode, dom) {
    return false;
  }

  insertNewAfter(selection, restoreSelection) { // when i click enter open an new line without this node
    const newBolck = $createParagraphNode()
    const direction = this.getDirection()
    newBolck.setDirection(direction)
    this.insertAfter(newBolck, restoreSelection);
    return newBolck
  }

  collapseAtStart(selection) { // clear the node when i clear the first line
    const paragraph = $createParagraphNode();
    const children = this.getChildren()
    children.forEach(child => paragraph.append(child))
    this.replace(paragraph)
    return true
  }
}

export const $createCustomParagraphNode = () => {
  return new CustomParagraph();
}

export const $isCustomParagraphNode = (node) =>  {
  return node instanceof CustomParagraph;
}

export const INSERT_BANNER_COMMAND = createCommand("insertBanner")


export const BannerPlugin = () => {
  const [editor] = useLexicalComposerContext();
  if(!editor.hasNodes([CustomParagraph])) {
    throw new Error("NewNode: Node not registered on editor")
  }
  
  editor.registerCommand(INSERT_BANNER_COMMAND, () => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      $setBlocksType(selection, $createCustomParagraphNode)
    }
    return true
  }, COMMAND_PRIORITY_LOW)
  return null
}
