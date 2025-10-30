
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentSection = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">리뷰</h2>
      <CommentForm />
      <div className="mt-8">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default CommentSection;
