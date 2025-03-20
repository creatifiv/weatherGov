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
    console.log("New Trie planted");
    this.trieAlert = "Enter city, state, or zip";
    this.wordAlert = this.getAllWords();
    this.indexLog = "new Tree planted";
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

  // Collect words starting from a given node
  collectWords(node, prefix, words) {
    if (node.isEndOfWord) words.push(prefix); // If it's the end of a word, add it to the result

    for (let char in node.children) {
      this.collectWords(node.children[char], prefix + char, words); // Recurse and build the word
    }
  }

  // Get all words in the trie
  getAllWords() {
    let words = [];
    this.collectWords(node," ", words); // Start from root and an empty prefix
    return words;
  }
}



