# Gemini API Setup Guide

This guide will help you set up Google's Gemini API for use with LiveDocs AI chat feature.

## 🚀 Getting Started

### 1. Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Add to Environment Variables

Add your Gemini API key to your `.env.local` file:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Usage in LiveDocs

1. Open any document in LiveDocs
2. Click the "AI Chat" button
3. In the chat interface, you'll see a provider selector
4. Choose "Gemini" to use Google's AI model
5. Start asking questions about your document!

## 🔧 Configuration

### Model Settings

The app uses `gemini-1.5-flash` by default, which offers:
- Fast response times
- Good quality responses
- Cost-effective pricing

You can modify the model in `app/api/chat/route.ts`:

```typescript
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash" // or "gemini-1.5-pro" for higher quality
});
```

### Available Models

- **gemini-1.5-flash**: Fast and efficient (default)
- **gemini-1.5-pro**: Higher quality, slower responses
- **gemini-1.0-pro**: Stable version

## 💰 Pricing

Gemini API offers generous free tier limits:
- **Free tier**: 15 requests per minute, 1 million tokens per day
- **Paid tier**: Higher limits with pay-per-use pricing

Check [Google AI Studio pricing](https://ai.google.dev/pricing) for current rates.

## 🛠️ Troubleshooting

### Common Issues

#### API Key Not Working
- Verify the API key is correctly copied
- Check that the key is added to your `.env.local` file
- Restart your development server after adding the key

#### Quota Exceeded
- Check your usage in [Google AI Studio](https://makersuite.google.com/app/apikey)
- Wait for quota reset or upgrade to paid tier
- Try switching to OpenAI provider as alternative

#### Safety Blocked Responses
- Gemini has safety filters that may block certain content
- Try rephrasing your question
- Switch to OpenAI provider if needed

### Error Messages

The app handles common Gemini errors:

- **QUOTA_EXCEEDED**: You've hit your API limits
- **SAFETY**: Content blocked by safety filters
- **PERMISSION_DENIED**: Invalid API key or permissions

## 🔄 Switching Between Providers

You can easily switch between OpenAI and Gemini:

1. In the chat interface, use the provider selector
2. Choose between "OpenAI" and "Gemini"
3. Your selection is remembered for the session
4. Both providers work with the same document content

## 📚 Additional Resources

- [Google AI Studio Documentation](https://ai.google.dev/docs)
- [Gemini API Reference](https://ai.google.dev/api/rest)
- [Safety Guidelines](https://ai.google.dev/responsible-ai)

## 🆚 OpenAI vs Gemini

| Feature | OpenAI | Gemini |
|---------|--------|--------|
| **Speed** | Fast | Very Fast |
| **Quality** | High | High |
| **Free Tier** | Limited | Generous |
| **Context Length** | 4K-128K | 1M+ |
| **Languages** | English-focused | Multilingual |

Choose the provider that best fits your needs!
