# AI Document Chat Setup

This document explains how to set up the AI-powered document chat feature using LangChain and OpenAI.

## Features

- **Document-based Q&A**: Ask questions about your documents and get intelligent responses
- **Real-time chat interface**: Modern chat UI integrated into the document editor
- **Text processing**: Automatic text extraction and chunking for better AI processing
- **Vector search**: Uses embeddings for semantic search within documents

## Setup Instructions

### 1. Install Dependencies

The required dependencies are already installed:
- `langchain`
- `@langchain/openai`
- `@langchain/community`

### 2. Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your environment variables

### 4. Usage

1. Open any document in the editor
2. Click the "Chat" button in the floating header
3. Ask questions about the document content
4. The AI will analyze the document and provide relevant answers

## How It Works

### Document Processing
1. **Text Extraction**: Extracts plain text from Lexical editor format
2. **Chunking**: Breaks large documents into smaller, manageable chunks
3. **Embeddings**: Creates vector embeddings for semantic search

### AI Chat Flow
1. **User Query**: User asks a question about the document
2. **Vector Search**: Finds relevant document chunks using embeddings
3. **LLM Processing**: OpenAI processes the query with relevant context
4. **Response**: Returns intelligent answer based on document content

### Components

- **`/app/api/chat/route.ts`**: API endpoint for chat functionality
- **`DocumentChat.tsx`**: Chat interface component
- **`ChatButton.tsx`**: Button to toggle chat panel
- **`document-utils.ts`**: Utility functions for text processing

## Customization

### Model Configuration
You can modify the AI model in `/app/api/chat/route.ts`:

```typescript
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4', // Change to gpt-4 for better results
  temperature: 0.7,   // Adjust creativity (0-1)
});
```

### Text Chunking
Modify chunk size in `document-utils.ts`:

```typescript
export function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200)
```

### Chat UI
Customize the chat interface in `DocumentChat.tsx`:
- Colors and styling
- Message formatting
- Animation effects
- Panel size and position

## Troubleshooting

### Common Issues

1. **API Key Error**: Ensure your OpenAI API key is correctly set in environment variables
2. **No Content**: Make sure the document has text content to analyze
3. **Rate Limits**: OpenAI has rate limits - consider implementing caching for production

### Quota Exceeded Error (429)

If you see "You exceeded your current quota" error:

**Free Tier Users:**
- OpenAI free tier has limited usage (usually ~$5 credit)
- **Solution**: Upgrade to a paid plan at [OpenAI Platform](https://platform.openai.com/account/billing)
- **Alternative**: Wait for quota reset (usually monthly for free tier)

**Paid Tier Users:**
- Check your usage and billing at [OpenAI Dashboard](https://platform.openai.com/usage)
- Add more credits to your account
- Consider upgrading to a higher tier

**Error Messages:**
- `InsufficientQuotaError`: Your account has reached its usage limit
- `429`: Rate limit exceeded (too many requests)
- The chat will show a helpful message explaining the issue

### Error Handling
The chat includes comprehensive error handling:
- Network errors
- API failures
- Empty responses
- Invalid requests

## Security Considerations

- API keys are stored securely in environment variables
- User queries are sent to OpenAI - ensure compliance with your data policies
- Consider implementing user authentication for chat features
- Add rate limiting for production use

## Future Enhancements

- **Conversation Memory**: Remember previous questions in the session
- **Document Summarization**: Generate document summaries
- **Multi-document Search**: Search across multiple documents
- **Custom Prompts**: Allow users to customize AI behavior
- **Export Chat**: Save chat conversations
- **Voice Input**: Add speech-to-text functionality
