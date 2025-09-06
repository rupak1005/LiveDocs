# LiveDocs - Real-time Collaborative Document Editor

A modern, real-time collaborative document editor built with Next.js, featuring AI-powered chat, live collaboration, and a beautiful dark theme interface.

![LiveDocs Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC)

## Features

### Core Features
- **Real-time Collaboration** - Multiple users can edit documents simultaneously
- **AI-Powered Chat** - Ask questions about your documents using OpenAI integration
- **Modern Editor** - Rich text editing with Lexical editor
- **Live Cursors** - See other users' cursors and selections in real-time
- **User Authentication** - Secure authentication with Clerk
- **Responsive Design** - Works seamlessly on desktop and mobile

### UI/UX Features
- **Dark Theme** - Beautiful dark interface with glassmorphism effects
- **Floating Navigation** - Modern floating header design
- **Animated Backgrounds** - Grid beams animation for visual appeal
- **Smooth Animations** - Micro-interactions and transitions throughout
- **Professional Design** - Clean, modern aesthetic with gradient accents

### AI Features
- **Document Q&A** - Ask questions about document content
- **Intelligent Responses** - Context-aware answers using LangChain
- **Vector Search** - Semantic search within documents
- **Error Handling** - Graceful handling of API limits and errors

## 📸 Screenshots

### Landing Page
![Landing Page](public/screenshots/Pasted%20image.png)
*Modern landing page with animated grid beams background*

### Dashboard
![Dashboard](public/screenshots/Pasted%20image%20(2).png)
*Clean dashboard interface with document management*

### Document Editor
![Document Editor](public/screenshots/Pasted%20image%20(3).png)
*Real-time collaborative editor with floating toolbar*

### AI Chat Interface
![AI Chat](public/screenshots/Pasted%20image%20(4).png)
*AI-powered document chat with provider selection*

### Collaboration Features
![Collaboration](public/screenshots/Pasted%20image%20(5).png)
*Live cursors and real-time collaboration*

### Mobile Responsive
![Mobile View](public/screenshots/Pasted%20image%20(6).png)
*Fully responsive design for all devices*

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives

### Backend & Services
- **Liveblocks** - Real-time collaboration infrastructure
- **Clerk** - Authentication and user management
- **OpenAI API** - AI-powered document chat
- **LangChain** - LLM application framework
- **Liveblocks Cloud Storage** - Document storage (via Liveblocks)

