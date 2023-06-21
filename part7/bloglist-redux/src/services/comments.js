import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/comments';

const getComments = async (blogId) => {
  const config = {
    headers: { blogId: blogId },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const postComment = async (comment) => {
  const response = await axios.post(baseUrl, comment);
  return response.data;
};

const commentsService = {
  getComments,
  postComment,
};

export default commentsService;
