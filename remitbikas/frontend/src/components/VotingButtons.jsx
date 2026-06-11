// frontend/src/components/VotingButtons.jsx
import { useState, useEffect } from 'react';
import { voteApi } from '../lib/api';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export const VotingButtons = ({ projectId }) => {
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadVotes = async () => {
    try {
      const data = await voteApi.getProjectVotes(projectId);
      setVotes({
        up: data.summary?.upvotes || 0,
        down: data.summary?.downvotes || 0,
      });
      setUserVote(data.userVote || null);
      setError(null);
    } catch (err) {
      console.error('Failed to load votes:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (projectId) loadVotes();
  }, [projectId]);

  const handleVote = async (value) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      await voteApi.cast(projectId, value);
      // Optimistic update
      setUserVote(value);
      await loadVotes(); // refresh from server
    } catch (err) {
      console.error('Vote failed:', err);
      setError(err.message);
      await loadVotes(); // revert
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await voteApi.delete(projectId);
      setUserVote(null);
      await loadVotes();
    } catch (err) {
      console.error('Remove vote failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="text-red-500 text-sm">⚠️ {error}</div>;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleVote(1)}
        disabled={loading}
        className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
          userVote === 1
            ? 'bg-green-100 text-green-700'
            : 'text-gray-600 hover:bg-gray-100'
        } disabled:opacity-50`}
      >
        <ThumbsUp size={18} />
        <span>{votes.up}</span>
      </button>
      <button
        onClick={() => handleVote(-1)}
        disabled={loading}
        className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
          userVote === -1
            ? 'bg-red-100 text-red-700'
            : 'text-gray-600 hover:bg-gray-100'
        } disabled:opacity-50`}
      >
        <ThumbsDown size={18} />
        <span>{votes.down}</span>
      </button>
      {userVote && (
        <button
          onClick={handleRemove}
          disabled={loading}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Remove vote
        </button>
      )}
    </div>
  );
};