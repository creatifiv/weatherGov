// TrieNode

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
				this.trieAlert = "new tree planted";
			}
			insert(word){
				let node = this.root;
			for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(); // Create a new node if char not found
      }//end if
      node = node.children[char]; // Move to the next node
      //dropDownBox[0].innerHTML = node;
      console.log("char" + "" + char);
    }//end for
    node.isEndOfWord = true; // Mark the end of a valid word
	}//end insert

	// Search for a word in the trie
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
      	console.log(word + " " + "Not found");
      	/*dropDownBox.innerHTML */ x10.innerHTML = word + " " + "not found";
        return false; // Word not found
      }
      node = node.children[char];
						x10 += node.children[char];
    }
    console.log(node.isEndOfWord);
    return node.isEndOfWord; // Returns true if it's a complete word
  }

  // Check if a prefix exists in the trie
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
      	 console.log("Prefix:" + " " + prefix + " " + "does not exist");
        return false;
      }
      node = node.children[char];
      console.log(prefix + " " + "exist");
    }
    return true; // Prefix exists
  }
}
var newTrie = new Trie();