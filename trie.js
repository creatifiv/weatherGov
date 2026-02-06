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
      insert(word){
         let node = this.root;
         
         for (const ch of word){
            if(!node.children[ch]){
               node.children[ch] = new TrieNode();
            }
            node = node.children[ch];
         }
         node.isEndOfWord = true;
      }
    }
    
    