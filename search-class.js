// TrieNode
export class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
    this.wordsFound = [];
    this.trieAlert = "Enter city, state, or zip";
    this.indexLog = "new Tree planted";
    console.log("New Trie planted");
  }

  // Insert a word into the Trie
  insert(word) {
    let node = this.root;
    word = word.toLowerCase();
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode(); // Create a new node if char not found
      }
      node = node.children[char]; // Move to the next node
    }
    node.isEndOfWord = true; // Mark the end of a valid word
  }

  // Search for a word in the trie
  search(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) {
        console.log(word + " " + "Not found");
        this.trieAlert = word + " " + "not found";
        return false; // Word not found
      }
      node = node.children[char];
    }
    console.log(node.isEndOfWord);
    return node.isEndOfWord; // Returns true if it's a complete word
  }

  // Check if a prefix exists in the trie
  startsWith(prefix) {
    let node = this.root;
    prefix = prefix.toLowerCase();
    for (let char of prefix) {
      if (!node.children[char]) {
        console.log("Prefix:" + " " + prefix + " " + "does not exist");
        this.trieAlert = "Prefix not found";
        return false;
      }
      node = node.children[char];
      console.log(prefix + " " + "exists");
    }
    return true; // Prefix exists
  }
  
  collectWords(){
    var node = this.root;
    var words = " ";
    for(var char in node.children){
        words += char; 
    }
    alert(words, node.children[char]);
  }

}// end trie



