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
    
    getWordsWithPrefix(prefix){
        let node = this.root;
        for(let char of prefix){
            if(!node.children[char]){
                return [];
            }
            node = node.children[char];
        }
        const results = [];
        const dfs = (node, path) => {
            if(node.isEndOfWord){
                results.push(prefix + path);
            }
            for(let char in node.children){
                dfs(node.children[char], path + char);
            }
        }; // End 
      dfs(node, "");
        return results; 
}
    
    