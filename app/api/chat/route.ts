import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { Document } from '@langchain/core/documents';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { getDocument } from '@/lib/actions/room.actions';
import { processDocumentForChat, chunkText } from '@/lib/document-utils';
import { currentUser } from '@clerk/nextjs/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { message, roomId, provider = 'openai' } = await request.json();

    if (!message || !roomId) {
      return NextResponse.json(
        { error: 'Message and roomId are required' },
        { status: 400 }
      );
    }

    // Get the document content with proper user authentication
    const room = await getDocument({
      roomId,
      userId: user.emailAddresses[0].emailAddress,
    });

    if (!room) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Process document content
    const documentData = processDocumentForChat(room);
    
    if (!documentData.text) {
      return NextResponse.json(
        { error: 'No content found in document' },
        { status: 400 }
      );
    }

    // Chunk the text for better processing
    const textChunks = chunkText(documentData.text);

    let answer: string;
    let sources: string[] = [documentData.title];

    if (provider === 'gemini') {
      // Use Gemini API
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json(
          { error: 'Gemini API key not configured' },
          { status: 500 }
        );
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create context from document chunks
      const context = textChunks.join('\n\n');
      const prompt = `Based on the following document content, please answer the user's question. Be helpful, accurate, and concise.

Document Content:
${context}

User Question: ${message}

Please provide a clear and helpful answer based on the document content. If the question cannot be answered from the document, please say so.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      answer = response.text();
    } else {
      // Use OpenAI (default)
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured' },
          { status: 500 }
        );
      }

      const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: 'gpt-3.5-turbo',
        temperature: 0.7,
      });

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      // Create documents from chunks
      const docs = textChunks.map((chunk, index) => 
        new Document({
          pageContent: chunk,
          metadata: { 
            source: roomId, 
            title: documentData.title,
            chunkIndex: index,
            totalChunks: textChunks.length
          },
        })
      );

      const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

      // Create retrieval chain
      const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

      // Query the document
      const response = await chain.call({
        query: message,
      });

      answer = response.text;
    }

    return NextResponse.json({
      answer,
      sources,
      provider
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Handle quota exceeded or other API errors
    if (error.message?.includes('quota') || error.message?.includes('429') || error.message?.includes('InsufficientQuotaError') || error.message?.includes('QUOTA_EXCEEDED')) {
      return NextResponse.json({
        answer: "I'm currently experiencing high demand and my API quota has been exceeded. Please try again later, or consider upgrading your AI plan. In the meantime, you can still collaborate on your document!",
        sources: [],
        error: 'quota_exceeded'
      });
    }
    
    // Handle Gemini-specific errors
    if (error.message?.includes('SAFETY') || error.message?.includes('BLOCKED')) {
      return NextResponse.json({
        answer: "I'm unable to process this request due to safety guidelines. Please try rephrasing your question or ask about a different topic.",
        sources: [],
        error: 'safety_blocked'
      });
    }
    
    // Handle other API errors
    if (error.message?.includes('API') || error.message?.includes('OpenAI') || error.message?.includes('Gemini') || error.message?.includes('rate limit') || error.message?.includes('PERMISSION_DENIED')) {
      return NextResponse.json({
        answer: "I'm having trouble connecting to the AI service right now. Please check your internet connection and try again in a few moments.",
        sources: [],
        error: 'api_error'
      });
    }
    
    // Generic error fallback
    return NextResponse.json({
      answer: "I'm sorry, I encountered an error while processing your request. Please try again or contact support if the issue persists.",
      sources: [],
      error: 'unknown_error'
    });
  }
}
