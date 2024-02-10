import { useEffect, useState } from "react";
import { supabase } from "./supabase-client"; // Adjust the path as necessary

interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const changes = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          console.log("Realtime payload:", payload);
          // Handle the realtime payload here, e.g., update state, show notification, etc.
        }
      )
      .subscribe();

    // Cleanup function to unsubscribe from the changes when the component unmounts
    return () => {
      supabase.removeChannel(changes);
    };
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
