# AI Chat Application

A modern, Perplexity AI-inspired chat interface that supports threaded conversations, citations, and dark mode.

## 🌟 Features

- **Thread Communication**: AI Powered search engine with citations and related questions
- **Citation System**: Interactive citation buttons similar to Perplexity AI
- **Dark Mode Support**: Full dark mode implementation with system preference detection
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI**: Clean, minimal interface with smooth transitions

## 🏗️ Technical Architecture

### Core Technologies

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Context API for global state
- **Package Management**: npm/yarn
- **Build Tool**: Vite

### Key Dependencies
- react
- react-dom
- date-fns
- uuid
- tailwindcss


## 💡 Design Decisions

### 1. Thread Management
- **Why Context API?**: Chosen for its simplicity and built-in React integration
- **Thread Structure**: Each thread contains:
  - Unique ID
  - Query
  - Answer
  - Citations
  - Timestamp
  - Active status

### 2. Citation System
- **Implementation**: Inline citation buttons with number references
- **Styling**: Matches Perplexity AI's minimal, clean design
- **Interaction**: Click to highlight referenced source

### 3. Dark Mode
- **Implementation**: Tailwind's dark mode with `class` strategy
- **Storage**: User preference persisted in localStorage
- **Colors**: Carefully chosen for accessibility and contrast

### 4. State Management Choices
- **Local State**: Used for component-specific UI states
- **Context API**: Used for:
  - Thread management
  - Theme preferences
  - Global application state

## 🚀 Getting Started

1. **Installation**

```bash
git clone https://github.com/SankalpC10/perp-fe.git
npm install
npm start
```

## 🎨 Styling Guidelines

### Color Palette
- **Light Mode**
  - Primary: Blue (#2563eb)
  - Background: White (#FFFFFF)
  - Text: Gray-900 (#111827)

- **Dark Mode**
  - Primary: Blue-400 (#60A5FA)
  - Background: Dark-base (#0F0F0F)
  - Text: Gray-100 (#F3F4F6)

### Component Design
- Consistent padding/margin (4, 8, 16, 24px)
- Rounded corners (border-radius: 8px)
- Smooth transitions (150ms duration)

## 🔍 Best Practices

1. **Code Organization**
   - Component-based architecture
   - Separation of concerns
   - TypeScript for type safety

2. **Performance**
   - Lazy loading for large components
   - Memoization of expensive calculations
   - Optimized re-renders

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Color contrast compliance

## 🛠️ Future Improvements

1. **Features**
   - Message threading within conversations
   - Export conversation history
   - Rich text formatting support
   - Image/file attachment support

2. **Technical**
   - Add end-to-end testing
   - Implement error boundary
   - Add analytics tracking
   - Improve performance monitoring

- **Thread-based Conversations**: Organize chats into separate threads for better context management
