
const CommentForm = () => {
  return (
    <form>
      <div className="mb-4">
        <label htmlFor="comment" className="sr-only">
          리뷰 작성
        </label>
        <textarea
          id="comment"
          rows={4}
          className="w-full p-2 border rounded"
          placeholder="리뷰를 작성해주세요."
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        리뷰 등록
      </button>
    </form>
  );
};

export default CommentForm;
