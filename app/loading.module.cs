.loadingContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 140px);
  background-color: #f5f5f5;
}

.loadingContent {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loadingText {
  color: #666;
}