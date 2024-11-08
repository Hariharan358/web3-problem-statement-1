// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentStorage {
    // Structure to store each document with its encrypted link and encrypted key
    struct Document {
        string encryptedLink;    // The encrypted IPFS link
        string encryptedKey;     // The symmetric encryption key, encrypted for recipient
        address owner;           // The address of the recipient (wallet address)
        bool exists;             // Flag to check if the document exists
    }

    // Mapping of document ID to Document struct
    mapping(uint256 => Document) private documents;
    // Counter for document IDs
    uint256 private documentCounter;

    // Event to notify when a document is stored
    event DocumentStored(uint256 documentId, address indexed owner);

    // Store a new document
    function storeDocument(address _recipient, string memory _encryptedLink, string memory _encryptedKey) public {
        // Increment the document counter
        documentCounter++;

        // Create a new document struct and save it in the mapping
        documents[documentCounter] = Document({
            encryptedLink: _encryptedLink,
            encryptedKey: _encryptedKey,
            owner: _recipient,
            exists: true
        });

        // Emit event to notify that a new document has been stored
        emit DocumentStored(documentCounter, _recipient);
    }

    // Retrieve document by document ID - only accessible by the document's owner
    function retrieveDocument(uint256 _documentId) public view returns (string memory, string memory) {
        require(documents[_documentId].exists, "Document does not exist.");
        require(documents[_documentId].owner == msg.sender, "You are not authorized to access this document.");

        // Return encrypted link and encrypted key
        return (documents[_documentId].encryptedLink, documents[_documentId].encryptedKey);
    }

    // Get total number of documents stored
    function getTotalDocuments() public view returns (uint256) {
        return documentCounter;
    }
}
