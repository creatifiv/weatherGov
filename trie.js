export class TrieNode {
		constructor(){
            this.children = {};
            this.isEndOfWord = false;
		}
	}
    
export class Trie {
	constructor(){
        this.root = new TrieNode();
        console.log("New Trie planted");
        }
    }
    
    export default Trie
    export default TrieNode