### Editor
- **Lexical** - Extensible text editor framework
- **Liveblocks React Lexical** - Real-time collaboration for Lexical

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI chat feature)
- Clerk account (for authentication)
- Liveblocks account (for real-time collaboration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rupak1005/LiveDocs.git
   cd LiveDocs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Liveblocks
   LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
   NEXT_PUBLIC_LIVEBLOCKS_PUBLISHABLE_KEY=your_liveblocks_publishable_key

   # AI Chat (choose one or both)
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key

   # Sentry (optional, for error tracking)
   SENTRY_DSN=your_sentry_dsn
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
collaborative-editor/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/                   # Main application routes
│   │   ├── dashboard/            # Document dashboard
│   │   ├── documents/[id]/       # Document editor
│   │   └── page.tsx             # Landing page
│   ├── api/                      # API routes
│   │   ├── chat/                 # AI chat endpoint
│   │   └── liveblocks-auth/      # Liveblocks authentication
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── Provider.tsx             # Context providers
├── components/                   # React components
│   ├── editor/                  # Editor components
│   │   ├── Editor.tsx
│   │   └── plugins/             # Lexical plugins
│   ├── magicui/                 # UI components
│   │   └── grid-beams.tsx       # Animated background
│   ├── ui/                      # Reusable UI components
│   ├── DocumentChat.tsx         # AI chat interface
│   ├── FloatingHeader.tsx       # Floating navigation
│   ├── LandingPage.tsx          # Landing page
│   └── ...                      # Other components
├── lib/                         # Utility libraries
│   ├── actions/                 # Server actions
│   ├── document-utils.ts        # Document processing
│   ├── liveblocks.ts           # Liveblocks configuration
│   └── utils.ts                # General utilities
├── public/                      # Static assets
│   └── assets/                  # Images and icons
├── styles/                      # Additional styles
└── types/                       # TypeScript type definitions
```

## Key Components

### Document Editor
- **Lexical Editor** - Rich text editing with real-time collaboration
- **Floating Toolbar** - Context-aware formatting tools
- **Live Cursors** - See other users' cursors and selections
- **Comments System** - Collaborative commenting on document sections

### AI Chat System
- **Document Q&A** - Ask questions about document content
- **Vector Search** - Semantic search using embeddings
- **Error Handling** - Graceful handling of API limits
- **Real-time Responses** - Instant AI responses

### User Interface
- **Floating Header** - Modern navigation with glassmorphism
- **Grid Beams** - Animated background effects
- **Dark Theme** - Professional dark interface
- **Responsive Design** - Mobile-first approach

## Configuration

### Liveblocks Setup
1. Create a [Liveblocks](https://liveblocks.io) account
2. Create a new project
3. Copy your API keys to environment variables
4. Configure room permissions in `liveblocks.config.ts`

### Clerk Authentication
1. Create a [Clerk](https://clerk.com) account
2. Set up your application
3. Configure authentication routes
4. Add your API keys to environment variables

### AI Chat Integration
#### OpenAI
1. Get an [OpenAI API key](https://platform.openai.com)
2. Add the key to your environment variables
3. Configure the model settings in `app/api/chat/route.ts`

#### Google Gemini (Alternative)
1. Get a [Google AI Studio API key](https://makersuite.google.com/app/apikey)
2. Add the key to your environment variables as `GEMINI_API_KEY`
3. The app will automatically use Gemini when selected in the chat interface

**Note**: You can use either OpenAI, Gemini, or both. The chat interface allows you to switch between providers.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Usage

### Creating Documents
1. Sign in to your account
2. Click "Create Document" on the dashboard
3. Start typing to create your document
4. Share the document URL with collaborators

### Real-time Collaboration
- Multiple users can edit simultaneously
- See live cursors and selections
- Changes sync in real-time
- Comment on specific sections

### AI Chat
1. Open a document
2. Click the "AI Chat" button
3. Choose your preferred AI provider (OpenAI or Gemini)
4. Ask questions about the document content
5. Get intelligent responses based on the document

## Customization

### Themes
- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for design tokens
- Customize component styles in individual files

### Editor Features
- Add new Lexical plugins in `components/editor/plugins/`
- Customize toolbar in `FloatingToolbarPlugin.tsx`
- Modify editor behavior in `Editor.tsx`

### AI Chat
- Adjust model settings in `app/api/chat/route.ts`
- Modify chat UI in `DocumentChat.tsx`
- Customize document processing in `lib/document-utils.ts`

## Troubleshooting

### Common Issues

#### AI Chat Not Working
- Check your AI provider API key is correctly set (OpenAI or Gemini)
- Verify API quota hasn't been exceeded
- Try switching between OpenAI and Gemini providers
- Check network connectivity

#### Real-time Collaboration Issues
- Verify Liveblocks API keys
- Check room permissions
- Ensure stable internet connection

#### Authentication Problems
- Verify Clerk configuration
- Check environment variables
- Ensure proper redirect URLs

### Error Handling
The application includes comprehensive error handling:
- API rate limits
- Network connectivity issues
- Authentication errors
- Document access permissions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Liveblocks](https://liveblocks.io) - Real-time collaboration
- [Clerk](https://clerk.com) - Authentication
- [OpenAI](https://openai.com) - AI capabilities
- [Lexical](https://lexical.dev) - Text editor
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://framer.com/motion) - Animations


**Made with ❤️**

