/**
 * Utility functions for document processing and text extraction
 */

export interface DocumentContent {
  text: string;
  title: string;
  metadata?: any;
}

/**
 * Extract plain text from Lexical editor state
 * This is a simplified version - you might need to enhance based on your Lexical setup
 */
export function extractTextFromLexical(lexicalState: any): string {
  if (!lexicalState || !lexicalState.root) {
    return '';
  }

  let text = '';
  
  function traverseNode(node: any) {
    if (node.type === 'text') {
      text += node.text || '';
    } else if (node.children) {
      node.children.forEach(traverseNode);
    }
    
    // Add line breaks for paragraph nodes
    if (node.type === 'paragraph' && node.children && node.children.length > 0) {
      text += '\n';
    }
  }
  
  traverseNode(lexicalState.root);
  return text.trim();
}

/**
 * Process document content for AI chat
 */
export function processDocumentForChat(room: any): DocumentContent {
  const title = room.metadata?.title || 'Untitled Document';
  let text = '';
  
  // Try to extract from different possible content formats
  if (room.metadata?.content) {
    if (typeof room.metadata.content === 'string') {
      text = room.metadata.content;
    } else if (room.metadata.content.root) {
      // Lexical format
      text = extractTextFromLexical(room.metadata.content);
    }
  }
  
  // Fallback to title if no content
  if (!text) {
    text = title;
  }
  
  return {
    text,
    title,
    metadata: room.metadata,
  };
}

/**
 * Chunk text for better processing
 */
export function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
  if (text.length <= chunkSize) {
    return [text];
  }
  
  const chunks: string[] = [];
  let start = 0;
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    let chunk = text.slice(start, end);
    
    // Try to break at sentence boundaries
    if (end < text.length) {
      const lastSentence = chunk.lastIndexOf('.');
      const lastNewline = chunk.lastIndexOf('\n');
      const breakPoint = Math.max(lastSentence, lastNewline);
      
      if (breakPoint > start + chunkSize * 0.5) {
        chunk = text.slice(start, start + breakPoint + 1);
        start = start + breakPoint + 1;
      } else {
        start = end - overlap;
      }
    } else {
      start = end;
    }
    
    chunks.push(chunk.trim());
  }
  
  return chunks.filter(chunk => chunk.length > 0);
}

