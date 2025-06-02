import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { FiCopy, FiSun, FiMoon, FiUser, FiMessageSquare } from 'react-icons/fi';
import styles from '../styles/Home.module.css';

// Main Home component
export default function Home() {
  // State hooks for input, messages, loading, error, and theme
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState('dark');
  const messagesEndRef = useRef(null);

  // Toggle between dark and light theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Update body class when theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Handle form submission and send user input to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { 
      role: "user", 
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      // Send user input to backend API
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      if (!res.ok) throw new Error("Something went wrong!");

      // Add AI response to chat
      const data = await res.json();
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Custom renderer for markdown code blocks with copy button
  const markdownComponents = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className={styles.codeBlock}>
          <button 
            onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
            className={styles.copyButton}
            title="Copy code"
          >
            <FiCopy className={styles.copyIcon} />
          </button>
          <SyntaxHighlighter
            language={match[1]}
            style={null}
            customStyle={{
              background: 'var(--code-bg)',
              borderRadius: '0.5rem',
              padding: '1rem',
              margin: '0.5rem 0'
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <main className={styles.appContainer}>
      {/* Header with title and theme toggle */}
      <header className={styles.appHeader}>
        <div className={`${styles.headerContent} ${styles.container}`}>
          <h1 className={styles.appTitle}>
            <FiMessageSquare className={styles.titleIcon} />
            <span>AI Assistant</span>
          </h1>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </header>

      {/* Chat container */}
      <div className={styles.chatContainer}>
        {/* Show empty state if no messages */}
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <div className={styles.emptyStateIcon}>🤖</div>
              <h2 className={styles.emptyStateTitle}>How can I help you today?</h2>
              <p className={styles.emptyStateDescription}>
                Ask me anything about coding, science, or general knowledge.
              </p>
            </div>
          </div>
        ) : (
          // Render chat messages
          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.messageWrapper} ${
                  message.role === "user" ? styles.userMessage : styles.aiMessage
                }`}
              >
                <div className={styles.messageContentWrapper}>
                  {/* AI avatar */}
                  {message.role !== "user" && (
                    <div className={styles.aiAvatar}>
                      <FiMessageSquare className={styles.avatarIcon} />
                    </div>
                  )}
                  <div className={styles.messageBubbleWrapper}>
                    {/* Message bubble */}
                    <div className={`${message.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAi}`}>
                      {message.role === 'ai' ? (
                        // Render AI message as markdown
                        <ReactMarkdown components={markdownComponents}>
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        // Render user message as plain text
                        <div className={styles.userMessageText}>{message.content}</div>
                      )}
                    </div>
                    {/* Message meta info (timestamp, copy button) */}
                    <div className={`${styles.messageMeta} ${
                      message.role === 'user' ? styles.messageMetaUser : styles.messageMetaAi
                    }`}>
                      <span className={styles.messageTimestamp}>
                        {message.timestamp}
                      </span>
                      {/* Copy button for AI messages */}
                      {message.role === 'ai' && (
                        <button 
                          onClick={() => copyToClipboard(message.content)}
                          className={styles.copyMessageButton}
                          title="Copy message"
                        >
                          <FiCopy className={styles.copyMessageIcon} />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* User avatar */}
                  {message.role === "user" && (
                    <div className={styles.userAvatar}>
                      <FiUser className={styles.avatarIcon} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Dummy div for auto-scroll */}
            <div ref={messagesEndRef} />
            
            {/* Loading indicator while waiting for AI response */}
            {loading && (
              <div className={styles.loadingIndicator}>
                <div className={styles.loadingBubble}>
                  <div className={styles.loadingDots}>
                    <div className={styles.loadingDot}></div>
                    <div className={styles.loadingDot}></div>
                    <div className={styles.loadingDot}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message display */}
      {error && (
        <div className={styles.errorMessage}>
          <span>{error}</span>
        </div>
      )}

      {/* Input area for user to type and send messages */}
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={styles.messageInput}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={styles.sendButton}
            >
              {/* Show spinner while loading */}
              {loading ? (
                <svg className={styles.spinner} viewBox="0 0 24 24">
                  <circle
                    className={styles.spinnerCircle}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className={styles.spinnerPath}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : (
                "Send"
              )}
            </button>
          </div>
          {/* Disclaimer and footer */}
          <p className={styles.inputDisclaimer}>
            AI Assistant may produce inaccurate information. Consider verifying important information.
          </p>
          <div className={styles.footer}>
            <span>Built with </span>
            <span className={styles.heart}>♥</span>
            <span> by Samuel Gicho</span>
          </div>
        </div>
      </form>
    </main>
  );
}