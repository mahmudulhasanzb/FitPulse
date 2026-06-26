'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Send, Trash2, Edit3, X, Check, User } from 'lucide-react';
import Image from 'next/image';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { getCommentsByPostId } from '@/lib/api/comments/data';
import { addComment, editComment, deleteComment, likePost, dislikePost } from '@/lib/api/mutations/actions';
import { useRouter } from 'next/navigation';

const ForumPostDetailsClient = ({ post, postId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes?.length || 0);
  const [dislikesCount, setDislikesCount] = useState(post?.dislikes?.length || 0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  // Check if current user has liked/disliked
  useEffect(() => {
    if (user?.email && post) {
      setLiked(post.likes?.includes(user.email) || false);
      setDisliked(post.dislikes?.includes(user.email) || false);
    }
  }, [user, post]);

  // Check if user is blocked
  useEffect(() => {
    const checkBlocked = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/users`);
        const users = await res.json();
        const currentUser = users.find(u => u.email === user.email);
        if (currentUser?.status === 'blocked') setIsBlocked(true);
      } catch (e) {}
    };
    checkBlocked();
  }, [user]);

  // Fetch comments
  useEffect(() => {
    if (!postId) return;
    getCommentsByPostId(postId).then(setComments);
  }, [postId]);

  // Re-fetch comments after add/edit/delete
  const refreshComments = async () => {
    const c = await getCommentsByPostId(postId);
    setComments(c);
  };

  const handleLike = async () => {
    if (!user) { toast.error('Please login to vote'); return; }
    if (isBlocked) { toast.error('Action restricted by Admin'); return; }
    const res = await likePost(postId);
    if (res.liked) {
      setLiked(true);
      setDisliked(false);
      setLikesCount(prev => prev + 1);
      if (disliked) setDislikesCount(prev => prev - 1);
    } else {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    }
  };

  const handleDislike = async () => {
    if (!user) { toast.error('Please login to vote'); return; }
    if (isBlocked) { toast.error('Action restricted by Admin'); return; }
    const res = await dislikePost(postId);
    if (res.disliked) {
      setDisliked(true);
      setLiked(false);
      setDislikesCount(prev => prev + 1);
      if (liked) setLikesCount(prev => prev - 1);
    } else {
      setDisliked(false);
      setDislikesCount(prev => prev - 1);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to comment'); return; }
    if (isBlocked) { toast.error('Action restricted by Admin'); return; }
    if (!newComment.trim()) return;
    await addComment(postId, { content: newComment.trim() });
    setNewComment('');
    toast.success('Comment added');
    refreshComments();
  };

  const handleEditComment = async (commentId) => {
    if (!editContent.trim()) return;
    await editComment(commentId, { content: editContent.trim() });
    setEditingId(null);
    setEditContent('');
    toast.success('Comment updated');
    refreshComments();
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    toast.success('Comment deleted');
    refreshComments();
  };

  if (!post) {
    return (
      <div className="flex-1 bg-[#0A0D02] min-h-screen flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="text-xl font-black uppercase tracking-widest text-[#A4A896]/50">Post Not Found</h2>
        <Link href="/forum-posts" className="text-xs font-black uppercase text-[#D4FF00] hover:underline">Back to list</Link>
      </div>
    );
  }

  const timeAgo = post.createdAt
    ? (() => {
        const diffMs = new Date() - new Date(post.createdAt);
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHrs = Math.floor(diffMins / 60);
        if (diffHrs < 24) return `${diffHrs}h ago`;
        return `${Math.floor(diffHrs / 24)}d ago`;
      })()
    : '';

  return (
    <div className="flex-1 bg-[#0A0D02] min-h-screen text-white overflow-y-auto font-sans">
      <div className="relative w-full aspect-[21/9] md:aspect-[24/8] min-h-[320px] bg-black">
        {post.image ? (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-60" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#13160B] to-[#0A0D02]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D02] via-[#0A0D02]/30 to-black/70 flex flex-col justify-between p-6 md:p-12">
          <div>
            <Link href="/forum-posts" className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-widest text-white/60 hover:text-[#D4FF00] transition-colors duration-200 uppercase">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to dispatches</span>
            </Link>
          </div>
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="bg-[#D4FF00] text-black font-black text-[9px] tracking-widest uppercase px-2.5 py-1 rounded">
                {post.category || 'PROTOCOL'}
              </span>
              <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider font-mono">{timeAgo}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight font-mono">{post.title}</h1>
            <div className="flex items-center gap-3 pt-2">
              {post.authorImage ? (
                <div className="w-10 h-10 rounded-full overflow-hidden relative border border-[#1C210E]">
                  <Image src={post.authorImage} fill alt="authorImage" className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#1C210E] flex items-center justify-center border border-[#1C210E]">
                  <User className="h-5 w-5 text-[#A4A896]/60" />
                </div>
              )}
              <div>
                <div className="text-xs font-extrabold text-white">{post.authorName}</div>
                <div className="text-[9px] font-black text-[#D4FF00] tracking-wider uppercase mt-0.5">{post.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <p className="text-sm md:text-base text-[#A4A896]/95 leading-relaxed">{post.description}</p>
          </div>
          <div className="space-y-6">
            {/* Like/Dislike Section */}
            <div className="bg-[#13160B] border border-[#1C210E] rounded-3xl p-6 space-y-4">
              <h3 className="text-[10px] font-black tracking-widest text-[#A4A896]/60 uppercase">Reactions</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    liked ? 'bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/20' : 'bg-[#1C210E]/40 text-[#A4A896]/70 hover:text-white border border-transparent'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  {likesCount}
                </button>
                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    disliked ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#1C210E]/40 text-[#A4A896]/70 hover:text-white border border-transparent'
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" />
                  {dislikesCount}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16 max-w-4xl">
          <div className="flex items-center gap-2 mb-8 border-b border-[#1C210E] pb-4">
            <MessageSquare className="h-5 w-5 text-[#D4FF00]" />
            <h2 className="text-xl font-black uppercase tracking-tight text-white">Comments ({comments.length})</h2>
          </div>

          {/* Add Comment */}
          {user && (
            <form onSubmit={handleAddComment} className="mb-10 flex gap-3">
              <div className="w-9 h-9 rounded-full bg-[#282F18] overflow-hidden flex-shrink-0 mt-1">
                {user.image ? (
                  <img src={user.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-[#A4A896] m-2" />
                )}
              </div>
              <div className="flex-1 flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-[#13160B] border border-[#1C210E] rounded-xl px-4 py-3 text-sm text-white placeholder-[#A4A896]/30 focus:outline-none focus:border-[#D4FF00] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-3 bg-[#D4FF00] text-black rounded-xl disabled:opacity-30 cursor-pointer transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment._id} className="bg-[#13160B] border border-[#1C210E] rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#282F18] overflow-hidden flex-shrink-0">
                    {comment.userImage ? (
                      <img src={comment.userImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-4 w-4 text-[#A4A896] m-2" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{comment.userName}</span>
                        <span className="text-[9px] text-[#A4A896]/40">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {user?.email === comment.userEmail && (
                        <div className="flex items-center gap-1">
                          {editingId === comment._id ? (
                            <button
                              onClick={() => handleEditComment(comment._id)}
                              className="p-1 text-[#D4FF00] hover:text-[#c2eb00] cursor-pointer"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => { setEditingId(comment._id); setEditContent(comment.content); }}
                              className="p-1 text-[#A4A896]/50 hover:text-white cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="p-1 text-[#A4A896]/50 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                    {editingId === comment._id ? (
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)}
                          className="flex-1 bg-[#0A0D02] border border-[#282F18] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4FF00]"
                          autoFocus
                        />
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2 py-1 text-[9px] font-black text-[#A4A896]/60 hover:text-white cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-[#A4A896]/80 mt-1">{comment.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-sm text-[#A4A896]/40 py-8 font-mono">No comments yet. Be the first to share your thoughts.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostDetailsClient;
